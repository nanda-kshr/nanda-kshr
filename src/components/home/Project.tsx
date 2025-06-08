"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { FaGithub, FaExternalLinkAlt, FaLock, FaCloud, FaRobot, FaUsers, FaShieldAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

interface ProjectProps {
  projectsRef: React.RefObject<HTMLElement> | ((node?: Element | null | undefined) => void);
  projectsInView: boolean;
}

interface ProjectData {
  title: string;
  desc: string;
  longDesc?: string;
  tech: string[];
  color: string;
  icon: JSX.Element;
  live?: string;
  image?: string;
  private: boolean;
}

export default function Project({ projectsRef, projectsInView }: ProjectProps) {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [showAll, setShowAll] = useState<boolean>(false);
  const router = useRouter();
  
  // Digital lines effect
  const digitalLines = useMemo(() => 
    Array(10).fill(0).map(() => ({
      left: `${Math.random() * 100}%`,
      opacity: Math.random() * 0.5 + 0.2,
      delay: Math.random() * 3,
      duration: Math.random() * 8 + 10,
    })), []
  );

  // All projects data based on user input
  const allProjects: ProjectData[] = useMemo(() => [
    {
      title: "UnlimCloud",
      desc: "Unlimited free cloud storage alternative to Amazon AWS and Google Photos.",
      longDesc: "I've built a seamless image management system that bridges Telegram and the web, allowing users to get access to unlimited cloud storage. Like Google Photos but with unlimited storage and completely free.",
      tech: ["Next.js", "TypeScript", "MongoDB", "Telegram Bot API", "Tailwind CSS"],
      color: "from-green-500 to-emerald-400",
      icon: <FaCloud size={22} />,
      live: "http://unlimited-photos-cloud-storage.vercel.app",
      private: true,
      image: "/projects/unlimcloud.webp"
    },
    {
      title: "Meeko",
      desc: "Social media app where people share personal incidents and experiences.",
      longDesc: "A social platform focused on authentic storytelling, allowing users to share meaningful incidents that happened to them. Creates a space for genuine human connection.",
      tech: ["React", "Node.js", "MongoDB", "Express", "Socket.io"],
      color: "from-green-600 to-teal-500",
      icon: <FaUsers size={22} />,
      live: "https://meeko-lemon.vercel.app",
      private: true,
      image: "/projects/meeko.webp"
    },
    {
      title: "Cidphish",
      desc: "Educational platform for creating and understanding phishing websites.",
      longDesc: "A tool designed for educational purposes to demonstrate how phishing attacks work. Helps security professionals understand vulnerabilities and improve defensive strategies.",
      tech: ["HTML/CSS", "JavaScript", "PHP", "Docker", "Nginx"],
      color: "from-green-400 to-lime-500",
      icon: <FaShieldAlt size={22} />,
      live: "http://cidphish.site",
      private: true,
      image: "/projects/cidphish.webp"
    },
    {
      title: "Auto ML",
      desc: "AI agent that automates data analysis, science, and machine learning workflows.",
      longDesc: "Sophisticated AI system that automates the entire machine learning pipeline - from data preprocessing to model selection and deployment. Significantly reduces the time and expertise needed for ML implementations.",
      tech: ["Python", "TensorFlow", "PyTorch", "Scikit-Learn", "LangChain"],
      color: "from-emerald-500 to-green-500",
      icon: <FaRobot size={22} />,
      private: true,
      image: "/projects/automl.webp"
    }
  ], []);

  // Featured projects
  const featuredProjects = useMemo(() => 
    showAll ? allProjects : allProjects
  , [allProjects, showAll]);

  // Reset hovered project when projects go out of view
  useEffect(() => {
    if (!projectsInView) {
      setHoveredProject(null);
    }
  }, [projectsInView]);

  // Container variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  // Item variants for animations
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

  // Current date and time - updated with your exact values
  const currentInfo = {
    date: "2025-04-27 04:12:19",
    user: "nanda-kshr"
  };

  return (
    <section
      ref={projectsRef}
      id="projects"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black py-16 sm:py-20"
    >
      {/* Digital circuit background effect - green accent */}
      <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="project-circuit" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="none" stroke="#4CAF50" strokeWidth="0.5" />
            <circle cx="50" cy="50" r="3" fill="#4CAF50" />
            <path d="M50,0 L50,100 M0,50 L100,50" stroke="#4CAF50" strokeWidth="0.5" />
            <path d="M25,25 L25,75 L75,75 L75,25 Z" fill="none" stroke="#4CAF50" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#project-circuit)" />
        </svg>
      </div>

      {/* Digital lines effect - green accent */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        {digitalLines.map((line, i) => (
          <motion.div
            key={`project-digital-line-${i}`}
            className="absolute w-px h-16 bg-gradient-to-b from-transparent via-green-400 to-transparent"
            style={{
              left: line.left,
              top: -64,
              opacity: line.opacity,
            }}
            initial={{ y: 0, opacity: 0 }}
            animate={{
              y: [0, typeof window !== 'undefined' ? window.innerHeight + 64 : 1000],
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
            className="z-10 w-full max-w-7xl mx-auto px-4 sm:px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-8 sm:mb-12 text-center"
            >
              <div className="inline-block px-4 py-1 mb-4 rounded-full bg-green-500/10 border border-green-500/20 text-green-300 text-xs uppercase tracking-widest font-light">
                Portfolio
              </div>
              <h2 
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-white"
                style={{
                  textShadow: "0 0 15px rgba(76, 175, 80, 0.3)",
                }}
              >
                Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Projects</span>
              </h2>
              <div className="h-px w-24 sm:w-32 mx-auto mt-4 sm:mt-6 bg-gradient-to-r from-transparent via-green-500/60 to-transparent"></div>
              
              <p className="text-gray-300 mt-4 sm:mt-6 max-w-2xl mx-auto text-sm sm:text-base">
                A showcase of innovative solutions that solve real-world problems, demonstrating
                my technical expertise and creative approach to software development.
              </p>
            </motion.div>

            {/* Project meta info */}
            <motion.div 
              className="text-xs text-gray-500 mb-6 sm:mb-8 mx-auto text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <span className="font-mono">Last updated: {currentInfo.date} | </span>
              <span className="font-mono">Developer: {currentInfo.user}</span>
            </motion.div>

            {/* Projects Grid - improved responsiveness */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mt-4 sm:mt-6"
            >
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={`project-${project.title}`}
                  variants={itemVariants}
                  className="backdrop-blur-sm bg-black/40 rounded-xl overflow-hidden group border border-green-500/10 relative"
                  onMouseEnter={() => setHoveredProject(index)}
                  onMouseLeave={() => setHoveredProject(null)}
                  whileHover={{ 
                    y: -5,
                    transition: { duration: 0.2 }
                  }}
                >
                  {/* Color gradient overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />
                  
                  {/* Project content */}
                  <div className="p-4 sm:p-6">
                    <div className="flex justify-between items-start mb-2 sm:mb-3">
                      <div className="flex items-center gap-2">
                        <span className={`text-transparent bg-clip-text bg-gradient-to-r ${project.color}`}>
                          {project.icon}
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-green-300 group-hover:to-emerald-100 transition-all duration-300">
                          {project.title}
                        </h3>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {project.private && (
                          <span 
                            className="text-gray-500"
                            title="Private Repository"
                          >
                            <FaLock size={16} />
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Special highlight for UnlimCloud - green accent */}
                    {project.title === "UnlimCloud" && (
                      <div className="mb-3 px-3 py-2 bg-gradient-to-r from-green-500/10 to-emerald-400/10 rounded-md border border-green-500/20">
                        <p className="text-green-300 text-xs sm:text-sm font-medium">
                          <span className="font-bold">Featured:</span> Unlimited reads and writes - a free alternative to Amazon AWS and Google Photos
                        </p>
                      </div>
                    )}
                    
                    {/* Description - shows long description on hover */}
                    <div className="min-h-[60px] sm:min-h-[80px] mb-3 sm:mb-4">
                      <p className="text-gray-300 text-xs sm:text-sm transition-all duration-300">
                        {hoveredProject === index ? project.longDesc : project.desc}
                      </p>
                    </div>
                    
                    {/* Tech stack - improved responsiveness */}
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4">
                      {project.tech.map((tech) => (
                        <span 
                          key={`${project.title}-${tech}`}
                          className="px-2 sm:px-3 py-0.5 sm:py-1 text-[10px] sm:text-xs rounded-full border border-green-500/10 bg-green-500/5 
                                    text-gray-300 hover:bg-green-500/10 transition-colors duration-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    {/* Project URL - Always visible but highlighted on hover */}
                    {project.live && (
                      <div 
                        className="mt-4 sm:mt-6 flex items-center gap-2 text-xs sm:text-sm text-gray-400 group-hover:text-green-300 transition-colors"
                      >
                        <FaExternalLinkAlt size={12} />
                        <span className="overflow-hidden text-ellipsis truncate">{project.live}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Bottom gradient line - green accent */}
                  <div
                    className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${project.color} opacity-0 
                                group-hover:opacity-100 transition-opacity duration-500`}
                  />
                </motion.div>
              ))}
            </motion.div>
            
            {/* View All Projects Button */}
            <motion.div
              variants={itemVariants}
              className="mt-12 flex justify-center"
            >
              <motion.button
                onClick={() => router.push('/projects')}
                className="relative group px-8 py-3 rounded-md bg-transparent text-white font-medium overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Button border */}
                <span className="absolute inset-0 border border-[#90EE9060] rounded-md"></span>
                
                {/* Button glow effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-[#90EE9000] via-[#90EE9020] to-[#90EE9000] opacity-0 group-hover:opacity-100 transform group-hover:translate-x-full transition-all duration-1000 ease-out rounded-md"></span>
                
                {/* Button text */}
                <span className="relative z-10 flex items-center gap-2">
                  View All Projects
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.33337 8H12.6667" stroke="#90EE90" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 3.33337L12.6667 8.00004L8 12.6667" stroke="#90EE90" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </motion.button>
            </motion.div>
            
            {/* Hover prompt */}
            <motion.div
              className="mt-4 sm:mt-6 text-center text-gray-400 text-xs sm:text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              Hover over any project to see more details
            </motion.div>
            
            {/* Bottom decorative element - green accent */}
            <motion.div 
              className="mt-8 sm:mt-16 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <div className="flex items-center gap-2">
                <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-green-500/60"></div>
                <div className="text-green-400/70 text-xs uppercase tracking-widest font-light">Building for the Future</div>
                <div className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-green-500/60"></div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}