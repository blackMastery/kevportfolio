import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface Project {
  id: string;
  name: string;
  description: string;
  url: string;
  thumbnail?: string;
}

const projects: Project[] = [
  {
    id: "impact-business-solutions",
    name: "Impact Business Solutions",
    description: "Since 2021, Impact Business Solutions has been empowering businesses to grow both online and offline through innovative marketing and business development strategies. We are a boutique marketing and business development agency, dedicated to fueling business growth through innovation and excellence.",
    url: "https://impact-business-solutions.vercel.app/"
  },
  {
    id: "synergy-auto-zone",
    name: "Synergy Auto Zone",
    description: "Our mission is to simplify the car-buying process by providing transparent pricing, exceptional customer service, and a seamless purchasing experience. Whether you're seeking a luxury vehicle, an eco-friendly option, or something unique, Synergy Auto Zone is here to help you find the perfect vehicle.",
    url: "https://synergyautozone.vercel.app/"
  },
  {
    id: "healthyzway",
    name: "Healthyzway",
    description: "Proudly Guyanese-Owned 🇬🇾 Premium SeaMoss Gel - Nature's 92 minerals for your complete wellness",
    url: "https://healthyzway.vercel.app/"
  },
  {
    id: "smartwastegy",
    name: "SmartWasteGy",
    description: "SmartWasteGy Management at Your Fingertips. Join thousands of Guyanese making waste collection smarter, faster, and more sustainable. Track bins, schedule pickups, and contribute to a cleaner Guyana.",
    url: "https://smartwastegy.com"
  },
  {
    id: "selenafurniturestore",
    name: "Selena's Furniture Store Guyana",
    description: "Selena's Furniture Store Guyana is a furniture store that sells furniture for the home and office.",
    url: "https://selenafurniturestore.com/"
  }
];

// Utility function to fetch og:image from a URL using Microlink API
async function fetchOgImage(url: string): Promise<string | null> {
  try {
    // Use Microlink API which handles CORS properly and extracts og:image
    const microlinkUrl = `https://api.microlink.io/?url=${encodeURIComponent(url)}&fields=image`;
    
    // Add timeout to prevent hanging requests
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    const response = await fetch(microlinkUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    
    // Microlink returns the image URL in the image field
    if (data.data?.image?.url) {
      return data.data.image.url;
    }
    
    return null;
  } catch (error) {
    // Silently fail - placeholder image will be used
    if (error instanceof Error && error.name !== 'AbortError') {
      console.warn(`Could not fetch og:image for ${url}, using placeholder`);
    }
    return null;
  }
}

export default function Portfolio() {
  const [projectThumbnails, setProjectThumbnails] = useState<Record<string, string>>({});
  const [loadingThumbnails, setLoadingThumbnails] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Fetch thumbnails for all projects sequentially to avoid rate limiting
    const fetchThumbnails = async () => {
      for (const project of projects) {
        setLoadingThumbnails((prev) => ({ ...prev, [project.id]: true }));
        
        try {
          const thumbnail = await fetchOgImage(project.url);
          if (thumbnail) {
            setProjectThumbnails((prev) => ({ ...prev, [project.id]: thumbnail }));
          }
        } catch (error) {
          // Error already handled in fetchOgImage
        } finally {
          setLoadingThumbnails((prev) => ({ ...prev, [project.id]: false }));
        }
        
        // Small delay between requests to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    };

    fetchThumbnails();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  // Placeholder image for projects without thumbnails
  const getPlaceholderImage = () => {
    return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23e5e7eb' width='400' height='300'/%3E%3Ctext fill='%239ca3af' font-family='sans-serif' font-size='18' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3EProject Image%3C/text%3E%3C/svg%3E";
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
          {projects.map((project) => {
            const thumbnail = projectThumbnails[project.id];
            const isLoading = loadingThumbnails[project.id];
            const imageSrc = thumbnail || getPlaceholderImage();

            return (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
                {/* Project Image */}
                <div className="w-full h-48 xs:h-52 sm:h-56 bg-gray-200 overflow-hidden relative">
                  {isLoading ? (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                    </div>
                  ) : (
                    <img
                      src={imageSrc}
                      alt={`${project.name} website design project in Guyana`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = getPlaceholderImage();
                      }}
                    />
                  )}
                </div>

                {/* Project Content */}
                <div className="p-5 xs:p-6 flex flex-col flex-1">
                  <h3 className="text-base xs:text-lg sm:text-xl font-semibold text-gray-800 mb-3 xs:mb-4 break-words">
                    {project.name}
                  </h3>

                  <p className="text-gray-600 text-xs xs:text-sm mb-4 flex-1 line-clamp-4">
                    {project.description}
                  </p>

                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center justify-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors text-xs xs:text-sm font-medium"
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

