import dynamic from "next/dynamic"
import * as React from "react";
import {DM_Sans} from 'next/font/google'
import '@/assets/ui/globals.scss'
import AdminLayout from "@/components/layout/admin/AdminLayout";
import GlobalLayoutProvider from "@/components/layout/globalLayout/GlobalLayoutProvider";

const dmSans = DM_Sans({subsets: ['latin']})


function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {

    return (
        <html lang="en">
        <body className={dmSans.className}>
        <GlobalLayoutProvider>
            <AdminLayout>
                <main>
                    {/*{children}*/}
                </main>
            </AdminLayout>
        </GlobalLayoutProvider>
        </body>
        </html>
    )
}

export default dynamic(() => Promise.resolve(RootLayout), { ssr: false })

