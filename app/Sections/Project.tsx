import { motion, useScroll, useTransform, AnimatePresence, MotionValue } from "motion/react"; // Changed import to framer-motion
import { useEffect, useMemo, useRef, useState } from "react";
import Button from "../components/Button";
import { MENULINKS } from "../components/Menu";

export const PROJECTS = [
    {
        name: "Thapar Food Festival Website",
        image: "/projects/tff.png",
        description: "A website Frontend developed for North India's one of the largest food festivals. Mainly worked on team and Gallery Page, viewed by 5000+ people",
        url: "https://www.thaparfoodfestival.in/",
        tech: ["react", "javascript", "css"],
    },
    {
        name: "Recruitment Portal",
        image: "/projects/recruitment.png",
        description: "Developed a fully functional end user Oriented Recruitment Portal with a Quiz portal For MLSC, TIET, used by 200+ students.",
        url: "https://quiz.mlsctiet.com/",
        tech: ["react", "nodejs", "appwrite"],
    },
    {
        name: "GitHub Organisation Portfolio Generator",
        image: "/projects/gopg.png",
        description: "A tool that helps organisations create and showcase their projects, contributors, and their comparisons from GitHub on a single webpage. This will help new/aspiring candidates see what are the projects, top contributors etc.",
        url: "https://github.com/ips610/Github-Oraganization-Dashboard-Creator",
        tech: ["react", "flask", "firestore"],
    },
    {
        name: "Leaderboard - 30 Days of Code",
        image: "/projects/leaderboard.png",
        description: "A Leaderboard was established for a 30 Days Long competition which focused on tracking particular GitHub Repositories of the participants.",
        url: "https://github.com/MicrosoftStudentChapter/leaderboard-30daysofcode",
        tech: ["react", "firestore", "github"],
    },
    {
        name: "IRC Server in C",
        image: "/projects/IRC-UI.png",
        description: "Developed a Terminal-based IRC Chatroom with Clients and Server. Technologies used include C++, Web Sockets in C++.",
        url: "https://github.com/MicrosoftStudentChapter/IRC-Server",
        tech: ["c++", "websocket"],
    },
];

const SKILLS = {
    languages: ["c", "c++", "html", "css", "javascript", "typescript", "dart", "python"],
    frameworks: ["nodejs", "expressjs", "flask", "flutter"],
    libraries: ["selenium", "mui", "react", "next"],
    databases: ["mysql", "mongodb", "firebase", "appwrite"],
    devTools: ["nginx", "vscode", "docker", "i-use-popos-btw", "git", "github", "azure", "bash", "aftereffects", "figma", "illustrator"],
};

const flattenedSkills = Object.values(SKILLS).flat();

const step = 1 / (PROJECTS.length);

function ProjDesc({ project, index, scrollYProgress }: { project: typeof PROJECTS[0], index: number, scrollYProgress: MotionValue<number> }) {
    const start = index * step;
    const midStart = start + step * (index == 1 ? 0.01 : 0.1);
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
                className="md:rounded-full absolute -z-10 object-fill md:object-cover md:w-[38vw] w-[90vw] md:aspect-square object-top overflow-hidden"
            />
            <div className="bg-white/60 backdrop-blur-sm md:w-[38vw] md:aspect-square md:rounded-full text-black flex flex-col gap-2 items-center justify-center p-[20%]">
                <h1 className="font-semibold text-3xl">{project.name}</h1>
                <p className="text-md text-center">{project.description}</p>
                <Button href={project.url} className="text-black border-2 border-black z-50">
                    View Project
                </Button>
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
        [0.05, 1 / (PROJECTS.length), 1 - 1 / (PROJECTS.length), 0.99],
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
                className="relative w-screen"
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
                                            transform: isCurrentProject ? 'scale(1.3)' : 'scale(1)',
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
                                        className="w-12 h-12"
                                        src={`/skills/${skill.skill}.svg`}
                                        style={{
                                            transform: `scale(${isInTech ? 1.5 : 1})`,
                                            transition: 'transform 0.2s ease-out',
                                        }}
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
