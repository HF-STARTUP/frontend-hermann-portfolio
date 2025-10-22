import * as React from "react";
import dynamic from "next/dynamic";

function SecurityGroupLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <main>
            {children}
        </main>
    )
}

export default dynamic(() => Promise.resolve(SecurityGroupLayout), { ssr: false })

