"use client";

import { Button } from "@/components/ui/button";

interface ConversationActionsSectionProps {
    onAssignToMe?: () => void;
    onClose?: () => void;
}

export function ConversationActionsSection({ onAssignToMe, onClose }: ConversationActionsSectionProps) {
    return (
        <div className="flex gap-2 border-t border-border px-4 py-4">
            <Button variant="outline" className="flex-1" onClick={onAssignToMe}>
                Prendre en charge
            </Button>
            <Button variant="destructive" className="flex-1" onClick={onClose}>
                Clôturer
            </Button>
        </div>
    );
}