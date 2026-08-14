import { ShieldAlert } from "lucide-react";

export function AccessDenied() {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-3 bg-background text-center">
            <ShieldAlert className="h-10 w-10 text-vaRed" />
            <p className="text-base font-semibold text-foreground">Accès refusé</p>
            <p className="max-w-sm text-sm text-vaTextPrimary">
                Cette section est réservée aux profils ROOT, OWNER et ADMIN.
            </p>
        </div>
    );
}