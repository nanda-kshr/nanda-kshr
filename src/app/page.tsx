"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import MagneticCursor from "@/components/MagneticCursor"
import { useInView } from "react-intersection-observer"
import BinaryFlowEffect from "@/components/BinaryFlowEffect"
import Contact from "@/components/home/Contact"
import Project from "@/components/home/Project"
import Skills from "@/components/home/Skills"
import About from "@/components/home/About"
import Hero from "@/components/home/Hero"

// Add this component for the particles effect
const Particles = ({ color }: { color: string }) => {
  return (
    <div className="absolute inset-0">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-1.5 h-1.5 rounded-full bg-[#90EE90]`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1, 0],
            opacity: [0, 1, 0],
            x: [0, (Math.random() - 0.5) * 100],
            y: [0, (Math.random() - 0.5) * 100],
          }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
            delay: i * 0.05,
          }}
        />
      ))}
    </div>
  );
};

export default function Home() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [activeSection, setActiveSection] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })


  const backgroundY = useTransform(scrollYProgress, [0, 0.5, 1], ["0%", "25%", "50%"])
  const textY = useTransform(scrollYProgress, [0, 0.5, 1], ["0%", "50%", "100%"])

  const opacityParticles = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [1, 0.5, 0.5, 1])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }


    const updateActiveSection = () => {
      const sections = document.querySelectorAll('section')
      const scrollPosition = window.scrollY + window.innerHeight / 2

      sections.forEach((section, index) => {
        const top = section.offsetTop
        const height = section.offsetHeight

        if (scrollPosition >= top && scrollPosition < top + height) {
          setActiveSection(index)
        }
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", updateActiveSection)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", updateActiveSection)
    }
  }, [scrollYProgress])

  // Create refs for each section with useInView
  const [heroRef, heroInView] = useInView({ threshold: 0.5, triggerOnce: false })
  const [aboutRef, aboutInView] = useInView({ threshold: 0.5, triggerOnce: false })
  const [skillsRef, skillsInView] = useInView({ threshold: 0.5, triggerOnce: false })
  const [projectsRef, projectsInView] = useInView({ threshold: 0.5, triggerOnce: false })
  const [contactRef, contactInView] = useInView({ threshold: 0.5, triggerOnce: false })

  return (
    <main ref={containerRef} className="relative min-h-screen overflow-hidden bg-black text-white">
      <MagneticCursor cursorPosition={cursorPosition} />
      <motion.div style={{ y: backgroundY }} initial={{ y: "0%" }}>
        <BinaryFlowEffect />
      </motion.div>
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50">
        {[0, 1, 2, 3, 4].map((index) => (
          <motion.div
            key={index}
            className="relative w-6 h-6 my-4"
            initial={{ scale: 0.8 }}
            animate={{
              scale: activeSection === index ? 1.2 : 0.8,
              opacity: activeSection === index ? 1 : 0.5,
            }}
            whileHover={{ scale: 1.5 }}
          >
            {/* Main dot */}
            <motion.button
              className="w-full h-full rounded-full bg-[#90EE90] cursor-pointer relative z-10"
              onClick={() => {
                const sections = document.querySelectorAll('section');
                sections[index].scrollIntoView({ behavior: 'smooth' });
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
            
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-[#90EE90] opacity-30 blur-md"
              animate={{
                scale: activeSection === index ? 1.5 : 1,
              }}
            />
            
            {/* Particles effect */}
            <AnimatePresence>
              {activeSection === index && (
                <Particles color="bg-[#90EE90]" />
              )}
            </AnimatePresence>

            {/* Section label */}
            <motion.span
              className="absolute -right-24 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm text-[#90EE90] capitalize whitespace-nowrap"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            >
              {['Home', 'Projects', 'About', 'Skills', 'Contact'][index]}
            </motion.span>
          </motion.div>
        ))}
      </div>

      
      <Hero heroInView={heroInView} heroRef={heroRef} textY={textY}/>
      <About aboutInView={aboutInView} aboutRef={aboutRef} />
      <Skills skillsInView={skillsInView} skillsRef={skillsRef} />
      <Project projectsInView={projectsInView} projectsRef={projectsRef} />
      <Contact contactInView={contactInView} contactRef={contactRef} />
      <style jsx global>{`
        body {
          cursor: none;
        }
      `}</style>
    </main>
  )
}