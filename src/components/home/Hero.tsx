import { AnimatePresence, motion, MotionValue } from "framer-motion";
import TextReveal from "../TextReveal";


interface HeroProps {
    heroRef: React.RefObject<HTMLElement> | ((node?: Element | null | undefined) => void);
    heroInView: boolean;
    textY?: MotionValue<string>;
}


export default function Skills({ heroRef, heroInView, textY }: HeroProps) {
    return (
        <section
            ref={heroRef}
            className="relative h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Navigation Guide Arrow */}
            <motion.div
                className="absolute right-24 md:right-32 lg:right-40 top-1/2 transform -translate-y-1/2 z-40 hidden sm:block"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 2.5, duration: 0.5 }}
            >
                <motion.div
                    className="flex items-center gap-3 text-[#90EE90]"
                    animate={{
                        x: [0, 10, 0],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                >
                    <span className="text-base md:text-lg lg:text-xl font-light tracking-wide">Navigate</span>
                    <svg
                        width="28"
                        height="28"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 md:w-7 md:h-7 lg:w-8 lg:h-8"
                    >
                        <path
                            d="M5 12H19M19 12L12 5M19 12L12 19"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </motion.div>
            </motion.div>

            {/* Mobile Navigation Hint */}
            <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40 sm:hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5, duration: 0.5 }}
            >
                <motion.div
                    className="flex items-center gap-2 text-[#90EE90]"
                    animate={{
                        y: [0, 5, 0],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                >
                    <span className="text-base font-light">Swipe to navigate</span>
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                    >
                        <path
                            d="M9 5L16 12L9 19"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </motion.div>
            </motion.div>

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
    );
}