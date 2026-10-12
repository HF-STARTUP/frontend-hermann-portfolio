import * as React from "react";
import Navbar from "@/components/layout/main/navbar/Navbar";
import Footer from "@/components/layout/main/footer/Footer";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Navbar />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </>
    )
}
