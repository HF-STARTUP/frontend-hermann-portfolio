import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "../globals.css";
import GlobalLayoutProvider from "@/app/GlobalLayoutProvider";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "VTC ADMIN - Authentification",
    description: "Gestion des flottes",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            {children}
        </>
    );
}
