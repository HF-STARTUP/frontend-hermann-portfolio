import type {Metadata} from "next";
import {Navbar} from "@/app/(webapp)/app/layout/header/Navbar";
import {Sidebar} from "@/app/(webapp)/app/layout/sidebar/Sidebar";
import 'nprogress/nprogress.css';
import NavigationLoaderWrapper from "@/app/(webapp)/app/layout/ux/NavigationLoaderWrapper";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
    title: "VTC ADMIN",
    description: "Gestion des flottes",
};

export default function WebAppGroupLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <Navbar/>
            <Sidebar/>
            <NavigationLoaderWrapper/>
            <div className={"px-[12px] lg:ml-[320px] pt-[110px] lg:mr-[70px] pb-[50px] bg-[#f5f5f574]"}>
                <main>
                    {children}
                </main>
            </div>
        </div>
    );
}


