import { json } from "@remix-run/node";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, isRouteErrorResponse, useLoaderData, useRouteError } from "@remix-run/react";
import Header from "~/components/Header";
import Footer from "~/components/Footer";
import { buildPageMeta } from "~/components/SectionPageLayout";
import { CALENDLY_URL } from "~/config/contact";
import {
  getPortfolioProject,
  portfolioProjectPath,
  portfolioProjects,
  type PortfolioProject,
} from "~/data/portfolioProjects";
import { buildProjectJsonLd, projectImageUrl } from "~/utils/portfolioSeo";

/** How many other projects to cross-link at the foot of the page. */
const RELATED_COUNT = 3;

export const loader = ({ params }: LoaderFunctionArgs) => {
  const project = getPortfolioProject(params.slug);

  if (!project) {
    throw new Response("Not Found", { status: 404, statusText: "Project Not Found" });
  }

  const related = portfolioProjects
    .filter((candidate) => candidate.id !== project.id)
    .slice(0, RELATED_COUNT);

  return json({ project, related });
};

/** Page title and description, shared by `meta` and the JSON-LD graph. */
function seoCopy(project: PortfolioProject) {
  return {
    title: `${project.name} — Project by Kevon Cadogan | Portfolio`,
    description: `${project.detail.tagline} ${project.detail.overview[0]}`.slice(0, 300),
  };
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.project) {
    return [
      { title: "Project Not Found | Kevon Cadogan" },
      { name: "description", content: "The requested portfolio project could not be found." },
      { name: "robots", content: "noindex, follow" },
    ];
  }

  const { project } = data;
  const { title, description } = seoCopy(project);

  return buildPageMeta({
    title,
    description,
    path: portfolioProjectPath(project),
    keywords: [
      project.name,
      project.detail.category,
      ...project.detail.stack,
      "Kevon Cadogan",
      "web developer Guyana",
    ].join(", "),
    image: projectImageUrl(project),
    imageAlt: `${project.name} website built by Kevon Cadogan`,
  });
};

export default function PortfolioProjectPage() {
  const { project, related } = useLoaderData<typeof loader>();
  const { detail } = project;
  const { title, description } = seoCopy(project);

  const facts = [
    { label: "Category", value: detail.category },
    { label: "Client", value: detail.client },
    { label: "Year", value: detail.year },
    { label: "Role", value: detail.role },
  ].filter((fact): fact is { label: string; value: string } => Boolean(fact.value));

  return (
    <div className="relative min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildProjectJsonLd({ project, title, description })),
        }}
      />
      <Header />

      <main className="pt-16">
        {/* Hero */}
        <section className="bg-dark pb-24 pt-10 xs:pt-12">
          <div className="container mx-auto max-w-5xl px-3 xs:px-4">
            <nav aria-label="Breadcrumb" className="mb-6">
              <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-400 xs:text-sm">
                <li>
                  <Link to="/" className="transition-colors hover:text-primary">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link to="/portfolio" className="transition-colors hover:text-primary">
                    Portfolio
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-gray-300" aria-current="page">
                  {project.name}
                </li>
              </ol>
            </nav>

            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary xs:text-sm">
              {detail.category}
            </p>
            <h1 className="mb-4 font-raleway text-3xl font-bold text-white xs:text-4xl sm:text-5xl">
              {project.name}
            </h1>
            <p className="max-w-3xl text-base leading-relaxed text-gray-300 xs:text-lg">
              {detail.tagline}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover xs:text-base"
              >
                Visit the live site
                <ExternalLinkIcon />
              </a>
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-600 px-5 py-2.5 text-sm font-medium text-gray-200 transition-colors hover:border-primary hover:text-primary xs:text-base"
              >
                <span aria-hidden="true">&larr;</span>
                All projects
              </Link>
            </div>
          </div>
        </section>

        {/* Banner, pulled up over the hero */}
        {project.banner && (
          <div className="bg-white">
            <div className="container mx-auto max-w-5xl px-3 xs:px-4">
              {/* Deliberately not animated: this is the LCP element, so it must
                  paint without waiting on JS. */}
              <div className="-mt-16 overflow-hidden rounded-xl border border-gray-200 bg-gray-100 shadow-xl">
                <picture>
                  <source
                    type="image/webp"
                    srcSet={project.banner.srcSet}
                    sizes="(max-width: 1024px) 100vw, 1024px"
                  />
                  <img
                    src={project.banner.src}
                    alt={`${project.name} website preview`}
                    width={project.banner.width}
                    height={project.banner.height}
                    className="aspect-video w-full object-cover object-top"
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                  />
                </picture>
              </div>
            </div>
          </div>
        )}

        {/* Body */}
        <section className="bg-white pb-16 pt-10 xs:pt-12">
          <div className="container mx-auto max-w-5xl px-3 xs:px-4">
            <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
              {/* Main column */}
              <div className="lg:col-span-2">
                <h2 className="mb-3 font-raleway text-2xl font-bold text-gray-800 xs:text-3xl">
                  Overview
                </h2>
                <div className="mb-4 h-1 w-16 bg-primary" />
                {detail.overview.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="mb-4 text-sm leading-relaxed text-gray-600 xs:text-base"
                  >
                    {paragraph}
                  </p>
                ))}

                {detail.brief && (
                  <>
                    <h2 className="mb-3 mt-10 font-raleway text-2xl font-bold text-gray-800 xs:text-3xl">
                      The brief
                    </h2>
                    <div className="mb-4 h-1 w-16 bg-primary" />
                    <p className="text-sm leading-relaxed text-gray-600 xs:text-base">
                      {detail.brief}
                    </p>
                  </>
                )}

                <h2 className="mb-3 mt-10 font-raleway text-2xl font-bold text-gray-800 xs:text-3xl">
                  What I built
                </h2>
                <div className="mb-6 h-1 w-16 bg-primary" />
                <ul className="grid gap-4 sm:grid-cols-2">
                  {detail.highlights.map((highlight) => (
                    <li
                      key={highlight.title}
                      className="rounded-lg border border-gray-200 bg-gray-50 p-5 transition-colors hover:border-primary"
                    >
                      <h3 className="mb-2 text-base font-semibold text-gray-800">
                        {highlight.title}
                      </h3>
                      <p className="text-xs leading-relaxed text-gray-600 xs:text-sm">
                        {highlight.body}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-1">
                <div className="lg:sticky lg:top-24">
                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
                    <h2 className="mb-4 text-lg font-semibold text-gray-800">Project info</h2>
                    <dl className="space-y-3 text-sm">
                      {facts.map((fact) => (
                        <div
                          key={fact.label}
                          className="flex justify-between gap-4 border-b border-gray-200 pb-3 last:border-0 last:pb-0"
                        >
                          <dt className="shrink-0 text-gray-500">{fact.label}</dt>
                          <dd className="text-right font-medium text-gray-800">{fact.value}</dd>
                        </div>
                      ))}
                    </dl>

                    <h3 className="mb-3 mt-6 text-sm font-semibold text-gray-800">Built with</h3>
                    <ul className="flex flex-wrap gap-2">
                      {detail.stack.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>

                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
                    >
                      Visit the live site
                      <ExternalLinkIcon />
                    </a>
                  </div>

                  <div className="mt-6 rounded-xl bg-gradient-to-br from-primary to-primary-hover p-6 text-center text-white shadow-sm">
                    <h2 className="mb-2 text-lg font-semibold">Want something like this?</h2>
                    <p className="mb-4 text-sm text-white/90">
                      Book a free consultation and let&apos;s talk about your project.
                    </p>
                    <a
                      href={CALENDLY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-gray-100"
                    >
                      Book a Meeting
                    </a>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* Related projects */}
        <section className="bg-gray-50 py-12 xs:py-16">
          <div className="container mx-auto max-w-5xl px-3 xs:px-4">
            <h2 className="mb-6 font-raleway text-2xl font-bold text-gray-800 xs:text-3xl">
              More projects
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((other) => (
                <Link
                  key={other.id}
                  to={portfolioProjectPath(other)}
                  className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  {other.banner && (
                    <div className="aspect-video w-full overflow-hidden border-b border-gray-200 bg-gray-200">
                      <picture>
                        <source
                          type="image/webp"
                          srcSet={other.banner.srcSet}
                          sizes="(max-width: 640px) 100vw, 33vw"
                        />
                        <img
                          src={other.banner.src}
                          alt={`${other.name} website preview`}
                          width={other.banner.width}
                          height={other.banner.height}
                          className="h-full w-full object-cover object-top"
                          loading="lazy"
                          decoding="async"
                        />
                      </picture>
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="mb-1 text-base font-semibold text-gray-800 group-hover:text-primary">
                      {other.name}
                    </h3>
                    <p className="text-xs text-gray-600">{other.detail.tagline}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const isNotFound = isRouteErrorResponse(error) && error.status === 404;

  return (
    <div className="relative min-h-screen">
      <Header />
      <main className="flex min-h-screen flex-col bg-gray-50 pt-16">
        <section className="px-4 py-20">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="mb-4 font-raleway text-4xl font-bold text-gray-800">
              {isNotFound ? "Project Not Found" : "Something went wrong"}
            </h1>
            <p className="mb-8 text-gray-600">
              {isNotFound
                ? "That project doesn't exist — it may have been renamed. Browse the full portfolio instead."
                : "An unexpected error occurred while loading this project."}
            </p>
            <Link
              to="/portfolio"
              className="inline-block rounded-lg bg-primary px-6 py-3 text-white transition-colors hover:bg-primary-hover"
            >
              Back to portfolio
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
