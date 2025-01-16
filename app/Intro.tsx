import { motion } from 'motion/react';
export default function Intro() {
    const introTime = {
        in: 1, del: 1, out: 0.8
    };
    return (
        <>
            <div className="h-[100vh] bg-gray-950 text-white">
                <motion.div className="relative hidden h-full w-full place-items-center md:grid"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ delay: introTime.del + introTime.in, duration: introTime.out }}
                >
                    <motion.h1
                        className="heading-lg absolute max-w-[1200px] origin-center"
                        initial={{ textAlign: "center", opacity: 0 }}
                        animate={{ textAlign: "left", opacity: 1 }}
                        transition={{ duration: introTime.in }}
                    >
                        Hi, I am <span className="hero-heading inline-block">
                            <div className="glitch-wrapper inline-block">
                                <div className="glitch" data-text="Mankirat">Mankirat</div>
                            </div>
                        </span>
                    </motion.h1>
                </motion.div>
            </div>
        </>
    );
}