"use client"

import React from "react";
import {
    DashBoardSectionContainer,
    DropDownSelect,
    DropdownSelectItemsProps,
    SectionAverage,
    SectionChartLabel,
    SectionDate,
    SectionPrice,
    SectionTitleWithDropdownMenu
} from "@/app/(protected)/dashboard/_components/_utils/DashboardSection.utils";
import BtnBase from "@/components/elements/BtnBase";
import CustomChartLineUtils from "@/app/(protected)/dashboard/_components/_utils/CustomChartLine.utils";
import CalendarDateSelect from "@/components/form/CalendarDateSelect";
import {P_AND_L_SIMPLIFIED_ACCOUNTS_ROUTE} from "@/utils/protectedNavigation";
import useDashboardStore from "@/stores/protected/dashboard/app/useDahsboardApp.store";
import {resolveMonth, weekPlageGenerator} from "@/utils/func/dateConfig";

const items = ['Mensuel', 'Hebdo'].map((_, i) => ({id: i + 1, value: '' + _})) satisfies DropdownSelectItemsProps[]


const OverallTurnover: React.FC = () => {

    const [timeResolver] = React.useState(items[0])
    const {updateGlobalDate, gIsHebDo} = useDashboardStore()

    const onMonthChange = (newMonth: number) => {
        updateGlobalDate({month: newMonth})
    }

    const onYearChange = (newYear: number) => {
        updateGlobalDate({year: newYear})
    }

    const onWeekChange = (newWeek: number) => {
        updateGlobalDate({week: newWeek})

    }

    const onWeekModeChange = (mode: DropdownSelectItemsProps) => {
        updateGlobalDate({isHebdo: +mode.id === 2})

    }

    return (
        <DashBoardSectionContainer beforeHead={
            <SectionTitleWithDropdownMenu name={"Chiffre d’affaire global"} className={`mb-[6px]`}>
                <CalendarDateSelect
                    handleYearChange={onYearChange}
                    handleMonthChange={onMonthChange}
                    handelWeekChange={onWeekChange}
                    tableModeIsHebdo={gIsHebDo}
                    children={<DropDownSelect
                        label={"Mensuel"}
                        items={items}
                        activeItem={gIsHebDo ? items[1] : items[0]}
                        variant={"text"}
                        handlerSelect={onWeekModeChange}
                    />
                    }
                />
            </SectionTitleWithDropdownMenu>
        } head={<OvreallTurnOverHead/>}>
            <CustomChartLineUtils isWeekly={gIsHebDo}/>
        </DashBoardSectionContainer>
    )
}

const OvreallTurnOverHead: React.FC = () => {

    const {gActiveYear, gActiveMonth, gActiveWeek, gIsHebDo} = useDashboardStore()

    const dateMode = gIsHebDo ? `${weekPlageGenerator(gActiveWeek, gActiveYear)}` : `${resolveMonth(gActiveMonth)} ${gActiveYear}`

    return (
        <div className={`w-fit cursor-default`}>
            <SectionDate name={dateMode}/>
            <SectionPrice name={"$37.5K"}/>
            <SectionAverage title={"Vs Juin $30K"} value={"+2.45%"}/>
            <div className={`mt-[20.17px]`}>
                <SectionChartLabel title={"2024 (en cours)"} color={"primary"}/>
                <SectionChartLabel title={"2023"} color={"secondary"}/>
            </div>
            <div className={`mt-[72px]`}>
                <BtnBase size={'sm'} to={P_AND_L_SIMPLIFIED_ACCOUNTS_ROUTE} color={"blue"} variant={"outline"}
                         shape={"square"} w={"162px"} fontWeight={'bold'}>Voir
                    P&L</BtnBase>
            </div>
        </div>
    )
}

export default OverallTurnover
