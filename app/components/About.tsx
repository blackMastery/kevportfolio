import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { CALENDLY_URL } from "~/config/contact";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section id="about" className="py-20 bg-white" ref={ref} aria-label="About Kevon Cadogan">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">About</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="order-2 lg:order-1">
            <motion.img
              src="/img/kevon-cadogan-full-stack-developer.jpg"
              alt="Kevon Cadogan - Full-Stack Developer and AI Engineer, professional portrait"
              className="w-full max-w-md mx-auto rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
              loading="lazy"
              width="400"
              height="400"
            />
          </motion.div>

          <motion.div variants={itemVariants} className="order-1 lg:order-2">
            <h3 className="text-3xl font-semibold text-gray-800 mb-2">
              Full-Stack Developer
            </h3>
            <div className="text-gray-600 text-lg mb-8 leading-relaxed mt-4 space-y-4">
              <p>
                I am a passionate and detail-oriented{" "}
                <strong className="text-gray-800">Full-Stack Software Developer</strong> with over
                five years of experience designing and building modern web applications, mobile
                apps, and AI-powered solutions.
              </p>
              <p>
                My expertise spans frontend and backend development, working with technologies such
                as{" "}
                <strong className="text-gray-800">
                  React, Next.js, React Native, Angular, Node.js, Python, Django, PostgreSQL, MySQL,
                  and MongoDB
                </strong>
                .
              </p>
              <p>
                Beyond traditional software development, I specialize in building{" "}
                <strong className="text-gray-800">
                  AI-powered applications, intelligent AI agents, and agentic workflows
                </strong>{" "}
                that automate business processes, enhance productivity, and deliver smarter user
                experiences.
              </p>
              <p>
                With a strong foundation in agile project management, problem-solving, and scalable
                software architecture, I transform complex ideas into reliable, user-friendly
                digital solutions.
              </p>
              <p>
                Whether it's a business website, a custom web platform, a cross-platform mobile
                application, or an intelligent AI solution,{" "}
                <strong className="text-gray-800">
                  my goal is to deliver high-quality, innovative software that solves real-world
                  problems and helps businesses grow.
                </strong>
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-700">
                    <strong>Phone:</strong> +592 694 3827
                  </span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-gray-700">
                    <strong>City:</strong> Georgetown
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-700">
                    <strong>Contact:</strong>{" "}
                    <a
                      href={CALENDLY_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Book a meeting
                    </a>
                  </span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2h8zM10 6V4h4v2H10z" />
                  </svg>
                  <span className="text-gray-700">
                    <strong>Freelance:</strong> <span className="text-green-600">Available</span>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}