import { useState, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import CreativePortfolio from "./CreativePortfolio";
import Projects from "./components/projects/Projects";
import './App.css';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center">
        <div className="text-[#90EE90] text-2xl font-mono">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <AnimatePresence mode="wait">
        {pathname === '/' ? (
          <CreativePortfolio key="home" />
        ) : pathname === '/projects' ? (
          <Projects key="projects" />
        ) : null}
      </AnimatePresence>
    </div>
  );
}
