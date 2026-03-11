"use client"

import Image from "next/image";
import { cn, ConnexionMode } from "@/lib/utils";
import logo_icon from "./logo.png"
import { Button } from "@/components/ui/button";
import { useUserProfile } from "@/hooks/__form/auth/useUserProfile";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import * as React from "react";
import { useMemo } from "react";
import AuthManagerGuard from "@/guard/AuthManagerGuard";
import { queryClient } from "@/app/_utils/network/reactQuery";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { searchAndFilter } from "@/model/Model";
import SignOutAction from "@/components/actions/Signout.action";
import { SignOutIcon } from "@/components/ui/__icons";
import { useGetCurrenciesList } from "@/hooks/admin/useFleetHook";
import { Bell, ChevronDown, MapPin, Search } from "lucide-react";

export const Navbar = () => {
    return (
        <div
            className={cn(
                "bg-vaPrimary py-[10px] lg:py-[30px] h-[70px] lg:h-[94px] fixed w-full flex items-center justify-between px-[10px] lg:px-[40px] z-50"
            )}>
            <div className="flex items-center gap-24">
                <Image className={"h-[15px] w-auto lg:h-[23px]"} width={169} height={23} src={logo_icon} alt={""} />

                <Input type="search" placeholder="Rechercher une flotte, transaction..." className="bg-white/15 backdrop-blur-2xl border border-white/50 text-white w-80 rounded-2xl placeholder:text-white/70 text-sm" leftIcon={<Search className="text-white size-5" />} />

                <div className="flex items-center gap-8">
                    <div className="bg-white/10 px-2 py-1 rounded-xl flex items-center border border-white/50">
                        <div className="flex flex-col gap-2 text-white/50 w-fit pl-2 pr-4 border-r border-white/50">
                            <p className="font-normal w-max">Transactions du jour</p>
                            <p className="font-semibold text-lg text-white">122</p>
                        </div>
                        <div className="flex flex-col gap-2 text-white/50 w-fit pr-2 pl-4">
                            <p className="font-normal w-max">Revenus du jour</p>
                            <p className="font-semibold text-lg text-vaOrange">2.4M XOF</p>
                        </div>
                    </div>

                </div>

            </div>
            <div>
                <UserOption />
            </div>
        </div>
    )
}

// Assuming SignOutAction and SignOutIcon components exist

const UserOption: React.FC = () => {
    const { data, isLoading } = useUserProfile()
    const $router = useRouter()
    const $params = useParams()
    const $path = usePathname()
    const [filterCityToken, setFilterCityToken] = React.useState<string>("")
    const [selectOpen, setSelectOpen] = React.useState(false)
    const { data: currencies, isLoading: loadingCurrency } = useGetCurrenciesList()

    const cityFiltered = useMemo(() => {
        if (!filterCityToken || filterCityToken.trim() === "") return data?.listPark
        if (data) {
            const filteredCities = searchAndFilter(data.listPark, filterCityToken, ["name"])
            const activeCity = AuthManagerGuard.getEnabledCity ?? String(data.listPark[0].id)

            const cityEnabled = data.listPark.find((d) => String(d.id) === activeCity) ?? data.listPark[0]
            const filteredDataContainActiveElement = filteredCities.find((d) => String(d.id) === activeCity)

            if (!filteredDataContainActiveElement) {
                return [cityEnabled, ...filteredCities]
            }

            return filteredCities
        }
    }, [filterCityToken, data])

    if (isLoading) {
        return <div></div>
    }

    if (data) {
        return (
            <div className={"flex gap-6 items-center"}>
                <Select
                    onValueChange={(new_city_id) => {
                        const selected = data?.listPark.find((lp) => lp.id == +new_city_id)
                        AuthManagerGuard.setEnabledCityID(+new_city_id)
                        AuthManagerGuard.setCurrency(selected?.currency)
                        const isAll = new_city_id === "999999"

                        if (currencies?.length) {
                            const found = currencies.find(c => c.name.toLowerCase() === selected?.currency.toLowerCase())
                            if (found) {
                                AuthManagerGuard.setCurrency(String(found.id))
                            }
                        }

                        if (!isAll) {
                            //AuthManagerGuard.removeCurrency()
                        } else {

                        }
                        console.log(`<<<<<<<<<<<<<<<<<<<<${new_city_id} ${isAll}`)

                        if ($path.includes("tickets")) {
                            window.location.reload()
                        }

                        queryClient.invalidateQueries().then(() => {
                        })
                        if ($params.hasOwnProperty("fleetID")) {
                            $router.push("/app/fleet")
                        }
                    }}
                    defaultValue={AuthManagerGuard.getEnabledCity ?? String(data.listPark[0].id)}
                    onOpenChange={(open) => setSelectOpen(open)}
                    open={selectOpen}
                >
                    <SelectTrigger
                        className="bg-white/10 border border-white/50 rounded-xl text-white font-medium" leftIcon={<MapPin className="size-4 mr-2" />}>
                        <SelectValue placeholder="Selectionner" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Sélectionner une ville</SelectLabel>
                            <div className={"px-2 mb-2 mt-2"}>
                                <Input
                                    placeholder={"Rechercher..."}
                                    value={filterCityToken}
                                    onChange={(e) => {
                                        // Prevent default behavior but don't reset the value
                                        e.preventDefault()
                                        e.stopPropagation()
                                        setFilterCityToken(e.target.value)
                                    }}
                                    // Prevent the select from closing when clicking in the input
                                    onClick={(e) => {
                                        e.stopPropagation()
                                    }}
                                    // Prevent keyboard events from bubbling up to the Select component
                                    onKeyDown={(e) => {
                                        if (e.key === "Escape") {
                                            // Allow Escape to close the select
                                            return
                                        }
                                        e.stopPropagation()
                                    }}
                                    autoComplete="off"
                                />
                            </div>
                            <SelectItem value={String(999999)}>
                                Tous
                            </SelectItem>
                            {cityFiltered?.map((item) => (
                                <SelectItem key={item.id} value={String(item.id)}>
                                    {item.name}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <div className="relative">
                    <Button variant={"ghost"} size={"icon"} className="hover:bg-white/10">
                        <Bell className="text-white size-12" />
                    </Button>
                    <span className="absolute bg-vaRed p-1 size-6 rounded-full text-white text-sm flex items-center justify-center -top-2 -right-1">
                        4
                    </span>
                </div>
                <div className="py-2 px-4 border-l border-white/50 flex items-center gap-3">
                    <div className="size-14 rounded-full bg-vaYellow overflow-hidden text-white flex items-center justify-center font-semibold text-lg">
                        <Image src={data.getOrganisationLogo} alt={data.getUsername} className="size-full object-cover" />
                    </div>
                    <div className="flex flex-col gap-2 text-white w-max">
                        <p className="text-lg font-semibold">{data.username}</p>
                        <p className="text-white/50">{"administrator"}</p>
                    </div>
                    <ChevronDown className="size-8 text-white/50" />
                </div>
                <Badge variant={"secondary"} className={"bg-white/15 hover:bg-white/15 text-white"}>
                    {AuthManagerGuard.getConnexionMode === ConnexionMode.Staging ? "Staging" : "Production"}
                </Badge>
                <div className={`flex justify-between gap-[10px] lg:gap-[30px] items-start cursor-default finter`}>
                    <div>
                        <SignOutAction>
                            <Button className={`group translate-x-0 mt-[2px]`}>
                                <SignOutIcon />
                            </Button>
                        </SignOutAction>
                    </div>
                </div>
            </div>
        )
    }
}

