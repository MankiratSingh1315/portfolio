import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
    children: React.ReactNode;
    href?: string;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, href, className }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`text-xl rounded-md cursor-pointer font-extrabold py-2 px-7 ${className}`}
        >
            {href ? <a href={href}>{children}</a> : children}
        </motion.button>
    );
};

export default Button;