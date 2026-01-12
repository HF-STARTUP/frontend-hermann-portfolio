import * as React from "react";
import AdminLayout from "@/components/layout/admin/AdminLayout";
import dynamic from "next/dynamic";

export default function ProtectedGroupLayout({
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


