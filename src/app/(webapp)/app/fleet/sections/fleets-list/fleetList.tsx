"use client"

import FleetListAccount from "@/app/(webapp)/app/fleet/sections/fleets-list/config";
import {useGetFleetsList} from "@/hooks/admin/useFleetHook";
import Loading from "@/components/ui/Loader";
import {EmptyData} from "@/components/box/PageNetworkState";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import React from "react";
import {Calendar} from "@/components/ui/calendar";
import {Input} from "@/components/ui/input";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {FleetModel} from "@/model/ADMIN/fleet";
import {format, isWithinInterval} from "date-fns";
import {CloseIcon, FilterIcon, SearchIcon} from "@/components/ui/__icons";
import {IoMdClose} from "react-icons/io";
import {CalendarMinus, ListFilter} from "lucide-react";
import {ABlockTitle} from "@/app/(webapp)/app/dashboard/_components/abonEvolution/abonnEvolution";
import {MetaFilter} from "next/dist/lib/metadata/generate/meta";
import {LuListFilter} from "react-icons/lu";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {searchAndFilter} from "@/model/Model";
import {CgPlayListSearch} from "react-icons/cg";

enum FleetAbonType {
    free = "Essaie gratuit",
    premium = "Premium"
}

export const FleetList = () => {

    const {data, isLoading} = useGetFleetsList()
    const [date, setDate] = React.useState<Date[] | undefined>([])
    const [fleetList, setFleetList] = React.useState<FleetModel[]>([])
    const [calendarIsOpen, setCalendarIsOpen] = React.useState(false)
    const [filterIsActive, setFilterIsActive] = React.useState(false)
    const [filterFleetToken, setFilterFleetToken] = React.useState("")
    const [activeBonnType, setActiveAbonType] = React.useState("all")

    React.useEffect(() => {
        if (data) {
            setFleetList(data)
        }
    }, [data, isLoading])

    React.useEffect(() => {
        onFilterFleetWithSearchTerm()
    }, [filterFleetToken])

    const onFilterFleet = (abonType: string) => {
        setDate([])
        setActiveAbonType(abonType)

        const timer = setTimeout(() => {
            const finalType = abonType === "all" ? FleetAbonType.free : abonType

            if (data) {
                const filteredFleet = data.filter(d => d.suscription_name == finalType)
                setFleetList(filteredFleet)
            }
            clearTimeout(timer)
        }, 500)
    }

    const onFilterFleetWithSearchTerm = () => {
        if (data) {
            const filteredFleet = searchAndFilter(data, filterFleetToken, ['name'])
            const finalType = activeBonnType === "all" ? FleetAbonType.free : activeBonnType
            const filteredFleet2 = filteredFleet.filter(d => d.suscription_name == finalType)


            setFleetList(filteredFleet2)
        }
    }

    React.useEffect(() => {
        if (date && date.length === 2) {
            const [startDate, endDate] = date;
            const filteredFleet = data?.filter(fleet => {
                const fleetStartDate = new Date(fleet._instance.start_date);
                return isWithinInterval(fleetStartDate, {start: startDate, end: endDate});
            });
            const finalType = activeBonnType === "all" ? FleetAbonType.free : activeBonnType
            if (filteredFleet) {
                const filteredFleet2 = filteredFleet.filter(d => d.suscription_name == finalType)
                setFleetList(filteredFleet2 || []);
            } else {
                setFleetList([])
            }
        } else {
            if (data) {
                const filteredFleet2 = data.filter(d => d.suscription_name == activeBonnType)
                setFleetList(filteredFleet2 || []);
            }
        }
    }, [date]);


    if (isLoading) {
        return <Loading/>
    }

    if (!isLoading && data && data.length === 0) {
        return (
            <EmptyData
                message={"Aucune flotte pour l'instant"}
            />
        )
    }

    if (data && data.length > 0) {
        return (
            <div>
                <div className={"flex justify-between items-center"}>
                    <div className={"lg:mt-[24px] flex items-center  justify-between gap-[26px] w-full"}>
                        <ABlockTitle>Sélectionnez une flotte</ABlockTitle>
                        <Button
                            className={cn(
                                "flex items-center hover:text-white gap-1 bg-white text-vaTextPrimary border",
                                filterIsActive && "bg-vaPrimary text-white"
                            )}
                            onClick={() => setFilterIsActive(!filterIsActive)}
                        >
                            <div>Filtre</div>
                            <LuListFilter/>
                        </Button>
                    </div>
                    {/*<UserAccountSection/>*/}
                </div>
                <div className={"mb-[20px] mt-[10px] lg:mt-[22px]"}>
                    {filterIsActive && <div className={"flex flex-col gap-2 lg:flex-row items-center justify-between"}>
                        <div
                            className={"flex flex-row  justify-between w-full md:justify-start items-center gap-2"}>
                            <div className={"font-semibold text-sm text-vaTextPrimary"}>Type d'abonnement:</div>
                            <Select defaultValue={"all"} onValueChange={onFilterFleet}>
                                <SelectTrigger className="w-fit">
                                    <SelectValue placeholder="Type"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Tout</SelectItem>
                                    <SelectItem value={`${FleetAbonType.free}`}>Essaie gratuit</SelectItem>
                                    <SelectItem value={`${FleetAbonType.premium}`}>Premium</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div
                            className={"flex flex-row  justify-between w-full md:justify-end items-center gap-2"}>
                            <div className={"font-semibold text-sm text-vaTextPrimary"}>Date d'ajout:</div>
                            <div className={"flex items-center gap-2"}>
                                <Popover open={calendarIsOpen} onOpenChange={setCalendarIsOpen}>
                                    <PopoverTrigger>
                                        <Input
                                            rightIcon={<CalendarMinus className={"text-vaTextPrimary"}/>}
                                            className={"w-fit max-w-[230px]"}
                                            placeholder={"Choisir une intervalle"}
                                            onClick={() => {
                                                setCalendarIsOpen(true)
                                                setDate([])
                                            }}
                                            value={date?.length ? `${format(date.length ? date[0] : new Date(), "dd/MM/yyyy")} - ${format(date.length > 1 ? date[1] : new Date(), "dd/MM/yyyy")}` : ""}
                                        />
                                    </PopoverTrigger>
                                    <PopoverContent asChild className={"p-0"}>
                                        <div>
                                            <Calendar
                                                mode="multiple"
                                                selected={date}
                                                min={2}
                                                max={2}
                                                onSelect={(day) => {
                                                    console.log(day)
                                                    setDate(day)
                                                    if (date && date?.length >= 1) {
                                                        setCalendarIsOpen(false)
                                                    }
                                                }}
                                                className="rounded-md border"
                                            />
                                        </div>
                                    </PopoverContent>
                                </Popover>
                                {date?.length ? <button onClick={() => setDate([])}>
                                    <IoMdClose/>
                                </button> : <span></span>}
                            </div>
                        </div>
                        <Input
                            placeholder={"Rechercher..."}
                            rightIcon={<CgPlayListSearch className={"text-vaTextPrimary text-[28px]"}/>}
                            onChange={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                setFilterFleetToken(e.currentTarget.value)
                            }}
                        />

                    </div>}
                </div>
                <div className={"custom-scrollbar overflow-y-scroll rounded-lg"}>
                    <FleetListAccount fleets={fleetList}/>
                </div>
            </div>
        )
    }
}