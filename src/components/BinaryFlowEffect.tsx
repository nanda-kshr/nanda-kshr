"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface BinaryParticle {
  id: number;
  x: number;
  y: number;
  value: string;
  size: number;
  opacity: number;
  speed: number;
}

const BinaryFlowEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<BinaryParticle[]>([]);
  const animationRef = useRef<number>();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Initialize dimensions and create particles
  useEffect(() => {
    const updateDimensions = () => {
      if (typeof window !== 'undefined') {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);
  
  // Create particles once when dimensions are set
  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0 && !isInitialized) {
      const newParticles: BinaryParticle[] = [];
      const particleCount = Math.floor((dimensions.width * dimensions.height) / 10000);
      
      for (let i = 0; i < particleCount; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * dimensions.width,
          y: Math.random() * -dimensions.height,  // <- Start above the screen
          value: Math.random() > 0.5 ? "1" : "0",
          size: Math.random() * 14 + 10,
          opacity: Math.random() * 0.5 + 0.1,
          // Increased speed by multiplying by 5 for faster rain
          speed: Math.random() * (0.5 - 0.01 + 1) * 5 + 0.8,
        });
      }
      
      particlesRef.current = newParticles;
      setIsInitialized(true);
    }
  }, [dimensions.width, dimensions.height, isInitialized]);
  
  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Animation loop - using refs to avoid state updates during animation
  useEffect(() => {
    if (!canvasRef.current || !isInitialized) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);
      
      // Update and draw particles without updating state
      particlesRef.current = particlesRef.current.map(particle => {
        // Calculate distance from mouse
        const dx = mousePosition.x - particle.x;
        const dy = mousePosition.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Move away from mouse if close - increased reaction radius and strength
        let newX = particle.x;
        let newY = particle.y;
        
        // Increased mouse reaction distance from 200 to 300
        // Increased repulsion force from 2 to 5
        if (distance < 300) {
          newX -= (dx / distance) * 5;
          newY -= (dy / distance) * 5;
        }
        
        // Normal movement
        newY += particle.speed;
        
        // Reset if out of bounds
        if (newY > dimensions.height) {
          newY = 0;
          newX = Math.random() * dimensions.width;
        }
        
        if (newX < 0) newX = dimensions.width;
        if (newX > dimensions.width) newX = 0;
        
        // Change binary value occasionally
        const newValue = Math.random() > 0.995 
          ? (particle.value === "1" ? "0" : "1") 
          : particle.value;
        
        // Draw the binary digit
        ctx.font = `${particle.size}px monospace`;
        ctx.fillStyle = `rgba(144, 238, 144, ${particle.opacity})`;
        ctx.fillText(newValue, newX, newY);
        
        return {
          ...particle,
          x: newX,
          y: newY,
          value: newValue
        };
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [dimensions, mousePosition, isInitialized]);
  
  return (
    <motion.div 
      className="fixed inset-0 z-0 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="absolute inset-0"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black pointer-events-none"></div>
    </motion.div>
  );
};

export default BinaryFlowEffect;