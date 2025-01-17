import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "motion/react"; // Changed import to framer-motion
import { use, useEffect, useMemo, useRef, useState } from "react";
import Button from "./components/Button";

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
    devTools: ["nginx", "vscode", "docker", "i-use-arch-btw", "git", "github", "azure", "bash", "aftereffects", "figma", "illustrator"],
};

const flattenedSkills = Object.values(SKILLS).flat();

export default function Projects() {
    const projectRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: projectRef });
    const step = 1 / PROJECTS.length;

    const skillPositions = useMemo(() => {
        return flattenedSkills.map((skill, index) => {
            const angle = (index / flattenedSkills.length) * 2 * Math.PI;
            const x = (49 * Math.cos(angle) / 2).toFixed(4);
            const y = (49 * Math.sin(angle) / 2).toFixed(4);
            return { skill, x, y };
        });
    }, []);

    const [currProjIndex, setcurr] = useState(0);
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
            console.log(v);
            if (v < 1) {
                setcurr(Math.floor(v * PROJECTS.length));
            }
        });
    }, [scrollYProgress]);

    return (
        <>
            <div className="flex gap-32 h-screen w-screen text-white items-center justify-center fixed">
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
                <div className="relative flex justify-center items-center w-[49vw] aspect-square rounded-full">
                    {skillPositions.map((skill) => {
                        const isInTech = PROJECTS[currProjIndex].tech.includes(skill.skill);
                        return (
                            <div
                                key={skill.skill}
                                className="absolute z-30"
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
                                {/* TODO: SHOW THE SKILL NAME */}
                                {/* {isInTech && (
                                    <span className="absolute text-xs text-white bg-black p-1 rounded">
                                        {skill.skill}
                                    </span>
                                )} */}
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
                    {/* Rest of the PROJECTS.map code remains the same */}
                    {PROJECTS.map((project, index) => {
                        const start = index * step;
                        const midStart = start + step * 0.2;
                        const midEnd = start + step * 0.8;
                        const end = (index + 1) * step;
                        const opacity = useTransform(scrollYProgress, [start, midStart, midEnd, end], [0, 1, 1, 0]);
                        const zIndex = useTransform(scrollYProgress, [start, midStart, midEnd, end], [-1, 1, 1, -1]);

                        return (
                            <motion.div
                                key={index}
                                className="fixed h-screen flex flex-col items-center justify-center"
                                style={{ opacity, zIndex }}
                            >
                                <img
                                    src={project.image}
                                    alt={project.name}
                                    className="rounded-full absolute -z-10 object-cover w-[44vw] aspect-square object-top overflow-hidden"
                                />
                                <div className="bg-white/60 backdrop-blur-sm w-[44vw] aspect-square rounded-full text-black flex flex-col gap-2 items-center justify-center p-[20%]">
                                    <h1 className="font-semibold text-3xl">{project.name}</h1>
                                    <p className="text-md text-center">{project.description}</p>
                                    <Button href={project.url} className="text-black border-2 border-black">
                                        View Project
                                    </Button>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            <div
                ref={projectRef}
                className="relative w-screen -z-10"
                style={{ height: `${PROJECTS.length * 100}vh` }}
            >
            </div>
        </>
    );
}
