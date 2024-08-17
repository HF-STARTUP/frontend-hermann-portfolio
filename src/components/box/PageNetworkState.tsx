import React from "react";
import {motion} from "framer-motion";
import {cn} from "@/lib/utils";


export const EmptyData: React.FC<React.HTMLAttributes<HTMLDivElement> & {
    message: string,
    description?: string
}> = ({message, description, className}) => {
    const bounceInVariants = {
        visible: {
            y: [0, -30, 10, -5, 0],
            opacity: [0, 1],
            transition: {
                duration: 0.6,
                ease: "easeInOut"
            }
        }
    };

    const dragStyle = {
        cursor: 'grab',
    };

    return (
        <div
            className={cn(`text-center h-[425px] m-auto flex flex-col font-['DM Sans'] tracking-[-2%] justify-center items-center gap-[45px] bg-white rounded-2xl`, className)}>
            <motion.div
                initial={{y: 0, opacity: 0}}
                animate="visible"
                variants={bounceInVariants}
                whileTap={{cursor: 'grabbing'}}
                drag
                dragConstraints={{left: 0, right: 0, top: 0, bottom: 0}}
                dragElastic={0.5}
                style={dragStyle}
            >
                <EmptySvg/>
            </motion.div>
            <div className={`flex flex-col items-center justify-center gap-[7px] cursor-default`}>
                <h1 className={`font-bold leading-[28px] text-lg text-admin-primary`}>{message}</h1>
                <p className={`text-text-body text-sm font-normal`}>{description}</p>
            </div>
        </div>
    );
}
const EmptySvg: React.FC<{} & React.SVGProps<SVGSVGElement>> = ({...props}) => {
    return (
        <svg width="155" height="155" viewBox="0 0 155 155" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <rect x="0.398438" width="154.2" height="154.2" rx="77.1" fill="#7A7A7A" fill-opacity="0.16"/>
            <g clip-path="url(#clip0_1670_24746)">
                <g clip-path="url(#clip1_1670_24746)">
                    <path d="M55.25 110.099L77.5 91.7656L99.75 110.099" stroke="white" stroke-width="6"
                          stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M77.5 80.7656V110.099V80.7656Z" fill="#80878C"/>
                    <path d="M77.5 80.7656V110.099" stroke="white" stroke-width="6" stroke-linecap="round"
                          stroke-linejoin="round"/>
                    <path
                        d="M45.2151 83.2518L45.8307 84.2821C47.759 87.5088 51.853 88.9205 55.4909 87.6188L108.305 68.6805C108.826 68.5027 109.302 68.2148 109.699 67.8368C110.096 67.4587 110.405 66.9997 110.605 66.4915C110.804 65.9833 110.889 65.4383 110.854 64.8944C110.818 64.3504 110.664 63.8206 110.4 63.3418L100.684 46.0901C100.164 45.1977 99.3154 44.5388 98.315 44.2517C97.3147 43.9646 96.2408 44.0716 95.3184 44.5501L95.1108 44.6675L48.0372 72.6001C44.2547 74.8478 43.005 79.5558 45.2188 83.2518H45.2151Z"
                        stroke="white" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M84.918 51.4316L96.043 71.5983L84.918 51.4316Z" fill="#80878C"/>
                    <path d="M84.918 51.4316L96.043 71.5983" stroke="white" stroke-width="6" stroke-linecap="round"
                          stroke-linejoin="round"/>
                </g>
            </g>
            <defs>
                <clipPath id="clip0_1670_24746">
                    <rect width="89" height="88" fill="white" transform="translate(33 33.0996)"/>
                </clipPath>
                <clipPath id="clip1_1670_24746">
                    <rect width="89" height="88" fill="white" transform="translate(33 33.0996)"/>
                </clipPath>
            </defs>
        </svg>

    )

}

const EmptyDialogSVG: React.FC<{} & React.SVGProps<SVGSVGElement>> = ({...props}) => {
    return (
        <svg width="114" height="114" viewBox="0 0 114 114" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="114" height="114" rx="57" fill="#EAEAEA"/>
            <path
                d="M56.05 74.1C66.0187 74.1 74.1 66.0187 74.1 56.05C74.1 46.0813 66.0187 38 56.05 38C46.0813 38 38 46.0813 38 56.05C38 66.0187 46.0813 74.1 56.05 74.1Z"
                stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M75.9992 75.9992L72.1992 72.1992" stroke="white" stroke-width="4" stroke-linecap="round"
                  stroke-linejoin="round"/>
        </svg>
    )
}


export const SimpleEmptyElement: React.FC<{ message: string }> = ({message}) => {

    return (
        <div>
            <div className={`flex flex-col items-center justify-center gap-[7px] cursor-default h-[150px]`}>
                <EmptySvg width={70} height={70}/>
                <p className={`text-text-body text-sm font-normal`}>{message}</p>
            </div>
        </div>
    )
}

export const EmptyDialog: React.FC<{ message: string }> = ({message}) => {

    return (
        <div>
            <div className={`flex flex-col items-center justify-center gap-[7px] cursor-default pt-[57px]`}>
                <EmptyDialogSVG width={114} height={114}/>
                <p className={`text-text-body text-sm font-normal`}>{message}</p>
            </div>
        </div>
    )
}

