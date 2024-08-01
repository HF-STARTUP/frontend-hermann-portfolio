"use client"

import React, {useRef, useState} from "react";
import Chip, {VehicleStatusBadge} from "@/components/box/Chip";
import Image from "next/image";
import {CheckGreenIcon, MoreVerIcon} from "@/components/layout/admin/sidebar/_navIcons/NavIcons";
import {cn} from "@/utils/ui/cn";
import Vehicule from "@/model/vehicule/Vehicule";

export type ActivityVariant = 'endError' | 'default'

type ItemContentBeforeProps = {
    title: string[],
    badgeStatus?: 'error' | 'active',
    variant?: ActivityVariant,
    vehicle?: Vehicule
}
export const ItemContentBefore: React.FC<ItemContentBeforeProps> = ({
                                                                        title,
                                                                        badgeStatus,
                                                                        variant,
                                                                        vehicle
                                                                    }) => {

    const isEndError = variant === 'endError'
    const badgeIsError = badgeStatus === 'error'

    return (
        <div className={`flex flex-col gap-[2.5px]`}>
            <div className="text-admin-primary text-xl font-bold leading-7 flex items-center gap-[7px]">
                <div>{title[0]}</div>
                {vehicle&&< VehicleStatusBadge variant={vehicle.status} />}
            </div>
            {title[1] && (<div className="text-admin-primary text-xl font-medium leading-7">{title[1]}</div>)}
            {title[2] && title[2].length && (
                <div className="text-admin-primary text-xl font-medium leading-7">{title[2]}</div>)}
            {title[3] && (<div
                className={`${isEndError ? 'text-vred' : 'text-[#80878C]'} text-xl font-medium leading-7`}>{title[3]}</div>)}
        </div>
    )
}

type ItemContentAfterProps = {
    children: React.ReactNode,
    title?: string,
    subtitle?: string,
    badge?: string,
    image?: string,
    variant?: 'default' | 'secondary'
}

export const ItemContentAfter: React.FC<ItemContentAfterProps> = ({
                                                                      children,
                                                                      title,
                                                                      subtitle,
                                                                      badge,
                                                                      image,
                                                                      variant
                                                                  }) => {

    const isSecondaryVariant = variant === 'secondary'

    return (
        <div className={`flex flex-col justify-end items-end gap-[7px]`}>
            {children}
            {title && !isSecondaryVariant && <div
                className="text-right text-emerald-600 text-xl font-medium font-['DM Sans'] leading-7 mt-[16px]">{title}</div>}
            {subtitle && <div>
                <div className={`flex items-end justify-end gap-[13px]`}>
                    {!isSecondaryVariant ? <div className={`flex flex-col gap-[6px] justify-end items-end`}>
                        <div
                            className="text-right text-gray-500 text-xl font-medium font-['DM Sans'] leading-7">{subtitle}</div>
                        {badge && (<Chip name={badge}/>)}
                    </div> : (<SecondaryItemContent subtitle={subtitle} title={title}/>)
                    }
                    {image && <Image
                        src={image}
                        width={42}
                        height={45.8}
                        className={`relative rounded-md hover:opacity-85 transition ease-in duration-200 cursor-pointer`}
                        alt={''}
                    />}
                </div>
            </div>}
        </div>
    )
}

const SecondaryItemContent: React.FC<{ title?: string, subtitle?: string }> = ({title, subtitle}) => {

    return (
        <div className={`text-gray-500 text-xl leading-7 font-medium flex justify-end items-end flex-col`}>
            <div className="">{title}</div>
            <div className="">{subtitle}</div>
        </div>
    )
}

export const CardItemMenuContainer: React.FC<{
    toggleIcon?: React.ReactNode,
    children: React.ReactNode
}> = ({toggleIcon, children}) => {
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null)

    const handleToggleMenu = (e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setMenuIsOpen(!menuIsOpen);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setMenuIsOpen(false);
        }
    };

    React.useEffect(() => {
        if (menuIsOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuIsOpen]);

    return (
        <div className={`relative flex items-center`}>
            <button
                className={`${toggleIcon ? '' : 'text-[#80878C]'} hover:opacity-75 transition ease-in delay-75 duration-200`}
                onClick={handleToggleMenu}>
                {toggleIcon ? toggleIcon : <MoreVerIcon/>}
            </button>
            {menuIsOpen && <div ref={menuRef}
                                className={`w-[234px] rounded border border-sky-100 absolute right-1 z-10 top-10 bg-white`}
                                onClick={(e) => e.stopPropagation()}>
                {children}
            </div>}
        </div>
    );
};

export const CardItemMenu: React.FC<{
    name: string,
    locked?: boolean,
    variant?: 'default' | 'red'
} & React.HTMLAttributes<HTMLDivElement>> = ({name, variant, locked, ...props}) => {

    const isRed = variant === 'red'

    return (
        <div className={``} {...props}>
            <div className={`text-base font-normal
                leading-7 px-6 py-[7px] bg-white text-center cursor-pointer hover:bg-sky-50
                transition ease-in duration-100 ${isRed ? 'text-red-500' : 'text-slate-400'}
                `}
            >
                <div>{name}</div>
            </div>
            <div className="w-full h-px relative bg-violet-50"/>
        </div>
    )
}


export const CardItemContainer: React.FC<{
    children: React.ReactNode,
    before: React.ReactNode,
    checkItem?: React.ReactNode,
    variant?: 'normal' | 'error'
}> = ({
          children, before, checkItem, variant = 'normal'
      }) => {

    const isError = variant === 'error'

    return (
        <div
            className={cn(
                `group relative px-3 py-3  transition rounded-[20px]`,
                `ease-in delay-75 duration-300 flex items-center gap-[37px] cursor-pointer`,
                `${isError ? 'bg-red-50 hover:bg-red-100' : 'bg-white hover:bg-slate-100'}`
            )}>
            <>
                {checkItem}
            </>
            <div className={`flex justify-between items-start grow`}>
                <div className={`flex gap-[23.22px]`}>
                    {before}
                </div>
                <div className={``}>
                    {children}
                </div>
            </div>
        </div>
    )
}


export const BeforeListCheck: React.FC = () => {

    const [checked, setChecked] = React.useState(false)

    const handleToggleCheck = () => {
        setChecked(!checked)
    }

    return (
        <CheckGreenIcon className={`
            cursor-pointer text-green-600 ${checked ? 'text-opacity-100' : 'text-opacity-25'} 
            hover:text-opacity-55 transition duration-200 ease-in`} onClick={handleToggleCheck}
        />
    )
}
