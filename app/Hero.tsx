import { motion } from 'motion/react';
export default function Hero() {
    const words = "hello i am mankirat singh".split(" ");

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
        }),
    };

    const child = {
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
        hidden: {
            opacity: 0,
            x: 20,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 100,
            },
        },
    };
    return (
        <>
            <div className="h-[100vh] bg-gray-950 text-white flex p-30">
                <div className="h-full text-center">
                    <h1 className="heading-md hero-heading">
                        <div className="glitch-wrapper">
                            <div className="glitch" data-text="Mankirat Singh">Mankirat Singh</div>
                        </div>
                    </h1>
                    <h1 className='text-4xl font-semibold'>I am a Full Stack Developer</h1>

                </div>
            </div>
            <motion.div
                className='flex'
                variants={container}
                initial="hidden"
                animate="visible"
            >
                {words.map((word, index) => (
                    <motion.span
                        variants={child}
                        style={{ marginRight: "5px" }}
                        key={index}
                    >
                        {word}
                    </motion.span>
                ))}
            </motion.div>
        </>
    );
}