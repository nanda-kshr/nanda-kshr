"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import TextReveal from "@/components/TextReveal"
import MagneticCursor from "@/components/MagneticCursor"
import MorphingSVG from "@/components/MorphingSVG"
import { useInView } from "react-intersection-observer"
import BinaryFlowEffect from "@/components/BinaryFlowEffect"


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

    scrollYProgress.onChange((v) => console.log("scrollYProgress:", v))
    
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

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >

        <AnimatePresence>
          {heroInView && (
            <motion.div
              className="text-center z-10"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -100, opacity: 0 }}
              transition={{ duration: 0.8 }}
              style={{ y: textY }}
            >
              <TextReveal text="Nandakishore" />
              <motion.h2
                className="text-2xl mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
              >
                Creative Developer & Designer
              </motion.h2>
              
              <motion.div
                className="mt-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
              >
                <a
                  href="#about"
                  className="inline-block"
                  onClick={(e) => {
                    e.preventDefault()
                    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  <motion.div
                    animate={{
                      y: [0, 10, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                    }}
                  >
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 5V19M12 19L5 12M12 19L19 12"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* About Section */}
      <section
  id="about"
  ref={aboutRef}
  className="relative h-screen flex items-center justify-center"
>
  <AnimatePresence>
    {aboutInView && (
      <motion.div
        className="max-w-2xl text-center z-10"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100px" }}
          className="h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6"
          transition={{ duration: 1, delay: 0.2 }}
        />
        <motion.h2
          className="text-4xl font-bold mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          About Me
        </motion.h2>
        <motion.p
          className="text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          I'm a passionate developer with a deep love for crafting immersive digital experiences. With expertise in
          frontend and backend development, I specialize in building intuitive, high-performance applications that push
          the boundaries of innovation. I thrive on problem-solving, design thinking, and bringing creative ideas to life.
        </motion.p>

        <motion.p
          className="text-lg mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          My journey in tech has led me to master modern web frameworks like React, Next.js, and Node.js. Whether it's
          designing sleek UI components, optimizing user experiences, or architecting scalable backend systems, I
          embrace every challenge with enthusiasm.
        </motion.p>

        <motion.p
          className="text-lg mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Beyond coding, I'm a tech enthusiast who enjoys exploring AI, open-source contributions, and mentoring fellow
          developers. I believe in continuous learning and staying ahead of the curve in this ever-evolving industry.
        </motion.p>

        <motion.div
          className="mt-10 flex justify-center space-x-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
        >
          {[
            { name: "Github", link: "https://github.com/yourusername" },
            { name: "LinkedIn", link: "https://linkedin.com/in/yourusername" },
            { name: "Twitter", link: "https://twitter.com/yourusername" },
            { name: "Dribbble", link: "https://dribbble.com/yourusername" },
          ].map((platform) => (
            <motion.a
              key={platform.name}
              href={platform.link}
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden group text-lg font-medium text-gray-200 hover:text-pink-400 transition"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="block">{platform.name}</span>
              <motion.span
                className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-500 to-pink-500"
                initial={{ x: "-100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
</section>


      {/* Skills Section */}
      <section
  ref={skillsRef}
  className="relative h-screen flex items-center justify-center px-4"
>
  <AnimatePresence>
    {skillsInView && (
      <motion.div
        className="text-center z-10 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100px" }}
          className="h-1 bg-gradient-to-r from-blue-500 to-green-500 mx-auto mb-6"
          transition={{ duration: 1, delay: 0.2 }}
        />
        <motion.h2
          className="text-4xl font-bold mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          My Skills
        </motion.h2>
        <motion.p
          className="text-lg mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Here are the technologies and tools I have worked with:
        </motion.p>
        
        {/* Skill Pills */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          {[
            'C', 'C#', 'C++', 'CSS3', 'GraphQL', 'HTML5', 'Java', 'JavaScript', 'Python',
            'Windows Terminal', 'PHP', 'Flask', 'Django REST', 'FastAPI', 'jQuery', 
            'OpenCV', 'Socket.io', 'Firebase', 'MariaDB', 'MongoDB', 'SQLite', 'Redis',
            'MySQL', 'Blender', 'Figma', 'Anaconda', 'Alibaba Cloud', 'AWS', 'DigitalOcean',
            'Heroku', 'Linode', 'Oracle', 'Unity', 'Godot', 'Unreal Engine', 'Replit',
            'Keras', 'Matplotlib', 'NumPy', 'Pandas', 'PyTorch', 'Scikit-Learn', 'TensorFlow',
            'SciPy', 'Android', 'Arch Linux', 'Kali Linux', 'Linux', 'MacOS', 'Ubuntu',
            'Windows', 'GitHub Actions', 'ChatGPT', 'Arduino', 'Cisco', 'Gradle', 'Grafana',
            'Postman', 'Raspberry Pi', 'Apache', 'Gunicorn', 'Nginx', 'Selenium', 
            'Bitbucket', 'Git'
          ].map((skill, index) => (
            <motion.span
              key={skill}
              className="px-4 py-2 bg-white/10 rounded-full text-sm backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + index * 0.05, duration: 0.5 }}
              whileHover={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                scale: 1.05
              }}
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
</section>


      {/* Projects Section */}
<section
  ref={projectsRef}
  className="relative h-screen flex items-center justify-center"
>
  <AnimatePresence>
    {projectsInView && (
      <motion.div
        className="text-center z-10 max-w-5xl mx-auto px-4"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100px" }}
          className="h-1 bg-gradient-to-r from-yellow-500 to-red-500 mx-auto mb-6"
          transition={{ duration: 1, delay: 0.2 }}
        />
        <motion.h2
          className="text-4xl font-bold mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Featured Projects
        </motion.h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {[
            {
              title: "CID-PHISHER",
              desc: "Framework for generating & hosting phishing webpages.",
              tech: "React, Node, Firebase",
              color: "from-purple-500 to-indigo-500"
            },
            {
              title: "Image-Based Steganography",
              desc: "Hiding and retrieving data in PNG images.",
              tech: "React, Python, Cryptography",
              color: "from-blue-500 to-teal-500"
            },
            {
              title: "ML Recommendation Systems",
              desc: "Music & movie recommendations, stock price prediction.",
              tech: "TensorFlow, Scikit-Learn",
              color: "from-green-500 to-emerald-500"
            },
            {
              title: "Reverse Engineering Apps",
              desc: "Bypassed SSL pinning & exploited encrypted HTTP requests.",
              tech: "Frida, Burp Suite, Smali",
              color: "from-amber-500 to-orange-500"
            }
          ].map((project, index) => (
            <motion.div
              key={project.title}
              className="relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-sm group"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.2, duration: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
              />
              <div className="p-8">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-white/70 mb-4">{project.desc}</p>
                <p className="text-sm text-white/50">{project.tech}</p>
                <div
                  className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${project.color}`}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
        <motion.button
          className="mt-12 px-8 py-3 bg-white/10 rounded-full backdrop-blur-sm hover:bg-white/20 transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View All Projects
        </motion.button>
      </motion.div>
    )}
  </AnimatePresence>
</section>

      {/* Contact Section */}
      {/* Contact Section */}
<section
  ref={contactRef}
  className="relative flex items-center justify-center min-h-screen  text-white"
>
  <AnimatePresence>
    {contactInView && (
      <motion.div
        className="flex flex-col items-center text-center space-y-8 px-4"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.8 }}
      >
        {/* Animated Heading */}
        <motion.h2
          className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Let's Create Something Amazing
        </motion.h2>

        {/* Animated Text */}
        <motion.p
          className="text-gray-300 max-w-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Got an exciting project in mind? Or just want to chat about tech? 
          I'm always open to new opportunities and interesting conversations!
        </motion.p>

        {/* Say Hello Button (Opens Gmail in a new tab) */}
        <motion.a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=nandakishorep212@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full hover:scale-105 transition-all shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          Say Hello
        </motion.a>

        {/* Social Links */}
        <motion.div
          className="flex gap-6 mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {[
            { platform: 'GitHub', link: 'https://github.com/nanda-kshr' },
            { platform: 'LinkedIn', link: 'https://linkedin.com/in/nandakishorep212' }
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.link}
              className="text-gray-400 hover:text-purple-400 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {social.platform}
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
</section>


      {/* Add custom cursor styling */}
      <style jsx global>{`
        body {
          cursor: none;
        }
      `}</style>
    </main>
  )
}