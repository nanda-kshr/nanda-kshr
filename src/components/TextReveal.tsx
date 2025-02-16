"use client"

import { motion } from "framer-motion"

const TextReveal = ({ text }: { text: string }) => {
  const characters = text.split("")

  return (
    <h1 className="text-6xl font-bold">
      {characters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="inline-block"
        >
          {char}
        </motion.span>
      ))}
    </h1>
  )
}

export default TextReveal

