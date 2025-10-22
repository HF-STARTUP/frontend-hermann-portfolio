"use client";

import { ColumnDef } from "@tanstack/react-table";
import { FleetModel } from "@/model/ADMIN/fleet";
import { cn } from "@/lib/utils";
import { CrownIcon } from "@/components/ui/__icons";

/**
 * Composant pour afficher le statut de l'abonnement avec style
 */
export const AbonStatusBadge = ({ status }: { status: string }) => {
    const isActive = status === "Active";
    const isInactive = status === "Désactivé";

    return (
        <div
            className={cn(
                "flex items-center justify-center gap-[8.8px] h-[22px] px-[15px] py-[0.88px] rounded-sm",
                isActive && "text-[#83BF6E] bg-[#EAFAE5]",
                isInactive && "text-[#FF0000] bg-[#FAE5E5]"
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
                "flex items-center justify-center gap-[8.8px] h-[30px] px-[15px] py-[20px] rounded-sm text-nowrap",
                isEssential && "text-[#e51d13] bg-[#FFEBEA]",
                isPremium && "text-[#E89900] bg-[#FFF8DE]",
                isStarter && "text-blue-primary bg-blue-primary/10"
            )}
        >
            {(isEssential || isPremium || isStarter) && <CrownIcon />}
            <div>{name}</div>
        </div>
    );
};

/**
 * Définition des colonnes pour le tableau des flottes
 * Optimisée pour la performance avec des cellules mémorisées
 */
export const fleetColumns: ColumnDef<FleetModel>[] = [
    {
        accessorKey: "start_date",
        header: "Date d'ajout",
        cell: ({ row }) => {
            const date = row.getValue("start_date") as string | null;
            return <div className="text-nowrap">{date || "-"}</div>;
        },
    },
    {
        accessorKey: "name",
        header: "Nom de la flotte",
        cell: ({ row }) => {
            return <div className="font-medium text-nowrap">{row.getValue("name")}</div>;
        },
    },
    {
        accessorKey: "ownerName",
        header: "Propriétaire",
        cell: ({ row }) => {
            return <div className="text-nowrap">{row.getValue("ownerName")}</div>;
        },
    },
    {
        accessorKey: "suscription_name",
        header: "Type d'abonnement",
        cell: ({ row }) => {
            const subscriptionName = row.getValue("suscription_name") as string;
            return <SubscriptionBadge name={subscriptionName} />;
        },
    },
    {
        accessorKey: "subscription_amount",
        header: "Prix de l'abonnement",
        cell: ({ row }) => {
            const amount = (row.getValue("subscription_amount") as number) || 0;
            return <div className="font-medium text-vaTextPrimary text-nowrap">{amount.toLocaleString()}</div>;
        },
    },



    {
        accessorKey: "number_vehicle",
        header: "Véhicules",
        cell: ({ row }) => {
            return <div className="font-medium text-nowrap">{row.getValue("number_vehicle")}</div>;
        },
    },
    {
        accessorKey: "driver_number",
        header: "Chauffeurs",
        cell: ({ row }) => {
            return <div className="font-medium text-nowrap">{row.getValue("driver_number")}</div>;
        },
    },
    {
        accessorKey: "city",
        header: "Ville",
        cell: ({ row }) => {
            return <div className="text-nowrap">{row.getValue("city")}</div>;
        },
    },

    {
        accessorKey: "ca_total",
        header: "CA total",
        cell: ({ row }) => {
            const amount = row.getValue("ca_total") as number;
            return <div className="font-medium text-vaTextPrimary text-nowrap">{amount.toLocaleString()}</div>;
        },
    },
    {
        accessorKey: "end_date",
        header: "Date d'exp",
        cell: ({ row }) => {
            const date = row.getValue("end_date") as string | null;
            return <div className="text-nowrap">{date || "-"}</div>;
        },
    },
    // {
    //     accessorKey: "abon_status",
    //     header: "Statut",
    //     cell: ({ row }) => {
    //         const status = row.getValue("abon_status") as string;
    //         return <AbonStatusBadge status={status} />;
    //     },
    // },
];

/**
 * Calcule les données du footer avec les totaux
 */
export const calculateFleetFooterData = (fleets: FleetModel[]) => {
    const vehicleNumber = fleets.reduce((acc, fleet) => acc + fleet.number_vehicle, 0);
    const driverNumber = fleets.reduce((acc, fleet) => acc + fleet.driver_number, 0);
    const totalCA = fleets.reduce((acc, fleet) => acc + fleet._instance.ca_total, 0);
    const totalSubscriptionAmount = fleets.reduce(
        (acc, fleet) => (acc || 0) + (fleet._instance.subscription_amount || 0),
        0
    );

    return {
        name: "-",
        ownerName: "-",
        city: "-",
        number_vehicle: vehicleNumber.toString(),
        driver_number: driverNumber.toString(),
        start_date: "-",
        ca_total: `${totalCA.toLocaleString()} FCFA`,
        subscription_amount: `${totalSubscriptionAmount.toLocaleString()} FCFA`,
        suscription_name: "-",
        end_date: "-",
        abon_status: "-",
    };
};

