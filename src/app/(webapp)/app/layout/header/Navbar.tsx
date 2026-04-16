"use client"

import Image from "next/image"
import { cn, ConnexionMode } from "@/lib/utils"
import logo_icon from "./logo.png"
import { Button } from "@/components/ui/button"
import { useUserProfile } from "@/hooks/__form/auth/useUserProfile"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import * as React from "react"
import { useMemo, useState } from "react"
import AuthManagerGuard from "@/guard/AuthManagerGuard"
import { queryClient } from "@/app/_utils/network/reactQuery"
import { useParams, usePathname, useRouter } from "next/navigation"
import Badge from "@/components/display/Badge"
import { Input } from "@/components/ui/input"
import { searchAndFilter } from "@/model/Model"
import SignOutAction from "@/components/actions/Signout.action"
import { Bell, ChevronDown, LogOut, MapPin, Search, Settings, User, Menu, X, Loader } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { Switch } from "@/components/ui/switch"
import { useGetCurrenciesList } from "@/hooks/admin/useFleetHook"
import { SwitchLoggingMode } from "./SwitchLogingModeDialog"
import { useNavbarHook } from "./useNavbarHook"

export const Navbar = () => {
    const [isSearchOpen, setIsSearchOpen] = useState(false)

    return (
        <nav className="bg-vaPrimary h-[70px] lg:h-[94px] fixed top-0 left-0 w-full flex items-center justify-between px-3 lg:px-[40px] z-50 gap-2">
            {/* Overlay de recherche Mobile & Tablette */}
            {/* {isSearchOpen && (
                <div className="absolute inset-0 bg-vaPrimary flex items-center px-4 z-[60] animate-in fade-in duration-200">
                    <div className="flex-1 flex items-center gap-2 max-w-3xl mx-auto">
                        <Input
                            autoFocus
                            type="search"
                            placeholder="Rechercher une flotte, transaction..."
                            className="bg-white/15 border-vaTexttext-vaTextPrimary text-white rounded-xl"
                            leftIcon={<Search className="text-white size-5" />}
                        />
                        <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)} className="text-white hover:text-white hover:bg-white/10">
                            <X className="size-6" />
                        </Button>
                    </div>
                </div>
            )} */}

            <div className="flex items-center gap-2 md:gap-4 lg:gap-8 flex-1 min-w-0">
                {/* Menu Burger (Mobile seulement) */}
                <div className="md:hidden shrink-0">
                    <MobileExtraMenu />
                </div>

                <div className="lg:w-[290px]">
                    <Image className="h-[18px] lg:h-[23px] w-auto shrink-0" width={169} height={23} src={logo_icon} alt="Logo" />
                </div>
                {/* Recherche : Masquée jusqu'à 2xl pour laisser place aux stats */}
                {/* <div className="hidden xl:block w-full max-w-xs">
                    <Input
                        type="search"
                        placeholder="Rechercher..."
                        className="bg-white/15 backdrop-blur-2xl border border-vaTexttext-vaTextPrimary text-white rounded-2xl placeholder:text-white/70 text-sm w-full pr-1 pl-10"
                        leftIcon={<Search className="text-white size-5" />}
                    />
                </div> */}
            </div>

            <div className="flex items-center gap-1 lg:gap-4 shrink-0">
                {/* Loupe : Visible jusqu'à 2xl */}
                {/* <Button
                    variant="ghost"
                    size="icon"
                    className="xl:hidden text-white hover:bg-white/10"
                    onClick={() => setIsSearchOpen(true)}
                >
                    <Search className="size-5" />
                </Button> */}
                <UserOption />
            </div>
        </nav>
    )
}

const MobileExtraMenu = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white hover:text-white hover:bg-white/10">
                    <Menu className="size-6" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[280px] bg-vaPrimary border-white/20 p-4 space-y-4 shadow-2xl">
                <div className="space-y-2">
                    <p className="text-[10px] text-vaTextPrimary font-bold tracking-widest">Localisation</p>
                    <CitySelector isMobile />
                </div>

                {/* <div className="space-y-2">
                    <p className="text-[10px] text-vaTextPrimary font-bold tracking-widest">Statistiques</p>
                    <div className="grid grid-cols-2 gap-2">
                        <div className="bg-white/5 p-2 rounded-lg border border-white/10">
                            <p className="text-[9px] text-vaTextPrimary">Transactions</p>
                            <p className="text-sm font-bold text-white">122</p>
                        </div>
                        <div className="bg-white/5 p-2 rounded-lg border border-white/10">
                            <p className="text-[9px] text-vaTextPrimary">Revenus</p>
                            <p className="text-sm font-bold text-vaOrange">2.4M</p>
                        </div>
                    </div>
                </div> */}

                <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs text-white/60">Environnement</span>
                    <Badge variant="default" className="bg-white/15 text-[10px] text-white">
                        {AuthManagerGuard.getConnexionMode === ConnexionMode.Staging ? "Staging" : "Prod"}
                    </Badge>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const CitySelector = ({ isMobile = false }: { isMobile?: boolean }) => {
    const { data } = useUserProfile()
    const $router = useRouter()
    const $params = useParams()
    const $path = usePathname()
    const [filterCityToken, setFilterCityToken] = useState("")
    const [selectOpen, setSelectOpen] = useState(false)
    const { data: currencies, isLoading: isloadingCurrencies } = useGetCurrenciesList()

    const cityFiltered = useMemo(() => {
        if (!filterCityToken || filterCityToken.trim() === "") return data?.listPark
        if (data) {
            const filteredCities = searchAndFilter(data.listPark, filterCityToken, ["name"])
            const activeCity = AuthManagerGuard.getEnabledCity ?? String(data.listPark[0].id)
            const cityEnabled = data.listPark.find((d) => String(d.id) === activeCity) ?? data.listPark[0]
            const filteredDataContainActiveElement = filteredCities.find((d) => String(d.id) === activeCity)
            return !filteredDataContainActiveElement ? [cityEnabled, ...filteredCities] : filteredCities
        }
    }, [filterCityToken, data])

    const { invalidateDependentQueries } = useNavbarHook()

    return (
        <div className={cn("w-full flex gap-2", !isMobile && "hidden md:flex xl:w-[180px] items-center  gap-2")}>
            <Select
                onValueChange={(new_city_id) => {
                    const prevCityId = AuthManagerGuard.getEnabledCity

                    AuthManagerGuard.setEnabledCityID(new_city_id)
                    invalidateDependentQueries({ prevCityId })

                    if ($params.hasOwnProperty("fleetID")) $router.push("/app/fleet")
                }}
                defaultValue={AuthManagerGuard.getEnabledCity}
                onOpenChange={setSelectOpen}
                open={selectOpen}
            >
                <SelectTrigger className="bg-white/10 border border-vaTexttext-vaTextPrimary rounded-xl text-white h-9 lg:h-11 px-2 overflow-hidden" leftIcon={<MapPin className="size-4 mr-1 shrink-0" />}>
                    <SelectValue placeholder="Sélectionnez une ville" />
                </SelectTrigger>
                <SelectContent className="z-[100]">
                    <SelectGroup>
                        <SelectLabel>
                            <p className="text-xs">
                                NB : <span className="text-xs font-normal text-vaTextPrimary"> La ville sélectionnée affecte les statistiques affichées</span>
                            </p>
                        </SelectLabel>
                    </SelectGroup>
                    <SelectGroup>
                        <SelectLabel>Sélectionnez une ville</SelectLabel>
                        <div className="px-2 mb-2"><Input placeholder="Rechercher..." value={filterCityToken} onChange={(e) => setFilterCityToken(e.target.value)} onClick={(e) => e.stopPropagation()} /></div>
                        <SelectItem value="all">Toutes les villes</SelectItem>
                        {cityFiltered?.map((item) => (<SelectItem key={item.id} value={String(item.id)}>{item.name}</SelectItem>))}
                    </SelectGroup>
                </SelectContent>
            </Select>
            
            <Select
                onValueChange={(value) => {
                    const selectedCurrency = currencies?.find(c => String(c.id) === value)

                    AuthManagerGuard.setCurrencyId(Number(value))
                    AuthManagerGuard.setCurrency(selectedCurrency?.name)

                    invalidateDependentQueries()
                }}
                defaultValue={String(AuthManagerGuard.getCurrencyId)}
            >
                <SelectTrigger className="bg-white/10 border border-vaTexttext-vaTextPrimary rounded-xl text-white h-9 lg:h-11 px-2 overflow-hidden">
                    <SelectValue placeholder="Devise" />
                </SelectTrigger>
                <SelectContent>
                    {isloadingCurrencies && (
                        <div className="flex items-center justify-center p-4 gap-2">
                            <Loader className="animate-spin" />
                            <span className="text-sm text-gray-500">Chargement des devises...</span>
                        </div>
                    )}
                    {currencies?.map((currency) => (
                        <SelectItem key={currency.id} value={String(currency.id)}>
                            {currency.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}
const UserOption: React.FC = () => {
    const { data, isLoading } = useUserProfile()
    const [isLogoutOpenned, setIsLogoutOpenned] = useState(false)
    const [isSwitchOpenned, setIsSwitchOpenned] = useState(false)


    if (isLoading || !data) return null

    return (
        <div className="flex gap-2 lg:gap-4 items-center">
            {/* Statistiques : Flexibilité accrue sur les petits écrans md+ */}
            {/* <div className="hidden md:flex items-center gap-2 shrink-0">
                <div className="bg-white/10 px-2 py-1 rounded-xl flex items-center border border-vaTexttext-vaTextPrimary">
                    <div className="flex flex-col text-vaLightGray pl-1 pr-2 lg:pr-3 border-r border-white/30">
                        <p className="font-normal text-[8px] lg:text-[10px] xl:text-sm tracking-tighter uppercase lg:normal-case">Transactions</p>
                        <p className="font-bold text-xs lg:text-base xl:text-lg text-white">122</p>
                    </div>
                    <div className="flex flex-col text-vaLightGray pr-1 pl-2 lg:pl-3">
                        <p className="font-normal text-[8px] lg:text-[10px] xl:text-sm tracking-tighter uppercase lg:normal-case">Revenus</p>
                        <p className="font-bold text-xs lg:text-base xl:text-lg text-vaOrange whitespace-nowrap">2.4M XOF</p>
                    </div>
                </div>
            </div> */}
            <CitySelector />

            {/* <div className="relative shrink-0">
                <Button variant="ghost" size="icon" className="hover:bg-white/10 size-9 lg:size-10 text-white hover:text-white">
                    <Bell className="size-5 lg:size-6" />
                </Button>
                <span className="absolute bg-vaRed size-5 rounded-full text-white text-[10px] font-bold flex items-center justify-center -top-1 -right-1 border-2 border-vaPrimary">
                    4
                </span>
            </div> */}

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="py-1 lg:pl-4 p-1 lg:border-l border-vaTextPrimary flex items-center gap-2 cursor-pointer hover:bg-white/10 rounded-full lg:rounded-r-full lg:rounded-l-none transition-all">
                        <div className="size-8 lg:size-11 rounded-full bg-vaYellow overflow-hidden ring-2 ring-white/20 shrink-0">
                            <Image src={data.getOrganisationLogo} alt={data.getUsername} width={48} height={48} className="size-full object-cover" />
                        </div>
                        <div className="hidden lg:flex flex-col text-white max-w-[80px] xl:max-w-none gap-0">
                            <p className="text-sm xl:text-lg font-bold leading-tight truncate" title={data.getUsername} >{data.getUsername}</p>
                            <p className="text-[10px] xl:text-xs text-vaLightGray truncate" title={data?.roleName}>
                                {data?.roleName}
                            </p>
                        </div>
                        <ChevronDown className="hidden xl:block size-4 text-vaTextPrimary shrink-0" />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 rounded-2xl">
                    <div className="flex flex-col -space-y-1 px-4 border-b pb-4 pt-2">
                        <p className="text-lg font-bold">{data.username}</p>
                        <p className="text-xs text-vaTextPrimary truncate">{data._instance.user.email}</p>
                    </div>
                    <div className="flex flex-col border-b p-4 gap-4">
                        <Link href={"/app/settings"} className="flex items-center gap-2 hover:opacity-70">
                            <User className="size-5 text-vaLightGray" />
                            <p className="text-sm font-medium text-vaTextPrimary">Mon profil</p>
                        </Link>
                        <Link href={"/app/settings"} className="flex items-center gap-2 hover:opacity-70">
                            <Settings className="size-5 text-vaLightGray" />
                            <p className="text-sm font-medium text-vaTextPrimary">Paramètres</p>
                        </Link>
                        <div className="flex items-center gap-2">
                            <Switch
                                className="data-[state=checked]:bg-vaLightGreen"
                                onClick={() => setIsSwitchOpenned(true)}
                                checked={AuthManagerGuard.getConnexionMode === ConnexionMode.Production}
                            />
                            <span className="text-vaTextPrimary text-base">
                                {AuthManagerGuard.getConnexionMode === ConnexionMode.Staging ? "Staging" : "Production"}
                            </span>
                            <Badge
                                variant={AuthManagerGuard.getConnexionMode === ConnexionMode.Staging ? "orange" : "green"}
                            >
                                {AuthManagerGuard.getConnexionMode}
                            </Badge>
                        </div>
                        <SwitchLoggingMode
                            isOpenned={isSwitchOpenned}
                            onClose={() => setIsSwitchOpenned(false)}
                        />
                    </div>
                    <div className="p-4">
                        <div className="flex text-vaRed items-center gap-3 cursor-pointer" onClick={() => setIsLogoutOpenned(true)}>
                            <LogOut className="size-5" />
                            <p className="text-sm font-medium">Déconnexion</p>
                        </div>
                        <SignOutAction isOpen={isLogoutOpenned} onClose={() => setIsLogoutOpenned(false)} />
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}