import type { FAQItem } from "~/components/ServicePageLayout";

// FAQ copy for the service landing pages, keyed by route path.
//
// Prices, timelines, payment terms, and policies below were confirmed by Kevon
// on 2026-11-17. Keep them in sync with real quotes: a stale price on the site
// is worse than none. Answers are plain text because the same string is reused
// verbatim in the FAQPage JSON-LD. USD figures are approximate (~GYD 209 / US$1).

type CommonFaqInput = {
  costQuestion: string;
  costAnswer: string;
  timelineAnswer: string;
};

/** Questions every service page shares; each page appends its own list. */
function commonFaqs({ costQuestion, costAnswer, timelineAnswer }: CommonFaqInput): FAQItem[] {
  return [
    { question: costQuestion, answer: costAnswer },
    { question: "How long does a project take?", answer: timelineAnswer },
    {
      question: "How does payment work?",
      answer:
        "Projects are paid 50% upfront to book your start date and 50% at launch. Clients in Guyana can pay by local bank transfer, MMG, or cash, and overseas clients pay by international wire transfer.",
    },
    {
      question: "Do you work with clients outside Guyana?",
      answer:
        "Yes. I'm based in Georgetown and meet local clients in person, but I work remotely with clients anywhere in the world using video calls, shared project boards, and regular progress updates.",
    },
    {
      question: "What happens after launch?",
      answer:
        "Every project includes 30 days of free fixes after launch. After that, you can join an optional monthly care plan that keeps everything secure, backed up, and up to date, with updates and small changes handled for you.",
    },
  ];
}

const webDesignFaqs: FAQItem[] = [
  ...commonFaqs({
    costQuestion: "How much does a website cost in Guyana?",
    costAnswer:
      "Business websites start from GYD $100,000 (about US$480). The final price depends on the number of pages, custom features, integrations, and how much content I'm creating for you. You'll get a clear, fixed quote after a free consultation, before any work starts.",
    timelineAnswer:
      "A standard business website typically takes 2 to 3 weeks from kickoff to launch. Larger or more custom sites take longer, and I'll give you a timeline with your quote. Having your text, images, and feedback ready is the biggest thing that keeps a project on schedule.",
  }),
  {
    question: "Will I be able to update the website myself?",
    answer:
      "Yes. I can set your site up so you can edit text, images, and other everyday content yourself, and I'll walk you through how it works before handover. Bigger changes, like new page layouts or features, are something I can take care of for you.",
  },
  {
    question: "Do you handle hosting and the domain name?",
    answer:
      "Yes, and you can choose how. I can register the domain and set up hosting in your business's name so you pay the providers directly, or I can manage both for you so you have one less thing to think about.",
  },
  {
    question: "Will my website show up on Google?",
    answer:
      "Every site I build includes the on-page SEO basics: fast loading, mobile-friendly pages, proper titles and descriptions, and structured data that helps Google understand your business. Rankings take time and depend on competition, but a well-built site gives you the strongest possible starting point.",
  },
  {
    question: "I already have a website. Can you redesign it?",
    answer:
      "Yes. I'll review what's working on your current site and what isn't, then rebuild it to be faster, cleaner, and better at turning visitors into enquiries, carrying over the content worth keeping.",
  },
  {
    question: "Do I own the website when it's finished?",
    answer:
      "Yes. Once the project is fully paid, the website, its code, its design, and your content all belong to your business.",
  },
];

const ecommerceFaqs: FAQItem[] = [
  ...commonFaqs({
    costQuestion: "How much does an online store cost?",
    costAnswer:
      "Online stores start from GYD $250,000 (about US$1,200). The price depends on the number of products, payment and delivery options, and any custom features. You'll get a clear, fixed quote after a free consultation, before any work starts.",
    timelineAnswer:
      "A typical online store takes 4 to 6 weeks from kickoff to launch. Stores with a large catalogue or custom features take longer, and I'll give you a timeline with your quote. Having product photos, descriptions, and prices ready keeps things moving.",
  }),
  {
    question: "Can customers pay online in Guyana?",
    answer:
      "Yes. I've built stores with card payments, MMG and local payment gateways, cash on delivery, and WhatsApp checkout where orders go straight to your team. We'll choose the mix that fits how your customers prefer to pay.",
  },
  {
    question: "Can I manage products and orders myself?",
    answer:
      "Yes. You get an admin dashboard to add and edit products, update prices, and track orders without touching any code, and I'll show you how to use it before launch.",
  },
  {
    question: "Can you set up delivery areas and shipping fees?",
    answer:
      "Yes. Delivery can be set up to match how you operate, such as different fees for different areas, free delivery above a certain order value, or in-store pickup.",
  },
  {
    question: "Can my store work if I don't keep stock on hand?",
    answer:
      "Yes. If you order items from a supplier on demand, the store can take order requests instead of payment up front, so customers are only invoiced for what actually arrives. I've built exactly this for a trade-tool reseller.",
  },
  {
    question: "Should I use Shopify or a custom-built store?",
    answer:
      "Shopify is a fine choice for a standard store and a small budget. A custom store makes more sense when you need local payment and delivery options, a checkout that fits how your customers buy, no monthly platform fees, or full control over design and speed. I'll give you an honest recommendation for your situation.",
  },
];

const hireDeveloperFaqs: FAQItem[] = [
  ...commonFaqs({
    costQuestion: "How much does it cost to hire a web developer?",
    costAnswer:
      "It depends on what you need built. As a guide, business websites start from GYD $100,000, online stores from GYD $250,000, and mobile apps from GYD $600,000. Every project gets a clear, fixed quote after a free consultation, before any work starts.",
    timelineAnswer:
      "As a guide, a business website takes 2 to 3 weeks, an online store 4 to 6 weeks, and a mobile app 6 to 10 weeks. Smaller fixes and features can often be turned around much faster. I'll give you a timeline with your quote.",
  }),
  {
    question: "Can we meet in person?",
    answer:
      "Yes. I'm based in Georgetown, so we can meet face to face to plan your project, review progress, or train your team, and handle everything else by call, message, or email.",
  },
  {
    question: "Do you take on contract, part-time, or ongoing work?",
    // TODO: confirm the engagement types and availability you offer.
    answer:
      "Yes. I work on fixed-scope projects, and I'm also open to contract or ongoing arrangements for businesses that need a developer on hand regularly. Tell me what you need and we'll find the right setup.",
  },
  {
    question: "Can you join an existing project or work with our team?",
    answer:
      "Yes. I can pick up an existing codebase, fix issues, add features, or work alongside your in-house team, starting with a review so I understand how everything fits together.",
  },
  {
    question: "What technologies do you work with?",
    answer:
      "Mainly React, Next.js, Remix, and TypeScript on the front end, Node.js and Supabase (PostgreSQL) on the back end, Flutter and React Native for mobile apps, and AI tooling for automation and agents. I choose the stack based on what's right for your project, not habit.",
  },
  {
    question: "Why hire a freelance developer instead of an agency?",
    answer:
      "You work directly with the person writing your code, so there are no account managers or hand-offs and nothing gets lost in translation. That usually means faster answers, clearer communication, and lower overheads.",
  },
];

const mobileAppFaqs: FAQItem[] = [
  ...commonFaqs({
    costQuestion: "How much does a mobile app cost?",
    costAnswer:
      "Mobile apps for both iPhone and Android start from GYD $600,000 (about US$2,870). The price depends on the number of screens, features like accounts, payments, or offline use, and any back-end systems the app needs. You'll get a clear, fixed quote after a free consultation, before any work starts.",
    timelineAnswer:
      "A typical mobile app takes 6 to 10 weeks from kickoff to store submission. Apps with more features or complex back ends take longer, and I'll give you a timeline with your quote. App store review can add a few days at the end.",
  }),
  {
    question: "Will my app work on both iPhone and Android?",
    answer:
      "Yes. I build with Flutter and React Native, which both let one codebase run natively on iOS and Android. You reach both audiences without paying for two separate apps, and I'll recommend whichever framework fits your app best.",
  },
  {
    question: "Do you publish the app to the App Store and Google Play?",
    answer:
      "Yes. I handle preparing and submitting the app, and I can publish it under my developer accounts so you don't need to set up your own. If you'd like the listing under your business's name later, I'll transfer it to your own Apple and Google accounts.",
  },
  {
    question: "Can the app work with a weak or no internet connection?",
    answer:
      "It can. Where it makes sense, I design apps to save data on the device and sync when a connection returns, so they stay usable on patchy mobile networks.",
  },
  {
    question: "Do I need a website as well as an app?",
    answer:
      "Often, yes. A website helps people find you on Google and works for anyone who won't download an app, while the app serves your regular customers. For some businesses, a fast mobile-friendly website is all they need to start, and I'll tell you honestly which fits you.",
  },
  {
    question: "What does it cost to keep an app running after launch?",
    answer:
      "After the 30 days of free fixes, ongoing costs usually include the servers or services the app relies on and updates to keep up with new iOS and Android versions. My optional monthly care plan covers that upkeep, and I'll outline all running costs up front so there are no surprises.",
  },
];

const agenticAiFaqs: FAQItem[] = [
  ...commonFaqs({
    costQuestion: "How much does a custom AI agent cost?",
    costAnswer:
      "Custom AI agents start from GYD $500,000 (about US$2,390), and an AI audit starts from GYD $100,000 (about US$480). The price depends on how many tasks the agent handles, which systems it connects to, and how much oversight and reporting you need. You'll get a clear, fixed quote before any work starts.",
    timelineAnswer:
      "A typical AI agent takes 3 to 6 weeks from kickoff to launch, and rollout is phased so your team can test it on real work before it goes live everywhere. Larger, multi-step workflows take longer, and I'll give you a timeline with your quote.",
  }),
  {
    question: "What's the difference between an AI agent and a chatbot?",
    answer:
      "A chatbot answers questions. An AI agent takes action: it can look up records, fill in forms, send messages, update systems, and complete multi-step tasks within rules you define, with people stepping in where judgement is needed.",
  },
  {
    question: "Is our data safe? Where is it stored?",
    answer:
      "Security is designed in from the start. Agents only get access to the systems and data they need, sensitive steps can require human approval, and activity is logged so you can see what the agent did. Where data is stored and which AI providers are used are agreed with you up front, which is especially important for government and regulated organisations.",
  },
  {
    question: "Will AI replace our staff?",
    answer:
      "The goal is to take repetitive, low-value work off your team's plate, not to replace them. Staff spend less time on data entry and routine requests and more time on the work that needs people, and training makes sure they're comfortable working alongside the tools.",
  },
  {
    question: "What does an AI audit involve?",
    answer:
      "I review how your team works today, identify the tasks where AI would save the most time or money, and deliver a prioritised plan showing what to automate first, the expected benefit, and what it would take. You can act on it with me or on your own.",
  },
  {
    question: "Do we need technical staff to run an AI agent?",
    answer:
      "No. Agents are built to fit into the tools your team already uses, and I provide hands-on training so non-technical staff can work with them confidently. I can also support and improve the agent after launch.",
  },
  {
    question: "Can an AI agent connect to our existing systems?",
    answer:
      "Usually, yes. Agents can work with email, spreadsheets, databases, messaging channels like WhatsApp, and most business software that offers an API. The audit or discovery call is where we confirm exactly what your systems support.",
  },
  {
    question: "Is agentic AI affordable for a small business?",
    answer:
      "Yes. Starting small is often the smartest approach: automate one high-value task, prove the return, then expand. An audit from GYD $100,000 shows exactly where to begin, and rollout is phased so you're never committing to a large project before seeing results.",
  },
];

export const SERVICE_FAQS: Record<string, FAQItem[]> = {
  "/web-design-guyana": webDesignFaqs,
  "/ecommerce-development-guyana": ecommerceFaqs,
  "/hire-web-developer-georgetown": hireDeveloperFaqs,
  "/mobile-app-development-guyana": mobileAppFaqs,
  "/agentic-ai-for-business": agenticAiFaqs,
};
