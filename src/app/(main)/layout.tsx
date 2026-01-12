import * as React from "react";
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
        <>
            <NavigationProgress/>
            <MainLayout>
                <main>
                    {children}
                </main>
            </MainLayout>
        </>
    )
}
