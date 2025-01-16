import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function ChangingText({ texts, classname }: { texts: string[], classname?: string }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const words = texts.map(text => text.split(" "));

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % words.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [words.length]);

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, duration: 0.5 },
        },
        exit: { transition: { staggerChildren: 0.2, duration: 0.5 } }
    };

    const child = {
        visible: {
            opacity: 1,
            transition: { duration: 0.5 },
        },
        hidden: {
            opacity: 0,
            transition: { duration: 0.5 },
        },
        exit: {
            opacity: 0,
            transition: { duration: 0.5 },
        },
    };

    return (
        <AnimatePresence mode="wait">
            <motion.div
                variants={container}
                initial="hidden"
                animate="visible"
                exit="exit"
                key={currentIndex}
                className={`flex ${classname}`}
            >
                {words[currentIndex].map((word2, wordIndex) => (
                    <motion.span
                        variants={child}
                        style={{ marginRight: "8px" }}
                        key={wordIndex}
                    >
                        {word2}
                    </motion.span>
                ))}
            </motion.div>
        </AnimatePresence>
    );
}
