

export default function Resume() {

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
    <section id="resume" className="py-12 xs:py-16 sm:py-20 bg-gray-50">
      <div className="container mx-auto px-3 xs:px-4">
        <div className="text-center mb-12 xs:mb-14 sm:mb-16">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4">Resume</h2>
          <div className="w-16 xs:w-18 sm:w-20 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xs:gap-10 sm:gap-12">
          {/* Education Column */}
          <div className="w-full">
            <h3 className="text-xl xs:text-2xl sm:text-3xl font-semibold text-gray-800 mb-6 xs:mb-7 sm:mb-8">Education</h3>
            <div className="space-y-6 xs:space-y-7 sm:space-y-8">
              {education.map((edu, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-4 xs:p-5 sm:p-6 shadow-lg border-l-4 border-primary w-full"
                >
                  <h4 className="text-lg xs:text-xl font-semibold text-gray-800 mb-3 xs:mb-4">{edu.title}</h4>
                  <ul className="space-y-2">
                    {edu.description.map((item, i) => (
                      <li key={i} className="text-gray-600 flex items-start text-sm xs:text-base">
                        <span className="text-primary mr-2 mt-1 flex-shrink-0">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Column */}
          <div className="w-full">
            <h3 className="text-xl xs:text-2xl sm:text-3xl font-semibold text-gray-800 mb-6 xs:mb-7 sm:mb-8">Professional Experience</h3>
            <div className="space-y-6 xs:space-y-7 sm:space-y-8">
              {experience.map((exp, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-4 xs:p-5 sm:p-6 shadow-lg border-l-4 border-primary w-full"
                >
                  <h4 className="text-lg xs:text-xl font-semibold text-gray-800 mb-3 xs:mb-4">{exp.title}</h4>
                  
                  {exp.description && exp.description.length > 0 && (
                    <ul className="space-y-2 mb-4">
                      {exp.description.map((item, i) => (
                        <li key={i} className="text-gray-600 flex items-start text-sm xs:text-base">
                          <span className="text-primary mr-2 mt-1 flex-shrink-0">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {exp.subsections && (
                    <div className="space-y-3 xs:space-y-4">
                      {exp.subsections.map((sub, i) => (
                        <div key={i} className="border-l-2 border-gray-200 pl-3 xs:pl-4">
                          <h5 className="font-semibold text-gray-700 mb-2 text-sm xs:text-base">{sub.subtitle}</h5>
                          <p className="text-gray-600 text-xs xs:text-sm leading-relaxed">{sub.content}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}