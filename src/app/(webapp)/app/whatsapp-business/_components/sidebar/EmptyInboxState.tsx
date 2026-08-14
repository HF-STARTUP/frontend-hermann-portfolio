import { MessageCircleX } from "lucide-react";

export function EmptyInboxState() {
    return (
        <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6 py-16 text-center">
            <MessageCircleX className="size-12 text-vaLightGray" />
            <p className="text-sm text-vaTextPrimary">Aucune conversation pour le moment</p>
        </div>
    );
}