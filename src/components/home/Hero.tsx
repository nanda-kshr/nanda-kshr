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