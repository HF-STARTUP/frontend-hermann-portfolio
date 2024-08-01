import React from "react";
import CardDefault from "@/components/box/Card";
import {logger} from "@/utils/func/devmode/debug";

const DateSelection:React.FC = ()=>{
    const days = ['m', 't', 'w', 't', 'f', 's', 's']
    const avalaibleDays = 32
    const availableEnds = 5
    const daysElements = []
    const daysElementsEnd = []
    const [selected, setSelected] = React.useState('5')

    const handleUpdate = (newSelected: string)=>{
        logger.log(`receive new selected ${newSelected}`)
        setSelected(newSelected)
    }
    const handleUpdatePrevent = (newSelected: string)=>{}

    for(let elem = 1; elem < avalaibleDays; elem++){
        daysElements.push(
            <DateSelectionItem handleUpdateSelected={handleUpdate} key={elem} name={elem.toString()} enabled={selected} />
        )
    }

    for(let elem = 1; elem < availableEnds; elem++){
        daysElementsEnd.push(
            <DateSelectionItem disabled={true} handleUpdateSelected={handleUpdatePrevent} key={elem} name={elem.toString()} enabled={selected} />
        )
    }

    return(
        <CardDefault>
            <div>
                <div className="text-zinc-800 text-lg font-medium font-['DM Sans']">Janvier</div>
                <div className={`my-[10px]`}>
                    <div className={`grid grid-cols-7 gap-0`}>
                        {days.map(d=>(<DateSelectionItem isHead={true} handleUpdateSelected={handleUpdatePrevent} key={d} name={d} enabled={selected} />))}
                        {daysElements}
                        {daysElementsEnd}
                    </div>
                </div>
                <div className="text-zinc-800 text-base font-medium font-['DM Sans']">Details</div>
                <div className="py-2 flex-col justify-center items-center gap-2.5 inline-flex w-full h-[200px]">
                    <div className="text-zinc-800 text-xs font-medium opacity-80">Date non disponible</div>
                </div>
            </div>
        </CardDefault>
    )
}

type DateSelectionItemProps = {
    name: string,
    enabled: string,
    handleUpdateSelected: (newSelected: string)=>void,
    isHead?: boolean
    disabled?: boolean
}
const DateSelectionItem: React.FC<DateSelectionItemProps> = ({name, enabled, handleUpdateSelected, isHead, disabled})=>{

    const selected = enabled === name && !disabled

    const handleUpdate = ()=>{
        handleUpdateSelected(name)
    }

    return(
        <div className={`col-span-1`} onClick={handleUpdate}>
            <div className={`flex w-full p-2 align-middle justify-center items-center text-zinc-800 text-[14px] 
            font-medium fpoppins cursor-pointer transition ease-in delay-75 duration-200 ${isHead && 'opacity-85'} ${disabled && 'opacity-50'}`
            }>
                <div className={`w-[40px] h-[40px] lg:w-[30px] lg:h-[30px] p-[5px] flex items-center justify-center rounded-full transition ease-in 
                    delay-75 duration-200 ${!isHead && 'hover:bg-blue-100 hover:text-blue-900 hover:rounded-full'} 
                    ${selected && 'bg-blue-700 text-white rounded-full'}`}
                >
                    {name.length < 2 && !isHead ? `0${name}` : name }
                </div>
            </div>
        </div>
    )
}

export default DateSelection
