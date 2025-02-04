import { motion, useScroll, useTransform, AnimatePresence, MotionValue } from "motion/react"; // Changed import to framer-motion
import { useEffect, useMemo, useRef, useState } from "react";
import Button from "../components/Button";
import { MENULINKS } from "../components/Menu";

export const PROJECTS = [
    {
        name: "Founding Engineer - Storoo",
        image: "/timeline/storoo.jpg",
        description: "Developed end-to-end portal and implemented a role-based authentication system using NextJS, Lucia and Postgres, ensuring secure access control. The platform is deployed on AWS with a robust architecture utilizing Docker, NGINX, and GitHub Actions for automated deployments and continuous integration. Optimized performance and scalability to support high-traffic loads effectively.",
        url: "https://www.storoo.in/",
        tech: ["next", "postgres-sql", "docker", "nginx", "aws", "github", "github-actions"],
    },
    {
        name: "LUNAR - Moon Navigation",
        image: "/projects/lunar.gif",
        description: "Designed an advanced moon navigation system leveraging Chandrayaan-2 data to enhance lunar surface exploration. Integrated YOLOv5 for object detection and U-Net for segmentation to analyze terrain features. Developed an interactive 3D visualization using ThreeJS, providing an intuitive and immersive user experience. The project was honored by the President of India for its innovation in space technology.",
        url: "https://rover.mankiratsingh.com/",
        tech: ["react","threejs","python"],
    },
    {
        name: "Feedback App TIET",
        image: "/projects/feedbck.png",
        description: "Engineered a student feedback system using Flutter and NextJS, integrated with PHP and MySQL to efficiently manage responses from over 10,000 users. Designed a seamless UI using Material-UI for intuitive interactions. Optimized the database structure to handle large-scale data operations while ensuring security and reliability.",
        url: "",
        tech: ["flutter", "next", "mysql","php","mui"],
    },
    {
        name: "PDF Rag Bot",
        image: "/projects/qna.png",
        description: "Built an intelligent PDF-based question-answering chatbot using Retrieval-Augmented Generation (RAG) and Llama3. Utilized Faiss for efficient vector search, Streamlit for the frontend, and PyPDF for PDF parsing. The system enables users to query uploaded documents dynamically, retrieving precise information in real-time.",
        url: "https://github.com/MankiratSingh1315/rag-based-flamingo-qna/",
        tech: ["streamlit", "python","ollama"],
    },
    {
        name: "Thapar Food Festival Website",
        image: "/projects/tff.png",
        description: "Developed the official website for North India’s largest food festival, featuring a visually appealing gallery page viewed by over 5,000 users. Implemented an engaging UI/UX using React, JavaScript, and CSS to ensure a seamless browsing experience. Optimized image loading and website performance for faster access.",
        url: "https://thaparfoodfestival.vercel.app/",
        tech: ["react", "javascript", "css"],
    },
    {
        name: "Makethon 6 App",
        image: "/projects/make5app.png",
        description: "Designed a comprehensive Flutter-based mobile application for hackathon management, catering to 500+ participants and facilitating 100+ project submissions. Integrated Firebase for real-time notifications, authentication, and data storage. Enhanced user experience with an intuitive dashboard for tracking events, teams, and project progress.",
        url: "https://makeathon6.mlsctiet.com/Makeathon6.apk",
        tech: ["flutter", "firebase"],
    },
    {
        name: "IRC Server in C",
        image: "/projects/IRC-UI.png",
        description: "Implemented a terminal-based IRC chatroom from scratch using C and C++. Utilized WebSockets to enable real-time messaging, supporting multiple users simultaneously. Designed a command-based interface for seamless communication and efficient data handling over network sockets.",
        url: "https://github.com/MicrosoftStudentChapter/IRC-Server",
        tech: ["c", "c++","websocket"],
    },    
];


// {
//     name: "GitHub Organisation Portfolio Generator",
//     image: "/projects/gopg.png",
//     description: "Tool to showcase org projects, contributors from GitHub on a single webpage.",
//     url: "https://github.com/ips610/Github-Oraganization-Dashboard-Creator",
//     tech: ["react", "flask", "firebase", "nginx"],
// },
const SKILLS = {
    languages: ["c", "c++", "css", "javascript", "typescript", "dart", "python","php"],
    frameworks: ["nodejs", "expressjs", "flask", "flutter", "next"],
    libraries: ["selenium", "mui", "react","motion", "sklearn","opencv","threejs","streamlit"],
    databases: ["mysql","postgres-sql", "mongodb", "firebase", "appwrite"],
    devTools: ["nginx", "vscode", "docker", "i-use-popos-btw", "git", "github", "azure","aws", "bash", "aftereffects", "figma", "github-actions", "ollama"],
};

const flattenedSkills = Object.values(SKILLS).flat();

const step = 1 / (PROJECTS.length);

function ProjDesc({ project, index, scrollYProgress }: { project: typeof PROJECTS[0], index: number, scrollYProgress: MotionValue<number> }) {
    const start = index * step;
    const midStart = start + (index == 1 ? 0.01 : 0.02);
    const midEnd = start + step * (index == 1 ? 1 : 0.9);
    const end = (index + 1) * step;
    const opacity = useTransform(scrollYProgress, [start, midStart, midEnd, end], [0, 1, 1, 0]);
    const zIndex = useTransform(scrollYProgress, [start, midStart, midEnd, end], [-1, 1, 1, -1]);

    return (
        <motion.div
            key={index}
            className="absolute md:h-screen min-h-[40vh] flex flex-col items-center justify-center overflow-hidden"
            style={{ opacity, zIndex }}
        >
            <img
                src={project.image}
                alt={project.name}
                className="md:rounded-full absolute object-fill md:object-cover md:w-[38vw] w-[90vw] md:aspect-square object-top overflow-hidden"
            />
            <div className="bg-white/60 backdrop-blur-sm md:w-[38vw] md:h-[38vw] md:rounded-full text-black flex flex-col gap-2 items-center justify-center md:p-[20%] p-[7%] text-center">
                <h1 className="font-semibold text-3xl">{project.name}</h1>
                <p className="text-md text-center">{project.description}</p>
                {project.url!=="" ? (
                    <Button href={project.url} className="text-black border-2 border-black z-50">
                        View Project
                    </Button>
                ) : (
                    <Button className="text-black border-2 border-black z-50">Coming Soon</Button>
                )}
            </div>
        </motion.div>
    );
}
const { ref: projectSectionRef } = MENULINKS[1]

export default function Projects() {
    const projectRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: projectRef });

    const fadeIn = useTransform(
        scrollYProgress,
        [0.02, 1 / (PROJECTS.length), 1 - 1 / (PROJECTS.length)+0.05, 0.99],
        [0, 1, 1, 0]
    );


    const skillPositions = useMemo(() => {
        return flattenedSkills.map((skill, index) => {
            const angle = (index / flattenedSkills.length) * 2 * Math.PI;
            const x = (43 * Math.cos(angle) / 2).toFixed(4);
            const y = (43 * Math.sin(angle) / 2).toFixed(4);
            return { skill, x, y };
        });
    }, []);

    const [currProjIndex, setcurr] = useState(-1);
    const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        setTooltipPosition({ x: e.clientX, y: e.clientY + 10 });
    };

    const handleMouseEnter = (skill: string) => {
        setHoveredSkill(skill);
    };

    const handleMouseLeave = () => {
        setHoveredSkill(null);
    };

    useEffect(() => {
        scrollYProgress.on("change", v => {
            if (v < 1) {
                setcurr(Math.floor(v * PROJECTS.length));
            }
        });
    }, [scrollYProgress]);

    return (
        <>
            <div
                ref={projectRef}
                className="w-screen"
                style={{ height: `${(PROJECTS.length + 1) * 100}vh`, marginBottom: `-95vh` }}
            >
                <motion.div
                    style={{ opacity: fadeIn }}
                    className="flex md:flex-row flex-col gap-32 h-screen w-screen text-white items-center justify-center sticky top-0"
                >
                    <h1 className="heading-lg md:hidden"
                        id={projectSectionRef}
                    >Projects</h1>
                    <div className="flex-col gap-5 text-right md:block hidden">
                        <h1 className="heading-md"
                            id={projectSectionRef}
                        >Projects</h1>
                        <div className="flex flex-col gap-2 text-right">
                            {PROJECTS.map((project, index) => {
                                const isCurrentProject = index === currProjIndex;
                                return (
                                    <h3
                                        key={index}
                                        className="font-semibold text-2xl transition-transform"
                                        style={{
                                            transform: isCurrentProject ? 'scale(1.2)' : 'scale(1)',
                                            transition: 'transform 0.2s ease-out',
                                            transformOrigin: 'right'
                                        }}
                                    >
                                        {project.name}
                                    </h3>
                                );
                            })}
                        </div>
                    </div>

                    <div className="relative flex justify-center items-center md:w-[43vw]  w-[90vw] aspect-square rounded-full">
                        {skillPositions.map((skill) => {
                            const isInTech = currProjIndex >= 0 ? PROJECTS[currProjIndex].tech.includes(skill.skill) : false;
                            return (
                                <div
                                    key={skill.skill}
                                    className="absolute z-30 hidden md:block"
                                    style={{
                                        transform: `translate(${skill.x}vw, ${skill.y}vw)`,
                                        cursor: 'none',
                                    }}
                                    onMouseMove={handleMouseMove}
                                    onMouseEnter={() => handleMouseEnter(skill.skill)}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <motion.img
                                        className="w-11 h-11"
                                        src={`/skills/${skill.skill}.svg`}
                                        style={{
                                            opacity: isInTech ? 1 : 0.5,
                                            filter: !isInTech ? 'none' : 'drop-shadow(0px 0px 3px rgba(255, 255, 255, 0.3))',
                                            transform: `scale(${isInTech ? 1.5 : 0.9})`,
                                            transition: 'transform 0.2s ease-out',
                                        
                                        }}
                                        whileHover={{opacity: 1}}
                                    />
                                </div>
                            );
                        })}
                        {hoveredSkill && (
                            <AnimatePresence>
                                <motion.div
                                    className="fixed bg-white opacity-90 text-black uppercase text-xs p-1 rounded z-50"
                                    style={{
                                        left: `${tooltipPosition.x - 20}px`,
                                        top: `${tooltipPosition.y}px`,
                                    }}
                                    initial={{ scale: 0.1 }}
                                    animate={{ scale: 1.3 }}
                                    exit={{ scale: 0.1 }}
                                >
                                    {hoveredSkill}
                                </motion.div>
                            </AnimatePresence>
                        )}
                        {PROJECTS.map((project, index) => (<ProjDesc
                            key={index}
                            project={project}
                            index={index}
                            scrollYProgress={scrollYProgress}
                        />))}
                    </div>
                </motion.div>
            </div>
        </>
    );
}
