import { motion } from "framer-motion";
import { portfolioProjects } from "~/data/portfolioProjects";

const EAGER_COUNT = 2;

export default function Portfolio() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="portfolio" className="py-12 xs:py-16 sm:py-20 bg-white">
      <div className="container mx-auto px-3 xs:px-4">
        <div className="text-center mb-12 xs:mb-14 sm:mb-16">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Portfolio
          </h2>
          <div className="w-16 xs:w-18 sm:w-20 h-1 bg-primary mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm xs:text-base sm:text-lg">
            Check out my featured projects and web applications
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 xs:gap-5 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {portfolioProjects.map((project, index) => {
            const priority = index < EAGER_COUNT;

            return (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col relative cursor-pointer"
              >
                {/* Full-card tap target for mobile */}
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-10"
                  aria-label={`View ${project.name}`}
                />

                {/* Project Image */}
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
                        loading={priority ? "eager" : "lazy"}
                        decoding="async"
                        fetchPriority={priority ? "high" : "auto"}
                      />
                    </picture>
                  </div>
                ) : (
                  <div
                    className={`h-24 xs:h-28 flex items-center justify-center p-4 border-b border-gray-200 ${
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

                {/* Project Content */}
                <div className="p-5 xs:p-6 flex flex-col flex-1">
                  <h3 className="text-base xs:text-lg sm:text-xl font-semibold text-gray-800 mb-3 xs:mb-4 break-words">
                    {project.name}
                  </h3>

                  <p className="text-gray-600 text-xs xs:text-sm mb-4 flex-1">
                    {project.description}
                  </p>

                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-20 mt-auto inline-flex items-center justify-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors text-xs xs:text-sm font-medium"
                  >
                    <span>View</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
