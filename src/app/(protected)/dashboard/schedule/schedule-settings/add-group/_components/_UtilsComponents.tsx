"use client"

import React from "react";
import { motion } from 'framer-motion';
import {RadioField, SelectField, VSelectProp} from "@/components/form/TextField";
import {useGetHours} from "@/hooks/shedule/useSchedule";
import Hour from "@/model/schedule/Hour";
import {useGetDaysOfTheWeeks} from "@/hooks/driver/useDriver";

export const AdminPlaningLabel: React.FC<{} & React.HTMLAttributes<HTMLDivElement>> = ({children, ...props}) => {

    return (
        <div className={`text-text-body font-medium finter text-[16px] leading-[24.22px]`} {...props}>{children}</div>
    )
}

export const GroupRadioField: React.FC<{ label: string, name: string, checked?: boolean, onChange?: (checked?: boolean)=>void }> = ({label, name, checked = false, onChange}) => {
    return (
        <RadioField
            onChange={onChange}
            defaultChecked={checked}
            variant={`title`}
            label={label}
            name={name}
        />
    )
}

export const GroupTitle: React.FC<{ title: string }> = ({title}) => {
    return (
        <div className="text-admin-primary text-[16px] font-medium leading-[24px]"> {title} </div>
    )
}


export const AdminSettingBorderedCard: React.FC<{
    children: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>> = ({children, ...props}) => {
    return (
        <div
            className={`w-fit p-[10px] border border-admin-primary finter font-normal leading-[21px] text-[14px] rounded-2xl flex flex-col gap-2`} {...props}>
            {children}
        </div>
    )
}


export const GroupOptionTitle: React.FC<{ title: string }> = ({title}) => {
    return (
        <div className="text-gray-500 text-base font-mediumleading-normal max-w-[800px]"> {title} </div>
    )
}

export const GroupOptionGroup: React.FC<{ title: string[] }> = ({title}) => {
    return (
        <div className={`flex gap-2 opacity-65`}>
            <GroupRadioField name={'t'} label={title[0]}/>
            <GroupRadioField name={'t'} label={title[1]}/>
        </div>
    )
}
export const GroupOptionItemContainer: React.FC<{} & React.HTMLAttributes<HTMLDivElement>> = ({children, ...props}) => {
    return (
        <div className={`flex gap-[10px] items-center justify-start`} {...props}>
            {children}
        </div>
    )
}

export const GroupOptionField: React.FC<{
    items: VSelectProp[],
    onSelectItem?: (v: string | number) => void,
    defaultValue?: string | undefined
}> = ({
          items, onSelectItem, defaultValue
}) => {
    return (
        <SelectField
            defaultValue={defaultValue}
            items={items}
            fit={true}
            variant={'rounded'}
            size={'sm'}
            handleSelect={onSelectItem}
        />
    )
}

export const SelectHourField: React.FC<{onSelectItem?: (v: string | number) => void, defaultValue?: string | undefined}> = ({onSelectItem, defaultValue}) => {

    const {data: hours, isLoading: loadingHours} = useGetHours()

    if (loadingHours || !hours) {
        return (
            <div className={`bg-slate-200 animate-pulse h-[30px] w-[110px] rounded-2xl`}></div>
        )
    }
    return (
        <GroupOptionField
            onSelectItem={onSelectItem}
            defaultValue={defaultValue}
            items={Hour.toVSelect(hours)}
        />
    )
}

export const SelectDayField: React.FC<{onSelectItem?: (v: string | number) => void, defaultValue?: string | undefined}> = ({onSelectItem, defaultValue}) => {

    const {dayOfTheWeeksProps} = useGetDaysOfTheWeeks()

    if (!dayOfTheWeeksProps) {
        return (
            <div className={`bg-slate-200 animate-pulse h-[30px] w-[110px] rounded-2xl`}></div>
        )
    }
    return (
        <GroupOptionField
            onSelectItem={onSelectItem}
            defaultValue={defaultValue}
            items={dayOfTheWeeksProps}
        />
    )
}

export const ExpendableCheckbox: React.FC<{checkbox: React.ReactNode, expended: boolean} & React.HTMLAttributes<HTMLDivElement>> = ({checkbox, expended, children }) => {

    const variants = {
        open: {
            opacity: 1,
            height: "auto",
            transition: { duration: 0.5, ease: "easeInOut" }
        },
        collapsed: {
            opacity: 0,
            height: 0,
            transition: { duration: 0, ease: "easeInOut" }
        }
    };
    return(
        <div>
            <div>
                {checkbox}
            </div>
            <motion.div
                initial="collapsed"
                animate={expended ? "open" : "collapsed"}
                variants={variants}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                {children}
            </motion.div>
        </div>
    );
}