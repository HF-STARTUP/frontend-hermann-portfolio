"use client"

import React from "react";
import {
    CoastSelectedDriver,
    DashBoardSectionContainer,
    DropDownSelect,
    DropdownSelectItemsProps,
    SectionAverage,
    SectionCheckBoxGroup,
    SectionDate,
    SectionPrice,
    SectionTitleWithDropdownMenu
} from "@/app/(protected)/dashboard/_components/_utils/DashboardSection.utils";
import CustomChartLineUtils from "@/app/(protected)/dashboard/_components/_utils/CustomChartLine.utils";
import {RadioField} from "@/components/form/TextField";
import CalendarDateSelect from "@/components/form/CalendarDateSelect";
import {resolveMonth, weekPlageGenerator} from "@/utils/func/dateConfig";
import useDashboardStore from "@/stores/protected/dashboard/app/useDahsboardApp.store";


const items = ['Mensuel', 'Hebdo'].map((_, i) => ({id: i + 1, value: '' + _})) satisfies DropdownSelectItemsProps[]

const IndividualTurnover: React.FC = () => {


    const [timeResolver] = React.useState(items[0])
    const {updateIndividualDate, iIsHebDo} = useDashboardStore()

    const onMonthChange = (newMonth: number) => {
        updateIndividualDate({month: newMonth})
    }

    const onYearChange = (newYear: number) => {
        updateIndividualDate({year: newYear})
    }

    const onWeekChange = (newWeek: number) => {
        updateIndividualDate({week: newWeek})

    }

    const onWeekModeChange = (mode: DropdownSelectItemsProps) => {
        updateIndividualDate({isHebdo: +mode.id === 2})

    }


    return (
        <DashBoardSectionContainer beforeHead={
            <SectionTitleWithDropdownMenu
                name={"Chiffre d’affaire individuel"}
                className={`mb-[6px]`}>
                <CalendarDateSelect
                    handleYearChange={onYearChange}
                    handleMonthChange={onMonthChange}
                    tableModeIsHebdo={iIsHebDo}
                    handelWeekChange={onWeekChange}
                    children={<DropDownSelect
                        label={"Mensuel"}
                        items={items}
                        activeItem={iIsHebDo ? items[1] : items[0]}
                        variant={"text"} handlerSelect={onWeekModeChange}
                    />
                    }
                />
            </SectionTitleWithDropdownMenu>
        } head={<OvreallTurnOverHead/>}
        >
            <CustomChartLineUtils isWeekly={iIsHebDo}/>
        </DashBoardSectionContainer>
    )
}

const OvreallTurnOverHead: React.FC = () => {
    const [selectedItemType, setSelectedItemType] = React.useState<'car' | 'driver'>('driver')

    React.useEffect(() => {
        setSelectedItemType('driver')
    }, [])

    const {iActiveYear, iActiveMonth, iActiveWeek, iIsHebDo} = useDashboardStore()

    const dateMode = iIsHebDo ? `${weekPlageGenerator(iActiveWeek, iActiveYear)}` : `${resolveMonth(iActiveMonth)} ${iActiveYear}`


    return (
        <div className={`w-fit`}>
            <SectionCheckBoxGroup>
                <RadioField onChange={() => setSelectedItemType('driver')} label={'Chauffeurs'} name={'type'}
                            defaultChecked={true}/>
                <RadioField onChange={() => setSelectedItemType('car')} label={'Véhicules'} name={'type'}/>
            </SectionCheckBoxGroup>
            <SectionDate name={dateMode}/>
            <CoastSelectedDriver caseType={selectedItemType} className={`mb-[9px]`}/>
            <SectionPrice name={"$37.5K"}/>
            <SectionAverage title={"Vs Juin $30K"} value={"+2.45%"}/>
            <div className={`mt-[72px]`}>
            </div>
        </div>
    )
}

export default IndividualTurnover
