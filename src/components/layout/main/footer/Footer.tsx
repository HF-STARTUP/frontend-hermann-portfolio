"use client";

import PSALogoSVG from "@/components/app/PSALogoSVG";
import VLinkProvider from "@/components/helpers/VLinkProvider";
import React from "react";
import NAVIGATIONS_URL from "@/utils/navigation";
import AppLogoSVG from "@/components/app/AppLogoSVG";
import Container from "@/components/box/Container";

const Footer = ()=>{

    const MENU_LINKS = [
        {
            label: 'Acceuil',
            url: NAVIGATIONS_URL.home.url
        },
        {
            label: 'Produit',
            url: NAVIGATIONS_URL.produit.url
        },
        {
            label: 'Tarifs',
            url: NAVIGATIONS_URL.tarif.url
        },
        {
            label: 'Contact',
            url: NAVIGATIONS_URL.contact.url
        }
    ]

    const LEGAL_LINKS = [
        {
            label: 'Terms of use',
            url: ''
        },
        {
            label: 'Privacy Policy',
            url: ''
        },
        {
            label: 'Legal Notice',
            url: ''
        }
    ]

    return(
        <footer className={`relative bg-stone-50`}>
            <Container>
                <div className={`md:h-[511px] pt-[87px] md:pt-0 pb-[36px] md:pb-0 flex flex-col justify-center`}>
                    <div className={'flex flex-col md:flex-row gap-[37.76px] md:gap-[100px]'}>
                        <AppLogoSVG />
                        <div className={`flex gap-[20px]`}>
                            <FooterLinks LINKS={MENU_LINKS} title={'Menu'} />
                            <FooterLinks LINKS={LEGAL_LINKS} title={'Legal'} />
                        </div>
                    </div>
                    <div className={`flex flex-col md:justify-end md:items-end gap-[22px] lg:gap-[0] mt-[90px] md:mt-0`}>
                        <a href="https://www.psatechnologie.com/">
                            <PSALogoSVG />
                        </a>
                        <div>
                            <a href={`#`} className={`text-[#6B6B6B]/[0.6] text-[14px] font-normal leading-[14px] md:text-right`}>
                                Copyright 2023.
                            </a>
                        </div>
                    </div>
                </div>
            </Container>
        </footer>
    )
}

const FooterLinks: React.FC<{LINKS: {label: string, url: string}[], title: string}> = ({LINKS, title})=>{
    return(
        <ul className={`flex flex-col justify-start items-start gap-[30px] w-[135px]`}>
            <FooterNavTitle label={title} />
            {
                LINKS.map((menuLink, key)=>(
                    <FooterNavLink key={key} to={menuLink.url}>{menuLink.label}</FooterNavLink>
                ))
            }
        </ul>
    )
}

const FooterNavTitle: React.FC<{label: string}> = ({label})=>{
    return (
        <li className={`text-neutral-700 text-base font-bold fpoppins leading-[18.83px] tracking-wide mb-[10px]`}>{label}</li>
    )
}

const FooterNavLink:React.FC<{children: React.ReactNode, to: string}> = ({children, to})=>{

    return(
        <VLinkProvider className={`text-zinc-700 text-sm font-normal fpoppins leading-none hover:text-blue-500 transition ease-in duration-200`} to={to}>{children}</VLinkProvider>
    )
}

export default Footer
