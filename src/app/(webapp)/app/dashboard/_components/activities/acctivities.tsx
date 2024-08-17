"use client"

import {cn} from "@/lib/utils";
import {CarCrashIcon, MoneyCashIcon, UserFleetIcon} from "@/components/ui/__icons";
import React from "react";
import {CircleArrowLeft, CircleArrowRight} from "lucide-react";
import {useGetDashboardActivities} from "@/hooks/admin/useFleetHook";
import {eachDayOfInterval, endOfMonth, format, getDay, getMonth, getYear, startOfMonth} from "date-fns";
import {fr} from 'date-fns/locale';
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {formatInTimeZone, toZonedTime} from 'date-fns-tz';
import {EmptyData} from "@/components/box/PageNetworkState";
import Loading from "@/components/ui/Loader";


export const Activities = () => {

    const currentYear = getYear(new Date());
    const currentMonth = getMonth(new Date());
    const currentDay = getDay(new Date());


    const [day, setDay] = React.useState<number>(currentDay)
    const [month, setMonth] = React.useState<number>(currentMonth)
    const [year, setYear] = React.useState<number>(currentYear)

    const {
        data,
        isLoading
    } = useGetDashboardActivities(new Date(year, month, day, 0, 0, 0), new Date(year, month, day, 23, 59, 0))

    const handleSelectMonth = (value: string) => {
        setMonth(+value)
    };

    const handleSelectDay = (value: number) => {
        setDay(value)
    };

    const handleSelectYear = (value: string) => {
        setYear(+value)
    };

    return (
        <div className={"px-[13px] py-[15px] bg-white rounded-[20px]"}>

            <div className={"flex justify-between items-center mb-[22px]"}>
                <h4 className="text-black text-2xl font-semibold">Activités</h4>
                <div className={"flex items-center gap-2"}>
                    <DateSelect type="month" currentMonth={month} handleSelect={handleSelectMonth}/>
                    <DateSelect type="year" handleSelect={handleSelectYear}/>
                </div>
            </div>

            <div className={"flex items-center justify-between"}>
                {/*<button className={"text-[#2554AE]"}>*/}
                {/*    <CircleArrowLeft/>*/}
                {/*</button>*/}
                <DaysOfMonth month={month} year={year} activeDay={day} handleSelect={handleSelectDay}/>
                {/*<button className={"text-[#2554AE]"}>*/}
                {/*    <CircleArrowRight/>*/}
                {/*</button>*/}
            </div>

            <div className={"mt-[37px] flex flex-col gap-[16px]"}>
                {/*<UserActivity*/}
                {/*    icon={<MoneyCashIcon/>}*/}
                {/*    title={"Réabonnement - Premium"}*/}
                {/*    subTitle={"Annuel"}*/}
                {/*    fleetUser={"Flotte de Christian"}*/}
                {/*    hour={"11:07"}*/}
                {/*/>*/}
                {/*<UserActivity*/}
                {/*    icon={<CarCrashIcon/>}*/}
                {/*    title={"Réabonnement - Premium"}*/}
                {/*    subTitle={"Création de véhicule"}*/}
                {/*    fleetUser={"Flotte de Christian"}*/}
                {/*    hour={"11:07"}*/}
                {/*/>*/}
                {/*<UserActivity*/}
                {/*    icon={<UserFleetIcon/>}*/}
                {/*    title={"Réabonnement - Premium"}*/}
                {/*    subTitle={"Création de chauffeurs"}*/}
                {/*    fleetUser={"Flotte de Christian"}*/}
                {/*    hour={"11:07"}*/}
                {/*/>*/}
                {!isLoading && <EmptyData message={"Aucun evenement dans cette période."} className={"h-[300px]"}/>}
                {isLoading && (
                    <Loading className={"h-[300px]"}/>
                )}
            </div>
        </div>
    )
}


interface DaysOfMonthProps {
    month: number;
    year: number;
    activeDay: number;
    handleSelect: (value: number) => void;
}

const DaysOfMonth: React.FC<DaysOfMonthProps> = ({month, year, activeDay, handleSelect}) => {
    const [_activeDay, setActiveDay] = React.useState(activeDay);

    React.useEffect(() => {
        handleSelect(_activeDay);
    }, [_activeDay, handleSelect]);

    // Définir le premier et dernier jour du mois sélectionné
    const startDate = startOfMonth(new Date(year, month - 1));
    const endDate = endOfMonth(new Date(year, month - 1));

    // Récupérer tous les jours de l'intervalle
    const days = eachDayOfInterval({start: startDate, end: endDate});

    return (
        <div className="flex gap-[15px] overflow-x-scroll overflow-y-hidden custom-scrollbar">
            {days.map((day, index) => (
                <div key={index}>
                    <DateItem
                        day_str={format(day, 'eee', {locale: fr})} // Trois premières lettres du jour en français
                        day_num={+format(day, 'd')}  // Numéro du jour dans le mois
                        is_active={+format(day, 'd', {locale: fr}) === _activeDay} // Vérifie si c'est le jour actif
                        onClick={() => setActiveDay(+format(day, 'd', {locale: fr}))} // Met à jour le jour actif
                    />
                </div>
            ))}
        </div>
    );
};


const UserActivity: React.FC<React.HTMLAttributes<HTMLDivElement> & {
    icon: React.ReactNode,
    title: string,
    subTitle: string,
    fleetUser: string,
    hour: string
}> = ({icon, title, subTitle, fleetUser, hour}) => {

    return (
        <div className={"border-b border-b-[#2a2a2a]/5 hover:opacity-85 transition"}>
            <div className={"flex justify-between items-center"}>
                <div className={"flex items-center gap-2"}>
                    <div className="text-black text-base font-semibold">{fleetUser}</div>
                    <div className="text-[#506d82] text-sm font-normal">- {hour}</div>
                </div>
                <button className="text-black text-xs font-normal">Voir plus</button>
            </div>
            <div className={"flex items-center gap-[15px] py-[15px]"}>
                <div
                    className="size-[30px] p-[6.43px] bg-[#f3ebff] text-[#6c00fa] text-[24px] rounded-[42.86px] flex justify-center items-center">
                    {icon}
                </div>
                <div>
                    <div className="text-[#506d82] text-sm font-bold">{title}</div>
                    <div className="text-[#506d82] text-sm font-normal">{subTitle}</div>
                </div>
            </div>
        </div>
    )
}


const DateItem: React.FC<React.HTMLAttributes<HTMLDivElement> & {
    day_str: string,
    day_num: number,
    is_active?: boolean
}> = ({
          day_str,
          day_num,
          is_active,
          ...props
      }) => {

    return (
        <div
            {...props}
            className={cn(
                "w-[46px] h-[59px] px-[7px] py-[11px] bg-[#dbe7ff] rounded-[14px] cursor-pointer hover:bg-blue-200 border flex flex-col justify-start items-center gap-px text-center text-[#2554ae] text-sm font-medium font-['DM Sans']",
                is_active && "bg-[#2554ae] text-white hover:bg-[#2554ae]"
            )}>
            <div className="capitalize">{day_str}</div>
            <div className="">{day_num}</div>
        </div>
    )
}

interface Option {
    value: string;
    label: string;
}

interface DateSelectProps {
    type: 'month' | 'year';
    startYear?: number;
    currentMonth?: number;
    handleSelect: (value: string) => void;
}

const getMonths = (currentMonth: number): Option[] => {
    const months: Option[] = [
        {value: "1", label: "Janvier"},
        {value: "2", label: "Février"},
        {value: "3", label: "Mars"},
        {value: "4", label: "Avril"},
        {value: "5", label: "Mai"},
        {value: "6", label: "Juin"},
        {value: "7", label: "Juillet"},
        {value: "8", label: "Août"},
        {value: "9", label: "Septembre"},
        {value: "10", label: "Octobre"},
        {value: "11", label: "Novembre"},
        {value: "12", label: "Décembre"}
    ];

    return months;
    //return months.filter(month => parseInt(month.value) <= currentMonth + 1);
};

const getYears = (startYear: number, currentYear: number): Option[] => {
    const years: Option[] = [];
    for (let year = startYear; year <= currentYear; year++) {
        years.push({value: year.toString(), label: year.toString()});
    }
    return years;
};

export const DateSelect: React.FC<DateSelectProps> = ({
                                                          type,
                                                          startYear = 2022,
                                                          handleSelect,
                                                          currentMonth: pcurrentmonth
                                                      }) => {
    const currentYear = getYear(new Date());
    const currentMonth = pcurrentmonth ?? getMonth(new Date());

    const options: Option[] = type === 'month' ? getMonths(currentMonth) : getYears(startYear, currentYear);
    const defaultValue = type === "month" ? currentMonth + 1 : currentYear

    return (
        <Select defaultValue={"" + defaultValue} onValueChange={(value) => handleSelect(value)}>
            <SelectTrigger className="w-fit">
                <SelectValue placeholder={`Sélectionner le ${type === 'month' ? 'mois' : 'année'}`}/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {options.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};