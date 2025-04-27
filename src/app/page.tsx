"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import MagneticCursor from "@/components/MagneticCursor"
import { useInView } from "react-intersection-observer"
import BinaryFlowEffect from "@/components/BinaryFlowEffect"
import Contact from "@/components/home/Contact"
import Project from "@/components/home/Project"
import Skills from "@/components/home/Skills"
import About from "@/components/home/About"
import Hero from "@/components/home/Hero"


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
            className="w-3 h-3 my-3 rounded-full bg-white cursor-pointer"
            initial={{ scale: 0.8 }}
            animate={{
              scale: activeSection === index ? 1.2 : 0.8,
              opacity: activeSection === index ? 1 : 0.5,
            }}
            whileHover={{ scale: 1.5 }}
            onClick={() => {
              const sections = document.querySelectorAll('section')
              sections[index].scrollIntoView({ behavior: 'smooth' })
            }}
          />
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