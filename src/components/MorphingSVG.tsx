"use client"

import { motion } from "framer-motion"

const MorphingSVG = () => {
  const variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 2, ease: "easeInOut" },
    },
  }

  return (
    <svg width="200" height="200" viewBox="0 0 200 200">
      <motion.path
        d="M100,20 L180,90 L100,180 L20,90 Z"
        stroke="#fff"
        strokeWidth="4"
        fill="none"
        initial="hidden"
        animate="visible"
        variants={variants}
      />
      <motion.path
        d="M20,20 L180,20 L180,180 L20,180 Z"
        stroke="#fff"
        strokeWidth="4"
        fill="none"
        initial="hidden"
        animate="visible"
        variants={variants}
      />
      <motion.circle
        cx="100"
        cy="100"
        r="80"
        stroke="#fff"
        strokeWidth="4"
        fill="none"
        initial="hidden"
        animate="visible"
        variants={variants}
      />
    </svg>
  )
}

export default MorphingSVG

