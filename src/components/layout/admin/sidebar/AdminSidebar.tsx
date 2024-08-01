"use client"

import React, {useId} from "react";
import {motion, Variants} from "framer-motion";
import VLinkProvider from "@/components/helpers/VLinkProvider";
import {usePathname} from "next/navigation";
import {isCurrentPage} from "@/utils/urlValidation";
import {ADMIN_SIDEBAR_NAV_LINKS, SideItemProps} from "@/utils/protectedNavigation";
import useAppStore from "@/stores/global/useAppStore";
import {initFlowbite} from 'flowbite'
import {ChevronBackIcon} from "@/components/layout/admin/sidebar/_navIcons/NavIcons";
import {cn} from "@/utils/ui/cn";
import {ScrollArea} from "@/components/ui/scroll-area";


const AdminSidebar: React.FC = () => {
    const {getIfSidebarIsMinimised, getIfAbonAlertIsOpen} = useAppStore();

    const sidebarVariants = {
        open: {width: '290px',},
        closed: {width: '80px'},
    };

    return (
        <motion.div
            className={`fixed left-0 z-40 bg-stone-50 h-[100vh] transition duration-1000 ease-linear w-[290px]`}
            variants={sidebarVariants}
            animate={getIfSidebarIsMinimised() ? 'closed' : 'open'}
            transition={{
                duration: 0.5,
                ease: 'easeInOut'
            }}
        >
            <div className={`relative`}>
                <div className={cn(
                    `rounded-br-3xl bg-white pt-[80px]`,
                    getIfAbonAlertIsOpen() && "mt-[50px]"
                )}>
                    <SideBarNavItems/>
                </div>
                <ToggleSidebarOption className={`absolute top-[130px] right-[-22px]`}/>
            </div>
        </motion.div>
    );
};

const ToggleSidebarOption: React.FC<React.HTMLAttributes<HTMLButtonElement>> = ({className, ...rest}) => {
    const $app = useAppStore()
    return (
        <button onClick={() => $app.toggleSidebar(!$app.getIfSidebarIsMinimised())} className={cn(
            `text-admin-primary w-[21px] h-[34.05px] flex items-center justify-center`,
            `transition duration-300 ease-linear`,
            `bg-blue-primary text-white hover:bg-primary`,
            'rounded-tr-[9.08px] rounded-br-[9.08px]',
            className
        )} {...rest}>
            <ChevronBackIcon className={cn(`${$app.getIfSidebarIsMinimised() ? 'rotate-180' : ''}`)}/>
        </button>
    )
}


const SideBarNavItems: React.FC = () => {

    const items = ADMIN_SIDEBAR_NAV_LINKS.map((item, key) => (
        <SideBarNavItem item={item} key={key}/>
    ))

    const tooNavBarWithTooltipOptions = []

    return (
        <ScrollArea className={`py-[38px] overflow-auto h-[88vh]`}>
            <ul className={`flex flex-col justify-start`}>
                {items}
            </ul>
        </ScrollArea>
    )
}

const SideBarNavItem: React.FC<{ item: SideItemProps } & React.HTMLAttributes<HTMLElement>> = ({item, ...props}) => {
    const {url, icon, name} = item;
    const $pathName = usePathname();
    const isActive = isCurrentPage($pathName, url);
    const {getIfSidebarIsMinimised} = useAppStore();
    const id = useId();

    React.useEffect(() => {
        initFlowbite();
    }, []);

    const variants: Variants = {
        open: {
            opacity: 1,
            x: 0,
            display: "block",
            transition: {
                delay: 0.5, // Ajoutez un délai avant le début de l'animation
                duration: 0.5, // Durée de l'animation de l'opacité et de la position x
                type: "spring", // Type de transition pour une sensation plus naturelle
            },
        },
        minimized: {
            opacity: 0,
            x: -15,
            transition: {duration: 0.2}, // Rendre la transition de minimisation plus rapide
            transitionEnd: {display: "none"},
        },
    };

    return (
        <li {...props}>
            <VLinkProvider to={url}>
                <div data-tooltip-target={id} data-tooltip-placement="left"
                     className={`text-base hover:text-blue-500 flex justify-between items-center leading-[30px] rounded-lg ease-in delay-100 duration-300 ${isActive ? 'text-blue-700' : 'text-gray-500 font-medium'} select-none hover:bg-slate-100 pl-[31px] transition duration-300 pb-[10px] pt-[10px]`}>
                    <div className={`flex gap-[12px] items-center justify-start`}>
                        <div>
                            {icon}
                        </div>
                        <motion.div variants={variants} initial={getIfSidebarIsMinimised() ? "minimized" : "open"}
                                    animate={getIfSidebarIsMinimised() ? "minimized" : "open"}>
                            {!getIfSidebarIsMinimised() && name}
                        </motion.div>
                    </div>

                    <div
                        className={`w-1 h-9 bg-vyellow rounded-[25px] ease-in delay-100 duration-300 opacity-0 ${isActive && 'opacity-100'}`}/>
                </div>
                <div id={id} role="tooltip"
                     className={`${getIfSidebarIsMinimised() ? '' : 'hidden'} absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700`}>
                    {name}
                    <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
            </VLinkProvider>
        </li>
    );
};

export default AdminSidebar
