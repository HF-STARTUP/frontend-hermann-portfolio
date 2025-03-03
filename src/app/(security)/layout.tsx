import * as React from "react";
import {DM_Sans} from 'next/font/google'
import '@/assets/ui/globals.scss'
import AdminLayout from "@/components/layout/admin/AdminLayout";
import GlobalLayoutProvider from "@/components/layout/globalLayout/GlobalLayoutProvider";

const dmSans = DM_Sans({subsets: ['latin']})


export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {

    return (
        <html lang="en">
        <body className={dmSans.className}>
        <main>
            {children}
        </main>
        </body>
        </html>
    )
}
