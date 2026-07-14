"use client"

import React, { useEffect, useRef, useState } from "react";
import { DashboardIcon, LayoutListIcon, SettingIcon } from "@/components/ui/__icons";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ArrowRightLeft, Crown, ShieldCheck, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';
import { LuMegaphone } from "react-icons/lu";
import { PiMegaphone } from "react-icons/pi";

export const Sidebar = () => {

    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const handleScroll = () => {
        if (window.innerWidth <= 768) {
            if (window.scrollY > lastScrollY) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            setLastScrollY(window.scrollY);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);


    return (
        <motion.div
            className={cn(
                "lg:w-[230px] bg-[#051534] backdrop-blur-md border-t border-white text-white lg:h-[100vh] lg:pt-[100px] lg:px-0 lg:flex lg:flex-col lg:gap-3 fixed z-40 lg:justify-start lg:items-start",
                "w-[100%] lg:ml-0 lg:mb-0 lg:rounded-none h-[60px] bottom-0 flex items-center justify-around px-[7px] gap-1 lg:overflow-y-auto custom-scrollbar"
            )}
        >
            <SidebarItem
                label={`Dashboard`}
                icon={<DashboardIcon />}
                to={`/app/dashboard`}
            />
            <SidebarItem
                label={"Flottes"}
                icon={<LayoutListIcon />}
                to={"/app/fleet"}
            />
            <SidebarItem
                label={"Transactions & Revenus"}
                icon={<ArrowRightLeft className="size-5 rotate-45" />}
                to={"/app/transactions"}
            />
            <SidebarItem
                label={"Abonnements"}
                icon={<Crown className="size-5" />}
                to={"/app/subscriptions"}
            />
            <SidebarItem
                label={"KYC & Vérifications"}
                icon={<ShieldCheck className="size-5" />}
                to={"/app/kyc"}
            />
            <SidebarItemWithSubmenu
                label={"Marketing & Campagnes"}
                icon={<PiMegaphone className="size-5 -scale-x-100" />}
                subItems={[
                    { label: "Clients à risque", to: "/app/at-risk-customers" },
                    { label: "Code promo", to: "/app/marketing/code-promo" },
                    { label: "Commerciaux", to: "/app/marketing/commerciaux" },
                ]}
            />
            <SidebarItem
                label={"Paramètres"}
                icon={<SettingIcon />}
                to={"/app/settings"}
            />
        </motion.div>
    )
}

const SidebarItem: React.FC<React.HTMLAttributes<HTMLDivElement> & {
    label: string,
    icon: React.ReactNode,
    to?: string
}> = ({ label, icon, to }) => {

    const cur_path = usePathname()
    const isActive = cur_path === to || (!!to && cur_path.startsWith(`${to}/`))

    return (
        <Link href={to ?? ""} className={"w-full"}>
            <div className={cn(
                "flex gap-2 text-sm lg:pl-5 rounded-[1px] py-2 cursor-pointer hover:opacity-80 w-full",
                isActive && " bg-white/10 rounded-md text-white lg:rounded-none",
                "flex items-center justify-center lg:justify-start"
            )}>
                <div className="shrink-0 [&_svg]:size-5">{icon}</div>
                <div className="hidden lg:flex">{label}</div>
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
    to?: string
}> = ({ label, icon, subItems, to }) => {
    const [isOpen, setIsOpen] = useState(true)
    const cur_path = usePathname()
    const menuRef = useRef<HTMLDivElement>(null)
    const isActive = subItems.some(item => cur_path === item.to || cur_path.startsWith(item.to + '/'))

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (window.innerWidth < 1024 && menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [isOpen])

    const handleToggle = (e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsOpen(!isOpen)
    }

    return (
        <div className="w-full lg:relative" ref={menuRef}>
            <AnimatePresence>
                {isOpen && (
                    <div
                        className="fixed inset-0 z-[90] lg:hidden"
                        onClick={() => setIsOpen(false)}
                    />
                )}
            </AnimatePresence>

            <div
                onClick={handleToggle}
                className={cn(
                    "flex gap-2 text-sm lg:pl-5 rounded-[1px] py-2 cursor-pointer hover:opacity-80 w-full relative z-[100]",
                    isActive && "lg:border-r-4 bg-white/10 rounded-md text-white lg:bg-transparent lg:text-white lg:rounded-none",
                    "flex items-center justify-center lg:justify-between lg:pr-3"
                )}
            >
                <div className="flex items-center gap-2 min-w-0">
                    <div className={cn("shrink-0 [&_svg]:size-5", isActive && "text-white lg:text-white")}>{icon}</div>
                    <div className="hidden lg:flex line-clamp-1 truncate">{label}</div>
                </div>
                <div className="hidden lg:block p-1">
                    <ChevronDown
                        className={cn(
                            "size-3.5 transition-transform duration-200",
                            isOpen && "rotate-180"
                        )}
                    />
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden hidden lg:block"
                    >
                        <div className="flex flex-col gap-1 pl-9 py-1.5">
                            {subItems.map((item) => (
                                <Link
                                    key={item.to}
                                    href={item.to}
                                    className={cn(
                                        "flex items-center gap-3 py-2 px-3 rounded-md text-sm hover:bg-white/10 transition-colors",
                                        cur_path === item.to && "bg-white/20 text-white"
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

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, x: "-50%" }}
                        animate={{ opacity: 1, y: 0, x: "-50%" }}
                        exit={{ opacity: 0, y: 20, x: "-50%" }}
                        className="lg:hidden absolute bottom-[80px] ml-20 bg-vaPrimary border border-white/20 rounded-2xl shadow-2xl p-2 min-w-[220px] z-[100] backdrop-blur-xl"
                    >
                        <div className="flex flex-col gap-1">
                            <p className="px-3 py-2 text-[10px] uppercase font-bold text-vaTextPrimary border-b border-white/10 mb-1">
                                {label}
                            </p>
                            {subItems.map((item) => (
                                <Link
                                    key={item.to}
                                    href={item.to}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "flex items-center gap-3 py-3 px-4 rounded-xl text-sm transition-colors",
                                        cur_path === item.to
                                            ? "bg-white/20 backdrop-blur-lg text-white font-bold"
                                            : "text-white hover:bg-white/10"
                                    )}
                                >
                                    {item.icon}
                                    <span className="whitespace-nowrap">{item.label}</span>
                                </Link>
                            ))}
                        </div>
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-vaPrimary border-r border-b border-white/20 rotate-45" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}