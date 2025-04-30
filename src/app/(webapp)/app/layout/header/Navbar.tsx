"use client"

import Image from "next/image";
import {cn} from "@/lib/utils";
import logo_icon from "./logo.png"
import {Button} from "@/components/ui/button";
import {useUserProfile} from "@/hooks/__form/auth/useUserProfile";
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
import {useMemo} from "react";
import AuthManagerGuard from "@/guard/AuthManagerGuard";
import {queryClient} from "@/app/_utils/network/reactQuery";
import {useParams, usePathname, useRouter} from "next/navigation";
import {Badge} from "@/components/ui/badge";
import {ConnexionMode} from "@/hooks/__globlal/useGlobalHook";
import {Input} from "@/components/ui/input";
import {searchAndFilter} from "@/model/Model";
import SignOutAction from "@/components/actions/Signout.action";
import {SignOutIcon} from "@/components/ui/__icons";

export const Navbar = () => {
    return (
        <div
            className={cn(
                "bg-vaPrimary py-[10px] lg:py-[30px] h-[70px] lg:h-[94px] fixed w-full flex items-center justify-between px-[10px] lg:px-[40px] z-50"
            )}>
            <div>
                <Image className={"h-[15px] w-auto lg:h-[23px]"} width={169} height={23} src={logo_icon} alt={""}/>
            </div>
            <div>
                <UserOption/>
            </div>
        </div>
    )
}

// Assuming SignOutAction and SignOutIcon components exist

const UserOption: React.FC = () => {
    const {data, isLoading} = useUserProfile()
    const $router = useRouter()
    const $params = useParams()
    const $path = usePathname()
    const [filterCityToken, setFilterCityToken] = React.useState<string>("")
    const [selectOpen, setSelectOpen] = React.useState(false)

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
            <div className={"flex gap-2 items-start"}>
                <Badge variant={"secondary"} className={"bg-white/15 hover:bg-white/15 text-white"}>
                    {AuthManagerGuard.getConnexionMode === ConnexionMode.Staging ? "Staging" : "Production"}
                </Badge>
                <div className={`flex justify-between gap-[10px] lg:gap-[30px] items-start cursor-default finter`}>
                    <div className={`flex justify-end items-end lg:gap-[4px] flex-col`}>
                        <div className={""}>
                            <div
                                className="text-[#f2f2f2] text-[16px] lg:text-[24px] font-bold leading-[23px]">{data.username}</div>
                            <Select
                                onValueChange={(new_city_id) => {
                                    const selected = data?.listPark.find((lp) => lp.id == +new_city_id)
                                    AuthManagerGuard.setEnabledCityID(+new_city_id)
                                    AuthManagerGuard.setCurrency(selected?.currency)

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
                                    className="h-[20px] md:h-fit w-fit bg-transparent border-transparent text-[#f2f2f2] text-[14px] lg:text-base font-medium">
                                    <SelectValue placeholder="Selectionner"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Selectionner une ville</SelectLabel>
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
                                        {cityFiltered?.map((item) => (
                                            <SelectItem key={item.id} value={String(item.id)}>
                                                {item.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div>
                        <SignOutAction>
                            <Button className={`group translate-x-0 mt-[2px]`}>
                                <SignOutIcon/>
                            </Button>
                        </SignOutAction>
                    </div>
                </div>
            </div>
        )
    }
}

