"use client";

import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ScrollToBottomButtonProps {
    onClick: () => void;
    visible: boolean;
}

export function ScrollToBottomButton({ onClick, visible }: ScrollToBottomButtonProps) {
    if (!visible) return null;

    return (
        <Button
            size="icon"
            onClick={onClick}
            className="absolute bottom-24 right-6 h-9 w-9 rounded-full bg-card text-vaTextPrimary shadow-md hover:bg-accent"
        >
            <ChevronDown className="h-4 w-4" />
        </Button>
    );
}