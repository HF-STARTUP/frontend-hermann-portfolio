import * as React from "react";
import {DM_Sans} from 'next/font/google'
import '@/assets/ui/globals.scss'

const dmSans = DM_Sans({subsets: ['latin']})


export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {

    return (
        <html lang="fr">
        <body className={dmSans.className}>
        <main>
            {children}
        </main>
        </body>
        </html>
    )
}
