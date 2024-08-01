"use client"

import React from "react";
import {useGetCurrency} from "@/hooks/__globlal/useGlobalHook";
import {AddIconCircle} from "@/components/layout/admin/sidebar/_navIcons/NavIcons";
import {cn} from "@/utils/ui/cn";
import {VEHICLE_STATUS} from "@/types/vehicule.type";
import Driver from "@/model/driver/Driver";
import Image from "next/image";

type BadgeType = 'd' | 'i' | 'p' | 'e'

const Chip: React.FC<{ name: string, container?: "v2" | "v1" } & React.HTMLAttributes<HTMLDivElement>> = ({
                                                                                                              name,
                                                                                                              container,
                                                                                                              className
                                                                                                          }) => {

    const badge: BadgeType = name ? name[0].toLowerCase() as BadgeType : "d" as BadgeType
    let variantClasses = `bg-fuchsia-50 text-fuchsia-700`
    const isV2 = container === "v2"

    switch (badge) {
        case "d":
            variantClasses = cn(`text-[#37A3FF] bg-[#EEF5FF]`)
            break
        case "i":
            variantClasses = cn(`text-[#FF9900] bg-[#FFF4E3]`)
            break
        case "p":
            variantClasses = cn(`bg-fuchsia-50 text-fuchsia-700`)
            break
        case "e":
            variantClasses = cn(`bg-[#FFD8D6] text-[#E51D13]`)
            break
    }

    return (
        <div className={cn(
            "w-fit min-w-[105px] h-[26px]  rounded-[10px] flex justify-center items-center  cursor-default",
            "text-center text-xs font-bold leading-7",
            variantClasses,
            isV2 && "bg-white",
            className
        )}>
            <div>{name}</div>
        </div>
    )
}

export const Badge: React.FC<{ variant?: `default` | `green` | `neutral` | 'red' }> = ({variant = `default`}) => {

    const baseClasses = `w-3 h-3 relative rounded-full`
    let variantClasses = ``

    switch (variant) {
        case `default`:
            variantClasses = `bg-blue-500`
            break
        case `green`:
            variantClasses = `bg-green-correct`
            break
        case `neutral`:
            variantClasses = `bg-text-body`
            break
        case `red`:
            variantClasses = `bg-red-300`
            break
    }

    const badgeClasses = `${baseClasses} ${variantClasses}`
    return (
        <div className={badgeClasses}/>
    )
}

export const VehicleStatusBadge: React.FC<{ variant?: VEHICLE_STATUS }> = ({variant = VEHICLE_STATUS.ACTIVE}) => {

    const baseClasses = `w-3 h-3 relative rounded-full`
    let variantClasses = ``

    switch (variant) {
        case VEHICLE_STATUS.ACTIVE || VEHICLE_STATUS.ASSIGN || VEHICLE_STATUS.RESERVE:
            variantClasses = `bg-[#00A757]`
            break
        case VEHICLE_STATUS.MAINTAIN:
            variantClasses = `bg-[#FFC700]`
            break
        case VEHICLE_STATUS.DEACTIVATED:
            variantClasses = `bg-[#E51D13]`
            break
    }

    const badgeClasses = `${baseClasses} ${variantClasses}`
    return (
        <div className={badgeClasses}/>
    )
}

export const ChipRecette: React.FC<{
    price: string,
    frequency: 'monthly' | 'weekly' | 'daily' | 'day' | 'hour' | string,
    onCloseChip: () => void
}> = ({price, frequency, onCloseChip}) => {

    const [isRecipe, setIsRecipe] = React.useState(true)

    const {currency} = useGetCurrency()
    const [finalFrequency, setFinalFrequency] = React.useState("")

    React.useEffect(() => {

        // if(frequency.length) return

        switch (frequency) {
            case "daily":
                setFinalFrequency('chaque jour')
                break
            case "weekly":
                setFinalFrequency('chaque semaine')
                break
            case "monthly":
                setFinalFrequency('chaque mois')
                break
            case "day":
                setFinalFrequency('jour')
                setIsRecipe(false)
                break
            case "hour":
                setFinalFrequency('heure')
                setIsRecipe(false)
                break
        }

    }, [])

    return (
        <div className="w-fit min-w-[105px] bg-indigo-100  border border-blue-400 rounded-[20px]
        flex justify-center items-center px-2 py-[9px] cursor-default gap-[7px]
        hover:bg-indigo-50 transition duration-200
        ">
            <div className="text-center text-blue-700 text-xs font-normal leading-7">
                <span className={`font-bold`}>{price} {currency}</span>
                {isRecipe ? <span> à verser </span> : <span>/</span>}
                <span className={`font-bold`}>{finalFrequency}</span>
            </div>
            <button className={`hover:scale-[1.1] hover:opacity-80`} onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
                onCloseChip && onCloseChip()
            }}>
                <AddIconCircle/>
            </button>
        </div>
    )
}

export const DriverChip: React.FC<{ driver: Driver, onClose: (driver: Driver) => void }> = ({driver, onClose}) => {

    const [isRecipe, setIsRecipe] = React.useState(true)


    return (
        <div className="w-fit min-w-[105px] bg-indigo-100  border border-blue-400 rounded-[20px]
        flex justify-center items-center px-2 py-[9px] cursor-default gap-[7px]
        hover:bg-indigo-50 transition duration-200
        ">
            <div className="text-center text-blue-700 text-xs font-normal leading-7 flex items-center gap-2">
                <Image
                    src={driver.getAvatar} width={40} height={40} alt={"driver"}
                    className={"rounded-full size-[40px]"}
                />
                <div>
                    {driver.getUsername}
                </div>
            </div>
            <button className={`hover:scale-[1.1] hover:opacity-80`} onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
                onClose(driver)
            }}>
                <AddIconCircle/>
            </button>
        </div>
    )
}

export const LocationChip: React.FC<{ place: string, location: string, onClose: (name: string) => void }> = ({
                                                                                                                 place,
                                                                                                                 location,
                                                                                                                 onClose
                                                                                                             }) => {

    const [isRecipe, setIsRecipe] = React.useState(true)


    return (
        <div className="w-fit min-w-[105px] bg-indigo-100  border border-blue-400 rounded-[20px]
        flex justify-center items-center px-2 py-[9px] cursor-default gap-[7px]
        hover:bg-indigo-50 transition duration-200
        ">
            <div className="text-center text-blue-700 text-xs font-normal leading-7 flex items-center gap-2">
                <div className={"flex items-center gap-1"}>
                    <div className={"font-bold"}>{place}</div>
                    <div>{location}</div>
                </div>
            </div>
            <button className={`hover:scale-[1.1] hover:opacity-80`} onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
                onClose(location)
            }}>
                <AddIconCircle/>
            </button>
        </div>
    )
}

export const DayOffChip: React.FC<{ day: string, token: number, onClose: (token: number) => void }> = ({
                                                                                                           day,
                                                                                                           token,
                                                                                                           onClose
                                                                                                       }) => {


    return (
        <div className="w-fit min-w-[105px] bg-indigo-100  border border-blue-400 rounded-[20px]
        flex justify-center items-center px-2 py-[9px] cursor-default gap-[7px]
        hover:bg-indigo-50 transition duration-200
        ">
            <div className="text-center text-blue-700 text-xs font-normal leading-7 flex items-center gap-2">
                <div className={"flex items-center gap-1"}>
                    <div className={"font-bold"}>{day}</div>
                </div>
            </div>
            <button className={`hover:scale-[1.1] hover:opacity-80`} onClick={(event) => {
                event.preventDefault()
                event.stopPropagation()
                onClose(token)
            }}>
                <AddIconCircle/>
            </button>
        </div>
    )
}

export default Chip
