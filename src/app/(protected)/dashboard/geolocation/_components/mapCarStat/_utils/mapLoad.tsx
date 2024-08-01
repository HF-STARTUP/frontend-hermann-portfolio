import React from 'react';
import { motion } from 'framer-motion';

export const MapLoad = () => {
    const loaderVariants = {
        animationOne: {
            scale: [1, 1.5, 1],
            opacity: [0.7, 1, 0.7],
            borderRadius: ["20%", "50%", "20%"],
            transition: {
                duration: 1.5,
                ease: "easeInOut",
                repeat: Infinity,
            }
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <motion.div
                className="size-[7px] bg-blue-500"
                variants={loaderVariants}
                animate="animationOne"
            />
        </div>
    );
};