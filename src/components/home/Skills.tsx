"use client";

import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { RefObject, useState, useEffect, useCallback, useMemo, useRef } from "react";
import { FaCode, FaDatabase, FaTools, FaServer, FaDesktop, FaLaptopCode, FaBrain } from "react-icons/fa";

interface SkillsProps {
  skillsRef: RefObject<HTMLElement> | ((node?: Element | null) => void);
  skillsInView: boolean;
}

interface SkillCategory {
  name: string;
  icon: JSX.Element;
  skills: string[];
}

export default function Skills({ skillsRef, skillsInView }: SkillsProps) {
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const controls = useAnimation();
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const timeoutRefs = useRef<NodeJS.Timeout[]>([]);
  const [skillProgressValues] = useState(() => 
    Array(100).fill(0).map(() => Math.random() * 50 + 50)
  );

  // Pre-generate random positions for digital lines to prevent re-renders
  const digitalLines = useMemo(() => 
    Array(15).fill(0).map(() => ({
      left: `${Math.random() * 100}%`,
      opacity: Math.random() * 0.7 + 0.3,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 15,
    })), []
  );

  const skillCategories: SkillCategory[] = useMemo(() => [
    {
      name: "Languages",
      icon: <FaCode size={22} />,
      skills: ['JavaScript', 'TypeScript', 'Python', 'C', 'C++', 'C#', 'Java', 'PHP', 'HTML5', 'CSS3'],
    },
    {
      name: "Frameworks",
      icon: <FaLaptopCode size={22} />,
      skills: ['React', 'Next.js', 'Flask', 'Django REST', 'FastAPI', 'jQuery', 'Socket.io', 'OpenCV'],
    },
    {
      name: "Databases",
      icon: <FaDatabase size={22} />,
      skills: ['MongoDB', 'MySQL', 'MariaDB', 'SQLite', 'Redis', 'Firebase'],
    },
    {
      name: "DevOps",
      icon: <FaServer size={22} />,
      skills: ['AWS', 'DigitalOcean', 'Heroku', 'Linode', 'Oracle', 'Alibaba Cloud', 'GitHub Actions', 'Nginx', 'Apache', 'Gunicorn'],
    },
    {
      name: "Tools",
      icon: <FaTools size={22} />,
      skills: ['Git', 'Bitbucket', 'Postman', 'Figma', 'Blender', 'Grafana', 'Selenium', 'Raspberry Pi', 'Arduino', 'Cisco'],
    },
    {
      name: "Platforms",
      icon: <FaDesktop size={22} />,
      skills: ['Windows', 'MacOS', 'Linux', 'Ubuntu', 'Arch Linux', 'Kali Linux', 'Android', 'Replit'],
    },
    {
      name: "AI/ML",
      icon: <FaBrain size={22} />,
      skills: ['TensorFlow', 'PyTorch', 'Keras', 'NumPy', 'Pandas', 'Matplotlib', 'Scikit-Learn', 'SciPy', 'ChatGPT'],
    },
  ], []);

  // Clear all timeouts to prevent memory leaks and race conditions
  const clearAllTimeouts = useCallback(() => {
    timeoutRefs.current.forEach(timeoutId => clearTimeout(timeoutId));
    timeoutRefs.current = [];
  }, []);

  // Add a timeout ID to the refs array for tracking
  const addTimeout = useCallback((callback: () => void, delay: number): NodeJS.Timeout => {
    const timeoutId = setTimeout(() => {
      // Remove this timeout from the refs array once it executes
      timeoutRefs.current = timeoutRefs.current.filter(id => id !== timeoutId);
      callback();
    }, delay);
    
    timeoutRefs.current.push(timeoutId);
    return timeoutId;
  }, []);

  // Completely rewritten typing effect with better state management
  const typeCommand = useCallback((command: string) => {
    // Clear any existing timeouts
    clearAllTimeouts();
    
    // Reset states
    setIsTyping(true);
    setShowSkills(false);
    setTerminalOutput([]);
    
    let typedCommand = "";
    let typeIndex = 0;
    
    const typeNextChar = () => {
      if (typeIndex < command.length) {
        typedCommand += command[typeIndex];
        setTerminalOutput(prev => [typedCommand]);
        typeIndex++;
        addTimeout(typeNextChar, 40);
      } else {
        // After typing command, show the "scanning" message
        setTerminalOutput(prev => [command, "Scanning for skills..."]);
        
        // Then after a delay, show the results
        addTimeout(() => {
          const output = [
            command,
            "Scanning for skills...",
            `Found ${skillCategories[activeCategory].skills.length} ${skillCategories[activeCategory].name.toLowerCase()} in user profile.`,
            `Analyzing proficiency levels...`,
            `Results ready. Displaying ${skillCategories[activeCategory].name.toLowerCase()} skills:`
          ];
          setTerminalOutput(prev => output);
          setIsTyping(false);
          
          // Show skills after terminal output is complete
          addTimeout(() => {
            setShowSkills(true);
          }, 100);
        }, 800);
      }
    };
    
    // Start typing with a small delay
    addTimeout(typeNextChar, 100);
  }, [activeCategory, skillCategories, addTimeout, clearAllTimeouts]);

  // Improved category change handler
  const handleCategoryChange = useCallback((index: number) => {
    if (index === activeCategory) return;
    
    // Cancel any active typing
    clearAllTimeouts();
    
    setActiveCategory(index);
    setIsTyping(false);
    setShowSkills(false);
    
    // Start new typing with a slight delay
    addTimeout(() => {
      const command = `skill_scan -u nanda-kshr -c ${skillCategories[index].name.toLowerCase()} -v`;
      typeCommand(command);
    }, 150);
  }, [activeCategory, skillCategories, clearAllTimeouts, addTimeout, typeCommand]);

  // Effect for typing when category changes or view becomes visible
  useEffect(() => {
    if (skillsInView) {
      const command = `skill_scan -u nanda-kshr -c ${skillCategories[activeCategory].name.toLowerCase()} -v`;
      typeCommand(command);
    }
    
    // Clean up all timeouts when component unmounts or when not in view
    return () => {
      clearAllTimeouts();
    };
  }, [skillsInView, typeCommand, skillCategories, activeCategory, clearAllTimeouts]);

  // Animation controls effect
  useEffect(() => {
    if (skillsInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [skillsInView, controls]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
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

  // Get current date in the format expected for the terminal
  const currentDate = useMemo(() => {
    const date = new Date();
    return date.toDateString().split(' ').slice(0, 3).join(' ') + ' ' + 
           date.toTimeString().split(' ')[0];
  }, []);

  return (
    <section
      ref={skillsRef}
      id="skills"
      className="relative h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Digital circuit pattern - optimized with memoization */}
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

      {/* Binary rain effect - using pre-calculated values */}
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
        {skillsInView && (
          <motion.div
            className="z-10 w-full max-w-7xl mx-auto px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-12 text-center"
            >
              <div className="inline-block px-4 py-1 mb-4 rounded-full bg-[#90EE9010] border border-[#90EE9030] text-[#90EE90] text-xs uppercase tracking-widest font-light">
                Skills
              </div>
              <h2 
                className="text-4xl sm:text-5xl font-bold text-white"
                style={{
                  textShadow: "0 0 15px rgba(144, 238, 144, 0.3)",
                }}
              >
                Technical <span className="text-[#90EE90]">Arsenal</span>
              </h2>
              <div className="h-px w-32 mx-auto mt-6 bg-gradient-to-r from-transparent via-[#90EE9060] to-transparent"></div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Terminal Window - Left Side */}
              <motion.div 
                className="lg:col-span-5 order-2 lg:order-1"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="backdrop-blur-sm bg-black/50 rounded-lg border border-[#90EE9030] overflow-hidden shadow-[0_0_20px_rgba(144,238,144,0.1)]">
                  {/* Terminal Header */}
                  <div className="bg-black/80 px-4 py-2 border-b border-[#90EE9030] flex items-center">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    </div>
                    <div className="ml-4 text-xs text-[#90EE90]/80 font-mono">skills@portfolio:~</div>
                  </div>
                  
                  {/* Terminal Body */}
                  <div className="bg-black/90 p-4 h-[320px] overflow-auto font-mono text-sm leading-relaxed text-[#90EE90]/90 relative">
                    <motion.div animate={{ opacity: 1 }} initial={{ opacity: 0 }} className="space-y-2">
                      <div className="text-gray-500">Last login: {currentDate} on ttys001</div>
                      <div className="text-[#90EE90]">Welcome to SkillsTerminal v2.5.0</div>
                      <div className="h-4"></div>
                      
                      {/* Typed commands and outputs */}
                      {terminalOutput.map((line, index) => (
                        <div key={`terminal-line-${activeCategory}-${index}`} className="flex">
                          {index === 0 && <span className="text-[#90EE90] mr-2">$</span>}
                          <span className={index === 0 ? "text-white" : index > 2 ? "text-[#90EE90]/80" : "text-gray-400"}>
                            {line}
                          </span>
                        </div>
                      ))}
                      
                      {/* Skills output - only shown after terminal output is complete */}
                      {showSkills && terminalOutput.length >= 5 && (
                        <motion.div 
                          key={`skills-container-${activeCategory}`}
                          variants={containerVariants}
                          initial="hidden"
                          animate="visible"
                          className="mt-4 grid grid-cols-2 gap-x-2 gap-y-3"
                        >
                          {skillCategories[activeCategory].skills.map((skill, index) => (
                            <motion.div
                              key={`skill-${activeCategory}-${skill}`}
                              variants={itemVariants}
                              className="flex items-center"
                            >
                              <span className="text-[#90EE90] mr-2">▶</span>
                              <span>{skill}</span>
                              <div className="ml-2 h-1 flex-grow bg-[#90EE9020] rounded-full overflow-hidden">
                                <motion.div 
                                  className="h-full bg-[#90EE90]"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${skillProgressValues[index % skillProgressValues.length]}%` }}
                                  transition={{ duration: 0.8, delay: 0.1 * index }}
                                />
                              </div>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                      
                      {/* Blinking cursor */}
                      {terminalOutput.length >= (showSkills ? 5 : 0) && (
                        <div className="flex mt-4">
                          <span className="text-[#90EE90] mr-2">$</span>
                          <span className="inline-block h-4 w-2 bg-[#90EE90] animate-pulse"></span>
                        </div>
                      )}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
              
              {/* Navigation - Right Side */}
              <motion.div 
                className="lg:col-span-7 order-1 lg:order-2"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="backdrop-blur-sm bg-black/30 rounded-lg border border-[#90EE9030] p-6 shadow-[0_0_20px_rgba(144,238,144,0.1)]">
                  <div className="text-white mb-6">
                    <p className="text-gray-300 mb-6">
                      Explore my technical skills across different categories. Each represents technologies
                      and tools I've worked with throughout my development journey.
                    </p>
                    
                    {/* Category navigation */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
                      {skillCategories.map((category, index) => {
                        const isActive = activeCategory === index;
                        return (
                          <motion.button
                            key={`category-${category.name}`}
                            onClick={() => handleCategoryChange(index)}
                            tabIndex={0}
                            className={`group flex items-center gap-2 p-3 rounded-md transition-all duration-300 relative ${
                              isActive 
                                ? "bg-[#90EE9030] border border-[#90EE9050]" 
                                : "bg-black/50 border border-[#90EE9020] hover:bg-[#90EE9010]"
                            }`}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <span className={`${
                              isActive ? "text-[#90EE90]" : "text-gray-400 group-hover:text-[#90EE90]"
                            } transition-colors duration-200`}>
                              {category.icon}
                            </span>
                            <span className={`text-sm ${
                              isActive ? "text-white" : "text-gray-400 group-hover:text-white"
                            } transition-colors duration-200`}>
                              {category.name}
                            </span>
                            {isActive && (
                              <motion.div
                                layoutId="activePill"
                                className="absolute inset-0 rounded-md border border-[#90EE9060] z-0 pointer-events-none"
                                transition={{ type: "spring", duration: 0.6 }}
                              />
                            )}
                          </motion.button>
                        );
                      })}
                    </div>
                    
                    {/* Skill Pills */}
                    <div className="hidden sm:block">
                      <div className="h-px w-full bg-[#90EE9020] mb-6"></div>
                      <h3 className="text-[#90EE90] text-lg mb-4">All Skills Overview</h3>
                      <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-wrap gap-2"
                      >
                        {Array.from(new Set(skillCategories.flatMap(cat => cat.skills))).map((skill) => (
                          <motion.span
                            key={`pill-${skill}`}
                            variants={itemVariants}
                            className="px-3 py-1 text-xs rounded-full border border-[#90EE9030] bg-black/50 text-gray-300 hover:text-white hover:bg-[#90EE9020] transition-colors duration-200"
                            whileHover={{ scale: 1.05 }}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bottom decorative element */}
            <motion.div 
              className="mt-8 flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="flex items-center gap-2">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#90EE9060]"></div>
                <div className="text-[#90EE90] text-xs uppercase tracking-widest font-light">Continuously Evolving</div>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#90EE9060]"></div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}