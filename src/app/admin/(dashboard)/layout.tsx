import * as React from "react";
import AdminSidebar from "@/components/layout/admin/AdminSidebar";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";

/**
 * Pages d'administration protégées : vérification du token Sanctum
 * (AdminAuthGuard) + navigation latérale. Le login vit hors de ce groupe.
 */
export default function AdminDashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <AdminAuthGuard>
            <div className="flex min-h-dvh flex-col lg:flex-row">
                <AdminSidebar />
                <div className="flex-1 p-4 sm:p-8">{children}</div>
            </div>
        </AdminAuthGuard>
    )
}
