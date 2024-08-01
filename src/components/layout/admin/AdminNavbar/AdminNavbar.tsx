"use client"

import logoutIcon from "@/assets/img/icons/admin/logout.png"
import Image from "next/image";
import {BtnIcon} from "@/components/elements/BtnBase";
import React from "react";
import SignoutAction from "@/components/actions/Signout.action";
import {useUserProfile} from "@/hooks/__form/auth/useUserProfile";
import AppLogo from "@/components/app/AppLogo";
import VImageProvider from "@/components/helpers/VImageProvider";
import {ChevronDownIcon, CloseAltIcon} from "@/components/layout/admin/sidebar/_navIcons/NavIcons";
import useAppStore from "@/stores/global/useAppStore";
import {cn} from "@/lib/utils";
import {AnimatePresence, motion} from "framer-motion";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {useGetParkID} from "@/hooks/__globlal/useGlobalHook";
import AuthManagerGuard from "@/guard/AuthManagerGuard";
import {useRouter} from "next/navigation";
import {queryClient} from "@/app/_utils/network/reactQuery";
import notify from "@/utils/func/notification";
import {useCheckActiveSubscription} from "@/hooks/subscription/useSubscription";
import VLinkProvider from "@/components/helpers/VLinkProvider";

const AdminNavbar: React.FC = () => {

    return (
        <div className={"fixed top-0 w-full z-50 bg-white"}>
            <div
                className={`px-[3%] pt-[29px] pb-[14px]  flex items-center  gap-[10px] justify-between`}>
                <LogoOption/>
                <UserOption/>
            </div>
            <AbonmentAlert/>
        </div>
    )
}

const AbonmentAlert = () => {

    const {data: abonn, isLoading} = useCheckActiveSubscription()

    const {toggleAbonAlert, getIfAbonAlertIsOpen} = useAppStore();

    const variants = {
        hidden: {
            opacity: 0,
            y: -50, // Déplacer vers le haut pour masquer
            transition: {duration: 0.5}
        },
        visible: {
            opacity: 1,
            y: 0, // Position initiale
            transition: {duration: 0.5}
        }
    };

    return (
        <VLinkProvider to={"/tarif"}>
            <AnimatePresence>
                {getIfAbonAlertIsOpen() && !isLoading && abonn && (
                    <motion.div
                        className={cn(
                            "bg-[#FFC700] hover:bg-[#FFC700]/95 h-[50px] w-full flex items-center justify-center relative cursor-pointer select-none",
                        )}
                        variants={variants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        <p className={"text-black text-sm font-medium font-vInter leading-normal"}>
                            Votre abonnement VTC Control expirera dans <span
                            className={"font-extrabold"}>{abonn.remainingDays} jours,</span>
                            pensez à le renouveler
                        </p>
                        <button className={"absolute right-[60px] top-[10px] hover:opacity-75 hover:scale-105"}
                                onClick={() => toggleAbonAlert(false)}>
                            <CloseAltIcon/>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </VLinkProvider>
    );
};

const LogoOption: React.FC = () => {

    const {data: userInfos, isLoading, isError, error} = useUserProfile()

    if (isLoading || isError || !userInfos) {
        return (
            <div className={`animate-pulse flex gap-[10px] items-center`}>
                <div className={`size-[60px] bg-slate-200 rounded-lg`}></div>
                <div className={`w-[95px] h-[30px]  bg-slate-200 rounded-lg`}></div>
            </div>
        )
    }

    return (
        <div>
            <div className={``}>
                <div className={`flex gap-5 items-center justify-between`}>
                    <div>
                        {!userInfos.isGranted && <AppLogo isAdmin={true}/>}
                        {userInfos.isGranted && (
                            <CustomBrand
                                logo={userInfos.getOrganisationLogo}
                                name={userInfos.getOrganisationName}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}


const CustomBrand: React.FC<{ logo: string, name: string }> = ({logo, name}) => {
    return (
        <div
            className={`flex gap-[10px] items-center fpoppins text-admin-primary font-bold text-[21.88px] leading-[21.88px]`}
            title={name}>
            <div className={`relative`}>
                <div
                    className={`size-[60px] overflow-hidden rounded select-none flex border border-slate-100 relative`}>
                    <VImageProvider src={logo} alt={``} height={100} width={100} className={`size-[60px]`}/>
                </div>
                {/*<div*/}
                {/*    className={`size-[12px] rounded-full bg-green-400 border-2 border-slate-950/70 bottom-2 right-[-5px] absolute animate-pulse`}></div>*/}
            </div>
            <div className={``}>{name}</div>
        </div>
    )
}

const UserOption: React.FC = () => {

    const [parkName, setParkName] = React.useState("")
    const {data: userInfos, isLoading, isError, error} = useUserProfile()
    const {parkID} = useGetParkID()

    const $router = useRouter()


    React.useEffect(() => {
        if (userInfos && parkID) {
            const activePark = userInfos.parks.find(p => p.id === parkID)

            if (activePark) {
                setParkName(activePark.name)
            }
        }
    }, [userInfos, parkID])


    if (isLoading || !userInfos) {
        return (
            <div className={`animate-pulse flex gap-[22px] items-center`}>
                <div className={`flex justify-end items-end flex-col gap-[4px]`}>
                    <div className={`h-[27px] w-[210px] bg-slate-200 rounded-lg`}></div>
                    <div className={`h-[15px] w-[110px] bg-slate-200 rounded-lg`}></div>
                </div>
                <div className={`size-[30px]  bg-slate-200 rounded-lg`}></div>
            </div>
        )
    }


    return (
        <div className={`flex justify-between gap-[30px] items-start cursor-default finter`}>
            <div className={`flex justify-end items-end gap-[4px] flex-col`}>
                <div
                    className="text-[#405768] text-[32px] font-bold  leading-[23px] ">{userInfos.getUsername}</div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className={cn(
                            "text-gray-500 text-base font-medium leading-normal outline-none bottom-0 focus:border-0 focus:outline-none group",
                            "flex items-center gap-1"
                        )}>
                            <div>{parkName}</div>
                            <ChevronDownIcon className={"opacity-75 group-hover:scale-[1.3]"} bg_icon_color={"#fff"}/>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Selectionner la flotte</DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuRadioGroup value={parkID} onValueChange={(value) => {
                            AuthManagerGuard.removeParkID()
                            AuthManagerGuard.setParkID(value)
                            queryClient.invalidateQueries().then(() => {
                                notify(`Changerment de flotte...`)
                                const timer = setTimeout(() => {
                                    window.location.reload()
                                    clearTimeout(timer)
                                }, 1000)
                                $router.refresh()
                            })
                        }}>
                            {userInfos.parks.map((p, i) => (
                                <DropdownMenuRadioItem key={i} value={p.id}>{p.name}</DropdownMenuRadioItem>
                            ))}
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div>
                <SignoutAction>
                    <BtnIcon className={`group translate-x-0 mt-[2px]`}>
                        <Image
                            className={`translate-x-0 ease-in duration-300 group-hover:translate-x-0.5 group-hover:opacity-85`}
                            src={logoutIcon} alt={'logout icon'} height={22} width={22}/>
                    </BtnIcon>
                </SignoutAction>
            </div>
        </div>
    )
}


export default AdminNavbar
