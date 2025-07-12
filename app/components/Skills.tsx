import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const ProgressBar = ({ skill, percentage, delay = 0 }: { skill: string; percentage: number; delay?: number }) => {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setWidth(percentage);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isInView, percentage, delay]);

  return (
    <div className="mb-6" ref={ref}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-700 font-semibold">{skill}</span>
        <span className="text-gray-600 font-bold">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary to-primary-hover rounded-full relative"
          initial={{ width: 0 }}
          animate={{ width: isInView ? `${width}%` : 0 }}
          transition={{ duration: 1.5, delay: delay / 1000, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-white bg-opacity-30 animate-pulse"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const skillsLeft = [
    { name: "HTML", percentage: 100 },
    { name: "CSS", percentage: 90 },
    { name: "JavaScript", percentage: 95 },
  ];

  const skillsRight = [
    { name: "Python", percentage: 90 },
    { name: "SQL", percentage: 90 },
    { name: "Dart", percentage: 90 },
    { name: "Photoshop", percentage: 55 },
    { name: "Figma", percentage: 95 },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section id="skills" className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Skills</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <motion.div
          className="grid lg:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants}>
            {skillsLeft.map((skill, index) => (
              <ProgressBar
                key={skill.name}
                skill={skill.name}
                percentage={skill.percentage}
                delay={index * 200}
              />
            ))}
          </motion.div>

          <motion.div 
            variants={itemVariants}
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            {skillsRight.map((skill, index) => (
              <ProgressBar
                key={skill.name}
                skill={skill.name}
                percentage={skill.percentage}
                delay={(index + skillsLeft.length) * 200}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* Additional Skills Badges */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <h3 className="text-2xl font-semibold text-gray-800 mb-8">Technologies & Frameworks</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "React", "Next.js", "Node.js", "Express", "MongoDB", "PostgreSQL", 
              "Django", "Flask", "Angular", "Vue.js", "TypeScript", "GraphQL",
              "Docker", "AWS", "Git", "Redux", "Tailwind CSS", "Bootstrap"
            ].map((tech, index) => (
              <motion.span
                key={tech}
                className="bg-gradient-to-r from-primary to-primary-hover text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg"
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ delay: 1.2 + index * 0.05, duration: 0.3 }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}