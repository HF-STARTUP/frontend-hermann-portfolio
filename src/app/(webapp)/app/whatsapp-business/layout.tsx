import { ReactNode } from "react";
import { SidebarColumn } from "./_components/shell/SidebarColumn";
import { WhatsAppShell } from "./_components/shell/WhatsAppShell";
// import { getCurrentProfile } from "@/lib/auth/getCurrentProfile";
// import { AccessDenied } from "./_components/shared/AccessDenied";

const ALLOWED_ROLE_IDS = [1, 2, 3];

export default async function WhatsAppBusinessLayout({
    children,
}: {
    children: ReactNode;
}) {
    // const profile = await getCurrentProfile();

    // if (!profile || !ALLOWED_ROLE_IDS.includes(profile.roleId)) {
    //     return <AccessDenied />;
    // }

    return (
        <WhatsAppShell sidebar={<SidebarColumn />}>
            {children}
        </WhatsAppShell>
    );
}