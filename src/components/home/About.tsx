import { AnimatePresence, motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram, FaMedium } from "react-icons/fa";
import { useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

interface AboutProps {
  aboutRef: React.RefObject<HTMLElement> | ((node?: Element | null | undefined) => void);
  aboutInView: boolean;
}

export default function About({ aboutRef, aboutInView }: AboutProps) {
  const glowRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  
  // Follow mouse movement for the glow effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (glowRef.current) {
        const rect = glowRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        glowRef.current.style.setProperty('--x', `${x}px`);
        glowRef.current.style.setProperty('--y', `${y}px`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const socialLinks = [
    { name: "GitHub", icon: <FaGithub size={22} />, link: "https://github.com/nanda-kshr" },
    { name: "LinkedIn", icon: <FaLinkedin size={22} />, link: "https://www.linkedin.com/in/nandakishore-p-44a743151/" },
    { name: "Instagram", icon: <FaInstagram size={22} />, link: "https://instagram.com/nanda.kshr" },
    { name: "Medium", icon: <FaMedium size={22} />, link: "https://medium.com/@nandakishorep" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    },
  };

  return (
    <section
      id="about"
      ref={aboutRef}
      className="relative h-screen flex items-center justify-center bg-black overflow-hidden"
    >
      {/* Matrix-style digital particles (binary rain simulation) */}
      <div className="absolute inset-0 z-0 opacity-20">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-24 bg-gradient-to-b from-transparent via-[#90EE90] to-transparent"
            style={{
              left: `${Math.random() * 100}%`,
              top: -96,
              opacity: Math.random() * 0.7 + 0.3,
            }}
            animate={{
              y: [0, typeof window !== 'undefined' ? window.innerHeight + 96 : 1000],
              opacity: [0, Math.random() * 0.7 + 0.3, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Digital grid pattern */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#90EE9010_1px,transparent_1px)] bg-[length:30px_30px] opacity-10"></div>

      <AnimatePresence>
        {aboutInView && (
          <motion.div
            className="relative z-10 w-full max-w-4xl mx-4 sm:mx-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              ref={glowRef}
              className="relative w-full backdrop-blur-sm rounded-2xl border border-[#90EE9030] overflow-hidden group"
              style={{
                background: "linear-gradient(180deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.9) 100%)",
                boxShadow: "0 0 40px rgba(144, 238, 144, 0.1)",
                "--x": "50%",
                "--y": "50%",
              } as any}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Radial glow effect that follows cursor */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-in-out z-0"
                style={{
                  background: "radial-gradient(circle 200px at var(--x) var(--y), rgba(144, 238, 144, 0.15), transparent 100%)",
                }}
              ></div>


              {/* Content container */}
              <div className="relative z-10 p-8 sm:p-12">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div variants={itemVariants} className="mb-8 flex items-center">
                    <div className="h-px flex-grow bg-gradient-to-r from-transparent to-[#90EE9060] mr-4"></div>
                    <div className="px-4 py-1 rounded-full bg-[#90EE9010] border border-[#90EE9030] text-[#90EE90] text-xs uppercase tracking-widest font-light">
                      About
                    </div>
                    <div className="h-px flex-grow bg-gradient-to-l from-transparent to-[#90EE9060] ml-4"></div>
                  </motion.div>

                  <motion.h2 
                    variants={itemVariants} 
                    className="text-4xl sm:text-5xl font-bold mb-6 text-white"
                    style={{
                      textShadow: "0 0 15px rgba(144, 238, 144, 0.3)",
                    }}
                  >
                    <span className="text-[#90EE90]">Who</span> I Am
                  </motion.h2>

                  <motion.div 
                    variants={itemVariants}
                    className="mb-8 space-y-4 text-gray-300 text-lg leading-relaxed"
                  >
                    <p>
                      I am a <span className="text-[#90EE90] font-medium">dedicated developer</span> passionate about creating 
                      intuitive, <span className="text-[#90EE90] font-medium">high-performance</span> web applications.
                    </p>
                    <p>
                      With expertise in modern frameworks and a focus on <span className="text-[#90EE90] font-medium">user experience</span>,
                      I build solutions that blend <span className="text-[#90EE90] font-medium">innovation</span> and <span className="text-[#90EE90] font-medium">functionality</span>.
                    </p>
                  </motion.div>

                  {/* Tech terminal effect */}
                  

                  

                  <motion.div variants={itemVariants} className="flex justify-center mt-8">
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
                        View My Projects
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3.33337 8H12.6667" stroke="#90EE90" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M8 3.33337L12.6667 8.00004L8 12.6667" stroke="#90EE90" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    </motion.button>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}