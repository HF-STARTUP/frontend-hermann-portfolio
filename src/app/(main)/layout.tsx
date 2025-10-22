import * as React from "react";
import MainLayout from "@/components/layout/main/MainLayout";
import NavigationProgress from "@/utils/func/navigationPrefetch";
import dynamic from "next/dynamic";

function MainGroupLayout({
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

export default dynamic(() => Promise.resolve(MainGroupLayout), { ssr: false })

