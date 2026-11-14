import { Link } from "@remix-run/react";
import { CALENDLY_URL } from "~/config/contact";
import { SERVICE_PAGES } from "~/config/services";
import { portfolioProjectPath, portfolioProjects } from "~/data/portfolioProjects";

/**
 * Below-the-fold homepage content: what I do, proof of work, how an engagement
 * runs, and a closing call to action. Everything renders visible on the server
 * (no opacity-0 entrance animations) so crawlers and slow devices see it as-is,
 * and every card links to an indexable page for internal-link equity.
 */

const FEATURED_COUNT = 3;

const PROCESS_STEPS = [
  {
    title: "Free discovery call",
    body: "We talk through your goals, your customers, and what success looks like for the project.",
  },
  {
    title: "Plan & quote",
    body: "You get a clear scope, timeline, and price before any work begins, with no surprises later.",
  },
  {
    title: "Build in iterations",
    body: "I share progress regularly so you can review, give feedback, and steer as the build takes shape.",
  },
  {
    title: "Launch & support",
    body: "I handle the launch and stay on hand for updates, fixes, and new features as you grow.",
  },
];

function ArrowIcon() {
  return (
    <svg
      className="h-4 w-4 transition-transform group-hover:translate-x-1"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

export default function HomeSections() {
  const featured = portfolioProjects.slice(0, FEATURED_COUNT);

  return (
    <>
      {/* ---------- services ---------- */}
      <section id="services" className="bg-white px-4 py-16 md:py-24" aria-labelledby="home-services">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-10 max-w-3xl text-center md:mb-12">
            <h2
              id="home-services"
              className="mb-4 font-raleway text-3xl font-bold text-gray-800 sm:text-4xl"
            >
              Web, mobile &amp; AI development for businesses in Guyana
            </h2>
            <div className="mx-auto mb-5 h-1 w-20 bg-primary" />
            <p className="text-base leading-relaxed text-gray-600 md:text-lg">
              From a first website to a custom platform or an AI agent that automates your
              operations, I build software that helps businesses in Georgetown and beyond win
              customers and save time.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICE_PAGES.map((service) => (
              <Link
                key={service.path}
                to={service.path}
                className="group flex flex-col rounded-xl border border-gray-200 bg-gray-50 p-6 transition-colors hover:border-primary hover:bg-white"
              >
                <h3 className="mb-2 text-lg font-semibold text-gray-800 group-hover:text-primary">
                  {service.cardTitle}
                </h3>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-600">
                  {service.summary}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Learn more
                  <ArrowIcon />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- featured work ---------- */}
      <section className="bg-gray-50 px-4 py-16 md:py-24" aria-labelledby="home-work">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-10 max-w-3xl text-center md:mb-12">
            <h2
              id="home-work"
              className="mb-4 font-raleway text-3xl font-bold text-gray-800 sm:text-4xl"
            >
              Featured work
            </h2>
            <div className="mx-auto mb-5 h-1 w-20 bg-primary" />
            <p className="text-base leading-relaxed text-gray-600 md:text-lg">
              Live websites and web apps I&apos;ve designed and built for businesses in Guyana and
              the Caribbean.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((project) => (
              <Link
                key={project.id}
                to={portfolioProjectPath(project)}
                className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-xl"
              >
                {project.banner ? (
                  <div className="aspect-video w-full overflow-hidden border-b border-gray-200 bg-gray-200">
                    <picture>
                      <source
                        type="image/webp"
                        srcSet={project.banner.srcSet}
                        sizes={project.banner.sizes}
                      />
                      <img
                        src={project.banner.src}
                        alt={`${project.name} website preview`}
                        width={project.banner.width}
                        height={project.banner.height}
                        className="h-full w-full object-cover object-top"
                        loading="lazy"
                        decoding="async"
                      />
                    </picture>
                  </div>
                ) : (
                  <div
                    className={`flex h-28 items-center justify-center border-b border-gray-200 p-4 ${
                      project.logoDarkBg ? "bg-gray-900" : "bg-white"
                    }`}
                  >
                    <img
                      src={project.logo}
                      alt={`${project.name} logo`}
                      className="max-h-full max-w-full object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="mb-2 text-lg font-semibold text-gray-800 group-hover:text-primary">
                    {project.name}
                  </h3>
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-600">
                    {project.detail.tagline}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
                    View project
                    <ArrowIcon />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/portfolio"
              className="inline-block rounded-full border border-primary px-8 py-3 font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
            >
              See all projects
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- process ---------- */}
      <section className="bg-white px-4 py-16 md:py-24" aria-labelledby="home-process">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-10 max-w-3xl text-center md:mb-12">
            <h2
              id="home-process"
              className="mb-4 font-raleway text-3xl font-bold text-gray-800 sm:text-4xl"
            >
              How I work
            </h2>
            <div className="mx-auto mb-5 h-1 w-20 bg-primary" />
            <p className="text-base leading-relaxed text-gray-600 md:text-lg">
              A simple, transparent process. You work directly with the developer building your
              project, from the first conversation to launch day and after.
            </p>
          </div>

          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((step, index) => (
              <li key={step.title} className="rounded-xl bg-gray-50 p-6">
                <span className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <h3 className="mb-2 text-lg font-semibold text-gray-800">{step.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- closing CTA ---------- */}
      <section className="bg-dark px-4 py-16 text-center md:py-20" aria-labelledby="home-cta">
        <div className="mx-auto max-w-3xl">
          <h2 id="home-cta" className="mb-4 font-raleway text-3xl font-bold text-white sm:text-4xl">
            Have a project in mind?
          </h2>
          <p className="mb-8 text-base leading-relaxed text-gray-300 md:text-lg">
            Book a free consultation to talk through your idea. You&apos;ll come away with clear
            next steps, whether or not we end up working together.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-primary px-8 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-primary-hover"
            >
              Book a Meeting
            </a>
            <Link
              to="/contact"
              className="inline-block rounded-full border border-white/30 px-8 py-3 font-semibold text-white transition-colors hover:border-white/60 hover:bg-white/10"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
