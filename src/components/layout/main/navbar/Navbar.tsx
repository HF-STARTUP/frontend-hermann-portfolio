'use client'

import * as React from "react";
import NAVIGATIONS_URL from "@/utils/navigation";
import { usePathname } from "next/navigation";
import Container from "@/components/box/Container";
import VLinkProvider from "@/components/helpers/VLinkProvider";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { usePortfolioStore } from "@/stores/usePortfolioStore";
import { Download } from "lucide-react";

const primaryNavLinks = [
    NAVIGATIONS_URL.home,
    NAVIGATIONS_URL.about,
    NAVIGATIONS_URL.projects,
    NAVIGATIONS_URL.blog,
];

const Navbar = () => {
    const [menuIsOpen, setMenuIsOpen] = React.useState<boolean>(false);
    const $pathName = usePathname();
    const profile = usePortfolioStore((s) => s.siteContent.profile);

    // Le lien Accueil n'est actif que sur la page d'accueil exacte
    const isLinkActive = (url: string) =>
        url === "/" ? $pathName === "/" : $pathName.startsWith(url);

    const handleToggleMenu = () => {
        setMenuIsOpen(!menuIsOpen);
    };

    return (
        <nav className="bg-background/50 backdrop-blur-md z-50 sticky top-0 border-b border-vaPrimary/10">
            <Container>
                <div className="py-4 flex justify-between items-center">
                    {/* Identité éditable via /admin/content > Profil */}
                    <div className="flex items-center gap-2">
                        <div className="rounded-xl size-10 flex items-center justify-center p-2 bg-gradient-to-br from-vaSecondary to-vaPrimary text-white text-sm font-bold">
                            {profile.logoInitials}
                        </div>
                        <p className="text-foreground font-semibold text-lg">
                            {profile.firstName}
                            <span className="text-vaPrimary font-bold">
                                {profile.lastName}
                            </span>
                        </p>
                    </div>

                    {/* Navigation Desktop */}
                    <div className="hidden md:flex items-center gap-2 lg:gap-4">
                        {primaryNavLinks.map((link) => {
                            const isActive = isLinkActive(link.url);
                            return (
                                <VLinkProvider key={link.url} to={link.url}>
                                    <span
                                        className={`transition duration-300 font-medium text-sm px-4 py-2 rounded-2xl ${isActive
                                                ? "text-foreground bg-vaPrimary/20"
                                                : "text-muted-foreground hover:text-foreground hover:bg-vaSecondary/10"
                                            }`}
                                    >
                                        {link.label}
                                    </span>
                                </VLinkProvider>
                            );
                        })}
                    </div>

                    <div className="hidden md:flex items-center gap-3">
                        {/* CV éditable via /admin/content > Profil */}
                        <Button
                            size={"icon"}
                            variant="outline"
                            title="Telecharger mon CV"
                            onClick={() => {
                                if (profile.cvUrl) {
                                    window.open(profile.cvUrl, "_blank", "noopener,noreferrer");
                                }
                            }}
                            className="rounded-xl border-vaPrimary/30 bg-vaSecondary/10 hover:bg-vaPrimary/20">
                            <Download />
                        </Button>
                        <ThemeToggle />
                    </div>


                    {/* Bouton Hamburger Mobile */}
                    <button
                        onClick={handleToggleMenu}
                        aria-label="Toggle menu"
                        className="md:hidden text-foreground focus:outline-none p-2"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {menuIsOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>
            </Container>

            {/* Menu Mobile */}
            {menuIsOpen && <NavbarMenu handleToggleMenu={handleToggleMenu} />}
        </nav>
    );
};

const NavbarMenu: React.FC<{ handleToggleMenu: () => void }> = ({ handleToggleMenu }) => {
    const $pathName = usePathname();

    return (
        <div className="w-full bg-background/95 transition-all duration-300 backdrop-blur-lg rounded-b absolute top-full left-0 z-30 shadow-lg md:hidden">
            <div className="flex flex-col">
                {primaryNavLinks.map((link, index) => (
                    <MenuItem
                        key={link.url}
                        name={link.label}
                        to={link.url}
                        active={$pathName === link.url}
                        isLast={index === primaryNavLinks.length - 1}
                        onClick={handleToggleMenu}
                    />
                ))}
                <div className="flex items-center justify-between px-6 py-4 border-t border-vaPrimary/10">
                    <span className="text-sm text-muted-foreground">Thème</span>
                    <ThemeToggle />
                </div>
            </div>
        </div>
    );
};

const MenuItem: React.FC<{
    name: string;
    to: string;
    active: boolean;
    isLast: boolean;
} & React.HTMLAttributes<HTMLDivElement>> = ({ name, to, active, isLast, ...props }) => {
    return (
        <div {...props}>
            <VLinkProvider to={to}>
                <div
                    className={`${isLast ? "rounded-b" : ""
                        } ${active
                            ? "bg-vaPrimary/30 text-white font-semibold"
                            : "text-foreground/80 hover:bg-vaPrimary/20 hover:text-foreground"
                        } py-[15px] px-6 text-left border-t border-vaPrimary/10 transition duration-200 cursor-pointer`}
                >
                    {name}
                </div>
            </VLinkProvider>
        </div>
    );
};

export default Navbar;
