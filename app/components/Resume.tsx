import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

export default function Resume() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const education = [
    {
      title: "Improving Deep Neural Networks: Hyperparameter Tuning, Regularization and Optimization",
      description: [
        "Understand industry best-practices for building deep learning applications.",
        "Be able to effectively use the common neural network tricks, including initialization, L2 and dropout regularization, Batch normalization, gradient checking.",
        "Be able to implement and apply a variety of optimization algorithms, such as mini-batch gradient descent, Momentum, RMSprop and Adam, and check for their convergence.",
        "Understand new best-practices for the deep learning era of how to set up train/dev/test sets and analyze bias/variance.",
        "Be able to implement a neural network in TensorFlow."
      ]
    },
    {
      title: "AWS Fundamentals: Addressing Security Risk",
      description: [
        "Detective controls, including Amazon CloudTrail, AWS Security Hub, Amazon GuardDuty, and AWS Config.",
        "Encryption of data at rest, in motion, and best practices for how to store data within and between various AWS services.",
        "The AWS Well-Architected Framework and protecting compute resources such as Amazon EC2 and AWS Lambda."
      ]
    }
  ];

  const experience = [
    {
      title: "Neural Networks and Deep Learning",
      description: [
        "Understand the major technology trends driving Deep Learning",
        "Be able to build, train and apply fully connected deep neural networks",
        "Know how to implement efficient (vectorized) neural networks",
        "Understand the key parameters in a neural network's architecture"
      ]
    },
    {
      title: "AWS Fundamentals: Migrating to the Cloud",
      description: []
    },
    {
      title: "AWS Fundamentals: Building Serverless Applications",
      description: [
        "AWS serverless framework and architecture in the context of a real business problem",
        "Provide AWS Lambda, Amazon API Gateway, Amazon DynamoDB, Amazon Lex, and other services needed to deploy serverless solutions."
      ]
    },
    {
      title: "Sequence Models",
      subsections: [
        {
          subtitle: "Recurrent Neural Networks",
          content: "Recurrent Neural Networks and commonly-used variants such as GRUs and LSTMs; apply RNNs to Character-level Language Modeling; gain experience with natural language processing and Word Embeddings; and use HuggingFace tokenizers and transformer models to solve different NLP tasks such as NER and Question Answering."
        },
        {
          subtitle: "Natural Language Processing & Word Embeddings",
          content: "Natural language processing with deep learning is an important combination. Using word vector representations and embedding layers you can train recurrent neural networks with outstanding performances in a wide variety of industries. Examples of applications are sentiment analysis, named entity recognition and machine translation."
        },
        {
          subtitle: "Sequence Models",
          content: "Sequence models can be augmented using an attention mechanism. This algorithm will help your model understand where it should focus its attention given a sequence of inputs. This week, you will also learn about speech recognition and how to deal with audio data."
        }
      ]
    }
  ];



  return (
    <section id="resume" className="py-20 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Resume</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Education Column */}
          <motion.div 
            className="w-full"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-3xl font-semibold text-gray-800 mb-8">Education</h3>
            <div className="space-y-8">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-primary w-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: !isMobile ? 1.02 : 1, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                >
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">{edu.title}</h4>
                  <ul className="space-y-2">
                    {edu.description.map((item, i) => (
                      <li key={i} className="text-gray-600 flex items-start">
                        <span className="text-primary mr-2 mt-1">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Experience Column */}
          <motion.div 
            className="w-full"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-3xl font-semibold text-gray-800 mb-8">Professional Experience</h3>
            <div className="space-y-8">
              {experience.map((exp, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-lg p-6 shadow-lg border-l-4 border-primary w-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: !isMobile ? 1.02 : 1, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                >
                  <h4 className="text-xl font-semibold text-gray-800 mb-4">{exp.title}</h4>
                  
                  {exp.description && exp.description.length > 0 && (
                    <ul className="space-y-2 mb-4">
                      {exp.description.map((item, i) => (
                        <li key={i} className="text-gray-600 flex items-start">
                          <span className="text-primary mr-2 mt-1">•</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  {exp.subsections && (
                    <div className="space-y-4">
                      {exp.subsections.map((sub, i) => (
                        <div key={i} className="border-l-2 border-gray-200 pl-4">
                          <h5 className="font-semibold text-gray-700 mb-2">{sub.subtitle}</h5>
                          <p className="text-gray-600 text-sm">{sub.content}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}