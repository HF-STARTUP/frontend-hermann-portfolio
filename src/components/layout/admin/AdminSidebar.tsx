"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Briefcase,
    Cpu,
    ExternalLink,
    FolderKanban,
    LayoutDashboard,
    LogOut,
    Mail,
    Menu,
    Newspaper,
    SlidersHorizontal,
    Tags,
    X,
} from "lucide-react";
import { useLogout } from "@/hooks/portfolio/usePortfolioAuthContact";
import { useMessagesQuery } from "@/hooks/portfolio/useAdminMessagesMedia";

const ADMIN_LINKS = [
    { url: "/admin", label: "Tableau de bord", icon: LayoutDashboard },
    { url: "/admin/content", label: "Contenu du site", icon: SlidersHorizontal },
    { url: "/admin/timeline", label: "Parcours", icon: Briefcase },
    { url: "/admin/projects", label: "Projets", icon: FolderKanban },
    { url: "/admin/blog", label: "Articles", icon: Newspaper },
    { url: "/admin/technologies", label: "Technologies", icon: Cpu },
    { url: "/admin/categories", label: "Catégories", icon: Tags },
    { url: "/admin/messages", label: "Messages", icon: Mail },
];

const AdminSidebar = () => {
    const pathname = usePathname();
    const logout = useLogout();
    const { data: messagesData } = useMessagesQuery();
    const unreadCount =
        messagesData?.items.filter((message) => !message.read).length ?? 0;

    const [isLoggingOut, setIsLoggingOut] = React.useState(false);
    const [isMobileOpen, setIsMobileOpen] = React.useState(false);

    // Ferme le drawer mobile à chaque changement de route
    React.useEffect(() => {
        setIsMobileOpen(false);
    }, [pathname]);

    // Bloque le scroll body quand le drawer est ouvert
    React.useEffect(() => {
        document.body.style.overflow = isMobileOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMobileOpen]);

    const isActive = (url: string) =>
        url === "/admin" ? pathname === "/admin" : pathname.startsWith(url);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        await logout();
    };

    return (
        <>
            {/* ===== Topbar mobile ===== */}
            <header className="sticky top-0 z-40 flex items-center justify-between gap-3 border-b border-vaPrimary/20 bg-background/80 px-4 py-3 backdrop-blur-md lg:hidden">
                <Link href="/admin" className="flex items-center gap-2">
                    <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-vaSecondary to-vaPrimary text-xs font-bold text-white">
                        HF
                    </div>
                    <div className="leading-tight">
                        <p className="text-sm font-bold text-foreground">Espace admin</p>
                        <p className="text-[10px] text-muted-foreground">
                            hermannfomo.dev
                        </p>
                    </div>
                </Link>

                <button
                    type="button"
                    aria-label="Ouvrir le menu"
                    aria-expanded={isMobileOpen}
                    onClick={() => setIsMobileOpen(true)}
                    className="relative flex size-10 items-center justify-center rounded-xl border border-vaPrimary/20 bg-background/50 text-foreground transition-colors hover:border-vaPrimary/50 hover:text-vaPrimary"
                >
                    <Menu size={20} />
                    {unreadCount > 0 && (
                        <span className="absolute -right-1 -top-1 flex min-w-5 items-center justify-center rounded-full bg-vaPrimary px-1.5 py-0.5 text-[10px] font-bold text-white">
                            {unreadCount}
                        </span>
                    )}
                </button>
            </header>

            {/* ===== Overlay mobile ===== */}
            <div
                onClick={() => setIsMobileOpen(false)}
                aria-hidden="true"
                className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
                    isMobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
                }`}
            />

            {/* ===== Drawer mobile ===== */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 flex w-72 max-w-[85vw] flex-col gap-2 border-r border-vaPrimary/20 bg-background/95 p-4 backdrop-blur-xl transition-transform duration-300 ease-out lg:hidden ${
                    isMobileOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="mb-4 flex items-center justify-between px-2">
                    <div className="flex items-center gap-2">
                        <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-vaSecondary to-vaPrimary text-xs font-bold text-white">
                            HF
                        </div>
                        <div className="leading-tight">
                            <p className="text-sm font-bold text-foreground">
                                Espace admin
                            </p>
                            <p className="text-xs text-muted-foreground">
                                hermannfomo.dev
                            </p>
                        </div>
                    </div>
                    <button
                        type="button"
                        aria-label="Fermer le menu"
                        onClick={() => setIsMobileOpen(false)}
                        className="flex size-9 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-vaSecondary/10 hover:text-foreground"
                    >
                        <X size={18} />
                    </button>
                </div>

                <nav className="flex flex-1 flex-col gap-1 overflow-y-auto custom-scrollbar">
                    {ADMIN_LINKS.map(({ url, label, icon: Icon }) => (
                        <Link
                            key={url}
                            href={url}
                            className={`group relative flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                                isActive(url)
                                    ? "bg-gradient-to-r from-vaSecondary/30 to-vaPrimary/30 text-foreground shadow-inner"
                                    : "text-muted-foreground hover:bg-vaSecondary/10 hover:text-foreground"
                            }`}
                        >
                            <Icon size={18} className="shrink-0" />
                            <span className="truncate">{label}</span>
                            {url === "/admin/messages" && unreadCount > 0 && (
                                <span className="ml-auto flex min-w-5 items-center justify-center rounded-full bg-vaPrimary px-1.5 py-0.5 text-[10px] font-bold text-white">
                                    {unreadCount}
                                </span>
                            )}
                        </Link>
                    ))}
                </nav>

                <div className="mt-2 flex flex-col gap-2 border-t border-vaPrimary/10 pt-3">
                    <button
                        type="button"
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="flex items-center gap-3 rounded-xl border border-vaPrimary/20 px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-destructive/50 hover:text-destructive disabled:opacity-50"
                    >
                        <LogOut size={18} />
                        {isLoggingOut ? "Déconnexion…" : "Se déconnecter"}
                    </button>

                    <Link
                        href="/"
                        className="flex items-center gap-3 rounded-xl border border-vaPrimary/20 px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-vaPrimary/50 hover:text-vaPrimary"
                    >
                        <ExternalLink size={18} />
                        Retour au site
                    </Link>
                </div>
            </aside>

            {/* ===== Sidebar desktop ===== */}
            <aside className="sticky top-0 z-40 hidden h-dvh w-64 shrink-0 flex-col gap-2 border-r border-vaPrimary/20 bg-background/80 p-4 backdrop-blur-md lg:flex">
                <div className="mb-4 flex items-center gap-2 px-2">
                    <div className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-vaSecondary to-vaPrimary text-xs font-bold text-white">
                        HF
                    </div>
                    <div>
                        <p className="text-sm font-bold leading-tight text-foreground">
                            Espace admin
                        </p>
                        <p className="text-xs text-muted-foreground">
                            hermannfomo.dev
                        </p>
                    </div>
                </div>

                <nav className="flex flex-1 flex-col gap-1 overflow-y-auto custom-scrollbar">
                    {ADMIN_LINKS.map(({ url, label, icon: Icon }) => {
                        const active = isActive(url);
                        return (
                            <Link
                                key={url}
                                href={url}
                                className={`group relative flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 ${
                                    active
                                        ? "bg-gradient-to-r from-vaSecondary/30 to-vaPrimary/30 text-foreground shadow-inner"
                                        : "text-muted-foreground hover:bg-vaSecondary/10 hover:text-foreground"
                                }`}
                            >
                                {/* Barre active gauche */}
                                <span
                                    className={`absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-r-full bg-vaPrimary transition-opacity duration-200 ${
                                        active ? "opacity-100" : "opacity-0"
                                    }`}
                                />
                                <Icon size={18} className="shrink-0" />
                                <span className="truncate">{label}</span>
                                {url === "/admin/messages" && unreadCount > 0 && (
                                    <span className="ml-auto flex min-w-5 items-center justify-center rounded-full bg-vaPrimary px-1.5 py-0.5 text-[10px] font-bold text-white">
                                        {unreadCount}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-auto flex flex-col gap-2 border-t border-vaPrimary/10 pt-3">
                    <button
                        type="button"
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="flex items-center gap-3 rounded-xl border border-vaPrimary/20 px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-destructive/50 hover:text-destructive disabled:opacity-50"
                    >
                        <LogOut size={18} />
                        {isLoggingOut ? "Déconnexion…" : "Se déconnecter"}
                    </button>

                    <Link
                        href="/"
                        className="flex items-center gap-3 rounded-xl border border-vaPrimary/20 px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-vaPrimary/50 hover:text-vaPrimary"
                    >
                        <ExternalLink size={18} />
                        Retour au site
                    </Link>
                </div>
            </aside>
        </>
    );
};

export default AdminSidebar;