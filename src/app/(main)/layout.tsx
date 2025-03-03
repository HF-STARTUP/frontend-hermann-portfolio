import * as React from "react";
import {DM_Sans, Poppins} from 'next/font/google'
// @ts-ignore
import {Poppins_400Regular, Poppins_500Medium, Poppins_700Bold} from '@fontsource/poppins';
// @ts-ignore
import {Inter_400Regular, Inter_500Medium, Inter_700Bold} from '@fontsource/inter';
import '@/assets/ui/globals.scss'
import MainLayout from "@/components/layout/main/MainLayout";
import NavigationProgress from "@/utils/func/navigationPrefetch";
import GlobalLayoutProvider from "@/components/layout/globalLayout/GlobalLayoutProvider";

const dmSans = DM_Sans({subsets: ['latin']})
const poppins = Poppins({weight: '400', subsets: ['latin']})

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {

    return (
        <html lang="en">
        <body className={dmSans.className}>
        <GlobalLayoutProvider>
            <>
                <NavigationProgress/>
                <MainLayout>
                    <main>
                        {children}
                    </main>
                </MainLayout>
            </>
        </GlobalLayoutProvider>
        </body>
        </html>
    )
}


