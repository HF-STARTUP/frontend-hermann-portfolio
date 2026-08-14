import { MessagesSquare } from "lucide-react";

export function EmptyConversationState() {
    return (
        <div className="flex h-full flex-col items-center justify-center gap-3 bg-muted/30 px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-vaDarkBlue">
                <MessagesSquare className="h-8 w-8 text-blue-primary" />
            </div>
            <p className="text-base font-semibold text-foreground">Aucune conversation sélectionnée</p>
            <p className="max-w-xs text-sm text-vaTextPrimary">
                Choisissez une conversation dans la liste à gauche pour afficher les messages.
            </p>
        </div>
    );
}