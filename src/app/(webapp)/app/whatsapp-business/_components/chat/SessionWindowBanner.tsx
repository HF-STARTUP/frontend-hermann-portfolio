import { AlertTriangle } from "lucide-react";

export function SessionWindowBanner() {
    return (
        <div className="flex items-center gap-2 border-t border-border bg-vaYellow/15 px-4 py-2 text-sm text-vaOrange">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <span>
                La fenêtre de 24h est fermée. Le client doit écrire en premier pour pouvoir recevoir une réponse.
            </span>
        </div>
    );
}