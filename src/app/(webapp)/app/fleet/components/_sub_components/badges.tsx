"use client";

import { ColumnDef } from "@tanstack/react-table";
import { FleetModel } from "@/model/ADMIN/fleet";
import { cn } from "@/lib/utils";
import { Crown } from "lucide-react";

/**
 * Composant pour afficher le statut de l'abonnement avec style
 */
export const AbonStatusBadge = ({ status }: { status: string }) => {
    const isActive = status === "Active";
    const isInactive = status === "Désactivé";

    return (
        <div
            className={cn(
                "flex items-center justify-center gap-2 rounded-lg py-1 px-2 font-semibold",
                isActive && "text-vaGreen bg-vaGreen/10",
                isInactive && "text-vaRed bg-vaRed/10"
            )}
        >
            {status}
        </div>
    );
};

/**
 * Composant pour afficher le nom de l'abonnement avec style
 */
export const SubscriptionBadge = ({ name }: { name: string }) => {
    const isEssential = name === "ESSENTIEL" || name.toLowerCase().includes("essentiel");
    const isPremium = name === "PREMIUM" || name.toLowerCase().includes("premium");
    const isStarter = name === "STARTER" || name.toLowerCase().includes("starter");

    return (
        <div
            className={cn(
                "flex items-center justify-center gap-2 p-1 rounded-lg w-fit px-2",
                isEssential && "text-vaOrange bg-vaOrange/10",
                isPremium && "text-vaYellow bg-vaYellow/10",
                isStarter && "text-vaBlue bg-vaBlue/10"
            )}
        >
            {(isEssential || isPremium || isStarter) && <Crown size={16} />}
            <div>{name}</div>
        </div>
    );
};
