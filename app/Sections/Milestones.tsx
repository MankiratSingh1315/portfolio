import { motion } from 'framer-motion';


// function TriangleUP({ side, date, title }: { side: number, date: string, title: string }) {
//     return (
//         <div
//             className="triangle-up"
//             style={{
//                 clipPath: `polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)`,
//                 // backgroundColor: '#fff',
//                 backgroundImage: `url('/timeline/president.jpeg')`,
//                 backgroundSize: 'cover',
//                 width: `${side*2}rem`,
//                 height: `${side}rem`,
//             }}
//         >
//             <div className="flex flex-col items-center justify-end h-full">
//                 <p className="text-black text-xs">{date}</p>
//                 <p className="text-black text-xs">{title}</p>
//             </div>
//         </div>
//     );
// }



export default function Milestones() {


    const milestones = [
        { date: 'Jan 2020 - Feb 2021', image: '/images/milestone1.png', info: 'First job and accomplishments' },
        { date: 'Mar 2021 - Dec 2021', image: '/images/milestone2.png', info: 'Second job achievements' },
        { date: 'Jan 2022 - Present', image: '/images/milestone3.png', info: 'Ongoing role and successes' },
    ];

 const side = 20;

    return (
        <>

{/* <TriangleUP side={side} 
date={milestones[0].date}
title={milestones[0].info}

/> */}
            {/* <div className="h-screen w-screen text-white flex justify-center items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div
                        key={i}
                        style={{
                            width: 0,
                            height: 0,
                            borderLeft: `${side}px solid transparent`,
                            borderRight: `${side}px solid transparent`,
                            borderBottom: i % 2 === 0 ? `${side}px solid #000` : 'none',
                            borderTop: i % 2 !== 0 ? `${side}px solid #000` : 'none',
                            margin: `0 -${side/2 - 10}px`,
                        }}
                    >
                        
                    </div>
                ))}
            </div> */}
        </>
    );

}