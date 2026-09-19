export interface PortfolioBanner {
  /** JPEG fallback / default src */
  src: string;
  /** Responsive WebP srcset */
  srcSet: string;
  sizes: string;
  width: number;
  height: number;
}

/** A single "what I built" entry on a project detail page. */
export interface PortfolioHighlight {
  title: string;
  body: string;
}

/** Long-form case-study content rendered at /portfolio/<id>. */
export interface PortfolioProjectDetail {
  /** One-line positioning statement shown under the page H1. */
  tagline: string;
  /** Project type shown in the "Project info" panel, e.g. "E-commerce". */
  category: string;
  /** Overview paragraphs describing what the project is. */
  overview: string[];
  /** Feature breakdown — what the build includes. */
  highlights: PortfolioHighlight[];
  /** Technology tags rendered as chips. */
  stack: string[];
  /**
   * The brief: the problem this project set out to solve. Intentionally left
   * unset — this is engagement context that the live site can't tell you, so
   * write it from what you know of the job. When unset the section is omitted.
   */
  brief?: string;
  /**
   * Facts only you know. Fill one in and its row appears in the "Project info"
   * panel; leave it unset and the row is simply omitted.
   */
  client?: string;
  year?: string;
  role?: string;
}

export interface PortfolioProject {
  /** Unique id. Doubles as the /portfolio/<id> URL slug and the JSON-LD @id anchor. */
  id: string;
  name: string;
  description: string;
  url: string;
  logo: string;
  banner?: PortfolioBanner;
  logoDarkBg?: boolean;
  detail: PortfolioProjectDetail;
}

const BANNER_SIZES = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

function optimizedBanner(slug: string, width = 800, height = 450): PortfolioBanner {
  const base = `/img/portfolio/banner/optimized/${slug}`;
  return {
    src: `${base}-800.jpg`,
    srcSet: `${base}-480.webp 480w, ${base}-800.webp 800w, ${base}-1200.webp 1200w`,
    sizes: BANNER_SIZES,
    width,
    height,
  };
}

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "inneralchemyinstitution",
    name: "Inner Alchemy Institution",
    description:
      "Transformational life coaching and BQH/QHHT® hypnotherapy practice led by Hadassah Headley — coaching programs across life, money, business, relationships and spirit, with online sessions and free discovery calls.",
    url: "https://www.inneralchemyinstitution.com/",
    logo: "/img/portfolio/inneralchemy-logo.png",
    banner: optimizedBanner("inneralchemy"),
    detail: {
      tagline:
        "A coaching and hypnotherapy practice site built around programme discovery and booking.",
      category: "Coaching & wellness website",
      overview: [
        "Inner Alchemy Institution is the practice of transformational life coach and hypnotherapy practitioner Hadassah Headley, working with clients online and in person in Georgetown, Guyana. The site had to carry a personal, editorial brand while still doing the practical job of explaining a fairly involved service menu and getting visitors onto a discovery call.",
        "The build presents two distinct offerings side by side — five coaching mastery tracks and a set of hypnotherapy programmes — each with its own page, so a visitor can tell quickly which one applies to them. Session formats, durations and prices are published up front rather than hidden behind an enquiry form.",
      ],
      highlights: [
        {
          title: "Programme catalogue",
          body: "Five coaching mastery tracks — life, money, business, relationships and spiritual — each with a dedicated page explaining the approach and who it suits.",
        },
        {
          title: "Hypnotherapy session pages",
          body: "BQH, QHHT® and a combined offering, each published with its real duration, format and price so visitors self-qualify before they book.",
        },
        {
          title: "Discovery-call booking",
          body: "A free 15-minute call is the primary call to action, repeated at the decision points down the page rather than only in the nav.",
        },
        {
          title: "Editorial brand design",
          body: "A warm, serif-led identity with a portrait-driven hero, built to read as a personal practice rather than a clinic.",
        },
        {
          title: "FAQ and practitioner story",
          body: "Long-form answers and an origin story that do the trust-building work a coaching purchase needs.",
        },
      ],
      stack: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    },
  },
  // {
  //   id: "cmeqbank",
  //   name: "cmeqbank.com",
  //   description:
  //     "Medical board and exit exam prep platform with practice questions, timed mock exams, AI-graded OSCE stations, and an AI tutor that answers from the course materials — across CAMC, USMLE, PLAB, NCLEX and MBBS question banks.",
  //   url: "https://www.cmeqbank.com/",
  //   logo: "/img/portfolio/cmeqbank-logo.jpg",
  //   banner: optimizedBanner("cmeqbank"),
  //   detail: {
  //     tagline:
  //       "A subscription exam-prep platform for medical students, with AI marking and a source-citing tutor.",
  //     category: "Web application",
  //     overview: [
  //       "cmeqbank.com prepares medical students for board and exit examinations across the CAMC, USMLE, PLAB, NCLEX and MBBS syllabuses. It is the largest build in this portfolio: a full subscription product with question banks, exam sittings, analytics and two separate AI features, rather than a marketing site.",
  //       "The hard problems here were integrity and trust. Exam timing runs on the server so that refreshing or closing a laptop can neither buy extra time nor lose an answer, and the AI tutor answers only from curated course materials — citing the file and page it used, and saying so when a topic isn't covered instead of guessing.",
  //     ],
  //     highlights: [
  //       {
  //         title: "Build any test",
  //         body: "Students choose subjects, question count, difficulty and time limit — from a ten-question drill on one topic to a full paper across every subject.",
  //       },
  //       {
  //         title: "Server-timed mock exams",
  //         body: "The clock runs server-side under real exam conditions, so refreshing or closing the browser neither extends the sitting nor discards answers.",
  //       },
  //       {
  //         title: "Tutor mode",
  //         body: "Untimed practice that grades each question on answer and shows the explanation immediately, so students learn during the paper rather than after it.",
  //       },
  //       {
  //         title: "AI tutor with citations",
  //         body: "Answers are drawn from curated course materials and cite the source file and page, with an explicit 'not covered' response instead of a guess.",
  //       },
  //       {
  //         title: "AI-graded OSCE stations",
  //         body: "Free-text station answers are marked against the model answer in seconds, then the model answer is shown for comparison.",
  //       },
  //       {
  //         title: "Per-subject analytics",
  //         body: "Performance broken down by subject so students can see exactly where to spend revision time.",
  //       },
  //     ],
  //     stack: [
  //       "Next.js",
  //       "React",
  //       "Tailwind CSS",
  //       "AI / LLM integration",
  //       "Subscription billing",
  //       "Vercel",
  //     ],
  //   },
  // },
  {
    id: "waronretailguyana",
    name: "War On Retail Guyana",
    description:
      "Guyana's trusted electronics and home-appliance store. Authentic products with manufacturer warranties, nationwide delivery, and real human support on every order.",
    url: "https://www.waronretailguyana.com/",
    logo: "/img/portfolio/waronretailguyana-logo.png",
    banner: optimizedBanner("waronretail"),
    detail: {
      tagline:
        "A full product catalogue for a Georgetown discount retailer, priced in GYD and sold over WhatsApp.",
      category: "E-commerce",
      overview: [
        "War On Retail Guyana is a locally owned discount home-goods retailer selling furniture, appliances, electronics and construction finishing products at wholesale prices in retail quantities. The site moves that inventory online for customers across Guyana who can't get to the Georgetown store.",
        "It is built around how people actually buy here: prices are quoted in Guyanese dollars including per-size variants, and the path to purchase ends in a WhatsApp conversation with the team rather than a card checkout — matching local buying habits instead of fighting them.",
      ],
      highlights: [
        {
          title: "Category browsing",
          body: "Thirteen departments from furniture and electronics through to hardware tools and personal care, so a broad catalogue stays navigable.",
        },
        {
          title: "Product pages priced in GYD",
          body: "Real local pricing down to the variant — mattress sizes and bed frame-versus-mattress options each carry their own price.",
        },
        {
          title: "WhatsApp as the checkout",
          body: "Enquiries hand off to the team on WhatsApp, matching how customers in Guyana prefer to buy big-ticket items.",
        },
        {
          title: "Delivery promises up front",
          body: "Same-day delivery in Georgetown and two to five days nationwide, stated on the page rather than discovered at the end.",
        },
        {
          title: "Authenticity and warranty messaging",
          body: "Sourcing direct from manufacturers and authorised dealers, with manufacturer warranties — the core trust argument for electronics buyers.",
        },
      ],
      stack: ["Next.js", "React", "Tailwind CSS", "Supabase", "WhatsApp Business", "Vercel"],
    },
  },
  {
    id: "mistaconciergetravel",
    name: "Mista Concierge Travel",
    description:
      "Specialty Caribbean and Latin America travel provider offering solo, private, and guided vacations with full concierge-level service across 15+ islands.",
    url: "https://www.mistaconciergetravel.com/",
    logo: "/img/portfolio/mc-logo.png",
    banner: optimizedBanner("mista"),
    detail: {
      tagline:
        "A luxury tour operator's shopfront, built to sell packaged Caribbean and Latin America journeys.",
      category: "Travel & booking",
      overview: [
        "Mista Concierge Travel is a specialty travel and leisure provider running solo, private and guided vacations across the Caribbean and Latin America with concierge-level service. The site's job is to make a high-consideration purchase feel safe: these are multi-thousand-dollar trips bought largely on trust.",
        "The build leans on packaged inventory and destination storytelling. Featured tours carry real durations and inclusions, destination pages sell the place before the package, and social proof sits close to the booking prompts.",
      ],
      highlights: [
        {
          title: "Featured tour packages",
          body: "All-inclusive journeys — Punta Cana, Panama and Dominican Republic among them — with night counts, departure patterns and seasonal pricing.",
        },
        {
          title: "Destination guides",
          body: "Editorial pages for each destination that sell the place first, with the packages that serve it alongside.",
        },
        {
          title: "Trust pillars",
          body: "Local expertise, genuine luxury, personalisation and safety, each argued specifically rather than as a generic badge row.",
        },
        {
          title: "Traveller testimonials",
          body: "Named reviews placed near booking prompts, where the hesitation on a large purchase actually happens.",
        },
        {
          title: "Direct enquiry over WhatsApp",
          body: "A booking conversation with the team, which suits itineraries that get customised before they're confirmed.",
        },
      ],
      stack: ["Next.js", "React", "Tailwind CSS", "WhatsApp Business", "Vercel"],
    },
  },
  {
    id: "impact-business-solutions",
    name: "Impact Business Solutions",
    description:
      "Since 2021, Impact Business Solutions has been empowering businesses to grow both online and offline through innovative marketing and business development strategies. We are a boutique marketing and business development agency, dedicated to fueling business growth through innovation and excellence.",
    url: "https://www.impact-business-solutions.com/",
    logo: "/img/portfolio/impact-business-solutions-logo.png",
    banner: optimizedBanner("impact"),
    logoDarkBg: true,
    detail: {
      tagline:
        "A credibility-first site for a boutique marketing and business development agency.",
      category: "Agency website",
      overview: [
        "Impact Business Solutions is a boutique marketing and business development agency operating in Guyana since 2021, working across administrative support, business development, digital marketing, social media management, graphic design, event management and strategic consulting.",
        "An agency site sells the agency itself, so this build puts proof before persuasion: results, named client testimonials and the client roster all appear before the service detail, because a prospective client decides on evidence rather than on a services list.",
      ],
      highlights: [
        {
          title: "Seven service lines",
          body: "From administrative support and business development through to graphic design and event management, each explained on its own terms.",
        },
        {
          title: "Results section",
          body: "Headline metrics placed early, so the numbers do the qualifying work before a visitor reads any copy.",
        },
        {
          title: "Client testimonials",
          body: "Named quotes describing specific outcomes rather than generic praise.",
        },
        {
          title: "Client roster",
          body: "A logo wall establishing that established local businesses already trust the agency.",
        },
        {
          title: "Dark editorial design",
          body: "A deep-navy identity that reads as premium and separates the agency from template-built competitors.",
        },
      ],
      stack: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    },
  },
  {
    id: "healthyzway",
    name: "Healthyzway",
    description:
      "Proudly Guyanese-Owned 🇬🇾 Premium SeaMoss Gel - Nature's 92 minerals for your complete wellness",
    url: "https://healthyzway.vercel.app/",
    logo: "/img/portfolio/healthyzway-logo.png",
    banner: optimizedBanner("healthyzway"),
    detail: {
      tagline:
        "A direct-to-consumer storefront for a Guyanese sea moss brand, built to educate before it sells.",
      category: "E-commerce",
      overview: [
        "Healthyzway is a Guyanese-owned wellness brand selling premium sea moss gel in five flavours. Sea moss is a product most buyers need explaining before they'll try it, so the site is structured to teach first and sell second.",
        "Benefit sections are broken out by what the customer actually cares about — skin and hair, energy and immunity, respiratory, joint — and each is tied to the specific property responsible. Usage guidance and shelf life are stated plainly, which heads off the questions that otherwise arrive as messages.",
      ],
      highlights: [
        {
          title: "Five-flavour product collection",
          body: "Original Gold, apple and ginger, watermelon, dragonfruit and strawberry, each presented as its own product.",
        },
        {
          title: "Benefit-led education",
          body: "Health benefits grouped by concern and attributed to specific properties, rather than one undifferentiated claims list.",
        },
        {
          title: "Usage and storage guidance",
          body: "Dosage, serving suggestions and a stated refrigerated shelf life, answering the practical questions before checkout.",
        },
        {
          title: "Delivery and payment offers",
          body: "Free delivery over $5,000 and flexible payment options surfaced in the announcement bar where they influence the decision.",
        },
        {
          title: "Reviews and FAQ",
          body: "Customer results and a full FAQ section carrying the trust load for an unfamiliar product.",
        },
      ],
      stack: ["Next.js", "React", "Tailwind CSS", "Vercel"],
    },
  },
  {
    id: "selenafurniturestore",
    name: "Selena's Furniture Store Guyana",
    description:
      "Selena's Furniture Store Guyana is a furniture store that sells furniture for the home and office.",
    url: "https://selenafurniturestore.com/",
    logo: "/img/portfolio/selenafurniturestore-logo.jpg",
    banner: optimizedBanner("selena"),
    detail: {
      tagline:
        "A storefront for a West Bank Demerara furniture maker, built to be found by local search.",
      category: "E-commerce",
      overview: [
        "Selena's Furniture Store is a furniture maker and retailer in Lagrange, West Bank Demerara, selling handcrafted beds, sofas, storage and dining furniture to homes across Guyana.",
        "For a business whose customers travel to a physical showroom, being found locally matters more than any other function. The build is organised around that: room-by-room browsing for discovery, and location, opening hours and contact details treated as primary content rather than footer detail.",
      ],
      highlights: [
        {
          title: "Room-by-room catalogue",
          body: "Beds, sofas, storage and dining furniture organised the way customers shop for a home.",
        },
        {
          title: "Local search optimisation",
          body: "Page metadata and copy targeted at Lagrange and West Bank Demerara search terms, where this store's customers actually look.",
        },
        {
          title: "Showroom details up front",
          body: "Location and Monday-to-Friday opening hours presented as primary information for a business people visit in person.",
        },
        {
          title: "Handcrafted brand positioning",
          body: "Natural materials and craft framing, differentiating a maker from importers competing on price.",
        },
      ],
      stack: ["Next.js", "React", "Vercel"],
    },
  },
  {
    id: "bucketlistcaribbean",
    name: "Bucketlist Caribbean",
    description:
      "Guyanese travel company specializing in Caribbean tours and vacations — curated getaways, all-inclusive packages, and island journeys across the region.",
    url: "https://www.bucketlistcaribbean.com/",
    logo: "/img/portfolio/bucketlistcaribbean-logo.png",
    banner: optimizedBanner("bucketlistcaribbean"),
    detail: {
      tagline:
        "A Guyanese travel brand's booking site for curated Caribbean getaways.",
      category: "Travel & booking",
      overview: [
        "Bucketlist Caribbean is a Guyanese travel company specialising in Caribbean tours and vacations, helping travellers across Guyana and the wider region plan island getaways and all-inclusive packages.",
        "It shares its tour-booking foundation with Mista Concierge Travel — the same packaged inventory, destination guides and enquiry flow — presented under a distinct brand aimed squarely at the Guyanese market.",
      ],
      highlights: [
        {
          title: "Curated tour packages",
          body: "All-inclusive getaways across Punta Cana, Panama and the Dominican Republic, with durations, departure patterns and seasonal pricing.",
        },
        {
          title: "Destination guides",
          body: "Editorial pages for each island and country, selling the destination before the package that serves it.",
        },
        {
          title: "Trust pillars",
          body: "Local expertise, genuine luxury, personalised itineraries and traveller protection, each argued rather than asserted.",
        },
        {
          title: "Traveller reviews",
          body: "Social proof positioned next to booking prompts, where a large purchase decision actually stalls.",
        },
        {
          title: "Direct enquiry flow",
          body: "A conversation with the team over WhatsApp, suited to itineraries customised before confirmation.",
        },
      ],
      stack: ["Next.js", "React", "Tailwind CSS", "WhatsApp Business", "Vercel"],
    },
  },
];

export const portfolioProjectNames = portfolioProjects.map((project) => project.name);

/** Path to a project's detail page. */
export function portfolioProjectPath(project: Pick<PortfolioProject, "id">) {
  return `/portfolio/${project.id}`;
}

/** Looks up a project by its URL slug (its `id`). */
export function getPortfolioProject(slug: string | undefined) {
  if (!slug) return undefined;
  return portfolioProjects.find((project) => project.id === slug);
}

/** First-row images to preload on the dedicated portfolio page */
export const portfolioPriorityBanners = portfolioProjects
  .slice(0, 2)
  .map((project) => project.banner)
  .filter((banner): banner is PortfolioBanner => Boolean(banner));
