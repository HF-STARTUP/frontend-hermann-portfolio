import { MessagesSquare } from "lucide-react";

export function EmptyState() {
    return (
        <div className="flex h-full flex-col items-center justify-center gap-3 bg-muted/30 text-center">
            <MessagesSquare className="h-10 w-10 text-vaLightGray" />
            <p className="text-sm text-vaTextPrimary">Sélectionnez une conversation pour commencer</p>
        </div>
    );
}