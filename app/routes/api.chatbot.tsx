import { json, type ActionFunctionArgs } from "@remix-run/node";
import { OpenAI } from "openai";
import { runGuardrails } from "@openai/guardrails";
import { z } from "zod";
import { Agent, type AgentInputItem, Runner, withTrace } from "@openai/agents";

// Shared client for guardrails and file search
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Guardrails definitions
const jailbreakGuardrailConfig = {
  guardrails: [
    { name: "Jailbreak", config: { model: "gpt-4o-mini", confidence_threshold: 0.7 } }
  ]
};

const context = { guardrailLlm: client };

function guardrailsHasTripwire(results: any[]): boolean {
  return (results ?? []).some((r) => r?.tripwireTriggered === true);
}

function getGuardrailSafeText(results: any[], fallbackText: string): string {
  for (const r of results ?? []) {
    if (r?.info && ("checked_text" in r.info)) {
      return r.info.checked_text ?? fallbackText;
    }
  }
  const pii = (results ?? []).find((r) => r?.info && "anonymized_text" in r.info);
  return pii?.info?.anonymized_text ?? fallbackText;
}

async function scrubConversationHistory(history: any[], piiOnly: any): Promise<void> {
  for (const msg of history ?? []) {
    const content = Array.isArray(msg?.content) ? msg.content : [];
    for (const part of content) {
      if (part && typeof part === "object" && part.type === "input_text" && typeof part.text === "string") {
        const res = await runGuardrails(part.text, piiOnly, context, true);
        part.text = getGuardrailSafeText(res, part.text);
      }
    }
  }
}

async function scrubWorkflowInput(workflow: any, inputKey: string, piiOnly: any): Promise<void> {
  if (!workflow || typeof workflow !== "object") return;
  const value = workflow?.[inputKey];
  if (typeof value !== "string") return;
  const res = await runGuardrails(value, piiOnly, context, true);
  workflow[inputKey] = getGuardrailSafeText(res, value);
}

async function runAndApplyGuardrails(inputText: string, config: any, history: any[], workflow: any) {
  const guardrails = Array.isArray(config?.guardrails) ? config.guardrails : [];
  const results = await runGuardrails(inputText, config, context, true);
  const shouldMaskPII = guardrails.find((g: any) => (g?.name === "Contains PII") && g?.config && g.config.block === false);
  if (shouldMaskPII) {
    const piiOnly = { guardrails: [shouldMaskPII] };
    await scrubConversationHistory(history, piiOnly);
    await scrubWorkflowInput(workflow, "input_as_text", piiOnly);
    await scrubWorkflowInput(workflow, "input_text", piiOnly);
  }
  const hasTripwire = guardrailsHasTripwire(results);
  const safeText = getGuardrailSafeText(results, inputText) ?? inputText;
  return { results, hasTripwire, safeText, failOutput: buildGuardrailFailOutput(results ?? []), passOutput: { safe_text: safeText } };
}

function buildGuardrailFailOutput(results: any[]) {
  const get = (name: string) => (results ?? []).find((r: any) => ((r?.info?.guardrail_name ?? r?.info?.guardrailName) === name));
  const pii = get("Contains PII"), mod = get("Moderation"), jb = get("Jailbreak"), hal = get("Hallucination Detection"), nsfw = get("NSFW Text"), url = get("URL Filter"), custom = get("Custom Prompt Check"), pid = get("Prompt Injection Detection"), piiCounts = Object.entries(pii?.info?.detected_entities ?? {}).filter(([, v]: [string, unknown]) => Array.isArray(v)).map(([k, v]: [string, unknown]) => k + ":" + (Array.isArray(v) ? v.length : 0)), conf = jb?.info?.confidence;

  return {
    pii: { failed: (piiCounts.length > 0) || pii?.tripwireTriggered === true, detected_counts: piiCounts },
    moderation: { failed: mod?.tripwireTriggered === true || ((mod?.info?.flagged_categories ?? []).length > 0), flagged_categories: mod?.info?.flagged_categories },
    jailbreak: { failed: jb?.tripwireTriggered === true },
    hallucination: { failed: hal?.tripwireTriggered === true, reasoning: hal?.info?.reasoning, hallucination_type: hal?.info?.hallucination_type, hallucinated_statements: hal?.info?.hallucinated_statements, verified_statements: hal?.info?.verified_statements },
    nsfw: { failed: nsfw?.tripwireTriggered === true },
    url_filter: { failed: url?.tripwireTriggered === true },
    custom_prompt_check: { failed: custom?.tripwireTriggered === true },
    prompt_injection: { failed: pid?.tripwireTriggered === true },
  };
}

const ClassificationAgentSchema = z.object({ 
  classification: z.enum(["skills", "projects", "contact", "services", "resume", "general"]) 
});

const classificationAgent = new Agent({
  name: "Classification agent",
  instructions: `Classify the user's intent into one of the following categories: "skills", "projects", "contact", "services", "resume", or "general".

1. Questions about technical skills, programming languages, frameworks, or technologies should route to "skills".
2. Questions about portfolio projects, applications, or work samples should route to "projects".
3. Questions about how to contact, email, phone, or social media should route to "contact".
4. Questions about services offered, what can be built, or service offerings should route to "services".
5. Questions about education, work experience, certifications, or professional background should route to "resume".
6. Any other general questions or unclear intents should route to "general".`,
  model: "gpt-4o-mini",
  outputType: ClassificationAgentSchema,
  modelSettings: {
    temperature: 0.7,
    topP: 1,
    maxTokens: 512,
    store: true
  }
});

// Cache portfolio content at module initialization
let cachedPortfolioContent: string | null = null;
let portfolioContentPromise: Promise<string> | null = null;

// Static portfolio content to avoid filesystem or network dependencies in serverless environments
const PORTFOLIO_CONTENT_MD = `# Portfolio Text Content Documentation

This document contains all text content from the main portfolio components referenced in \`_index.tsx\` (lines 146-154).

---

## Hero Section

### Main Content
- **Name:** Kevon Cadogan
- **Intro Text:** "I'm a"
- **Typed Text (rotating):**
  - Software Developer
  - AI Engineer
  - Mobile Developer

---

## About Section

### Section Title
- **Heading:** About

### Main Content
- **Subheading:** Full-Stack Developer
- **Company Link:** Currently at V75 Inc
- **Description:**
  > I am a full-stack developer with an eye for detail, building client and server applications for five years, with a diverse set of skills from HTML and JavaScript, with frameworks like React and Angular to Django, MySQL, MongoDB etc. With a sound agile project management discipline from years of building client-server applications, there is very little that we cannot achieve in a timely manner.

### Personal Information
- **Birthday:** 5 FEB 1988
- **Phone:** +592 694 3827
- **City:** Georgetown
- **Age:** (dynamically calculated)
- **Email:** kev.cadogan300@gmail.com
- **Freelance:** Available

---

## Skills Section

### Section Title
- **Heading:** Skills

### Skill Progress Bars
**Left Column:**
- HTML (100%)
- CSS (90%)
- JavaScript (95%)

**Right Column:**
- Python (90%)
- SQL (90%)
- Dart (90%)
- Photoshop (55%)
- Figma (95%)

### Technologies & Frameworks Subsection
- **Subheading:** Technologies & Frameworks
- **Technologies List:**
  - React
  - Next.js
  - Node.js
  - Express
  - MongoDB
  - PostgreSQL
  - Django
  - Flask
  - Angular
  - Vue.js
  - TypeScript
  - GraphQL
  - Docker
  - AWS
  - Git
  - Redux
  - Tailwind CSS
  - Bootstrap

---

## Resume Section

### Section Title
- **Heading:** Resume

### Education Column
- **Column Title:** Education

**Course 1:**
- **Title:** Improving Deep Neural Networks: Hyperparameter Tuning, Regularization and Optimization
- **Description Points:**
  - Understand industry best-practices for building deep learning applications.
  - Be able to effectively use the common neural network tricks, including initialization, L2 and dropout regularization, Batch normalization, gradient checking.
  - Be able to implement and apply a variety of optimization algorithms, such as mini-batch gradient descent, Momentum, RMSprop and Adam, and check for their convergence.
  - Understand new best-practices for the deep learning era of how to set up train/dev/test sets and analyze bias/variance.
  - Be able to implement a neural network in TensorFlow.

**Course 2:**
- **Title:** AWS Fundamentals: Addressing Security Risk
- **Description Points:**
  - Detective controls, including Amazon CloudTrail, AWS Security Hub, Amazon GuardDuty, and AWS Config.
  - Encryption of data at rest, in motion, and best practices for how to store data within and between various AWS services.
  - The AWS Well-Architected Framework and protecting compute resources such as Amazon EC2 and AWS Lambda.

### Professional Experience Column
- **Column Title:** Professional Experience

**Experience 1:**
- **Title:** Neural Networks and Deep Learning
- **Description Points:**
  - Understand the major technology trends driving Deep Learning
  - Be able to build, train and apply fully connected deep neural networks
  - Know how to implement efficient (vectorized) neural networks
  - Understand the key parameters in a neural network's architecture

**Experience 2:**
- **Title:** AWS Fundamentals: Migrating to the Cloud
- **Description:** (No description points)

**Experience 3:**
- **Title:** AWS Fundamentals: Building Serverless Applications
- **Description Points:**
  - AWS serverless framework and architecture in the context of a real business problem
  - Provide AWS Lambda, Amazon API Gateway, Amazon DynamoDB, Amazon Lex, and other services needed to deploy serverless solutions.

**Experience 4:**
- **Title:** Sequence Models
- **Subsections:**
  - **Recurrent Neural Networks:**
    > Recurrent Neural Networks and commonly-used variants such as GRUs and LSTMs; apply RNNs to Character-level Language Modeling; gain experience with natural language processing and Word Embeddings; and use HuggingFace tokenizers and transformer models to solve different NLP tasks such as NER and Question Answering.
  
  - **Natural Language Processing & Word Embeddings:**
    > Natural language processing with deep learning is an important combination. Using word vector representations and embedding layers you can train recurrent neural networks with outstanding performances in a wide variety of industries. Examples of applications are sentiment analysis, named entity recognition and machine translation.
  
  - **Sequence Models:**
    > Sequence models can be augmented using an attention mechanism. This algorithm will help your model understand where it should focus its attention given a sequence of inputs. This week, you will also learn about speech recognition and how to deal with audio data.

---

## Services Section

### Section Title
- **Heading:** Services

### Service 1: Website Development
- **Title:** Website Development
- **Description:**
  > The Web Development Services offered by me vary from simple automation script for your existing Web Services to fully functional Custom facing Web solutions such as Static Website (for images and Text base only) for Detailing the products and services you offer to potential customers, such as E-commerce Applications, Business to Business Applications, Administrative Control Panel for internal business applications.

### Service 2: DevOps
- **Title:** DevOps
- **Description:**
  > Create and maintain continuous integration strategies using GitHub, AWS Boto3, Jenkins, Chef, Puppet or Ansible.

### Service 3: Machine Learning
- **Title:** Machine Learning
- **Description:**
  > Applied Linear Algebra, AI and Neural Networks designs and coding using Octave and Python scikit-learn and NumPy

### Service 4: Cloud
- **Title:** Cloud
- **Description:**
  > Server migrations, and consultation on cloud infrastructure planning to minimize costs while maximizing security and performance.

### Call to Action
- **Text:** Ready to start your next project? Let's work together!
- **Button Text:** Get In Touch

---

## Portfolio Section

### Section Title
- **Heading:** Portfolio
- **Subtitle:** Check out my featured projects and web applications

### Project 1: Impact Business Solutions
- **Name:** Impact Business Solutions
- **Description:**
  > Since 2021, Impact Business Solutions has been empowering businesses to grow both online and offline through innovative marketing and business development strategies. We are a boutique marketing and business development agency, dedicated to fueling business growth through innovation and excellence.
- **URL:** https://impact-business-solutions.vercel.app/
- **Button Text:** View

### Project 2: Synergy Auto Zone
- **Name:** Synergy Auto Zone
- **Description:**
  > Our mission is to simplify the car-buying process by providing transparent pricing, exceptional customer service, and a seamless purchasing experience. Whether you're seeking a luxury vehicle, an eco-friendly option, or something unique, Synergy Auto Zone is here to help you find the perfect vehicle.
- **URL:** https://synergyautozone.vercel.app/
- **Button Text:** View

### Project 3: Healthyzway
- **Name:** Healthyzway
- **Description:**
  > Proudly Guyanese-Owned 🇬🇾 Premium SeaMoss Gel - Nature's 92 minerals for your complete wellness
- **URL:** https://healthyzway.vercel.app/
- **Button Text:** View

### Project 4: SmartWasteGy
- **Name:** SmartWasteGy
- **Description:**
  > SmartWasteGy Management at Your Fingertips. Join thousands of Guyanese making waste collection smarter, faster, and more sustainable. Track bins, schedule pickups, and contribute to a cleaner Guyana.
- **URL:** https://smartwaste-landing-page.vercel.app/
- **Button Text:** View

### Project 5: BizSetup
- **Name:** BizSetup
- **Description:**
  > Stop Looking Like a Hobby. Get professional email, secure passwords, and complete online presence setup in one week. $597 flat rate. Everything handled for you.
- **URL:** https://bizsetup-sandy.vercel.app/
- **Button Text:** View

---

## Contact Section

### Section Title
- **Heading:** Contact

### Get In Touch Section
- **Subheading:** Get In Touch
- **Email:**
  - **Label:** Email:
  - **Value:** kev.cadogan300@gmail.com
- **Phone:**
  - **Label:** Call:
  - **Value:** +(592) 694 3827

### Follow Me Section
- **Subheading:** Follow Me
- **Social Media Links:**
  - Twitter: https://x.com/kevon_cadogan
  - Facebook: https://www.facebook.com/kevongudlove24
  - LinkedIn: https://www.linkedin.com/in/kevon-cadogan-113034a8

### Contact Form
- **Form Title:** Send Me a Message
- **Form Fields:**
  - **Name:**
    - Label: Name
    - Placeholder: Your name
  - **Email:**
    - Label: Email *
    - Placeholder: you@example.com
  - **Phone:**
    - Label: Phone *
    - Placeholder: +1 (592) 694 3827
  - **Message:**
    - Label: Message
    - Placeholder: Tell me a bit about your project or how I can help...
- **Submit Button:**
  - Default: Send
  - Loading: Sending...
- **Success Message:** Thanks! Your message has been submitted.
- **Error Message:** Something went wrong while submitting. Please try again or contact me directly via email.

---

## Footer Section

### About Section
- **Name:** Kevon Cadogan
- **Description:**
  > Full-stack developer passionate about building modern, user-friendly web applications and creating elegant solutions to complex problems.

### Quick Links Section
- **Subheading:** Quick Links
- **Links:**
  - Home
  - About
  - Services
  - Resume
  - Contact

### Contact Info Section
- **Subheading:** Contact Info
- **Email:** kev.cadogan300@gmail.com
- **Phone:** +(592) 694 3827

### Follow Me Section
- **Subheading:** Follow Me
- **Social Media Links:**
  - Twitter: https://x.com/kevon_cadogan
  - Facebook: https://www.facebook.com/kevongudlove24
  - LinkedIn: https://www.linkedin.com/in/kevon-cadogan-113034a8
  - GitHub: https://github.com/blackMastery
- **Tagline:** Let's connect and build something amazing together!

### Copyright
- **Text:** © [Current Year] Kevon Cadogan. All rights reserved.

---

## Additional Notes

- All section headings follow a consistent pattern with a decorative underline
- Contact information appears in multiple sections (About, Contact, Footer) for consistency
- Social media links are present in both Contact and Footer sections
- Dynamic content includes:
  - Age calculation in About section
  - Current year in Footer copyright
  - Typed animation text in Hero section
  - Loading states in Portfolio section

---

*Document generated from component files in \`/app/components/\`*
*Last updated: Based on current codebase state*`;

async function loadPortfolioContent(): Promise<string> {
  if (cachedPortfolioContent !== null) {
    return cachedPortfolioContent;
  }

  // Use static, embedded markdown content
  cachedPortfolioContent = PORTFOLIO_CONTENT_MD;
  return PORTFOLIO_CONTENT_MD;
}

function getPortfolioContent(): string {
  if (cachedPortfolioContent !== null) {
    return cachedPortfolioContent;
  }
  
  // Start loading if not already started
  if (!portfolioContentPromise) {
    portfolioContentPromise = loadPortfolioContent();
  }
  
  // Return fallback while loading (will be updated when loaded)
  return "# Portfolio Text Content Documentation\n\nThis document contains all text content from the main portfolio components.";
}

// Initialize cache on module load (server-side only)
if (typeof process !== "undefined") {
  portfolioContentPromise = loadPortfolioContent();
}

// Create information agent lazily with portfolio content
let informationAgent: Agent | null = null;

async function getInformationAgent(): Promise<Agent> {
  if (informationAgent) {
    return informationAgent;
  }
  
  // Ensure portfolio content is loaded
  if (portfolioContentPromise) {
    await portfolioContentPromise;
  }
  
  const portfolioContent = getPortfolioContent();
  
  informationAgent = new Agent({
    name: "Information agent",
    instructions: `You are an information agent for answering informational queries about Kevon Cadogan's portfolio. Your aim is to provide clear, concise responses to user questions. Use the policy below to assemble your answer.

${portfolioContent}

When answering questions:
- Be friendly and professional
- Use the information from the portfolio content documentation above
- If you don't know something, say so politely
- Keep responses concise but informative
- Focus on helping users learn about Kevon's skills, experience, projects, and services`,
    model: "gpt-4o-mini",
    modelSettings: {
      temperature: 1,
      topP: 1,
      maxTokens: 2048,
      store: true
    }
  });
  
  return informationAgent;
}

type WorkflowInput = { 
  input_as_text: string;
  conversation_history?: AgentInputItem[];
};

// Simple in-memory rate limiter
interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10; // 10 requests per minute

function checkRateLimit(identifier: string): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);
  
  if (!entry || now > entry.resetTime) {
    // Create new entry or reset expired one
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW
    });
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1, resetTime: now + RATE_LIMIT_WINDOW };
  }
  
  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, remaining: 0, resetTime: entry.resetTime };
  }
  
  entry.count++;
  return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - entry.count, resetTime: entry.resetTime };
}

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}, RATE_LIMIT_WINDOW);

// Main code entrypoint
export const runWorkflow = async (workflow: WorkflowInput) => {
  return await withTrace("kev-bot", async () => {
    const state = {};
    const conversationHistory: AgentInputItem[] = workflow.conversation_history || [];
    conversationHistory.push({ role: "user", content: [{ type: "input_text", text: workflow.input_as_text }] });
    const runner = new Runner({
      traceMetadata: {
        __trace_source__: "agent-builder",
        workflow_id: "wf_6930e94dc4fc819091c06142062b0d36050970b3262629b2"
      }
    });
    const guardrailsInputText = workflow.input_as_text;
    const { hasTripwire: guardrailsHasTripwire, safeText: guardrailsAnonymizedText, failOutput: guardrailsFailOutput, passOutput: guardrailsPassOutput } = await runAndApplyGuardrails(guardrailsInputText, jailbreakGuardrailConfig, conversationHistory, workflow);
    const guardrailsOutput = (guardrailsHasTripwire ? guardrailsFailOutput : guardrailsPassOutput);
    if (guardrailsHasTripwire) {
      return guardrailsOutput;
    } else {
      const classificationAgentResultTemp = await runner.run(
        classificationAgent,
        [
          ...conversationHistory
        ]
      );
      conversationHistory.push(...classificationAgentResultTemp.newItems.map((item) => item.rawItem));

      if (!classificationAgentResultTemp.finalOutput) {
        throw new Error("Agent result is undefined");
      }

      const classificationAgentResult = {
        output_text: JSON.stringify(classificationAgentResultTemp.finalOutput),
        output_parsed: classificationAgentResultTemp.finalOutput
      };
      
      // All classifications route to information agent for portfolio chatbot
      // The classification helps provide context but we always use information agent
      const agent = await getInformationAgent();
      const informationAgentResultTemp = await runner.run(
        agent,
        [
          ...conversationHistory
        ]
      );
      conversationHistory.push(...informationAgentResultTemp.newItems.map((item) => item.rawItem));

      if (!informationAgentResultTemp.finalOutput) {
        throw new Error("Agent result is undefined");
      }

      const informationAgentResult = {
        output_text: informationAgentResultTemp.finalOutput ?? "",
        classification: classificationAgentResult.output_parsed.classification
      };
      return informationAgentResult;
    }
  });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, { status: 405 });
  }

  if (!process.env.OPENAI_API_KEY) {
    console.error("OPENAI_API_KEY is not set");
    return json({ error: "OpenAI API key not configured" }, { status: 500 });
  }

  // Rate limiting
  const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                   request.headers.get("x-real-ip") || 
                   "unknown";
  const rateLimitResult = checkRateLimit(clientIp);
  
  if (!rateLimitResult.allowed) {
    const retryAfter = Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000);
    return json(
      { 
        error: "Too many requests. Please try again later.",
        retryAfter 
      },
      { 
        status: 429,
        headers: {
          "Retry-After": retryAfter.toString(),
          "X-RateLimit-Limit": RATE_LIMIT_MAX_REQUESTS.toString(),
          "X-RateLimit-Remaining": "0",
          "X-RateLimit-Reset": new Date(rateLimitResult.resetTime).toISOString()
        }
      }
    );
  }

  try {
    const formData = await request.formData();
    const inputText = (formData.get("input") as string)?.trim() || "";
    const conversationHistoryJson = formData.get("conversation_history") as string | null;

    // Input validation
    if (!inputText || inputText.length === 0) {
      return json({ error: "Input text is required" }, { status: 400 });
    }

    if (inputText.length > 2000) {
      return json({ error: "Input text is too long. Maximum 2000 characters allowed." }, { status: 400 });
    }

    // Parse conversation history
    // Only include user messages to avoid format issues with assistant messages
    let conversationHistory: AgentInputItem[] = [];
    if (conversationHistoryJson) {
      try {
        const parsed = JSON.parse(conversationHistoryJson);
        if (Array.isArray(parsed)) {
          // Filter to only user messages and limit to last 10 for context
          // Type guard to check if item has role property
          conversationHistory = parsed
            .filter((item: any) => item && typeof item === "object" && "role" in item && item.role === "user")
            .slice(-10) as AgentInputItem[];
        }
      } catch (e) {
        console.warn("Failed to parse conversation history:", e);
      }
    }

    const workflowInput: WorkflowInput = { 
      input_as_text: inputText,
      conversation_history: conversationHistory
    };
    const result = await runWorkflow(workflowInput);

    // Extract the response text from the result
    let responseText = "";
    if (result && typeof result === "object") {
      if ("output_text" in result && typeof result.output_text === "string") {
        responseText = result.output_text;
      } else if ("safe_text" in result && typeof result.safe_text === "string") {
        responseText = result.safe_text;
      } else if (typeof result === "string") {
        responseText = result;
      } else {
        // If it's a guardrail fail output, return an appropriate message
        if ("jailbreak" in result && result.jailbreak?.failed) {
          responseText = "I'm sorry, but I can't help with that request. Please ask me something else about the portfolio.";
        } else if ("moderation" in result && result.moderation?.failed) {
          responseText = "I'm sorry, but I can't process that request. Please ask me something else.";
        } else {
          responseText = JSON.stringify(result);
        }
      }
    }

    return json({ 
      success: true, 
      response: responseText,
      raw: result 
    }, {
      headers: {
        "X-RateLimit-Limit": RATE_LIMIT_MAX_REQUESTS.toString(),
        "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
        "X-RateLimit-Reset": new Date(rateLimitResult.resetTime).toISOString()
      }
    });
  } catch (error) {
    console.error("Chatbot error:", error);
    
    // Provide user-friendly error messages
    let errorMessage = "An error occurred processing your request";
    let statusCode = 500;
    
    if (error instanceof Error) {
      if (error.message.includes("timeout") || error.message.includes("ETIMEDOUT")) {
        errorMessage = "Request timed out. Please try again.";
        statusCode = 504;
      } else if (error.message.includes("API key")) {
        errorMessage = "Service configuration error. Please contact support.";
        statusCode = 500;
      } else {
        errorMessage = "Unable to process your request. Please try again or rephrase your question.";
      }
    }
    
    return json({ 
      error: errorMessage,
      details: process.env.NODE_ENV === "development" ? (error instanceof Error ? error.message : String(error)) : undefined
    }, { status: statusCode });
  }
};

