import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "../globals.css";
import {Navbar} from "@/app/(webapp)/app/layout/header/Navbar";
import {Sidebar} from "@/app/(webapp)/app/layout/sidebar/Sidebar";
import GlobalLayoutProvider from "@/app/GlobalLayoutProvider";
import 'nprogress/nprogress.css';
import NavigationLoaderWrapper from "@/app/(webapp)/app/layout/ux/NavigationLoaderWrapper";
import dynamic from "next/dynamic";


const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "VTC ADMIN",
    description: "Gestion des flottes",
    themeColor: "#000B20"
};

function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" >
        <body className={inter.className}>
        <GlobalLayoutProvider>
            <div>
                <Navbar/>
                <Sidebar/>
                <NavigationLoaderWrapper/>
                <div className={"px-[12px] lg:ml-[320px] pt-[110px] lg:mr-[70px] pb-[50px]"}>
                    <main>
                        {children}
                    </main>
                </div>
            </div>
        </GlobalLayoutProvider>
        </body>
        </html>
    );
}

export default dynamic(() => Promise.resolve(RootLayout), { ssr: false })
