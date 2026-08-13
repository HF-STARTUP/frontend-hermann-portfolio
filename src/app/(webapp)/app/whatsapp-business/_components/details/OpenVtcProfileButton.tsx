"use client";

import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OpenVtcProfileButtonProps {
    profileId?: string | null;
}

export function OpenVtcProfileButton({ profileId = "profile-1" }: OpenVtcProfileButtonProps) {
    if (!profileId) return null;

    return (
        <div className="px-4 pb-2">
            <Button variant="outline" className="w-full justify-center gap-2 border-blue-primary text-blue-primary">
                <ExternalLink className="h-4 w-4" />
                Ouvrir la fiche VTC
            </Button>
        </div>
    );
}