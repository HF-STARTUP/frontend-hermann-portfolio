import * as React from "react";
import localFont from 'next/font/local'
import { ThemeProvider } from 'next-themes'
import './globals.css'
import '@/assets/ui/globals.scss'
import GlobalLayoutProvider from "./GlobalLayoutProvider";
import SpaceBackground from "@/components/layout/main/SpacialBackground";

/* Police auto-hébergée depuis @fontsource : `next/font/google` télécharge la
   police à CHAQUE build (échec hors ligne / sur Hostinger). Poppins est la base
   d'origine de DM Sans — rendu quasi identique. */
const dmSans = localFont({
    src: [
        { path: '../../node_modules/@fontsource/poppins/files/poppins-latin-400-normal.woff2', weight: '400', style: 'normal' },
        { path: '../../node_modules/@fontsource/poppins/files/poppins-latin-400-italic.woff2', weight: '400', style: 'italic' },
        { path: '../../node_modules/@fontsource/poppins/files/poppins-latin-500-normal.woff2', weight: '500', style: 'normal' },
        { path: '../../node_modules/@fontsource/poppins/files/poppins-latin-600-normal.woff2', weight: '600', style: 'normal' },
        { path: '../../node_modules/@fontsource/poppins/files/poppins-latin-700-normal.woff2', weight: '700', style: 'normal' },
        { path: '../../node_modules/@fontsource/poppins/files/poppins-latin-800-normal.woff2', weight: '800', style: 'normal' },
    ],
    fallback: ['Inter', 'sans-serif'],
})

export const metadata = {
    title: 'Hermann FOMO',
    description: 'Frontend Web developper based in Cameroon and available form any opportunities',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="fr" suppressHydrationWarning>
            <body className={dmSans.className}>
                <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
                    <div className="fixed inset-0">
                        <SpaceBackground />
                    </div>
                    <div className="relative z-10 flex min-h-dvh flex-col">
                        <GlobalLayoutProvider>
                            {children}
                        </GlobalLayoutProvider>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    )
}
