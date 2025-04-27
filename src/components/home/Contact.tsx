"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";
import { FaEnvelope, FaGithub, FaLinkedin, FaDiscord } from "react-icons/fa";

type ContactProps = {
    contactRef: React.RefObject<HTMLElement> | ((node?: Element | null | undefined) => void);
    contactInView: boolean;
};

export default function Contact({ contactRef, contactInView }: ContactProps) {
    // Digital lines effect (similar to other components)
    const digitalLines = useMemo(() => 
        Array(10).fill(0).map(() => ({
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.2,
            delay: Math.random() * 3,
            duration: Math.random() * 8 + 10,
        })), []
    );

    // Current date and user information - updated with exact values provided
    const currentInfo = {
        date: "2025-04-27 04:14:34",
        user: "nanda-kshr"
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
            },
        },
    };

    return (
        <section
            ref={contactRef}
            id="contact"
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black py-16 sm:py-20"
        >
            {/* Digital circuit background effect */}
            <div className="absolute inset-0 z-0 opacity-5 pointer-events-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <pattern id="contact-circuit" width="100" height="100" patternUnits="userSpaceOnUse">
                        <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="none" stroke="#4CAF50" strokeWidth="0.5" />
                        <circle cx="50" cy="50" r="3" fill="#4CAF50" />
                        <path d="M50,0 L50,100 M0,50 L100,50" stroke="#4CAF50" strokeWidth="0.5" />
                        <path d="M25,25 L25,75 L75,75 L75,25 Z" fill="none" stroke="#4CAF50" strokeWidth="0.5" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#contact-circuit)" />
                </svg>
            </div>

            {/* Digital lines effect */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                {digitalLines.map((line, i) => (
                    <motion.div
                        key={`contact-digital-line-${i}`}
                        className="absolute w-px h-16 bg-gradient-to-b from-transparent via-green-400 to-transparent"
                        style={{
                            left: line.left,
                            top: -64,
                            opacity: line.opacity,
                        }}
                        initial={{ y: 0, opacity: 0 }}
                        animate={{
                            y: [0, typeof window !== 'undefined' ? window.innerHeight + 64 : 1000],
                            opacity: [0, line.opacity, 0],
                        }}
                        transition={{
                            duration: line.duration,
                            repeat: Infinity,
                            ease: "linear",
                            delay: line.delay,
                            repeatType: "loop",
                        }}
                    />
                ))}
            </div>

            <AnimatePresence mode="wait">
                {contactInView && (
                    <motion.div
                        className="z-10 w-full max-w-4xl mx-auto px-4 sm:px-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="mb-8 sm:mb-12 text-center"
                        >
                            <div className="inline-block px-4 py-1 mb-4 rounded-full bg-green-500/10 border border-green-500/20 text-green-300 text-xs uppercase tracking-widest font-light">
                                Connect
                            </div>
                            <h2 
                                className="text-3xl sm:text-4xl md:text-5xl font-bold text-white"
                                style={{
                                    textShadow: "0 0 15px rgba(76, 175, 80, 0.3)",
                                }}
                            >
                                Let's Create <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Something Amazing</span>
                            </h2>
                            <div className="h-px w-24 sm:w-32 mx-auto mt-4 sm:mt-6 bg-gradient-to-r from-transparent via-green-500/60 to-transparent"></div>
                            
                            <p className="text-gray-300 mt-4 sm:mt-8 max-w-2xl mx-auto text-sm sm:text-base">
                                Got an exciting project in mind? Or just want to chat about tech?
                                I'm always open to new opportunities and interesting conversations!
                            </p>
                        </motion.div>

                        {/* Contact meta info */}
                        <motion.div 
                            className="text-xs text-gray-500 mb-6 sm:mb-8 mx-auto text-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                        >
                            <span className="font-mono">Last updated: {currentInfo.date} | </span>
                            <span className="font-mono">Developer: {currentInfo.user}</span>
                        </motion.div>

                        {/* Contact Card */}
                        <motion.div
                            className="backdrop-blur-sm bg-black/40 rounded-xl p-4 sm:p-8 border border-green-500/20 max-w-3xl mx-auto shadow-[0_0_30px_rgba(76,175,80,0.15)]"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {/* Terminal-like Email */}
                            <motion.div 
                                variants={itemVariants}
                                className="mb-6 sm:mb-8 bg-black/60 rounded-lg p-3 sm:p-4 border border-green-500/10"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="text-[10px] sm:text-xs text-gray-500 font-mono">contact@terminal:~</div>
                                    <div className="flex space-x-2">
                                        <div className="w-2 h-2 rounded-full bg-red-500/80"></div>
                                        <div className="w-2 h-2 rounded-full bg-yellow-500/80"></div>
                                        <div className="w-2 h-2 rounded-full bg-green-500/80"></div>
                                    </div>
                                </div>
                                <div className="font-mono text-xs sm:text-sm">
                                    <span className="text-green-400">$</span> <span className="text-gray-300">echo</span> <span className="text-emerald-300">"My Email Address"</span>
                                </div>
                                <div className="mt-2 font-mono text-xs sm:text-sm flex items-center flex-wrap">
                                    <FaEnvelope className="text-green-400 mr-2" />
                                    <span className="text-gray-300 break-all">nandakishorep212@gmail.com</span>
                                </div>
                                <div className="h-4"></div>
                                <div className="flex">
                                    <span className="text-green-400 mr-2">$</span>
                                    <span className="inline-block h-4 w-2 bg-green-400 animate-pulse"></span>
                                </div>
                            </motion.div>

                            {/* Contact Options */}
                            <motion.div 
                                variants={itemVariants}
                                className="text-center"
                            >
                                <h3 className="text-base sm:text-lg mb-4 text-white">Reach Out Through</h3>
                                
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                                    {/* Email Option */}
                                    <div 
                                        className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-3 sm:p-5 rounded-lg border border-green-500/20 hover:border-green-500/50 transition-all group"
                                    >
                                        <div className="flex flex-col items-center">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-green-500/20 mb-2 sm:mb-3 group-hover:bg-green-500/30 transition-colors">
                                                <FaEnvelope className="text-green-400 text-lg sm:text-xl" />
                                            </div>
                                            <h4 className="text-white text-sm sm:text-base mb-1">Email</h4>
                                            <p className="text-gray-400 text-xs sm:text-sm">Direct message</p>
                                            <div className="text-green-400 mt-2 sm:mt-3 text-[10px] sm:text-xs group-hover:text-green-300 break-all px-1">
                                                nandakishorep212@gmail.com
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* GitHub Option */}
                                    <div 
                                        className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-3 sm:p-5 rounded-lg border border-green-500/20 hover:border-green-500/50 transition-all group"
                                    >
                                        <div className="flex flex-col items-center">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-green-500/20 mb-2 sm:mb-3 group-hover:bg-green-500/30 transition-colors">
                                                <FaGithub className="text-green-400 text-lg sm:text-xl" />
                                            </div>
                                            <h4 className="text-white text-sm sm:text-base mb-1">GitHub</h4>
                                            <p className="text-gray-400 text-xs sm:text-sm">View my code</p>
                                            <div className="text-green-400 mt-2 sm:mt-3 text-[10px] sm:text-xs group-hover:text-green-300">
                                                github.com/nanda-kshr
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* LinkedIn Option */}
                                    <div 
                                        className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-3 sm:p-5 rounded-lg border border-green-500/20 hover:border-green-500/50 transition-all group sm:col-span-2 lg:col-span-1 sm:max-w-xs sm:mx-auto lg:max-w-none"
                                    >
                                        <div className="flex flex-col items-center">
                                            <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-green-500/20 mb-2 sm:mb-3 group-hover:bg-green-500/30 transition-colors">
                                                <FaLinkedin className="text-green-400 text-lg sm:text-xl" />
                                            </div>
                                            <h4 className="text-white text-sm sm:text-base mb-1">LinkedIn</h4>
                                            <p className="text-gray-400 text-xs sm:text-sm">Connect professionally</p>
                                            <div className="text-green-400 mt-2 sm:mt-3 text-[10px] sm:text-xs group-hover:text-green-300">
                                                linkedin.com/in/nandakishorep212
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Reply Time */}
                            <motion.div 
                                variants={itemVariants}
                                className="mt-6 sm:mt-8 text-center"
                            >
                                <div className="flex items-center justify-center gap-2 text-gray-400 text-xs sm:text-sm">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                    <span>Usually responds within 24 hours</span>
                                </div>
                            </motion.div>
                        </motion.div>

                        {/* Say Hello CTA - With no clickable links for magnetic cursor compatibility */}
                        <motion.div
                            className="mt-8 sm:mt-12 text-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                        >
                            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 inline-flex items-center px-6 sm:px-8 py-3 sm:py-4 rounded-full border border-green-500/30">
                                <div className="flex items-center gap-2">
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 font-medium text-sm sm:text-base">
                                        Looking forward to hearing from you!
                                    </span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Bottom decorative element */}
                        <motion.div 
                            className="mt-10 sm:mt-16 flex justify-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1 }}
                        >
                            <div className="flex items-center gap-2">
                                <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-transparent to-green-500/60"></div>
                                <div className="text-green-400/70 text-xs uppercase tracking-widest font-light">Connect Anytime</div>
                                <div className="h-px w-8 sm:w-12 bg-gradient-to-l from-transparent to-green-500/60"></div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}