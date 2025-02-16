import React, { useState, useEffect } from 'react';
import { Linkedin, Mail, ExternalLink, Code, Terminal } from 'lucide-react';

const CreativePortfolio = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    // Simulate loading
    setTimeout(() => setIsLoading(false), 2000);
    
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const projects = [
    {
      title: "Neural Network Visualizer",
      description: "Interactive 3D visualization of neural networks",
      color: "from-purple-500 to-pink-500",
      link: "#"
    },
    {
      title: "Crypto Portfolio Tracker",
      description: "Real-time cryptocurrency dashboard",
      color: "from-blue-500 to-teal-500",
      link: "#"
    },
    {
      title: "AI Music Generator",
      description: "Generate music using machine learning",
      color: "from-orange-500 to-red-500",
      link: "#"
    }
  ];

  if (isLoading) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <div className="text-6xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background Gradient */}
      <div 
        className="fixed inset-0 opacity-20 transition-all duration-1000 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99,102,241,0.15) 0%, rgba(99,102,241,0) 50%)`
        }}
      />

      {/* Navigation Dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 space-y-4 z-50">
        {['home', 'projects', 'about', 'contact'].map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeSection === section 
                ? 'bg-white scale-150' 
                : 'bg-gray-600 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center relative px-4">
        <div className="text-center z-10">
          <h1 className="text-7xl md:text-9xl font-bold mb-6 relative">
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
              Creative
            </span>
            <br />
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent animate-gradient-reverse">
              Developer
            </span>
          </h1>
          
          <div className="flex justify-center space-x-6 mt-12">
            {[Mail, Linkedin, Mail].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="transform hover:scale-125 transition-all duration-300"
              >
                <Icon 
                  size={32}
                  className="hover:text-purple-500 transition-colors"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Floating Elements */}
        <Code 
          size={48} 
          className="absolute top-1/4 left-1/4 animate-float text-purple-500 opacity-25"
        />
        <Terminal 
          size={64} 
          className="absolute bottom-1/4 right-1/4 animate-float-delay text-blue-500 opacity-25"
        />
      </section>

      {/* Projects Section */}
      <section className="min-h-screen py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-16 text-center">
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Featured Work
            </span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl aspect-square"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-75 transition-all duration-500 group-hover:opacity-100`} />
                
                <div className="absolute inset-0 p-6 flex flex-col justify-between transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                  <h3 className="text-2xl font-bold">{project.title}</h3>
                  <div>
                    <p className="text-lg mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {project.description}
                    </p>
                    <a
                      href={project.link}
                      className="inline-flex items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200"
                    >
                      Explore <ExternalLink size={16} className="ml-2" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="min-h-screen py-20 px-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-5xl font-bold mb-12 text-center">
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              About Me
            </span>
          </h2>
          
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 transform hover:scale-105 transition-all duration-500">
            <p className="text-xl leading-relaxed text-gray-300">
              I'm a creative developer who blends art and technology to create immersive digital experiences. 
              With expertise in frontend development, WebGL, and creative coding, I push the boundaries of what's 
              possible on the web. Every project is an opportunity to innovate and create something unique.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {['React', 'WebGL', 'Three.js', 'GSAP'].map((skill, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-lg rounded-lg p-4 text-center transform hover:scale-110 transition-all duration-300"
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="min-h-screen py-20 px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-12">
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Let's Create Together
            </span>
          </h2>
          
          <a
            href="mailto:contact@example.com"
            className="inline-block relative group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg blur group-hover:blur-md transition-all duration-300" />
            <span className="relative block px-8 py-4 bg-black rounded-lg border border-white/10 text-xl font-bold group-hover:bg-black/50 transition-all duration-300">
              Get in Touch
            </span>
          </a>
        </div>
      </section>
    </div>
  );
};

export default CreativePortfolio;

/* Add these animations to your global CSS */
const globalStyles = `
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}

@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delay {
  animation: float 6s ease-in-out infinite;
  animation-delay: 2s;
}

.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 8s linear infinite;
}

.animate-gradient-reverse {
  background-size: 200% 200%;
  animation: gradient 8s linear infinite reverse;
}
`;