'use client'

import * as React from "react";
import AppLogo from "@/components/app/AppLogo";
import BtnBase from "@/components/elements/BtnBase";
import NAVIGATIONS_URL from "@/utils/navigation";
import {usePathname} from "next/navigation";
import Container from "@/components/box/Container";
import Navlink from "@/components/layout/main/navbar/components/Navlink";
import {MenuIcon} from "@/components/layout/admin/sidebar/_navIcons/NavIcons";
import VLinkProvider from "@/components/helpers/VLinkProvider";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import {useUserProfile} from "@/hooks/__form/auth/useUserProfile";


const primaryNavLinks = [NAVIGATIONS_URL.produit, NAVIGATIONS_URL.tarif, NAVIGATIONS_URL.contact]

const Navbar = () => {
    const [menuIsOpen, setMenuIsOpen] = React.useState<boolean>(false)
    const $pathName = usePathname()

    const {data, isLoading} = useUserProfile()

    const handleToggleMenu = () => {
        setMenuIsOpen(!menuIsOpen)
    }

    return (
        <nav className={`bg-white relative z-50`}>
            <Container>
                <div className={'py-[22px] flex justify-center align-bottom'}>
                    <div className={'flex flex-1 justify-start items-center'}>
                        <AppLogo/>
                        <ul className={'hidden lg:flex gap-[30px] pl-[40px]  h-[43px] items-center'}>
                            {primaryNavLinks.map((link, key) => (
                                <li key={key}>
                                    <Navlink to={link.url} active={link.url === $pathName}>{link.label}</Navlink>
                                </li>
                            ))}
                        </ul>
                    </div>
                    {!data && !isLoading && <ul className={'flex gap-[30px] items-center h-[43px]'}>
                        <li className={`hidden md:block`}>
                            <Navlink to={NAVIGATIONS_URL.login.url}>{NAVIGATIONS_URL.login.label}</Navlink>
                        </li>
                        <li className={`flex gap-[16px] items-center`}>
                            <BtnBase color={'green'} variant={'contained'} size={'sm'}
                                     to={NAVIGATIONS_URL.register.url}>{NAVIGATIONS_URL.register.label}</BtnBase>
                            <button onClick={handleToggleMenu} className={`text-admin-primary lg:hidden`}>
                                {menuIsOpen ? (<CloseIcon/>) : (<MenuIcon/>)}
                            </button>
                        </li>
                    </ul>}
                    {data &&
                        (
                            <BtnBase
                                color={'green'}
                                variant={'contained'}
                                size={'sm'}
                                to={`/dashboard/resume`}>Dashboard</BtnBase>
                        )
                    }
                    {isLoading &&
                        <div className={"rounded-sm h-[40px] w-[120px] bg-sky-200 animate-pulse"}></div>
                    }
                </div>
            </Container>
            {menuIsOpen && (<NavbarMenu handleToggleMenu={handleToggleMenu}/>)}
        </nav>
    )
}


const NavbarMenu: React.FC<{ handleToggleMenu: () => void }> = ({handleToggleMenu}) => {

    const $pathName = usePathname()

    return (
        <div className={`w-full bg-white rounded-b absolute z-30 shadow`}>
            {[...primaryNavLinks, NAVIGATIONS_URL.login].map((link, key) => (
                <MenuItem isLast={key === 3} onClick={handleToggleMenu} key={key} name={link.label} to={link.url}
                          active={link.url === $pathName}/>
            ))}
        </div>
    )
}

const MenuItem: React.FC<{
    name: string,
    to: string,
    active: boolean,
    isLast: boolean
} & React.HTMLAttributes<HTMLDivElement>> = ({name, to, active, isLast, ...props}) => {
    return (
        <div {...props}>
            <VLinkProvider to={to}>
                <div
                    className={`${isLast && (active ? 'bg-blue-primary text-white' : 'bg-slate-100')} ${active && 'bg-blue-primary text-white'} py-[15px] px-[5px] text-center border-t border-t-gray-200 hover:bg-blue-primary hover:text-white transition duration-200`}>{name}</div>
            </VLinkProvider>
        </div>
    )
}


export default Navbar
