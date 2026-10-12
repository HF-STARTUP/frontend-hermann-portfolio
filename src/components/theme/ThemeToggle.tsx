"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const THEME_OPTIONS = [
    { value: "light", label: "Clair", icon: Sun },
    { value: "dark", label: "Sombre", icon: Moon },
    { value: "system", label: "Système", icon: Monitor },
] as const;

const ThemeToggle = () => {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted ? resolvedTheme === "dark" : false;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    title="Changer de thème"
                    aria-label="Changer de thème"
                    className="rounded-xl border-vaPrimary/30 bg-vaSecondary/10 text-foreground hover:border-vaPrimary/60 hover:bg-vaPrimary/20"
                >
                    {/* Icônes rendues après montage pour éviter le flash d'hydratation */}
                    {!mounted ? (
                        <Sun className="opacity-0" />
                    ) : isDark ? (
                        <Moon className="transition-transform duration-500" />
                    ) : (
                        <Sun className="transition-transform duration-500" />
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="border-border bg-popover">
                {THEME_OPTIONS.map(({ value, label, icon: Icon }) => (
                    <DropdownMenuItem
                        key={value}
                        onClick={() => setTheme(value)}
                        className={`cursor-pointer gap-2 ${
                            mounted && theme === value ? "text-vaPrimary font-semibold" : ""
                        }`}
                    >
                        <Icon size={16} />
                        {label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ThemeToggle;
