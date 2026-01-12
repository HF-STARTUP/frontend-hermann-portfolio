"use client";

import React from "react";
import {
    AlbumIcon,
    CalendarIcon,
    CarAltIcon,
    CardPPosIcon,
    CarIcon,
    CarIconAlt,
    CarRentalIcon,
    CashIcon,
    CheckupListItemIcon,
    CoinAltIcon,
    CompanyIcon,
    FundsIcon,
    GeolocationIcon,
    GraphIcon,
    ListIcon,
    MegaphoneIcon,
    MesagesDotsIcon,
    Notification2Icon,
    PasswordIcon,
    SettingsIcon,
    UserAltIcon,
    UserIcon,
    UsersIcon
} from "@/components/layout/admin/sidebar/_navIcons/NavIcons";
import {PiBoxArrowUp} from "react-icons/pi";
import {GrDocumentConfig} from "react-icons/gr";

export type SideItemProps = {
    name: string
    icon: React.JSX.Element,
    url: string,
    subnav?: SideItemProps
}

const CURRENT_NAV_CONTEXT = '/dashboard'

const _ADMIN_SIDEBAR_NAV_LINKS = [
    {
        name: 'Suivi de l’activité',
        icon: <GraphIcon/>,
        url: '/resume'
    },
    {
        name: 'Véhicules',
        icon: <CarIcon/>,
        url: '/vehicule-list'
    },
    {
        name: 'Chauffeurs',
        icon: <ListIcon/>,
        url: '/drivers-list'
    },
    {
        name: 'Fournisseurs',
        icon: <PiBoxArrowUp width={24} height={24}/>,
        url: '/suppliers-list'
    },
    {
        name: 'Clients',
        icon: <UsersIcon/>,
        url: '/clients'
    },
    {
        name: 'Planning',
        icon: <CalendarIcon/>,
        url: '/schedule',
    },
    {
        name: 'Courses',
        icon: <CarIconAlt/>,
        url: '/races',
    },
    {
        name: 'Encaissements',
        icon: <CashIcon/>,
        url: '/receipts'
    },
    {
        name: 'Entretien',
        icon: <CarRentalIcon/>,
        url: '/maintenance'
    },
    {
        name: 'Messagerie',
        icon: <MesagesDotsIcon/>,
        url: '/chat'
    },
    {
        name: 'Géolocalisation',
        icon: <GeolocationIcon/>,
        url: '/geolocation'
    },
    {
        name: 'Etat des comptes',
        icon: <FundsIcon/>,
        url: '/status-accounts/soldes'
    },
    {
        name: 'Marketing/communication',
        icon: <MegaphoneIcon/>,
        url: '/marketing'
    },
    {
        name: 'Paramètres',
        icon: <SettingsIcon/>,
        url: '/settings'
    },
] satisfies SideItemProps[]

export const SCHEDULE_SUBURLS = {
    planingSettings: {
        name: 'Paramètres planning',
        url: '/dashboard/schedule/schedule-settings',
    }
}

export const ADMIN_SIDEBAR_NAV_LINKS: SideItemProps[] = _ADMIN_SIDEBAR_NAV_LINKS.map(i => ({
    ...i,
    url: (i.url === '/dashboard' ? '' : CURRENT_NAV_CONTEXT) + i.url
}))


const _SETTINGS_PAGE_NAVIGATION = [
    {
        label: 'Profil',
        url: 'profile',
        icon: <UserIcon/>
    },
    {
        label: 'Administrateurs',
        url: 'users',
        icon: <AlbumIcon/>
    },
    // {
    //     label: 'Notifications',
    //     url: 'notifications',
    //     icon: <Notification2Icon/>
    // },
]

export const SETTINGS_PAGE_NAVIGATION = _SETTINGS_PAGE_NAVIGATION.map(url => ({
    ...url,
    url: `/app/settings/` + url.url
}))


const _ADD_ROTATION_GROUP_SIDEBAR_NAVIGATION = [
    {
        label: 'Planning',
        url: 'planing',
        icon: <CalendarIcon/>
    },
    {
        label: 'Checking',
        url: 'checking',
        icon: <CheckupListItemIcon/>
    },
    {
        label: 'Véhicules',
        url: 'cars',
        icon: <CarAltIcon/>
    },
    {
        label: 'Chauffeurs et intérimaires',
        url: 'drivers-temporary-workers',
        icon: <UserAltIcon/>
    },
    {
        label: 'Encaissements',
        url: 'receipts-config',
        icon: <CoinAltIcon/>
    },

]

export const P_AND_L_SIMPLIFIED_ACCOUNTS_ROUTE = `/dashboard/status-accounts/simplified`
export const ACCOUNTS_ROUTE = `/dashboard/status-accounts`
export const PROFILE_ROUTE = `/dashboard/settings`

export const ADD_ROTATION_GROUP_SIDEBAR_NAVIGATION = _ADD_ROTATION_GROUP_SIDEBAR_NAVIGATION.map(url => ({
    ...url,
    url: `/dashboard/schedule/schedule-settings/add-group/` + url.url
}))



