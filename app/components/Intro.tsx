import { motion } from 'motion/react';
import { useAppContext } from '../AppContext';
import { useEffect } from 'react';

export default function Intro() {
    const { setIntroPlayed } = useAppContext();

    const introTime = {
        in: 1, del: 1, out: 0.8
    };
    useEffect(() => {
        const timer = setTimeout(() => {
            setIntroPlayed(true);
        }, (introTime.in + introTime.del + introTime.out) * 1000);

        return () => clearTimeout(timer);
    }, [setIntroPlayed]);


    return (
        <>
            <div className="h-screen bg-transparent text-white">
                <motion.div
                    className="relative flex h-full w-full flex-col items-center justify-center p-4 md:grid md:place-items-center"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ delay: introTime.del + introTime.in, duration: introTime.out }}
                >
                    <motion.h1
                        className="heading-lg origin-center max-w-[1200px]"
                        initial={{ textAlign: "center", opacity: 0 }}
                        animate={{ textAlign: "left", opacity: 1 }}
                        transition={{ duration: introTime.in }}
                    >
                        Hi, I am{" "}
                        <span className="hero-heading inline-block">
                            <div className="glitch-wrapper inline-block">
                                <div className="glitch" data-text="Mankirat">
                                    Mankirat
                                </div>
                            </div>
                        </span>
                    </motion.h1>
                </motion.div>
            </div>
        </>
    );
}