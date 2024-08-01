"use client"

import React from "react";
import {ChevronDownIcon} from "@/components/layout/admin/sidebar/_navIcons/NavIcons";

type ExpandableSelectProps = {
    name: string,
    selected?: string,
    items: string[]
} & React.HTMLAttributes<HTMLDivElement>

const ExpandableSelect: React.FC<ExpandableSelectProps> = ({name, selected, items, ...props}) => {

    const [isExpended, setIsExpended] = React.useState<boolean>(false)
    const [selectedItem, setSelectedItem] = React.useState<string>(selected ?? 'tous')

    const handleToggleExpand = ()=> {
        setIsExpended(!isExpended)
    }

    const handleSelectItem = (item: string)=> {
        setSelectedItem(item)
        return handleToggleExpand()
    }

    return (
        <div {...props}>
            <div className={`bg-white rounded-[20px] text-admin-primary text-sm font-medium leading-normal border-b border-violet-50`}>
                <div className={`flex justify-between items-center cursor-pointer py-[6px] px-[12px] hover:opacity-80`} onClick={handleToggleExpand}>
                    <div>{name}({selectedItem})</div>
                    <ChevronDownIcon />
                </div>
                <div className={`${isExpended ? 'h-full' : 'h-0'} overflow-hidden transition duration-1000 ease-linear delay-100`}>
                    <ul>
                        {items.map((_, k) => (
                            <li className={`cursor-pointer rounded hover:bg-sky-50 py-[6px] px-[12px]`} key={k} onClick={()=>handleSelectItem(_)}>{_}</li>
                        ))
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ExpandableSelect
