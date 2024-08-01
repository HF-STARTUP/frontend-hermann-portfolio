"use client"

import VLinkProvider from "@/components/helpers/VLinkProvider";
import React from "react";
import {RotatingLines} from "react-loader-spinner";
import {usePathname} from "next/navigation";
import {isDashboardContext} from "@/utils/urlValidation";
import {cn} from "@/utils/ui/cn";

type BtnProps = {
    type?:"submit"|"button"|"reset",
    to?: string,
    w?: string,
    variant?: 'outline' | 'contained',
    color?: 'green' | 'yellow' | 'black' | 'primary' | 'white' | 'blue' | 'red' | 'emerald' | 'admin-primary' | 'grey' | 'blueLighten',
    size?: 'sm' | 'normal',
    fontWeight?: 'bold' | 'normal',
    fit?: boolean,
    shape?: 'square' | 'round'
    fullwidth?: boolean,
    disabled?: boolean,
    responsive?: boolean,
    responsiveW?: boolean,
    children?: React.ReactNode,
    icon?: React.ReactNode,
    loading?: boolean
} & React.HTMLAttributes<HTMLDivElement>;

const BtnBase: React.FC<BtnProps> = ({
                                         type,
                                         to,
                                         icon,
                                         fit,
                                         variant = 'contained',
                                         size = 'normal',
                                         color = 'primary',
                                         shape = 'round',
                                         responsiveW = false,
                                         disabled = false,
                                         responsive,
                                         w,
                                         fontWeight,
                                         fullwidth,
                                         children,
                                         loading = false,
                                         ...props
                                     }) => {

    const $pathName = usePathname()
    const isAdminCtx = isDashboardContext($pathName)


    const btnPY = size === 'sm' ? `py-[8px] ${responsive && 'px-[18px] lg:py-[16px]'}` : 'h-[65.36px] flex items-center justify-center'

    const isSquareBtn = shape === 'square'

    const isBolder = fontWeight === 'bold'

    let baseClasses = `block max-h-[67px] ${icon ?
        'flex justify-center items-center gap-[10px]' : ''} 
        select-none ${fit ? 'w-fit' : ''} ${fullwidth ? (responsiveW ? 'lg:w-full' : 'w-full') : ''} 
        text-nowrap outline-4 outline-offset-2 outline-slate-300 
    text-sm lg:text-base text-center ${isBolder ? (responsive ? '' : 'font-bold') : 'font-medium'}  
    leading-tight ${btnPY} ${icon ? 'px-[11px]' : 'px-[24px]'} ${isSquareBtn ? 'rounded-xl' : ' rounded-[150px]'} 
    transition-colors ease-in delay-75 duration-150 border-2 outline-offset-2 outline-2 ${disabled ? 'opacity-65' : ''} ${isAdminCtx ? 'hover:opacity-85' : ''}`;

    let variantClasses = "";


    switch (color) {
        case 'emerald':
            if (variant === "outline") {
                variantClasses = "border-emerald-800 text-emerald-800 hover:bg-emerald-800 hover:text-white outline:border-emerald-800 ";
            } else if (variant === "contained") {
                variantClasses = "bg-emerald-800 border-emerald-800 text-white  text-emerald-800 hover:border-emerald-800 hover:bg-white hover:text-emerald-800";
            }
            break;
        case 'admin-primary':
            if (variant === "outline") {
                variantClasses = "border-[#707EAE] text-[#707EAE] hover:bg-[#707EAE] hover:text-white outline:border-[#707EAE] ";
            } else if (variant === "contained") {
                variantClasses = "bg-[#707EAE] border-[#707EAE] text-white  text-[#707EAE] hover:border-[#707EAE] hover:bg-white hover:text-[#707EAE]";
            }
            break;
        case 'blue':
            if (variant === "outline") {
                variantClasses = `border-blue-700 text-blue-700  outline:border-blue-700 ${isAdminCtx ? '' : 'hover:bg-blue-700 hover:text-white'}`;
            } else if (variant === "contained") {
                variantClasses = `bg-blue-700 border-blue-700 text-white  text-blue-700 ${isAdminCtx ? '' : 'hover:border-blue-700 hover:bg-white hover:text-blue-700'}`;
            }
            break;
        case 'blueLighten':
            if (variant === "outline") {
                variantClasses = ``;
            } else if (variant === "contained") {
                variantClasses = `text-blue-primary border-indigo-100 bg-violet-50`;
            }
            break;
        case 'red':
            if (variant === "outline") {
                variantClasses = "border-red-600 text-red-600 outline:border-blue-600 bg-white";
            } else if (variant === "contained") {
                variantClasses = "bg-red-600 border-red-600 text-white";
            }
            break;
        case 'green':
            if (variant === "outline") {
                variantClasses = "border-green-600 text-green-600 hover:bg-green-600 hover:text-white outline:border-green-200 ";
            } else if (variant === "contained") {
                variantClasses = "bg-green-600 border-green-600  text-white hover:border-green-600 hover:bg-white hover:text-green-600";
            }
            break;
        case 'white':
            if (variant === "outline") {
                variantClasses = "border-white text-white hover:bg-white hover:text-black outline:border-white";
            } else if (variant === "contained") {
                variantClasses = "bg-white text-black";
            }
            break;
        case 'grey':
            if (variant === "outline") {
                variantClasses = "border-[#F4F7FE] text-admin-primary";
            } else if (variant === "contained") {
                variantClasses = "bg-[#F4F7FE] text-admin-primary border-none";
            }
            break;
        case 'yellow':
            if (variant === "outline") {
                variantClasses = `text-black border-yellow-600 text-yellow-600 bg-transparent outline:border-yellow-200 font-bold ${isAdminCtx ? '' : 'hover:bg-yellow-600 hover:text-white'}`;
            } else if (variant === "contained") {
                variantClasses = `bg-yellow-400 border-yellow-400 text-black font-bold ${isAdminCtx ? '' : 'hover:bg-transparent hover:text-yellow-400'}`;
            }
            break;
        case 'black':
            if (variant === "outline") {
                variantClasses = `border-black text-black  outline:border-black ${isAdminCtx ? '' : 'hover:bg-black hover:text-white'}`;
            } else if (variant === "contained") {
                variantClasses = `bg-black text-white ${isAdminCtx ? '' : 'hover:bg-white hover:border-black hover:text-black'}`;
            }
            break;
        case 'primary':
        default:
            if (variant === "outline") {
                variantClasses = "border-green-600 hover:bg-green-600 hover:text-white outline:border-green-200 ";
            } else if (variant === "contained") {
                variantClasses = "bg-green-600 text-white hover:bg-white hover:text-green-600";
            }
            break;
    }

    const classes = `${baseClasses} ${variantClasses}`;

    return (
        <div {...props}>
            <React.Fragment>
                {to && to?.length ? <VLinkProvider to={to} className={classes}>
                        {icon} <span className={`block`}>{children}</span>
                    </VLinkProvider>
                    : <button type={type} disabled={disabled} style={{width: w}} className={classes}>
                        {!loading && <div className={`${icon ? `flex ${children ? 'justify-between gap-[10px]' : 'justify-center' } items-center` : ''}`}>
                            {icon} <span className={`block`}>{children}</span>
                        </div>}
                        {loading && <div className={`w-full flex justify-center items-center size-[15px]`}>
                            <GafaAppLoader/>
                        </div>}
                    </button>
                }
            </React.Fragment>
        </div>
    );
};


type BtnIconProps = {
    children: React.ReactNode
}
export const BtnIcon: React.FC<{
    children: React.ReactNode
} & React.BaseHTMLAttributes<HTMLButtonElement>> = ({children, ...props}) => {
    return (
        <button className={`group border border-transparent hover:border-red-100 transition ease-in delay-75 duration-300 
        hover:bg-red-50  focus:ring-2 focus:outline-none focus:ring-red-200 font-medium rounded-full text-sm p-2.5 
        text-center inline-flex items-center hover:children-translate-x-1.5
        `} {...props}>
            <div className={`group-hover:translate-x-0.5`}>
                {children}
            </div>
        </button>
    )
}



type BtnIconBaseProps = {
    variant: 'green' | 'red' | 'blue'
}&React.HTMLAttributes<HTMLButtonElement>

export const BtnIconBase:React.FC<BtnIconBaseProps> = ({variant, className, children, ...props})=> {

    let variantClasses = ``

    switch (variant) {
        case "blue":
            variantClasses = cn(`bg-[#B9D1FF] text-blue-primary`)
            break
        case "green":
            variantClasses = cn(`bg-[#00A656] text-white`)
            break
        case "red":
            variantClasses = cn(`bg-[#FFE7E5] text-vred`)

    }

    return(
        <button className={
            cn(`size-10 bg-emerald-600 rounded-lg flex flex-col items-center justify-center hover:opacity-80 transition duration-200 ease-in`, variantClasses, className)}
            {...props}
        >
            {children}
        </button>
    )
}


export const SubNavButton: React.FC<{
    children: string,
    activeValue: string
} & React.HTMLAttributes<HTMLButtonElement>> = ({children, activeValue, ...props}) => {

    const isActive = activeValue === children


    return (
        <button className={`text-center text-sm font-normal leading-normal rounded-[10px] w-[103px] ${isActive
            ? 'text-white bg-slate-500 hover:bg-slate-400'
            : 'text-slate-500 bg-white hover:bg-slate-200'} px-[17px] py-2  justify-center transition ease-in duration-200`} {...props}>
            {children}
        </button>
    )
}

export const SubNavButtonGroup: React.FC<{ children: React.ReactNode }> = ({children}) => {
    return (
        <div className={`flex justify-start items-center gap-[10px]`}>
            {children}
        </div>
    )
}


export const GafaAppLoader: React.FC = () => {

    return (
        <RotatingLines
            visible={true}
            width={"30"}
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            strokeColor={'currentcolor'}
        />
    )
}

export default BtnBase;
