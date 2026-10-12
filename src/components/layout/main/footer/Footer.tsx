"use client";

import React from "react";
import Container from "@/components/box/Container";
import VLinkProvider from "@/components/helpers/VLinkProvider";
import NAVIGATIONS_URL from "@/utils/navigation";
import { usePortfolioStore } from "@/stores/usePortfolioStore";
import { getIconFromPreset } from "@/components/admin/iconPreset";

const FOOTER_LINKS = [
    NAVIGATIONS_URL.home,
    NAVIGATIONS_URL.about,
    NAVIGATIONS_URL.projects,
    NAVIGATIONS_URL.blog,
];

const Footer = () => {
    const profile = usePortfolioStore((s) => s.siteContent.profile);
    const footerContent = usePortfolioStore((s) => s.siteContent.footer);
    const socialLinks = usePortfolioStore((s) => s.socialLinks);

    return (
        <footer className="relative mt-20 border-t border-vaPrimary/20 bg-background/60 backdrop-blur-md">
            <Container>
                <div className="flex flex-col items-center gap-8 py-12 md:flex-row md:justify-between">
                    {/* Logo + baseline (textes éditables via /admin/content) */}
                    <div className="flex flex-col items-center gap-3 md:items-start">
                        <VLinkProvider to={NAVIGATIONS_URL.home.url}>
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
                        </VLinkProvider>
                        <p className="max-w-xs text-center text-sm text-vaTextPrimary md:text-left">
                            {footerContent.baseline}
                        </p>
                    </div>

                    {/* Navigation */}
                    <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
                        {FOOTER_LINKS.map((link) => (
                            <VLinkProvider
                                key={link.url}
                                to={link.url}
                                className="text-sm font-medium text-vaTextPrimary transition-colors duration-300 hover:text-vaPrimary"
                            >
                                {link.label}
                            </VLinkProvider>
                        ))}
                    </nav>

                    {/* Réseaux sociaux (éditables via /admin/content > Profil) */}
                    <div className="flex items-center gap-3">
                        {socialLinks.map(({ id, label, url, iconName }) => {
                            const Icon = getIconFromPreset(iconName);
                            return (
                                <a
                                    key={id}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    title={label}
                                    className="flex size-10 items-center justify-center rounded-xl border border-vaPrimary/20 bg-vaSecondary/10 text-vaTextPrimary transition-all duration-300 hover:-translate-y-0.5 hover:border-vaPrimary/50 hover:text-vaPrimary"
                                >
                                    <Icon size={18} />
                                </a>
                            );
                        })}
                    </div>
                </div>

                <div className="border-t border-vaPrimary/10 py-6 text-center text-sm text-vaTextPrimary">
                    © {new Date().getFullYear()} {footerContent.copyrightPrefix}{" "}
                    {footerContent.copyrightSuffix}
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
