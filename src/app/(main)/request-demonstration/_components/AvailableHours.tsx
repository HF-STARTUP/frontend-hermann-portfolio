import React from "react";
import CardDefault from "@/components/box/Card";

const AvailableHours: React.FC = ()=>{

    const AVALAIBLES_HOURS = [
        {
            name: '09:00',
            enabled: false
        },
        {
            name: '10:00',
            enabled: true
        },
        {
            name: '11:00',
            enabled: false
        },
        {
            name: '12:00',
            enabled: true
        },
        {
            name: '13:00',
            enabled: true
        },
        {
            name: '14:00',
            enabled: true
        },
        {
            name: '15:00',
            enabled: true
        },
        {
            name: '16:00',
            enabled: true
        },
    ] satisfies AvalableHouItemProps[]

    return(
        <div className={`h-full`}>
            <CardDefault>
                <div className={`flex flex-col gap-[32px] h-full`}>
                    <h4 className="text-zinc-800 text-sm font-medium text-center">Horaires disponibles</h4>
                    <div className={`flex flex-col gap-4`}>
                        {
                            AVALAIBLES_HOURS.map((hour)=>(
                                <AvailableHourItem item={hour} key={hour.name} />
                            ))
                        }
                    </div>
                </div>
            </CardDefault>
        </div>
    )
}


type AvalableHouItemProps = {
    name: string
    enabled: boolean
}
const AvailableHourItem: React.FC<{item:AvalableHouItemProps}> = ({item})=>{
    return(
        <div className={`w-full pt-[9px] pb-1.5 bg-[#F7F7F7] rounded-md border border-blue-700 justify-center items-center hover:bg-sky-50 hover:border-sky-600/[1]
        inline-flex ${!item.enabled && 'bg-neutral-100 border-zinc-400'} ${item.enabled && 'hover:border-blue-800 hover:bg-sky-100 transition-colors ease-in delay-75 duration-300'}
        cursor-pointer select-none
        `}>
            <div className={`text-blue-700 text-sm font-medium fpoppins ${!item.enabled && ' text-neutral-400'}`}>{item.name}</div>
        </div>
    )
}

export default AvailableHours
