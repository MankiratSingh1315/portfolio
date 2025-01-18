// import { motion } from 'motion/react';

interface Milestone {
    start: string; // format 'monthInitials year'
    end: string;  // format 'monthInitials year'
    title: string;
    description: string;
    type: string; // could be point or range
    image: string;
    color: string;
}

export default function Milestones() {
    const milestones: Milestone[] = [
        {
            start: 'Jan 2021',
            end: 'Jul 2021',
            title: '1',
            description: '1.',
            type: 'range',
            image: '/images/milestone1.jpg',
            color: '',
        },
        {
            start: 'Feb 2024',
            end: '',
            title: '2',
            description: '2.',
            type: 'point',
            image: '/images/milestone3.jpg',
            color: '',
        },
        {
            start: 'Jul 2021',
            end: 'Dec 2024',
            title: '3',
            description: '3.',
            type: 'range',
            image: '/images/milestone2.jpg',
            color: '',
        },
    ];

    function getRandomColor() {
        const hex = Math.floor(Math.random() * 16777215).toString(16);
        return `#${hex.padStart(6, '0')}`;
    }

    function parseMonthYear(value: string) {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const [mon, yr] = value.split(" ");
        return {
            month: months.indexOf(mon) + 1,
            year: parseInt(yr),
        };
    }

    let min = parseMonthYear(milestones[0].start);
    let max = parseMonthYear(milestones[0].end);
    milestones.forEach((m) => {
        const s = parseMonthYear(m.start);
        const e = parseMonthYear(m.end);
        if (s.year < min.year || (s.year === min.year && s.month < min.month)) {
            min = s;
        }
        if (e.year > max.year || (e.year === max.year && e.month > max.month)) {
            max = e;
        }
    });

    interface MonthYear {
        month: number;
        year: number;
    }

    const allMonths: MonthYear[] = [];
    const current = { ...min };
    while (
        current.year < max.year ||
        (current.year === max.year && current.month <= max.month)
    ) {
        allMonths.push({ ...current });
        current.month++;
        if (current.month > 12) {
            current.year++;
            current.month = 1;
        }
    }

    milestones.forEach((m) => {
        if (!m.color) m.color = getRandomColor();
    });

    function getMonthIndex(value: string) {
        const parsed = parseMonthYear(value);
        return allMonths.findIndex(
            (m) => m.year === parsed.year && m.month === parsed.month
        );
    }

    const maxConcurrency =
        // max number of overlapping ranges 
        milestones.reduce((acc, curr) => {
            let count = 1;
            milestones.forEach((m) => {
                if (m !== curr) {
                    if (
                        (getMonthIndex(m.start) <= getMonthIndex(curr.start) &&
                            getMonthIndex(m.end) > getMonthIndex(curr.start)) ||
                        (getMonthIndex(m.start) >= getMonthIndex(curr.start) &&
                            getMonthIndex(m.start) < getMonthIndex(curr.end))
                    ) {
                        count++;
                    }
                }
            });
            return Math.max(acc, count);
        }, 0);
    // console.log(maxConcurrency);


    const milestonesWithRowNum: (Milestone & { row: number })[] = [];
    milestones.forEach((m) => {
        let row = 0;
        for (let i = 0; i < maxConcurrency; i++) {
            let canPlaceInRow = true;
            milestonesWithRowNum.forEach((m2) => {
                if (m2.row === i && (
                    (getMonthIndex(m2.start) <= getMonthIndex(m.start) &&
                        getMonthIndex(m2.end) > getMonthIndex(m.start)) ||
                    (getMonthIndex(m2.start) >= getMonthIndex(m.start) &&
                        getMonthIndex(m2.start) < getMonthIndex(m.end))
                )) {
                    canPlaceInRow = false;
                }
            });
            if (canPlaceInRow) {
                row = i;
                break;
            }
        }
        milestonesWithRowNum.push({ ...m, row });
    });

    // console.log(milestonesWithRowNum);

    return (
        <div
        // style={{ height: '200vh' }}
        >
            <div className="rounded-xl bg-white-50 w-max grid grid-cols-2"
            >
                <div className="bg-[#0a3444] text-white font-bold">
                    <div className="grid" style={{ gridTemplateRows: `repeat(${allMonths.length}, minmax(2rem, 3rem))` }}>
                        {[...allMonths].reverse().map((m, i) => {
                            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                            return (
                                <span key={i} className="text-center text-sm border-b border-black/10">
                                    {monthNames[m.month - 1]} {m.year}
                                </span>
                            );
                        })}
                    </div>
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateRows: `repeat(${allMonths.length}, minmax(2rem, 3rem))`,
                        gridTemplateColumns: `repeat(${maxConcurrency}, auto)`,
                    }}
                >
                    {milestonesWithRowNum.map((item, idx) => {
                        const colStart = allMonths.length - getMonthIndex(item.start) + 1;
                        const colEnd = item.type === 'point' ? colStart + 1 : allMonths.length - getMonthIndex(item.end);
                        const rowStart = item.row + 1;
                        const rowEnd = item.row + 2;
                        return (
                            <div
                                key={idx}
                                style={{
                                    gridRow: `${colStart} / ${colEnd}`,
                                    gridColumn: `${rowStart} / ${rowEnd}`,
                                    backgroundColor: item.color,
                                }}
                                className={`relative m-2 cursor-pointer px-3 py-1 text-sm font-medium text-white ${item.type === 'point' ? 'aspect-square rounded-2xl' : 'rounded-md'}`}
                            >
                                <div className="sticky top-1/4 -left-1/2 w-20 h-[2px] bg-white/50 transform translate-x-1/2">
                                    <div className="absolute top-1/2 left-1/2 w-[200px] h-[100px] bg-white/50 transform -translate-y-1/2 translate-x-1/2 opacity-1 transition-opacity duration-300">
                                        <h3>{item.title}</h3>
                                        <p>{item.description}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}