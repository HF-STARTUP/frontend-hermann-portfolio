"use client";

import React from "react";
import {MoreIcon} from "@/components/layout/admin/sidebar/_navIcons/NavIcons";

export const HeroTitleColorized: React.FC<{ children: React.ReactNode, color?: 'white' | 'default' }> = ({children, color}) => {

    const isWhite = color == 'white'

    return (
        <h1 className={`${isWhite ? 'text-white' : 'text-blue-700'} text-2xl md:text-[40px] font-bold  leading-7 md:leading-[41px] z-10 relative`}> {children} </h1>)
}

export const AdminPageTitle: React.FC<{ children: React.ReactNode, subElement?: React.ReactNode,withMb?: boolean, handleAdd?: ()=>void }> = ({children, subElement, withMb, handleAdd}) => {
    return (
        <div className={`flex justify-between items-center ${withMb && 'mb-[15px]'}`}>
            <div className={`flex gap-[10px] items-center justify-center`}>
                <div className={`text-admin-primary text-lg lg:text-[27.57px] font-semibold finter leading-[41.36px] tracking-tight`}>{ children }</div>
                {handleAdd && <button className={`text-admin-primary hover:text-primary transition duration-200`}
                         onClick={handleAdd}>
                    <MoreIcon/>
                </button>}
            </div>
            { subElement }
        </div>
    )
}

export const AdminPageSublink: React.FC<{name: string} & React.HTMLAttributes<HTMLButtonElement>> = ({name, ...props})=> {

    return(
        <button className={`text-blue-700 text-base font-medium finter leading-normal hover:text-blue-500 transition ease-in duration-200`}>{name}</button>
    )
}


export const EvaluateHero:React.FC<{label: string, value: string, variant?: 'primary' | 'secondary' | 'blue' | 'red'}> = ({label, variant = 'primary', value}) => {

    const isPrimary = variant === 'primary'

    const baseClasses = `leading-[24px] flex flex-col gap-[10px]`
    let variantClasses = ``

    switch (variant) {
        case 'primary':
            variantClasses = `text-admin-primary`;
            break;
        case 'secondary':
            variantClasses = `text-text-body`;
            break;
        case 'blue':
            variantClasses = `text-blue-secondary`;
            break;
        case 'red':
            variantClasses = `text-vred`;
            break;
    }


    let classes = `${baseClasses} ${variantClasses}`

  return(
      <div className={classes}>
          <div className={`font-normal text-[17px]`}>{label}</div>
          <div className={`${isPrimary ? 'font-bold' : 'font-normal'} text-[30px]`}>{value}</div>
      </div>
  )
}

export const EvaluateHeroContainer:React.FC<{firstChild: React.ReactNode, secondChild: React.ReactNode}> = ({firstChild, secondChild}) => {
  return(
      <div className={`grid grid-cols-12`}>
          <div className={`col-span-5`}>{firstChild}</div>
          <div className={`col-span-2 text-center`}>-</div>
          <div className={`col-span-5`}>{secondChild}</div>
      </div>
  )
}
