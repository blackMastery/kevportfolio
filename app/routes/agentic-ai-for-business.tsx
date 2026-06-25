import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import ServicePageLayout, {
  buildServiceMeta,
  buildServiceJsonLd,
  ServiceCTA,
  OtherServices,
} from "~/components/ServicePageLayout";
import { CALENDLY_URL } from "~/config/contact";

const PATH = "/agentic-ai-for-business";

const PRIMARY_BTN =
  "inline-block rounded-full bg-gradient-to-r from-primary to-primary-hover px-8 py-3 font-semibold text-white shadow-lg transition-all hover:shadow-xl";
const SECONDARY_BTN =
  "inline-block rounded-full border border-primary px-8 py-3 font-semibold text-primary transition-colors hover:bg-primary hover:text-white";

export const meta: MetaFunction = () =>
  buildServiceMeta({
    title: "Agentic AI for Business & Government | Kevon Cadogan",
    description:
      "We build custom AI agents that automate tasks, cut costs, and improve service for businesses and government. AI agent creation, audits, and staff training.",
    path: PATH,
  });

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start text-gray-600">
          <span className="mr-2 mt-1 flex-shrink-0 text-primary">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function AgenticAiForBusiness() {
  const jsonLd = buildServiceJsonLd({
    name: "Agentic AI for Business & Government",
    description:
      "Custom AI agents that automate workflows, plus AI audits and staff training for businesses and public-sector organizations.",
    path: PATH,
    serviceType: "Agentic AI Development",
  });

  return (
    <ServicePageLayout
      h1="Agentic AI That Works for Your Organization"
      intro="Move beyond chatbots. We build autonomous AI agents that take real action — handling tasks, making decisions within your rules, and working around the clock so your people can focus on what matters. Trusted by businesses and public-sector teams to automate operations, cut costs, and deliver results."
      jsonLd={jsonLd}
    >
      {/* Hero CTAs */}
      <div className="mb-12 flex flex-col gap-3 sm:flex-row">
        <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className={PRIMARY_BTN}>
          Book a Free Discovery Call
        </a>
        <Link to="/contact" className={SECONDARY_BTN}>
          Request an AI Audit
        </Link>
      </div>

      {/* TL;DR */}
      <section className="mb-12 rounded-xl border-l-4 border-primary bg-gray-50 p-6 xs:p-8">
        <h2 className="mb-3 text-xl font-semibold text-gray-800">TL;DR</h2>
        <p className="mb-4 leading-relaxed text-gray-600">
          We build <strong className="text-gray-800">autonomous AI agents</strong> that don&apos;t
          just answer questions — they do the work, around the clock, within rules you define. For
          businesses and government, that means lower costs, faster service, fewer errors, and a team
          freed from busywork.
        </p>
        <Bullets
          items={[
            "AI Agent Creation — custom agents built around your real workflows and existing tools",
            "AI Audits — a prioritized, ROI-grounded plan for where AI actually pays off",
            "AI Training — hands-on training so your team adopts the tools, not just installs them",
            "Built for both business and public sector, with security, human oversight, and phased rollout",
          ]}
        />
        <p className="mt-4 leading-relaxed text-gray-600">
          First step is free:{" "}
          <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            book a discovery call
          </a>{" "}
          or{" "}
          <Link to="/contact" className="text-primary hover:underline">
            request an AI audit
          </Link>
          .
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">What is agentic AI?</h2>
        <p className="mb-4 leading-relaxed text-gray-600">
          Most &quot;AI&quot; you&apos;ve used so far answers questions.{" "}
          <strong className="text-gray-800">Agentic AI does the work.</strong>
        </p>
        <p className="mb-4 leading-relaxed text-gray-600">
          An AI agent is a digital worker that can understand a goal, plan the steps to reach it, use
          your existing tools, and complete the task from start to finish — with little or no human
          babysitting. It reads, writes, decides, and acts within boundaries you define.
        </p>
        <p className="mb-4 leading-relaxed text-gray-600">
          Think of it as the difference between a calculator and an accountant. One gives you an
          answer when asked. The other takes the whole job off your plate. For organizations, that
          shift is enormous: work that once required a team of people doing repetitive tasks can now
          run automatically, accurately, and 24/7.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">Why this matters now</h2>
        <p className="mb-4 leading-relaxed text-gray-600">
          The organizations pulling ahead are not the ones with the most staff — they&apos;re the
          ones whose staff are freed from busywork.
        </p>
        <Bullets
          items={[
            "Labor is your biggest cost and your scarcest resource. Agents absorb the repetitive load so your people do higher-value work.",
            "Expectations have risen. Customers and citizens expect instant, accurate, always-available service. Agents deliver it.",
            "The tools are finally ready. Agentic AI is no longer experimental — it's production-ready, secure, and proven across industries.",
            "Early movers compound their advantage. Every month of automation is a month of saved cost and accumulated data.",
          ]}
        />
        <p className="mt-4 leading-relaxed text-gray-600">
          The question is no longer <em>whether</em> to adopt AI agents — it&apos;s{" "}
          <em>how quickly and safely</em> you can do it. That&apos;s where we come in.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">Our services</h2>
        <p className="mb-6 leading-relaxed text-gray-600">
          We don&apos;t sell you a tool and walk away. We assess, build, and train — so the
          technology actually sticks.
        </p>

        <div className="space-y-8">
          <div>
            <h3 className="mb-2 text-xl font-semibold text-gray-800">1. AI Agent Creation</h3>
            <p className="mb-3 leading-relaxed text-gray-600">
              Custom agents built around your real workflows. We design and deploy AI agents tailored
              to your organization&apos;s unique needs — not off-the-shelf templates. Each agent
              integrates with the systems you already use and automates the work that costs you the
              most time.
            </p>
            <Bullets
              items={[
                "Automate end-to-end workflows",
                "Enhance customer and citizen interactions",
                "Integrate with your existing tools, software, and databases",
                "Improve speed, accuracy, and productivity across departments",
              ]}
            />
          </div>

          <div>
            <h3 className="mb-2 text-xl font-semibold text-gray-800">2. AI Audits</h3>
            <p className="mb-3 leading-relaxed text-gray-600">
              Know exactly where AI will pay off — before you spend a dollar building. We analyze your
              processes, tools, and data to pinpoint the highest-impact opportunities for automation.
              You get a clear, prioritized plan grounded in real ROI — not hype.
            </p>
            <Bullets
              items={[
                "Process and workflow analysis",
                "AI opportunity mapping",
                "ROI and impact assessment",
                "A strategic roadmap to AI adoption",
              ]}
            />
          </div>

          <div>
            <h3 className="mb-2 text-xl font-semibold text-gray-800">3. AI Training for Staff</h3>
            <p className="mb-3 leading-relaxed text-gray-600">
              Technology only works when your people do. We equip your team with the knowledge and
              confidence to work alongside AI tools effectively. Adoption — not just installation — is
              what turns AI into results.
            </p>
            <Bullets
              items={[
                "Hands-on, practical training",
                "Tailored to your roles and industry",
                "Best practices and real-world use cases",
                "Ongoing adoption support and guidance",
              ]}
            />
          </div>
        </div>

        <div className="mt-8">
          <Link to="/contact" className={PRIMARY_BTN}>
            Start With a Free AI Audit
          </Link>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-6 text-2xl font-semibold text-gray-800">Why automate with AI agents?</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              title: "Cut Complexity",
              body: "Automate repetitive, manual tasks to simplify workflows and dramatically reduce human error.",
            },
            {
              title: "Cut Costs",
              body: "Lower operational costs by reducing manual labor and getting more done with the team you already have.",
            },
            {
              title: "Boost Productivity",
              body: "AI agents work 24/7, handling tasks faster and with greater consistency than is humanly possible.",
            },
            {
              title: "Focus on Growth",
              body: "Free your team from routine work so they can focus on strategy, innovation, service, and growth.",
            },
          ].map((card) => (
            <div key={card.title} className="rounded-lg border border-gray-200 p-5">
              <h3 className="mb-1 text-lg font-semibold text-gray-800">{card.title}</h3>
              <p className="text-sm text-gray-600">{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">What our AI agents can do</h2>
        <p className="mb-4 leading-relaxed text-gray-600">
          A short list of where agents deliver fast, measurable wins:
        </p>
        <Bullets
          items={[
            "Customer & Citizen Support — instant, accurate responses at any hour, in any volume",
            "Lead Generation & Outreach — qualify, nurture, and follow up automatically",
            "Data Entry & Processing — eliminate manual keying and the errors that come with it",
            "Appointment & Schedule Management — booking, reminders, and rescheduling, handled",
            "Analytics & Reporting — turn raw data into clear reports on demand",
            "Document & Records Handling — sort, summarize, extract, and file at scale",
            "E-commerce & Order Automation — from inquiry to fulfillment, streamlined",
            "And much more — if it's repetitive and rule-based, it can likely be automated",
          ]}
        />
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">Built for business</h2>
        <p className="mb-4 leading-relaxed text-gray-600">
          Whether you&apos;re a growing company or an established enterprise, AI agents let you scale
          output without scaling headcount.
        </p>
        <Bullets
          items={[
            "Small & growing businesses: punch above your weight. Deliver enterprise-level responsiveness without enterprise-level staffing.",
            "Established enterprises: standardize operations, reduce overhead, and free senior talent from low-value tasks.",
            "Service & professional firms: cut admin time, respond to clients faster, and bill more of your hours to real work.",
            "Retail & e-commerce: automate support, orders, and follow-ups so growth doesn't break your operations.",
          ]}
        />
        <p className="mt-4 leading-relaxed text-gray-600">
          The result: lower costs, faster service, fewer errors, and a team focused on what actually
          moves the business forward.
        </p>
        <div className="mt-6">
          <Link to="/contact" className={PRIMARY_BTN}>
            Book a Business Consultation
          </Link>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
          Built for government & public sector
        </h2>
        <p className="mb-4 leading-relaxed text-gray-600">
          Public-sector organizations carry a unique mandate: serve more people, more efficiently,
          with full accountability — often under tight budgets. Agentic AI is one of the most
          powerful tools available to meet that mandate. We help government agencies and public
          institutions modernize responsibly.
        </p>
        <Bullets
          items={[
            "Better citizen services — provide instant, consistent answers across every channel, reducing wait times and call-center load.",
            "Faster processing — automate applications, permits, records requests, and routine paperwork that currently create backlogs.",
            "Lower operating costs — stretch public funds further by reducing manual administrative burden.",
            "Consistency & fairness — agents apply the same rules the same way every time, supporting transparent and equitable service.",
            "Workforce empowerment — free public servants from repetitive tasks so they can focus on complex, human-centered cases.",
          ]}
        />
        <h3 className="mb-3 mt-6 text-xl font-semibold text-gray-800">
          We take public-sector concerns seriously
        </h3>
        <Bullets
          items={[
            "Security & data protection — solutions designed with confidentiality and data governance front of mind.",
            "Human oversight — agents operate within defined boundaries, with people in control of sensitive decisions.",
            "Accountability & auditability — clear records of what was done and why, supporting transparency requirements.",
            "Responsible, phased adoption — we start with low-risk, high-value pilots so you can prove results before scaling.",
          ]}
        />
        {/* TODO: Government buyers value trust signals. When available, add a line here
            referencing relevant compliance standards, certifications, or completed
            public-sector engagements. */}
        <div className="mt-6">
          <Link to="/contact" className={PRIMARY_BTN}>
            Request a Public-Sector Briefing
          </Link>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
          We train your team on leading AI tools
        </h2>
        <p className="mb-4 leading-relaxed text-gray-600">
          Our training keeps your organization fluent in the tools that matter, including{" "}
          <strong className="text-gray-800">
            Claude (by Anthropic), Microsoft Copilot 365, Perplexity, DeepSeek
          </strong>{" "}
          — and more.
        </p>
        <p className="leading-relaxed text-gray-600">
          We&apos;re tool-agnostic. We recommend and train on what genuinely fits your needs, budget,
          and security requirements — not what&apos;s trendy.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">How we work</h2>
        <p className="mb-4 leading-relaxed text-gray-600">
          A clear, low-risk path from &quot;interested&quot; to &quot;in production.&quot;
        </p>
        <ol className="space-y-3">
          {[
            ["Discover", "A free consultation to understand your goals, challenges, and current operations."],
            ["Audit", "We map your processes and identify where AI will deliver the strongest return."],
            ["Build", "We develop and deploy custom agents that integrate with your existing systems."],
            ["Train", "We equip your team to work confidently alongside the new tools."],
            ["Support", "We provide ongoing guidance, optimization, and expansion as you grow."],
          ].map(([step, body], i) => (
            <li key={step} className="flex items-start text-gray-600">
              <span className="mr-3 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                {i + 1}
              </span>
              <span>
                <strong className="text-gray-800">{step}</strong> — {body}
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-4 leading-relaxed text-gray-600">
          You&apos;re never left to figure it out alone.
        </p>
      </section>

      <section className="mt-8">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">Why work with us</h2>
        <Bullets
          items={[
            "We focus on outcomes, not gadgets. Every solution is tied to a real result — saved time, lower cost, better service.",
            "We're practical and honest. If AI isn't the right fit for a task, we'll tell you. Our audits are built to find genuine value.",
            "We handle the whole journey. Strategy, build, and training under one roof — so nothing falls through the cracks.",
            "We make AI accessible. No jargon, no overwhelm. We translate powerful technology into plain business value.",
          ]}
        />
        <p className="mt-4 font-semibold text-primary">Technology · Agility · Growth</p>
      </section>

      <ServiceCTA />

      <p className="mt-6 text-center text-gray-600">
        Prefer to start with a roadmap?{" "}
        <Link to="/contact" className="text-primary hover:underline">
          Request an AI audit
        </Link>{" "}
        and we&apos;ll identify exactly where AI can save you time and money.
      </p>

      <OtherServices currentPath={PATH} />
    </ServicePageLayout>
  );
}
