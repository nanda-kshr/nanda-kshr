"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, useMemo, RefObject } from "react";
import { FaGithub, FaExternalLinkAlt, FaLock, FaCloud, FaRobot, FaUsers, FaShieldAlt, FaGamepad, FaTools, FaBrain, FaServer, FaCode, FaShoppingCart, FaMobile, FaGraduationCap } from "react-icons/fa";

interface ProjectsProps {
  projectsRef?: RefObject<HTMLElement> | ((node?: Element | null) => void);
  projectsInView?: boolean;
}

interface Project {
  title: string;
  description: string;
  demoLink?: string;
  githubLink?: string;
  category: 'AI/ML' | 'Web Development' | 'Security' | 'Automation' | 'IoT' | 'Social Media' | 'E-commerce' | 'Games' | 'Tools' | 'Education' | 'Telegram Bots';
  featured?: boolean;
  color: string;
  icon: JSX.Element;
  private?: boolean;
}

const Projects = ({ projectsRef, projectsInView = true }: ProjectsProps) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [showAll, setShowAll] = useState<boolean>(false);

  // Digital lines effect matching your theme
  const digitalLines = useMemo(() => 
    Array(15).fill(0).map(() => ({
      left: `${Math.random() * 100}%`,
      opacity: Math.random() * 0.7 + 0.3,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 15,
    })), []
  );

  const projects: Project[] = [
    {
      title: "AutoML",
      description: "An advanced AI agent that automates the entire Machine Learning pipeline, from data preprocessing to model selection. It intelligently analyzes datasets, performs necessary transformations, and recommends the most suitable machine learning models based on the data characteristics.",
      githubLink: "https://github.com/nanda-kshr/AutoML",
      category: "AI/ML",
      featured: true,
      color: "from-green-500 to-emerald-400",
      icon: <FaBrain size={22} />,
      private: false
    },
    {
      title: "PNG-X",
      description: "A sophisticated image steganography algorithm that efficiently hides one image within another. This project improves upon existing solutions by implementing a more size-efficient approach to image embedding, allowing for better quality preservation while maintaining the hidden image's integrity.",
      githubLink: "https://github.com/nanda-kshr/png-X",
      category: "Security",
      featured: true,
      color: "from-green-600 to-teal-500",
      icon: <FaShieldAlt size={22} />,
      private: false
    },
    {
      title: "Unlimited Photos Cloud Storage",
      description: "A Telegram-based cloud storage solution that leverages Telegram's unlimited storage capabilities to create a Google Photos-like experience. Users can upload, organize, and access their photos from anywhere, with the backend seamlessly integrated with Telegram's infrastructure.",
      demoLink: "https://unlimited-photos-cloud-storage.vercel.app",
      githubLink: "https://github.com/nanda-kshr/unlimited-photos-cloud-storage-pvt",
      category: "Web Development",
      featured: true,
      color: "from-green-400 to-lime-500",
      icon: <FaCloud size={22} />,
      private: true
    },
    {
      title: "CidPhish Framework",
      description: "An educational framework for creating phishing pages and monitoring credentials through a dashboard. Includes various templates for platforms like Gmail, Facebook, and Instagram. Designed for security research and educational purposes.",
      demoLink: "http://cidphish.site",
      category: "Security",
      featured: true,
      color: "from-emerald-500 to-green-500",
      icon: <FaShieldAlt size={22} />,
      private: false
    },
    {
      title: "Meeko",
      description: "A full-stack social media platform that enables users to share their stories and experiences. Built with modern web technologies, it provides a seamless user experience for content creation and social interaction.",
      demoLink: "http://meeko-lemon.vercel.app",
      githubLink: "https://github.com/nanda-kshr/meeko",
      category: "Social Media",
      color: "from-green-500 to-emerald-600",
      icon: <FaUsers size={22} />,
      private: false
    },
    {
      title: "FoodSpot",
      description: "A comprehensive food platform that aggregates restaurant menus and ordering systems. From KOTs and table QR codes to a full-featured food delivery interface, it provides a complete solution for the food service industry.",
      demoLink: "https://www.foodspot.site",
      category: "E-commerce",
      color: "from-green-400 to-emerald-500",
      icon: <FaShoppingCart size={22} />,
      private: false
    },
    {
      title: "Hotel Booking Template",
      description: "A modern and responsive template for hotel booking websites, featuring room selection, booking management, and user authentication.",
      demoLink: "https://hotel-booking-template-ten.vercel.app",
      category: "Web Development",
      color: "from-emerald-400 to-green-500",
      icon: <FaServer size={22} />,
      private: false
    },
    {
      title: "Reflex Game",
      description: "An arcade-style game created for the Outlier AI hackathon. Features AI-generated UI elements and provides users with an engaging arcade gaming experience.",
      demoLink: "https://reflex-game-three.vercel.app",
      category: "Games",
      color: "from-green-500 to-teal-400",
      icon: <FaGamepad size={22} />,
      private: false
    },
    {
      title: "Beckn UKI",
      description: "A full-stack application connecting to MongoDB, developed for the Beckn internship selection round. Demonstrates proficiency in both frontend and backend development.",
      demoLink: "https://beckn-uki.vercel.app",
      githubLink: "https://github.com/nanda-kshr/Beckn-UKI",
      category: "Web Development",
      color: "from-emerald-500 to-green-400",
      icon: <FaCode size={22} />,
      private: false
    },
    {
      title: "SR Media",
      description: "A freelance website project showcasing professional web development skills and client work.",
      demoLink: "http://srmedia.org.in",
      category: "Web Development",
      color: "from-green-400 to-emerald-400",
      icon: <FaCode size={22} />,
      private: false
    },
    {
      title: "Site Deals",
      description: "A full-stack e-commerce platform similar to Amazon, featuring product listings, user authentication, shopping cart functionality, and secure payment processing.",
      demoLink: "http://sitedeals.store",
      githubLink: "https://github.com/nanda-kshr/site-deals",
      category: "E-commerce",
      color: "from-green-400 to-emerald-600",
      icon: <FaShoppingCart size={22} />,
      private: false
    },
    {
      title: "LeetCode Bot",
      description: "An AI-powered bot that automates LeetCode solution submissions. It helps users practice coding problems more efficiently by automating the submission process and providing instant feedback.",
      githubLink: "https://github.com/nanda-kshr/LeetCode-Bot-Automated-Solution-Submission",
      category: "Automation",
      color: "from-emerald-400 to-green-500",
      icon: <FaRobot size={22} />,
      private: false
    },
    {
      title: "Google Pay Faker",
      description: "An educational tool designed to raise awareness about fake Google Pay screenshots and common payment frauds. Helps users identify and avoid payment scams.",
      githubLink: "https://github.com/nanda-kshr/google-pay-faker",
      category: "Education",
      color: "from-green-500 to-emerald-500",
      icon: <FaGraduationCap size={22} />,
      private: false
    },
    {
      title: "Wifi Password Hacker",
      description: "An IoT project using Arduino Leonardo to retrieve saved WiFi passwords from Windows machines. Demonstrates practical application of IoT and hardware programming.",
      githubLink: "https://github.com/nanda-kshr/Wifi-Password-Hacker",
      category: "IoT",
      color: "from-emerald-400 to-green-600",
      icon: <FaTools size={22} />,
      private: false
    },
    {
      title: "Lucky Spin Casino",
      description: "An engaging casino-style game featuring a lucky spin wheel mechanic. Provides users with an interactive gaming experience.",
      githubLink: "https://github.com/nanda-kshr/LuckySpin-Casino",
      category: "Games",
      color: "from-green-400 to-teal-500",
      icon: <FaGamepad size={22} />,
      private: false
    },
    {
      title: "Voice Cloning",
      description: "An advanced voice translation system that maintains the original voice characteristics while translating content. This project enables natural-sounding voice conversion while preserving the speaker's unique voice features.",
      githubLink: "https://github.com/nanda-kshr/voice-cloning",
      category: "AI/ML",
      color: "from-green-500 to-emerald-400",
      icon: <FaBrain size={22} />,
      private: false
    },
    {
      title: "BEAST Userbot",
      description: "A feature-rich Telegram userbot that supports various Telegram userbot functionalities, enhancing the user experience with additional features.",
      githubLink: "https://github.com/nanda-kshr/BEASTUSERBOT",
      category: "Telegram Bots",
      color: "from-emerald-500 to-green-500",
      icon: <FaMobile size={22} />,
      private: false
    },
    {
      title: "YouTube Auto Uploader Bot",
      description: "An automated system that runs daily cron jobs to upload AI-generated videos to YouTube, streamlining content creation and distribution.",
      githubLink: "https://github.com/nanda-kshr/Youtube-Auto-Uploader-Bot",
      category: "Automation",
      color: "from-green-400 to-emerald-500",
      icon: <FaRobot size={22} />,
      private: false
    },
    {
      title: "Telegram Channel Subscription Checker",
      description: "A bot that verifies user membership in Telegram channels, useful for managing channel access and permissions.",
      githubLink: "https://github.com/nanda-kshr/Telegram-Channel-Subscription-Checker",
      category: "Telegram Bots",
      color: "from-emerald-400 to-green-400",
      icon: <FaMobile size={22} />,
      private: false
    },
    {
      title: "SSL Pinning Bypass",
      description: "A collection of scripts and guides for bypassing SSL pinning, useful for security research and testing.",
      githubLink: "https://github.com/nanda-kshr/Bypass-SSL-Pinning",
      category: "Security",
      color: "from-green-500 to-teal-600",
      icon: <FaShieldAlt size={22} />,
      private: false
    },
    {
      title: "MovieBot V2",
      description: "A Telegram bot that provides users with access to a vast movie database, helping users discover and access movie information.",
      githubLink: "https://github.com/nanda-kshr/moviebotv2",
      category: "Telegram Bots",
      color: "from-emerald-500 to-green-400",
      icon: <FaMobile size={22} />,
      private: false
    },
    {
      title: "Hidden Message in Telegram",
      description: "A project demonstrating techniques for hiding messages within Telegram, showcasing advanced messaging features.",
      githubLink: "https://github.com/nanda-kshr/HIDDEN-MESSAGE-IN-TELEGRAM",
      category: "Telegram Bots",
      color: "from-green-400 to-emerald-600",
      icon: <FaMobile size={22} />,
      private: false
    },
    {
      title: "Steam Login Automation",
      description: "An automation tool for Steam login processes using combo lists, demonstrating practical application of automation techniques.",
      githubLink: "https://github.com/nanda-kshr/STEAM-LOGIN-AUTOMATION",
      category: "Automation",
      color: "from-emerald-400 to-green-500",
      icon: <FaRobot size={22} />,
      private: false
    },
    {
      title: "Telegram Words Filter Bot",
      description: "A bot that filters inappropriate words in Telegram messages, helping maintain community guidelines and content quality.",
      githubLink: "https://github.com/nanda-kshr/Telegram-words-filter-bot",
      category: "Telegram Bots",
      color: "from-green-500 to-emerald-400",
      icon: <FaMobile size={22} />,
      private: false
    },
    {
      title: "Instagram User ID Scraper",
      description: "A tool for extracting user IDs from Instagram profile followers, useful for social media analysis and research.",
      githubLink: "https://github.com/nanda-kshr/Instagram-Userid-Scraper",
      category: "Tools",
      color: "from-emerald-500 to-green-500",
      icon: <FaTools size={22} />,
      private: false
    },
    {
      title: "Telegram Message Forward",
      description: "A bot that enables anonymous message forwarding to groups. Users can send messages to the bot, which then forwards them to the group anonymously.",
      githubLink: "https://github.com/nanda-kshr/telegram_message_forward",
      category: "Telegram Bots",
      color: "from-green-400 to-emerald-500",
      icon: <FaMobile size={22} />,
      private: false
    }
  ];

  const categories = ['All', ...Array.from(new Set(projects.map(project => project.category)))];
  
  // Fixed filtering logic
  const filteredProjects = useMemo(() => {
    let filtered = activeCategory === 'All' 
      ? projects 
      : projects.filter(project => project.category === activeCategory);
    
    // Only limit to featured projects when showing initial view and "All" is selected
    if (!showAll && activeCategory === 'All') {
      return filtered.filter(project => project.featured);
    }
    
    // For specific categories, show first 6 unless showAll is true
    if (!showAll && activeCategory !== 'All') {
      return filtered.slice(0, 6);
    }
    
    return filtered;
  }, [activeCategory, showAll, projects]);

  // Current date and time - using your provided values
  const currentInfo = {
    date: "2025-06-08 05:20:48",
    user: "nanda-kshr"
  };

  // Check if there are more projects to show
  const hasMoreProjects = useMemo(() => {
    if (activeCategory === 'All') {
      return !showAll && projects.length > projects.filter(p => p.featured).length;
    } else {
      const categoryProjects = projects.filter(p => p.category === activeCategory);
      return !showAll && categoryProjects.length > 6;
    }
  }, [activeCategory, showAll, projects]);

  // Animation variants
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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section
      ref={projectsRef}
      id="projects"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black py-20"
    >
      {/* Digital circuit pattern - matching your theme */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="circuit" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="none" stroke="#90EE90" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="3" fill="#90EE90" />
            <path d="M50,0 L50,100 M0,50 L100,50" stroke="#90EE90" strokeWidth="0.5" />
            <path d="M25,25 L25,75 L75,75 L75,25 Z" fill="none" stroke="#90EE90" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      {/* Binary rain effect - matching your theme */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        {digitalLines.map((line, i) => (
          <motion.div
            key={`digital-line-${i}`}
            className="absolute w-px h-24 bg-gradient-to-b from-transparent via-[#90EE90] to-transparent"
            style={{
              left: line.left,
              top: -96,
              opacity: line.opacity,
            }}
            initial={{ y: 0, opacity: 0 }}
            animate={{
              y: [0, typeof window !== 'undefined' ? window.innerHeight + 96 : 1000],
              opacity: [0, line.opacity, 0],
            }}
            transition={{
              duration: line.duration,
              repeat: Infinity,
              ease: "linear",
              delay: line.delay,
              repeatType: "loop",
            }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {projectsInView && (
          <motion.div
            className="z-10 w-full max-w-7xl mx-auto px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Header section - matching your theme */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-12 text-center"
            >
              <div className="inline-block px-4 py-1 mb-4 rounded-full bg-[#90EE9010] border border-[#90EE9030] text-[#90EE90] text-xs uppercase tracking-widest font-light">
                Portfolio
              </div>
              <h1 
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6"
                style={{
                  textShadow: "0 0 15px rgba(144, 238, 144, 0.3)",
                }}
              >
                My <span className="text-[#90EE90]">Projects</span>
              </h1>
              <div className="h-px w-32 mx-auto mt-6 bg-gradient-to-r from-transparent via-[#90EE9060] to-transparent"></div>
              
              <p className="text-gray-300 mt-6 max-w-2xl mx-auto">
                A showcase of innovative solutions that solve real-world problems, demonstrating
                my technical expertise and creative approach to software development.
              </p>
            </motion.div>

            {/* Terminal info */}
            <motion.div 
              className="text-xs text-gray-500 mb-8 text-center font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <span>Last updated: {currentInfo.date} | </span>
              <span>Developer: {currentInfo.user}</span>
            </motion.div>

            {/* Category filters - terminal style */}
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="backdrop-blur-sm bg-black/30 rounded-lg border border-[#90EE9030] p-4 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="text-[#90EE90] text-sm font-mono">$</div>
                  <div className="text-white font-mono text-sm">project_filter --category={activeCategory.toLowerCase()}</div>
                  <div className="ml-2 text-gray-500 text-sm font-mono">
                    ({filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''})
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => {
                    const isActive = activeCategory === category;
                    const categoryCount = category === 'All' 
                      ? projects.length 
                      : projects.filter(p => p.category === category).length;
                    
                    return (
                      <motion.button
                        key={category}
                        onClick={() => {
                          setActiveCategory(category);
                          setShowAll(false); // Reset showAll when changing category
                        }}
                        className={`px-4 py-2 rounded-md text-sm font-mono transition-all duration-300 ${
                          isActive 
                            ? "bg-[#90EE9030] border border-[#90EE9050] text-[#90EE90]" 
                            : "bg-black/50 border border-[#90EE9020] text-gray-400 hover:bg-[#90EE9010] hover:text-white"
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {category} ({categoryCount})
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Projects grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              key={`${activeCategory}-${showAll}`} // Force re-render when category or showAll changes
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={`${project.title}-${activeCategory}-${index}`}
                  variants={itemVariants}
                  className="backdrop-blur-sm bg-black/30 rounded-xl border border-[#90EE9030] p-6 group hover:border-[#90EE9050] transition-all duration-300"
                  onMouseEnter={() => setHoveredProject(index)}
                  onMouseLeave={() => setHoveredProject(null)}
                  whileHover={{ 
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                  style={{
                    boxShadow: hoveredProject === index ? "0 0 20px rgba(144, 238, 144, 0.1)" : "none",
                  }}
                >
                  {/* Color gradient overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-xl`}
                  />
                  
                  {/* Project header */}
                  <div className="flex justify-between items-start mb-4 relative z-10">
                    <div className="flex items-center gap-3">
                      <span className={`text-transparent bg-clip-text bg-gradient-to-r ${project.color}`}>
                        {project.icon}
                      </span>
                      <h3 className="text-xl font-bold text-white group-hover:text-[#90EE90] transition-colors duration-300">
                        {project.title}
                      </h3>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {project.private && (
                        <span 
                          className="text-gray-500"
                          title="Private Repository"
                        >
                          <FaLock size={14} />
                        </span>
                      )}
                      {project.featured && (
                        <div className="px-2 py-1 bg-[#90EE9020] border border-[#90EE9030] rounded text-[#90EE90] text-xs">
                          Featured
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Project description */}
                  <p className="text-gray-300 text-sm mb-6 leading-relaxed relative z-10">
                    {project.description}
                  </p>

                  {/* Project category badge */}
                  <div className="mb-4 relative z-10">
                    <span className="px-2 py-1 bg-black/50 border border-[#90EE9020] rounded text-gray-400 text-xs font-mono">
                      {project.category}
                    </span>
                  </div>

                  {/* Project links */}
                  <div className="flex gap-4 relative z-10">
                    {project.demoLink && (
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-[#90EE90] hover:text-white transition-colors group/link"
                      >
                        <FaExternalLinkAlt size={16} className="mr-2 group-hover/link:scale-110 transition-transform" />
                        <span className="text-sm font-mono">Live Demo</span>
                      </a>
                    )}
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-gray-400 hover:text-[#90EE90] transition-colors group/link"
                      >
                        <FaGithub size={16} className="mr-2 group-hover/link:scale-110 transition-transform" />
                        <span className="text-sm font-mono">Source</span>
                      </a>
                    )}
                  </div>

                  {/* Bottom gradient line */}
                  <div
                    className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${project.color} opacity-0 
                                group-hover:opacity-100 transition-opacity duration-500 rounded-b-xl`}
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Show more/less button */}
            {hasMoreProjects && (
              <motion.div 
                className="text-center mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="px-6 py-3 bg-black/50 border border-[#90EE9030] rounded-lg text-[#90EE90] 
                           hover:bg-[#90EE9010] hover:border-[#90EE9050] transition-all duration-300 font-mono"
                >
                  {showAll ? 'Show Less' : `Show All ${activeCategory === 'All' ? 'Projects' : activeCategory + ' Projects'}`}
                </button>
              </motion.div>
            )}

            {/* Bottom decorative element */}
            <motion.div 
              className="mt-16 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="flex items-center gap-2">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#90EE9060]"></div>
                <div className="text-[#90EE90] text-xs uppercase tracking-widest font-light">Building the Future</div>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#90EE9060]"></div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;