"use client";

import React from "react";
import Image from "next/image";
import {EditIcon, EditSquareIcon} from "@/components/layout/admin/sidebar/_navIcons/NavIcons";

export const ScheduleEditItem: React.FC<{
    image: string,
    date: string,
    title: string,
    subtitle: string
} & React.HTMLAttributes<HTMLDivElement>> = ({image, date, title, subtitle, children}) => {
    return (
        <div
            className={`
            bg-[#F4F7FE] font-medium text-[14.04px] leading-[15.35px] tracking-[-2%] p-[5px] 
            rounded-[17.55px] flex justify-between items-center cursor-default
            hover:opacity-80 transition duration-200 text-admin-primary px-[15px]
            `}>
            <div className={`flex gap-[10px]`}>
                <Image
                    className={`rounded-2xl`}
                    src={image} alt={image}
                    width={50.88}
                    height={50.88}
                    priority={true}
                />
                <div className={`flex flex-col gap-[2px]`}>
                    <div>{date}</div>
                    <div>{title}</div>
                    <div className={`font-normal text-text-body`}>{subtitle}</div>
                </div>
            </div>
            <div>
                { children }
            </div>
        </div>
    )
}

export const ScheduleEditItemsGroup:React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children}) => {
  return(
      <div className={`flex flex-col gap-[10px] my-[20px]`}>
          { children }
      </div>
  )
}

export const EditScheduleBtn:React.FC<React.HTMLAttributes<HTMLButtonElement>> = ({children, ...props}) => {
    return(
        <button className={`text-[#8099CE] text-[23px]`} {...props}>
            <EditSquareIcon />
        </button>
    )
}
