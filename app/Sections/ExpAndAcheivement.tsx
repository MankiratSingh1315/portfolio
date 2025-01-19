import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
export const TIMELINE: Milestone[] = [
    {
        title: "Thapar Institute of Engineering and Technology, Patiala",
        subtitle: "",
        type: "education",
        timeline: "2022 - 2026",
        relatedUrl: 'https://www.thapar.edu/',
        relatedImage: null,
        relatedFiles: null,
        techStack: [],
        description: "Currently pursuing a Bachelor's degree in Computer Engineering"
    },

    {
        title: "Project Trainee",
        type: "experience",
        timeline: "December 2024 - Present",
        relatedUrl: null,
        relatedImage: null,
        relatedFiles: null,
        techStack: ["Flutter", "NextJS", "PHP", "MySQL"],
        description: "Built a role-specific feedback system managing over 10,000 users with data analytics capabilities."
    },
    {
        title: "Student Research Intern",
        subtitle: "Thapar Institute of Engineering and Technology",
        type: "experience",
        timeline: "January 2024 - Present",
        relatedUrl: null,
        relatedImage: null,
        relatedFiles: null,
        techStack: ["Genetic Algorithm", "FastAPI"],
        description: "Optimized database structure and implemented constraints for a timetable scheduling system."
    },
    {
        title: "Full Stack Developer Intern",
        subtitle: "Storoo",
        type: "experience",
        timeline: "July 2024 - Sep 2024",
        relatedUrl: 'https://www.storoo.in/',
        relatedImage: null,
        relatedFiles: null,
        techStack: ["NextJS", "PostgresSQL", "AWS EC2", "Docker", "NGINX", "GitHub Actions"],
        description: "Implemented role-based authentication and deployed applications with a blue-green deployment strategy."
    },
    {
        title: "Flutter Developer",
        subtitle: "Teraforge Digital Lab",
        type: "experience",
        timeline: "June 2023 - Oct 2023",
        relatedUrl: 'https://teraforgedigitallab.com/',
        relatedImage: null,
        relatedFiles: null,
        techStack: ["Flutter", "Material UI", "Firebase"],
        description: "Developed a social media app supporting content posting and profile management."
    },
    {
        title: "National Winner at Bharatiya Antariksh Hackathon by ISRO",
        type: "achievement",
        timeline: "August 2024",
        relatedUrl: "https://rover.mankiratsingh.com",
        relatedImage: null,
        relatedFiles: null,
        techStack: ["React", "ThreeJS", "YOLOv5", "U-Net"],
        description: "Developed LUNAR - a comprehensive system to analyze Chandrayaan-2 data, enabling navigation on the Moon for rovers. The project involved processing and geo-referencing lunar imagery to create a 3D surface model using Three.js, combined with anomaly detection on IIRS spectral data to identify research-worthy points of interest. This innovation won the Bharatiya Antariksh Hackathon 2024, organized by ISRO, and was honored by the President of India on the first National Space Day."
    },
    {
        title: "Runner Ups at HackTU5.0",
        type: "achievement",
        timeline: "March 2024",
        relatedUrl: "",
        relatedImage: null,
        relatedFiles: null,
        techStack: ["React","Flask", "Web Crawling", "Similarity Analysis"],
        description: "Developed DeepWord - a deepfake detection tool for influencers and celebreties to detect deepfakes of themselves over the internet. The project involved web crawling to collect data, similarity analysis to detect deepfakes, and a user-friendly interface to upload images and get results. The project was awarded the Runner Up position at HackTU5.0."
    },

    {
        description: "Led teams of 20+ developers in open-source projects and large-scale events like Makeathon 6.",
        title: "Microsoft Learn Student Chapter, TIET",
        subtitle: "Technical Head",
        type: "accomplishment",
        timeline: "Nov 2022 - Present",
        relatedUrl: 'https://mlsctiet.com/',
        relatedImage: null,
        relatedFiles: null,
        techStack: [],
        previousPositions: [
            {
                title: "Core Member",
                timeline: "Jul 2023",
            },
            {
                title: "Executive Member",
                timeline: "Nov 2022",
            },
        ],
    },
    {
        title: "OWASP Student Chapter, TIET",
        subtitle: "Core Member",
        type: "accomplishment",
        timeline: "Nov 2022 - Sep 2023",
        relatedUrl: 'https://owasptiet.com/',
        relatedImage: null,
        relatedFiles: null,
        techStack: [],
        previousPositions: [
            {
                title: "Executive Member",
                timeline: "Nov 2022",
            },
        ],
    },
    {
        title: "PLEX - The Product Managers' Club",
        subtitle: "Official Member | Sep 2023",
        type: "accomplishment",
        timeline: "Sep 2023 - Present",
        relatedUrl: null,
        relatedImage: null,
        relatedFiles: null,
        techStack: [],
    }
];

interface Milestone {
    title: string;
    subtitle?: string;
    type: "accomplishment" | "experience" | "achievement" | 'education';
    timeline: string;
    relatedUrl: string | null;
    relatedImage: { url: string; description: "logo" | "flex" } | null;
    relatedFiles: { url: string; filename: string }[] | null;
    techStack: string[];
    previousPositions?: { title: string, timeline: string }[];
    description?: string;
}

const MilestoneComponent = ({ milestone }: { milestone: Milestone }) => {
    return (
        <motion.div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50 w-[35vw]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-gray-800/20 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg">

            </div>
            <header
                className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-gray-500 sm:col-span-2"
                aria-label={milestone.timeline}
            >
                {milestone.timeline}
            </header>
            <div className="z-10 sm:col-span-6">
                <h3 className="font-medium leading-snug text-slate-200">
                    <div className="flex items-center gap-2">
                        {milestone.relatedImage?.description === 'logo' && (
                            <img
                                src={milestone.relatedImage.url}
                                alt={milestone.title}
                                className="w-6 h-6 object-contain"
                            />
                        )}
                        {milestone.relatedUrl ? (
                            <a
                                className="items-baseline font-medium leading-tight text-gray-200 hover:text-gray-300 focus-visible:text-gray-300 group/link text-base"
                                href={milestone.relatedUrl}
                                target="_blank"
                                rel="noreferrer noopener"
                                aria-label={`${milestone.title} at ${milestone.subtitle || ''}`}
                            >
                                <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                                <p>
                                    {milestone.title}<span className="inline-block">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px"
                                            aria-hidden="true"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </span>
                                </p>
                                <p className="block text-sm font-normal leading-5 text-slate-200">
                                    {milestone.subtitle}
                                </p>
                            </a>
                        ) : (
                            <div className="items-baseline font-medium leading-tight text-slate-200 text-base">
                                <p>{milestone.title}</p>
                                <p className="block text-sm font-normal leading-5 text-slate-200">
                                    {milestone.subtitle}
                                </p>
                            </div>
                        )}
                    </div>
                </h3>
                {milestone.description && (
                    <p className="mt-2 text-sm leading-normal text-slate-200">
                        {milestone.description}
                    </p>
                )}
                {milestone.techStack.length > 0 && (
                    <ul className="mt-2 flex flex-wrap" aria-label="Technologies used">
                        {milestone.techStack.map((tech, index) => (
                            <li key={index} className="mr-1.5 mt-2">
                                <div
                                    className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300"
                                >
                                    {tech}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </motion.div>
    );
};

export default function ExpAndAcheivements() {
    const accomplishments = TIMELINE.filter(m => m.type === "accomplishment");
    const experiences = TIMELINE.filter(m => m.type === "experience");
    const achievements = TIMELINE.filter(m => m.type === "achievement");
    const education = TIMELINE.filter(m => m.type === "education");
    const heroScrollRef = useRef(null);

    const { scrollYProgress } = useScroll({ target: heroScrollRef });
    const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
    return (
        <motion.div className="grid gap-3 grid-cols-2 place-items-start justify-items-center"
            style={{
                height: '130vh',
                width: '100vw',
                marginTop: '-130vh',
                opacity: opacity
                
            }}
            ref={heroScrollRef}

        >
            <section className="flex flex-col gap-8 sticky top-10">
                <motion.h2
                    className="text-2xl font-bold mb-4 text-white"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Achievements
                </motion.h2>
                {achievements.length > 0 && (
                    <>
                        <div className="grid gap-10 grid-cols-1">
                            {achievements.map((milestone, index) => (
                                <MilestoneComponent key={index} milestone={milestone} />
                            ))}
                        </div>
                    </>
                )}
                <motion.h2
                    className="text-2xl font-bold mb-4 text-white"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    Accomplishments
                </motion.h2>
                {accomplishments.length > 0 && (
                    <>
                        <div className="grid gap-10 grid-cols-1">
                            {accomplishments.map((milestone, index) => (
                                <MilestoneComponent key={index} milestone={milestone} />
                            ))}
                        </div>
                    </>
                )}
                <motion.h2
                    className="text-2xl font-bold mb-4 text-white"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    Education
                </motion.h2>
                {education.length > 0 && (
                    <>
                        <div className="grid gap-10 grid-cols-1">
                            {education.map((milestone, index) => (
                                <MilestoneComponent key={index} milestone={milestone} />
                            ))}
                        </div>
                    </>
                )}
            </section>
            <section className="sticky top-10">
                <motion.h2
                    className="text-2xl font-bold mb-4 text-white"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                    Experience
                </motion.h2>
                {experiences.length > 0 && (
                    <>
                        <div className="grid gap-10 grid-cols-1">
                            {experiences.map((milestone, index) => (
                                <MilestoneComponent key={index} milestone={milestone} />
                            ))}
                        </div>
                    </>
                )}
            </section>
        </motion.div>
    );
}