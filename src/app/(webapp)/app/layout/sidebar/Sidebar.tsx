"use client"

import React, {useEffect, useState} from "react";
import {DashboardIcon, InfoIcon, LayoutListIcon, SettingIcon} from "@/components/ui/__icons";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {CreditCardIcon, Megaphone, ChevronDown, Tag, Users, ArrowRightLeft} from "lucide-react";
import {motion, AnimatePresence} from 'framer-motion';

export const Sidebar = () => {

    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const handleScroll = () => {
        if (window.innerWidth <= 768) {
            if (window.scrollY > lastScrollY) {
                // Scrolling Down
                setIsVisible(false);
            } else {
                // Scrolling Up
                setIsVisible(true);
            }
            setLastScrollY(window.scrollY);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);


    return (
        <motion.div
            className={cn(
                "lg:w-[290px] bg-vaPrimary/95 md:bg-vaPrimary backdrop-blur-md border-t border-white text-white lg:h-[100vh] lg:pt-[100px] lg:px-0 lg:flex lg:flex-col lg:gap-[20px] fixed z-40 lg:justify-start lg:items-start",
                "w-[100%] lg:ml-0 lg:mb-0 lg:rounded-none h-[60px] bottom-0 flex items-center justify-around px-[7px] gap-1"
            )}
            // initial={{y: 0}} // Position initiale
            // animate={{y: isVisible ? 0 : 60}} // 60px vers le bas pour masquer, 0 pour montrer
            // transition={{type: "spring", stiffness: 300, damping: 30}} // Animation fluide avec effet ressort
        >
            <SidebarItem
                label={`Dashboard`}
                icon={<DashboardIcon/>}
                to={`/app/dashboard`}
            />
            <SidebarItem
                label={"Flottes"}
                icon={<LayoutListIcon/>}
                to={"/app/fleet"}

            />
            {/*<SidebarItem*/}
            {/*    label={"Géolocalisation"}*/}
            {/*    icon={<GeolocationIcon/>}*/}
            {/*    to={"/app/geolocalisation"}*/}
            {/*/>*/}
            <SidebarItem
                label={"Transactions & Revenus"}
                icon={<ArrowRightLeft className="rotate-45" />}
                to={"/app/transactions"}
            />
            <SidebarItem
                label={"Tickets de réclamations"}
                icon={<InfoIcon/>}
                to={"/app/tickets"}
            />
            <SidebarItemWithSubmenu
                label={"Marketing/communication"}
                icon={<Megaphone className="w-6 h-6" />}
                subItems={[
                    { label: "Code promo", to: "/app/marketing", icon: <Tag className="w-5 h-5" /> },
                    { label: "Commerciaux", to: "/app/marketing/commerciaux", icon: <Users className="w-5 h-5" /> },
                ]}
            />
            <SidebarItem
                label={"Paramètres"}
                icon={<SettingIcon/>}
                to={"/app/settings"}
            />
            
        </motion.div>
    )
}

const SidebarItem: React.FC<React.HTMLAttributes<HTMLDivElement> & {
    label: string,
    icon: React.ReactNode,
    to?: string
}> = ({label, icon, to}) => {

    const cur_path = usePathname()
    const isActive = cur_path === to


    return (
        <Link href={to ?? ""} className={"w-full"}>
            <div className={cn(
                "flex gap-[11px] text-[16px] lg:pl-[33px] border-r-vaYellow rounded-[1px] py-[10px] cursor-pointer hover:opacity-80 w-full",
                isActive && "lg:border-r-4 bg-vaYellow/10 rounded-md text-vaYellow lg:bg-transparent lg:text-white lg:rounded-none",
                "flex items-center justify-center lg:justify-start"
            )}>
                <div className={cn(
                )}>{icon}</div>
                <div className={cn(
                    "hidden lg:flex",
                )}>{label}</div>
            </div>
        </Link>
    )
}

interface SubItem {
    label: string
    to: string
    icon?: React.ReactNode
}

const SidebarItemWithSubmenu: React.FC<{
    label: string
    icon: React.ReactNode
    subItems: SubItem[]
}> = ({label, icon, subItems}) => {
    const [isOpen, setIsOpen] = useState(false)
    const cur_path = usePathname()
    const isActive = subItems.some(item => cur_path === item.to || cur_path.startsWith(item.to + '/'))

    return (
        <div className="w-full">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "flex gap-[11px] text-[16px] lg:pl-[33px] border-r-vaYellow rounded-[1px] py-[10px] cursor-pointer hover:opacity-80 w-full",
                    isActive && "lg:border-r-4 bg-vaYellow/10 rounded-md text-vaYellow lg:bg-transparent lg:text-white lg:rounded-none",
                    "flex items-center justify-center lg:justify-between lg:pr-4"
                )}
            >
                <div className="flex items-center gap-[11px]">
                    <div>{icon}</div>
                    <div className="hidden lg:flex">{label}</div>
                </div>
                <ChevronDown 
                    className={cn(
                        "hidden lg:block w-4 h-4 transition-transform duration-200",
                        isOpen && "rotate-180"
                    )} 
                />
            </button>
            
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden hidden lg:block"
                    >
                        <div className="flex flex-col gap-1 pl-[44px] py-2">
                            {subItems.map((item) => (
                                <Link 
                                    key={item.to} 
                                    href={item.to}
                                    className={cn(
                                        "flex items-center gap-3 py-2 px-3 rounded-md text-sm hover:bg-white/10 transition-colors",
                                        cur_path === item.to && "bg-vaYellow/20 text-vaYellow"
                                    )}
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            {/* Mobile submenu - affiche en modal/popup sur mobile */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="lg:hidden absolute bottom-[70px] left-1/2 -translate-x-1/2 bg-vaPrimary rounded-lg shadow-lg border border-white/20 p-2 min-w-[180px]"
                    >
                        {subItems.map((item) => (
                            <Link 
                                key={item.to} 
                                href={item.to}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    "flex items-center gap-3 py-2 px-3 rounded-md text-sm hover:bg-white/10 transition-colors",
                                    cur_path === item.to && "bg-vaYellow/20 text-vaYellow"
                                )}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}