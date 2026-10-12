import * as React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin | Hermann FOMO",
};

/**
 * Wrapper minimal : la sidebar et la garde de session sont portées par le
 * route group (dashboard) pour que /admin/login reste hors administration.
 */
export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <div className="min-h-dvh">{children}</div>
}
