"use client";

import { useEffect, useRef } from "react";

interface MagneticCursorProps {
  cursorPosition: { x: number; y: number };
}

const MagneticCursor = ({ cursorPosition }: MagneticCursorProps) => {
  const cursorOuterRef = useRef<HTMLDivElement>(null);
  const cursorInnerRef = useRef<HTMLDivElement>(null);
  const previousPositionRef = useRef({ x: 0, y: 0 });
  const targetPositionRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number>();
  
  // Initialize animation
  useEffect(() => {
    const initialX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
    const initialY = typeof window !== 'undefined' ? window.innerHeight / 2 : 0;
    
    previousPositionRef.current = { x: initialX, y: initialY };
    targetPositionRef.current = { x: initialX, y: initialY };
    
    // Cleanup animation frame on unmount
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);
  
  // Handle mouse movement updates
  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      // Update target position with current mouse coordinates
      targetPositionRef.current = { x: e.clientX, y: e.clientY };
      
      // Directly update outer cursor (fast)
      if (cursorOuterRef.current) {
        cursorOuterRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    };
    
    // Use passive listener for better performance
    document.addEventListener('mousemove', updateCursorPosition, { passive: true });
    
    return () => {
      document.removeEventListener('mousemove', updateCursorPosition);
    };
  }, []);
  
  // Animate inner cursor to follow outer cursor with lag
  useEffect(() => {
    const animateInnerCursor = () => {
      // Get current positions
      const { x: prevX, y: prevY } = previousPositionRef.current;
      const { x: targetX, y: targetY } = targetPositionRef.current;
      
      // Calculate new position with easing (follow with lag)
      // Adjust the 0.15 value to control the lag amount (higher = more lag)
      const newX = prevX + (targetX - prevX) * 0.15;
      const newY = prevY + (targetY - prevY) * 0.15;
      
      // Update inner cursor position
      if (cursorInnerRef.current) {
        cursorInnerRef.current.style.transform = `translate(${newX}px, ${newY}px) translate(-50%, -50%)`;
      }
      
      // Save current position for next frame
      previousPositionRef.current = { x: newX, y: newY };
      
      // Continue animation
      frameRef.current = requestAnimationFrame(animateInnerCursor);
    };
    
    // Start animation
    frameRef.current = requestAnimationFrame(animateInnerCursor);
    
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  // Handle hover effects on interactive elements
  useEffect(() => {
    const handleMouseOver = () => {
      if (cursorOuterRef.current && cursorInnerRef.current) {
        cursorOuterRef.current.classList.add("cursor-hover");
        cursorInnerRef.current.classList.add("cursor-dot-hover");
      }
    };

    const handleMouseOut = () => {
      if (cursorOuterRef.current && cursorInnerRef.current) {
        cursorOuterRef.current.classList.remove("cursor-hover");
        cursorInnerRef.current.classList.remove("cursor-dot-hover");
      }
    };

    // Select all interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, input, textarea, select, [role="button"], [role="link"]'
    );

    interactiveElements.forEach((element) => {
      element.addEventListener("mouseover", handleMouseOver);
      element.addEventListener("mouseout", handleMouseOut);
    });

    return () => {
      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseover", handleMouseOver);
        element.removeEventListener("mouseout", handleMouseOut);
      });
    };
  }, []);

  return (
    <>
      {/* Outer circle - moved size from w-8 h-8 to w-12 h-12 (50% increase) */}
      <div
        ref={cursorOuterRef}
        className="fixed w-12 h-12 border border-white rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          transform: `translate(${cursorPosition.x}px, ${cursorPosition.y}px) translate(-50%, -50%)`,
          willChange: "transform", // Hardware acceleration hint
          transition: "width 0.2s, height 0.2s, background-color 0.2s" 
        }}
      />
      
      {/* Inner dot - moved size from w-2 h-2 to w-4 h-4 (100% increase) */}
      <div
        ref={cursorInnerRef}
        className="fixed w-4 h-4 bg-white rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          transform: `translate(${cursorPosition.x}px, ${cursorPosition.y}px) translate(-50%, -50%)`,
          willChange: "transform" // Hardware acceleration hint
        }}
      />
      
      <style jsx global>{`
        .cursor-hover {
          width: 4rem;
          height: 4rem;
          background-color: rgba(255, 255, 255, 0.1);
        }
        
        .cursor-dot-hover {
          opacity: 0;
        }
        
        body {
          cursor: none;
        }
      `}</style>
    </>
  );
};

export default MagneticCursor;