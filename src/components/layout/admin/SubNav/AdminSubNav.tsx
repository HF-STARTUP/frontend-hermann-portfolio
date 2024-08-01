"use client"

import React, {useEffect, useState} from "react";
import {motion} from "framer-motion";
import {
    ChevronBackIcon,
    EditIcon,
    MoreIcon,
    NotificationIcon
} from "@/components/layout/admin/sidebar/_navIcons/NavIcons";
import {BtnIcon} from "@/components/elements/BtnBase";
import Image from "next/image";
import defaultUserAvatar from "@/assets/img/users/defaultUserAvatar.png"
import {SearchTextField} from "@/components/form/TextField";
import VLinkProvider from "@/components/helpers/VLinkProvider";
import NAVIGATIONS_URL from "@/utils/navigation";
import {usePathname, useRouter} from "next/navigation";
import {isCurrentPage} from "@/utils/urlValidation";
import {ADMIN_SIDEBAR_NAV_LINKS, PROFILE_ROUTE} from "@/utils/protectedNavigation";
import {Variants} from "framer-motion";
import useAppStore from "@/stores/global/useAppStore";
import {cn} from "@/utils/ui/cn";
import {useRotationGroupStore} from "@/stores/protected/dashboard/schedule/useRotationGroupStore";

type AdminSuNavProps = {
    withFilterSection?: boolean
    isSubPage?: boolean
    withUserSetting?: boolean
    title?: string,
    editableTitle?: boolean,
    beforeChild?: React.ReactNode
    afterTitle?: React.ReactNode
    endTitle?: React.ReactNode
    crumbTitle?: string
    handleAdd?: () => void
    handleSecondLinkClick?: () => void
}

const AdminSubNav: React.FC<AdminSuNavProps> = ({
                                                    title,
                                                    editableTitle,
                                                    withFilterSection = false,
                                                    isSubPage = false,
                                                    handleAdd,
                                                    handleSecondLinkClick,
                                                    beforeChild,
                                                    withUserSetting = true,
                                                    afterTitle,
                                                    endTitle,
                                                }) => {
    const [pageTitle, setPageTitle] = useState('')
    const [pageTitleSimple, setPageTitleSimple] = useState('')
    const {getIfAbonAlertIsOpen} = useAppStore()

    const $pathPathName = usePathname()

    useEffect(() => {
        const currentPage = ADMIN_SIDEBAR_NAV_LINKS.find((nav) => isCurrentPage($pathPathName, nav.url))
        if (currentPage) {
            setPageTitle(currentPage.name)
            const pageTitleSplited = currentPage.name.split(" ")

            setPageTitleSimple(pageTitleSplited[pageTitleSplited.length - 1])
        }
    }, [$pathPathName])

    const $router = useRouter()
    const {updateRotationGroupConfig, name} = useRotationGroupStore()

    const [rotationTitle, setRotationTitle] = React.useState(title ?? pageTitle)

    React.useEffect(() => {

    }, [])

    const titleVariants: Variants = {
        hidden: {opacity: 0, y: 20},
        visible: {opacity: 1, y: 0, transition: {duration: 0.5}}
    };

    return (
        <div className={cn(
            getIfAbonAlertIsOpen() && "mt-[50px]"
        )}>
            <div>
                <BreadCrumb
                    page={pageTitle}
                />
            </div>
            <div className={`${withFilterSection ? 'mb-[16px]' : 'mb-[36px]'} flex justify-between items-center`}>
                <div
                    className={`text-[#405768] text-[34px] font-bold leading-[42px] flex justify-start items-center gap-[20px]`}>
                    <div className={`flex items-start justify-center`}>
                        {isSubPage && <button onClick={$router.back}>
                            <ChevronBackIcon/>
                        </button>}
                        {!editableTitle && (
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={titleVariants}
                                className={`flex items-center gap-[30px]`}
                            >
                                <div>{title ?? pageTitle}</div>
                                {afterTitle}
                            </motion.div>
                        )}
                        {editableTitle && (
                            <div className={cn(`flex items-center justify-end`)}>
                                <form action="">
                                    <input
                                        id={"rotation-group-name"}
                                        className={`focus:border-transparent focus:outline-none w-[700px] bg-transparent`}
                                        value={name}
                                        onChange={(e) => updateRotationGroupConfig({name: e.target.value})}
                                    />
                                    <label htmlFor="rotation-group-name">
                                        <button type={"button"} className={`text-[44px]`}>
                                            <EditIcon/>
                                        </button>
                                    </label>
                                </form>
                            </div>
                        )}
                    </div>
                    {beforeChild && beforeChild}
                    {handleAdd && <SubNavMoreIcon className={"text-blue-primary"} onClick={handleAdd}/>}
                    {handleSecondLinkClick && <SubNavSeeAll onClick={handleSecondLinkClick} label={pageTitleSimple}/>}
                </div>
                {endTitle && endTitle}
                {withUserSetting && <UserAccountSection/>}
            </div>
        </div>
    )
}

export const UserAccountSection: React.FC = () => {

    const {setFindToken, getFindToken} = useAppStore()

    return (
        <div className={`bg-white py-[10px] px-[10px] rounded-[10px] shadow`}>
            <div className={`flex items-center gap-[10px]`}>
                <div>
                    <SearchTextField
                        value={getFindToken()} onChange={(e) => setFindToken(e.target.value)}
                        placeholder={'Recherchez...'}/>
                </div>
                <BtnIcon
                    className={`text-gray-500 text-[24px] hover:text-gray-400 transition ease-in delay-75 duration-300`}>
                    <NotificationIcon/>
                </BtnIcon>
                {/*<VLinkProvider to={PROFILE_ROUTE}>*/}
                {/*    <Image src={defaultUserAvatar} width={45.68}*/}
                {/*           className={`rounded-md hover:opacity-65 cursor-pointer transition ease-in delay-75 duration-300`}*/}
                {/*           alt={"user avatar"}/>*/}
                {/*</VLinkProvider>*/}
            </div>
        </div>
    )
}


const BreadCrumb: React.FC<{ page?: string }> = ({page}) => {

    return (
        <div className="h-6 text-slate-500 text-sm font-medium font-['DM Sans'] leading-normal">
            <VLinkProvider className={`hover:underline underline-offset-4 transition delay-75 duration-200 ease-in`}
                           to={NAVIGATIONS_URL.dashboard.url}>VTCCONTROL</VLinkProvider> / {page}
        </div>
    )
}


const SubNavMoreIcon: React.FC<React.HTMLAttributes<HTMLButtonElement>> = ({...props}) => {
    return (
        <button
            className={`hover:opacity-85 transition ease-in delay-75 duration-300 p-0.5 hover:bg-blue-primary/10 rounded-full`} {...props}>
            <MoreIcon className={"text-blue-primary"}/>
        </button>
    )
}


export const SubNavSeeAll: React.FC<{
    label: string,
    custom?: boolean
} & React.HTMLAttributes<HTMLDivElement>> = ({label, custom, ...props}) => {
    return (
        <div className="h-6 text-blue-700 text-sm font-medium underline
        leading-normal hover:no-underline underline-offset-2 hover:text-blue-500 transition
        ease-in delay-75 duration-200 cursor-pointer decoration-blue-400 decoration-solid hover:decoration-blue-600
        " {...props}>{!custom && `Voir tous les`} {label}</div>
    )
}

export default AdminSubNav

