import type {Metadata} from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
    title: "VTC ADMIN - Authentification",
    description: "Gestion des flottes",
};

function AuthGroupLayout({
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

export default dynamic(() => Promise.resolve(AuthGroupLayout), { ssr: false })
