"use client"

import React from "react";
import {
    DropDownSelect,
    DropDownSelectGroup,
    DropdownSelectItemsProps
} from "@/app/(protected)/dashboard/_components/_utils/DashboardSection.utils";
import {WEEKS_CLASIC, YEAR_MONTHS, YEARS_NUM} from "@/utils/staticData";


const CalendarDateSelect: React.FC<{
    handleYearChange: (year: number) => void,
    handleMonthChange: (month: number) => void,
    handelWeekChange?: (month: number) => void,
    tableModeIsHebdo?: boolean,

    children: React.ReactNode
}> = ({tableModeIsHebdo = false, handleYearChange, handleMonthChange, handelWeekChange, children}) => {
    const [activeMonth, setActiveMonth] = React.useState<DropdownSelectItemsProps>(YEAR_MONTHS[0])
    const [activeMWeek, setActiveWeek] = React.useState<DropdownSelectItemsProps>(WEEKS_CLASIC[0])
    const [activeYear, setActiveYear] = React.useState<DropdownSelectItemsProps>(YEARS_NUM[0])


    const updateYear = (year: DropdownSelectItemsProps) => {
        setActiveYear(year)
        handleYearChange(+year.id)
    }

    const updateMonth = (month: DropdownSelectItemsProps) => {
        setActiveMonth(month)
        handleMonthChange(+month.id)
    }

    const updateWeek = (week: DropdownSelectItemsProps) => {
        setActiveWeek(week)
        handelWeekChange && handelWeekChange(+week.id)
    }


    const DROPDOWN_ITEMS = tableModeIsHebdo ? WEEKS_CLASIC : YEAR_MONTHS
    const ACTIVE_ITEM = tableModeIsHebdo ? activeMWeek : activeMonth
    const ACTIVE_HANDLE = tableModeIsHebdo ? updateWeek : updateMonth

    return (
        <DropDownSelectGroup>
            {children}
            <DropDownSelect
                activeItem={ACTIVE_ITEM}
                items={DROPDOWN_ITEMS}
                handlerSelect={ACTIVE_HANDLE}
            />
            <DropDownSelect activeItem={activeYear} items={YEARS_NUM} handlerSelect={updateYear}/>
        </DropDownSelectGroup>
    )
}

export default CalendarDateSelect
