import * as React from "react";
import { DM_Sans } from 'next/font/google'
import './globals.css'
import '@/assets/ui/globals.scss'
import GlobalLayoutProvider from "./GlobalLayoutProvider";

const dmSans = DM_Sans({ subsets: ['latin'] })

export const metadata = {
    title: 'VTC Control',
    description: 'Plateforme de gestion VTC',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="fr">
            <body className={dmSans.className}>
                <GlobalLayoutProvider>
                    {children}
                </GlobalLayoutProvider>
            </body>
        </html>
    )
}

