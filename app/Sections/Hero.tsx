import { motion, useScroll, useTransform } from 'motion/react';
import ChangingText from '../components/ChangingText';
import Image from 'next/image';
import Button from '../components/Button';
import { useRef } from 'react';
import { MENULINKS } from '../components/Menu';

const SOCIAL_LINKS = {
    linkedin: "https://www.linkedin.com/in/mankiratsingh1315/",
    github: "https://github.com/MankiratSingh1315",
    instagram: "https://www.instagram.com/mankiratsingh1315/",
};

const RenderSocialLinks = (): React.ReactNode =>
    (Object.keys(SOCIAL_LINKS) as (keyof typeof SOCIAL_LINKS)[]).map((el) => (
        <motion.a
            href={SOCIAL_LINKS[el]}
            key={el}
            className="hover:opacity-80 duration-300 md:mr-4 mr-2 flex"
            rel="noreferrer"
            target="_blank"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
                delay: 0.2 * (Object.keys(SOCIAL_LINKS).indexOf(el) + 1),
                duration: 0.5,
            }}
        >
            <Image src={`/social/${el}.svg`} alt={el} width={40} height={40} />
        </motion.a>
    ));
const { ref: heroSectionRef } = MENULINKS[0]
export default function Hero() {
    const heroScrollRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: heroScrollRef });
    const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
    return (
        <div
            style={{
                height: '200vh',
                marginBottom: '-200vh',
            }}
            ref={heroScrollRef}
            id={heroSectionRef}
            
        >
            <motion.div className="h-screen w-screen text-white flex flex-col md:flex-row justify-center items-center md:gap-28 gap-8 sticky top-0"
                style={{ opacity }}
            >
                <div className="md:h-full flex flex-col gap-5 justify-center md:items-end items-center">
                    <motion.h1
                        className="heading-md hero-heading"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <div className="glitch-wrapper">
                            <div className="glitch" data-text="Mankirat Singh">Mankirat Singh</div>
                        </div>
                    </motion.h1>
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                    >
                        <ChangingText
                            texts={[
                                "Student at TIET, Patiala",
                                "Computer Engineer",
                                "Full Stack Developer",
                                "Open Source Contibutor",
                            ]}
                            classname="font-semibold text-3xl"
                        />
                    </motion.div>
                    <motion.div
                        className="flex seq mb-5"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                    >
                        <RenderSocialLinks />
                    </motion.div>
                    <motion.div
                        className="flex gap-5"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                    >
                        <Button href="/resume" className="bg-white text-black">Resume</Button>
                        <Button
                            href="mailto:msingh2_be22@thapar.edu"
                            className=" text-white border-2 border-white"
                        >
                            Let&rsquo;s Talk
                        </Button>
                    </motion.div>
                </div>
                <motion.div
                    className="rounded-full aspect-square overflow-hidden bg-white m-[10vw] md:m-0"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                >
                    <Image src="/me.png" alt="Mankirat Singh" width={400} height={400} />
                </motion.div>
            </motion.div>
        </div>
    );
}
