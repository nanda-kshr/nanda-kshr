"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

const MagneticCursor = ({ cursorPosition }: { cursorPosition: { x: number; y: number } }) => {
  const [magneticElements, setMagneticElements] = useState<Element[]>([])

  useEffect(() => {
    setMagneticElements(Array.from(document.querySelectorAll("[data-magnetic]")))
  }, [])

  const { x, y } = cursorPosition

  return (
    <>
      <motion.div
        className="fixed w-6 h-6 rounded-full bg-white mix-blend-difference pointer-events-none z-50"
        animate={{ x: x - 12, y: y - 12 }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />
      <motion.div
        className="fixed w-12 h-12 rounded-full border-2 border-white mix-blend-difference pointer-events-none z-50"
        animate={{ x: x - 24, y: y - 24 }}
        transition={{ type: "spring", stiffness: 250, damping: 24 }}
      />
      {magneticElements.map((el, index) => {
        const rect = el.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const distance = Math.hypot(centerX - x, centerY - y)

        const magnetism = Math.min(distance, 200)
        const pull = (200 - magnetism) / 4

        return (
          <motion.div
            key={index}
            className="fixed rounded-full mix-blend-difference pointer-events-none z-40"
            animate={{
              x: centerX + (x - centerX) * (pull / distance),
              y: centerY + (y - centerY) * (pull / distance),
              width: rect.width,
              height: rect.height,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )
      })}
    </>
  )
}

export default MagneticCursor

