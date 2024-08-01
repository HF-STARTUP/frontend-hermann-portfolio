import { motion } from 'framer-motion';
import React from 'react';

type MotionListWrapperProps = {
    children: React.ReactNode;
    shouldAnimate: boolean;
    index?: number;
};

const MotionListWrapper: React.FC<MotionListWrapperProps> = ({ children, shouldAnimate, index = 0 }) => {
    const upToDownVariants = {
        hidden: { opacity: 0, y: -50 },
        visible: { opacity: 1, y: 0 },
    };

    const fadeInVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const delay = 0.2 + index * 0.1;

    const dragStyle = {
        cursor: 'grab',
    };

    if (shouldAnimate) {
        return (
            <motion.div
                initial="hidden"
                animate="visible"
                variants={upToDownVariants}
                transition={{ duration: 0.5, ease: "easeOut" }}
                whileTap={{ cursor: 'grabbing' }}
                drag={"y"}
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} // Contraint le glissement à l'intérieur de sa position initiale
                dragElastic={0.5} // Elasticité du glissement, 0.5 pour un effet "springy" modéré
                style={dragStyle} // Applique le style de base pour le glissement
            >
                {children}
            </motion.div>
        );
    }

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInVariants}
            transition={{ duration: 0.5, ease: "easeOut", delay }}
            whileTap={{ cursor: 'grabbing' }}
            drag // Active le glissement dans toutes les directions
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} // Contraint le glissement à l'intérieur de sa position initiale
            dragElastic={0.5} // Elasticité du glissement, 0.5 pour un effet "springy" modéré
            style={dragStyle} // Applique le style de base pour le glissement
        >
            {children}
        </motion.div>
    );
};

export default MotionListWrapper;
