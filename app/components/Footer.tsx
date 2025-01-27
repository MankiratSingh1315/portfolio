import { SOCIAL_LINKS } from "../../constants";
import Image from "next/image";
import Button from "./Button";

const Footer = () => {
    const renderSocialIcons = (): React.ReactNode => {
        return (Object.keys(SOCIAL_LINKS) as Array<keyof typeof SOCIAL_LINKS>).map((el) => (
            <a
                href={SOCIAL_LINKS[el]}
                key={el}
                className="link hover:opacity-80 duration-300 md:px-2 px-1"
                rel="noreferrer"
                target="_blank"
            >
                <Image src={`/social/${el}.svg`} alt={el} width={40} height={40} />
            </a>
        ));
    };

    const renderFooterContent = (): React.ReactNode => (
        <>
            <h1 className="font-medium text-3xl md:text-4xl text-center">
                Connect with me!
            </h1>
            <div className="flex mt-8">{renderSocialIcons()}</div>
            <div className="flex mt-8 gap-2">
                <Button href="/resume" className="bg-white text-black">Resume</Button>
                <Button
                    href="mailto:msingh2_be22@thapar.edu"
                    className=" text-white border-2 border-white"
                >
                    Let&rsquo;s Talk
                </Button>
            </div>
            <h2 className="text-center text-sm sm:text-base mt-8">
                Developed with ❤️ by Mankirat Singh (Obviously)
            </h2>
        </>
    );

    return (
        <footer
            className="w-full relative select-none bg-cover flex flex-col items-stretch"
        >
            <div className="h-full w-full">
                <div className="section-container flex-col flex h-full justify-end z-10 items-center py-12">
                    {renderFooterContent()}
                </div>
            </div>
        </footer>
    );
};

export default Footer;