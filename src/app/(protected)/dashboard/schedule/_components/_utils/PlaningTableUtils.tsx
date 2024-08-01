"use client"

import React from "react";
import {motion} from "framer-motion";
import {AddIcon, CheckAltIcon, CloseAltIcon, RefreshIcon} from "@/components/layout/admin/sidebar/_navIcons/NavIcons";
import MonthlyCalendar, {DayInfo} from "@/utils/func/calendarGenerator";
import CalendarDateSelect from "@/components/form/CalendarDateSelect";
import {resolveMonth, resolveWeekClassic, weekPlageGenerator} from "@/utils/func/dateConfig";
import BtnBase, {BtnIconBase, SubNavButton} from "@/components/elements/BtnBase";
import useScheduleStore from "@/stores/protected/dashboard/schedule/useScheduleStore";
import {TableModeType} from "@/types/dashboard.schedule.type";
import {DAYS_OF_WEEk} from "@/utils/staticData";
import ScheduledUser from "@/app/(protected)/dashboard/schedule/_components/_utils/scheduledUser";
import DailyPlaning from "@/app/(protected)/dashboard/schedule/actions/dailyPlaning/DailyPlaning";

type PlaningTableUtilsProps = {
    tableMode: TableModeType
}

const DATE_SEQUENCY: Record<string, TableModeType> = {
    hebdo: 'Hebdo',
    mensuelle: 'Mensuelle',
}


const PlaningTableUtils: React.FC<PlaningTableUtilsProps> = ({tableMode = 'Mensuelle'}) => {
    const [activeYear, setActiveYear] = React.useState<number>(2024)
    const [activeMonth, setActiveMonth] = React.useState<number>(1)
    const [activeWeek, setActiveWeek] = React.useState<number>(1)
    const [currentCalendar, setCurentCalendar] = React.useState<DayInfo[][]>()
    const [isHebdo, setIsHbdo] = React.useState(tableMode === 'Hebdo')
    const [dateSequency, setDateSequency] = React.useState<TableModeType>(DATE_SEQUENCY.mensuelle)

    const scheduleStore = useScheduleStore()

    const days = DAYS_OF_WEEk


    const generateCalendar = (year: number = activeYear, month: number = activeMonth) => {
        const calendar = new MonthlyCalendar(year, month)
        const _currentCalendar = calendar.generate5WeeksCalendar()

        console.table(JSON.stringify(_currentCalendar))

        setCurentCalendar(_currentCalendar)
    }

    const handleChangeSequency = () => {
        const sequency: TableModeType = dateSequency === DATE_SEQUENCY.hebdo ? DATE_SEQUENCY.mensuelle : DATE_SEQUENCY.hebdo
        setDateSequency(sequency)
        setIsHbdo(!isHebdo)
        scheduleStore.setTableMode(sequency)
    }


    React.useEffect(() => {
        generateCalendar()
    }, [])

    const onMonthChange = (newMonth: number) => {
        setActiveMonth(newMonth)
        generateCalendar(activeYear, newMonth)
    }

    const onYearChange = (newYear: number) => {
        setActiveYear(newYear)
        generateCalendar(newYear)
    }

    const onWeekChange = (newWeek: number) => {
        setActiveWeek(newWeek)
        // generateCalendar(newWeek)
    }

    const {getIfTableModeIsHebdo} = useScheduleStore()


    return (
        <div className={``}>
            <div className={`mb-[20px] flex items-center justify-between`}>
                <div
                    className="text-admin-primary text-[32px] font-bold leading-tight">
                    {
                        scheduleStore.getIfTableModeIsHebdo()
                            ? (<div>
                                    <span
                                        className={`text-[#000000] opacity-90`}>{weekPlageGenerator(activeWeek, activeYear)} - </span>
                                    <span>{resolveWeekClassic(activeWeek)}</span>
                                </div>
                            )
                            : <span>{`${resolveMonth(activeMonth)} ${activeYear}`}</span>
                    }
                </div>
                <div className={`flex gap-[17px]`}>
                    <CalendarDateSelect handelWeekChange={onWeekChange}
                                        handleMonthChange={onMonthChange}
                                        tableModeIsHebdo={getIfTableModeIsHebdo()}
                                        handleYearChange={onYearChange}>
                        <SubNavButton onClick={() => handleChangeSequency()}
                                      activeValue={DATE_SEQUENCY.hebdo}>{dateSequency}</SubNavButton>
                    </CalendarDateSelect>
                    <PlaningActions/>
                </div>
            </div>
            <div
                className={`rounded-[20px] relative overflow-scroll  scrollbar scrollbar-thumb-text-body scrollbar-w-[6px] scrollbar-thumb-rounded-full scrollbar-corner-rounded-full scrollbar-track-transparent scrollbar-h-2`}>
                <table className={`w-full`}>
                    <THead>
                        <TrHead>
                            {days.map((day, index) => (
                                <TdHead withBorder={index !== (days.length - 1)} key={index}>{day}</TdHead>
                            ))}
                        </TrHead>
                        {!isHebdo &&
                            <tr className={`text-slate-500 text-sm font-bold leading-normal  border-b border-slate-400`}>
                                <TdHeadDoubleHour/>
                                <TdHeadDoubleHour/>
                                <TdHeadDoubleHour/>
                                <TdHeadDoubleHour/>
                                <TdHeadDoubleHour/>
                                <TdHeadDoubleHour/>
                                <TdHeadDoubleHour withBorder={false}/>
                            </tr>}
                    </THead>
                    <TBody>
                        {currentCalendar && currentCalendar.map((week, index) => (
                            <TrBody key={index} withBorder={index < 4}>
                                {week.map((day, key) => (
                                    <TdBodyDouble double={!isHebdo} day={day} key={key} withBorder={key < 6}/>
                                ))
                                }
                            </TrBody>
                        ))
                        }
                    </TBody>
                </table>
            </div>
        </div>
    )
}

const PlaningActions: React.FC = () => {
    const [isAutoPlaning, setIsAutoPlaning] = React.useState(false)

    const toggleIsAutoPlaning = () => {
        setIsAutoPlaning(!isAutoPlaning)
    }

    const actionVariants = {
        hidden: {opacity: 0, x: -10},
        visible: {opacity: 1, x: 0},
    };

    return (
        <div className={`flex gap-[17px]`}>
            {!isAutoPlaning &&
                <motion.div
                    initial={{opacity: 0, y: -10}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: -10}}
                    transition={{duration: 0.3, type: "spring", damping: 10}}
                >
                    <BtnBase
                        onClick={toggleIsAutoPlaning}
                        size={'sm'} color={'blue'}
                        variant={'contained'}
                        shape={'square'}
                        fullwidth={true}
                        to={''}
                    >
                        Plannifier automatiquement
                    </BtnBase>
                </motion.div>
            }
            {isAutoPlaning &&
                <div className={`flex gap-[8px]`}>
                    <motion.div
                        variants={actionVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{delay: 0.1}}
                    >
                        <BtnIconBase
                            variant={'red'}
                            title={'Annuler'}
                            onClick={toggleIsAutoPlaning}
                        >
                            <CloseAltIcon/>
                        </BtnIconBase>
                    </motion.div>
                    <motion.div
                        variants={actionVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{delay: 0.2}}
                    >
                        <BtnIconBase variant={'blue'} title={'Relancer la planification auto'}>
                            <RefreshIcon/>
                        </BtnIconBase>
                    </motion.div>
                    <motion.div
                        variants={actionVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{delay: 0.3}}
                    >
                        <BtnIconBase variant={'green'} title={`Confirmer le planning`}>
                            <CheckAltIcon/>
                        </BtnIconBase>
                    </motion.div>
                </div>
            }
        </div>
    )
}

const THead: React.FC<{ children: React.ReactNode }> = ({children}) => {

    return (
        <thead className={`rounded-[20px]`}>{children}</thead>
    )
}

const TBody: React.FC<{ children: React.ReactNode }> = ({children}) => {

    return (
        <tbody>{children}</tbody>
    )
}

const TrHead: React.FC<{ children: React.ReactNode }> = ({children}) => {
    return (<tr className={`h-[50px]`}>{children}</tr>)
}

const TdHeadDoubleHour: React.FC<{ withBorder?: boolean }> = ({withBorder = true}) => {


    const OneOption: React.FC<{ children: string, separate?: boolean }> = ({children, separate}) => {
        return (
            <div
                className={`col-span-6 bg-violet-50 hover:bg-violet-100 cursor-default ${separate ? 'border-r border-slate-300' : ''}`}>
                <div className={`w-[91px] h-[68px]  flex items-center justify-center`}>
                    {children}
                </div>
            </div>

        )
    }

    return (
        <th className={`${withBorder ? 'border-r border-slate-400' : ''}`}>
            <div className={`grid grid-cols-12`}>
                <OneOption separate={true}>06h</OneOption>
                <OneOption>12h</OneOption>
            </div>
        </th>
    )
}

const TdBodyDouble: React.FC<{ withBorder?: boolean, day: DayInfo, double?: boolean }> = ({
                                                                                              withBorder = true,
                                                                                              day,
                                                                                              double = true
                                                                                          }) => {
    const [dailyPlaningIsOpen, setDailyPlaningIsOpen] = React.useState(false)


    const OneOption: React.FC<{ children?: string, separate?: boolean, isActive?: boolean }> = ({
                                                                                                    children,
                                                                                                    separate,
                                                                                                    isActive
                                                                                                }) => {

        const withData = false


        return (
            <>
                <>
                    {!withData && (<div
                        className={`${double ? 'col-span-6' : 'col-span-12'} cursor-default group ${separate && !double ? 'border-r border-violet-100' : ''}`}>
                        <div
                            className={`${!double ? 'w-[184px]' : 'w-[91px]'} h-[68px] px-[6px] py-[3.5px] flex justify-center items-center`}>
                            <div className={`${isActive ? 'group-hover:flex group-hover:bg-slate-50' : ''} w-full h-full rounded-md cursor-pointer text-slate-500 text-sm
                    font-bold leading-normal hidden items-center justify-center border border-slate-300 border-dashed
                    transition duration-200 ease-in
                    `}>
                                <AddIcon/>
                            </div>
                        </div>
                    </div>)}
                </>
                <>
                    {withData && (
                        <div className={`col-span-11`}>
                            <ScheduledUser/>
                        </div>
                    )}
                </>
            </>
        )
    }

    return (
        <th onClick={() => setDailyPlaningIsOpen(true)}
            className={`relative ${withBorder ? 'border-r border-slate-400' : ''}`}>
            <div className={`grid grid-cols-12`}>
                {double && <OneOption isActive={day.isActive} separate={true}></OneOption>}
                <OneOption isActive={day.isActive}></OneOption>
            </div>
            <div
                className={`text-slate-500 text-sm font-bold leading-normal absolute right-[8px] bottom-[4px] ${day.isActive ? '' : 'opacity-30'}`}>{day.day}</div>
            <>
                <DailyPlaning isOpen={dailyPlaningIsOpen} onClose={() => setDailyPlaningIsOpen(false)}/>
            </>
        </th>
    )
}


const TdHead: React.FC<{ children: string, withBorder?: boolean }> = ({children, withBorder = true}) => {
    return (
        <th className={`py-[7px] px-[54px] relative bg-[#707EAE] ${withBorder ? 'border-r border-slate-400' : ''}`}>
            <div className="text-center text-white text-sm font-bold leading-normal">{children}</div>
        </th>
    )
}


const TrBody: React.FC<{ children: React.ReactNode, withBorder?: boolean }> = ({children, withBorder = true}) => {
    return (
        <tr className={`${withBorder ? 'border-b-2 border-[#E0E4F9]' : ''}`}>{children}</tr>
    )
}


const TdBody: React.FC<{ children: string }> = ({children}) => {
    return (
        <>
            <div className="text-center text-white text-sm font-bold leading-normal py-[7px]">{children}</div>
        </>
    )
}
export default PlaningTableUtils
