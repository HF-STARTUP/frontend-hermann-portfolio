import Image from "next/image";
import Chip from "@/components/box/Chip";
import React from "react";
import {SwitchIcon} from "@/components/layout/admin/sidebar/_navIcons/NavIcons";

export const DefaultPassationUser: React.FC<{avatar: string, badge: string, name: string, variant?: 'first' | 'second'} & React.HTMLAttributes<HTMLDivElement>> = ({name, badge, avatar, variant = 'first', ...props}) => {

    const isSecond = variant === 'second'

    return (
        <div {...props}>
            <div className={`relative bg-[#F4F7FE] rounded-[20px] py-[3px] px-[11px] `}>
                <div className={`flex ${isSecond ? 'flex-row-reverse justify-end items-end' : 'justify-start items-center'} gap-[10px]`}>
                    <Image className={`size-[50px] relative rounded-[20px]`} width={50} height={50}
                           src={`${avatar}`}
                           alt={avatar}/>
                    <div className={`flex flex-col ${isSecond ? 'justify-end items-end' : ''}`}>
                        <div className={`text-admin-primary text-[14px] font-medium leading-[15px] mb-[3px] ${isSecond ? 'text-right' : ''}`}>{name}</div>
                        <Chip name={badge}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const DefaultPassationUserGroup: React.FC<{hour: string, firstChild: React.ReactNode, secondChild: React.ReactNode} & React.HTMLAttributes<HTMLDivElement>> = ({hour, firstChild, secondChild, ...props})=> {

    return(
        <div {...props}>
            <div className={`flex items-center justify-between gap-[5px]`}>
                <div>{firstChild}</div>
                <div className={`flex flex-col text-[28px] text-text-body justify-center items-center cursor-default`}>
                    <SwitchIcon />
                    <div className={`text-[14px] leading-[24px] font-medium text-admin-primary`}>{hour}</div>
                </div>
                <div>{secondChild}</div>
            </div>
        </div>
    )
}
