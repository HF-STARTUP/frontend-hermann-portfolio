import dynamic from "next/dynamic"
import * as React from "react";
import AdminLayout from "@/components/layout/admin/AdminLayout";

function ProtectedGroupLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <AdminLayout>
            <main>
                {children}
            </main>
        </AdminLayout>
    )
}

export default dynamic(() => Promise.resolve(ProtectedGroupLayout), { ssr: false })

