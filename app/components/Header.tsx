import Image from "next/image";
import { useState } from "react";
import Menu from "@/app/components/Menu";

const Header = () => {
    const [menuVisible, setmenuVisible] = useState(false);

    return (
        <header className="w-full fixed top-0 py-8 select-none z-[100] bg-gradient-to-b from-gray-950 to-transparent">
            <div className="flex justify-between section-container">
                <a href="#home" className="link">
                    <Image
                        src="/logo.svg"
                        alt="Logo - Mankirat Singh"
                        width={22}
                        height={22}
                    />
                </a>
                <nav className={`outer-menu ${menuVisible ? "menu-visible" : ""}`}>
                    <button
                        className="hamburger w-6 h-6 flex items-center justify-center link relative"
                        onClick={setmenuVisible.bind(null, !menuVisible)}
                    >
                        <div className="relative flex-none w-full bg-white duration-300 flex items-center justify-center"></div>
                    </button>
                    <Menu setmenuVisible={setmenuVisible} />
                </nav>
            </div>
        </header>
    );
};

export default Header;