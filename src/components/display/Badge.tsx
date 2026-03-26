import { LeadStatus, LeadStep } from "@/app/(webapp)/app/marketing/campagnes/_hook/useCampagneLeadsHook";
import { CampagneStatus } from "@/app/(webapp)/app/marketing/campagnes/_hook/useCampagnesHook";
import { PackageType, ProfileStatus } from "@/app/(webapp)/app/subscriptions/_hooks/usePackageList";
import { AdminAccountStatus } from "@/types/__form/profile.type";
import { SubscriptionStatus } from "@/types/admin/fleet.type";
import { RootAccessType } from "@/types/admin/role-access.type";
import { ReactNode } from "react";

export type BadgeVariant = 'green' | "orange" | "red" | "purple" | "blue" | "light-blue" | "default"

export type BadgeType = LeadStatus | CampagneStatus | PackageType | ProfileStatus | SubscriptionStatus | LeadStep | AdminAccountStatus | RootAccessType

export const getBadgeVariantClasses = (variant: BadgeVariant): string => {
    switch (variant) {
        case 'blue':
            return "bg-vaMainBlue/10 text-vaMainBlue";
        case 'light-blue':
            return "bg-vaBlue/10 text-vaBlue";
        case 'green':
            return "bg-vaGreen/10 text-vaGreen";
        case 'orange':
            return "bg-vaOrange/10 text-vaOrange";
        case 'purple':
            return "bg-vaPurple/10 text-vaPurple";
        case 'red':
            return "bg-vaRed/10 text-vaRed";

        default:
            return "text-black bg-vaLightGray/30";
    }
}

export const getBadgeText = (type?: BadgeType) => {
    switch (type) {
        case "finished":
            return "Terminer";
        case "processing":
            return "En cours";
        case "todo":
            return "À faire";
        case "contacted":
            return "Contacté";
        case "converted":
            return "Converti";
        case "lost":
            return "Perdu";
        case "qualified":
            return "Qualifié";
        case "CROISSANCE":
            return "CROISSANCE";
        case "ELITE":
            return "ÉLITE";
        case "ESSENTIEL":
            return "ESSENTIEL";
        case "PERFORMANCE":
            return "PERFORMANCE"
        case "active":
            return "Actif";
        case "suspended":
            return "Suspendu"
        case "inactive":
            return "Inactif";
        case "deleted":
            return "Supprimé";
        case "suspended":
            return "Suspendu";
        case "demo_planed":
            return "Démo planifiée";
        case "new":
            return "Nouveau";
        case "proposition":
            return "Proposition";
        case "expired":
            return "Expiré";
        case "paid":
            return "Payé";
        case "using":
            return "En cours";
        case "CRITICAL":
            return "Critique";
        case "READ":
            return "Lecture";
        case "SENSITIVE":
            return "Sensible";
        case "read":
            return "Lecture";
        case "WRITE":
            return "Ecriture";
        case "write":
            return "Ecriture";
        case "deactivated":
            return "Déactivé";
        default:
            return "Inconnu";
    }
}

export const getBadgeVariant = (type?: BadgeType): BadgeVariant => {
    switch (type) {
        case "finished":
            return "green";
        case "processing":
            return "orange";
        case "todo":
            return "purple";
        case "contacted":
            return "blue";
        case "converted":
            return "green";
        case "lost":
            return "red";
        case "qualified":
            return "light-blue";
        case "CROISSANCE":
            return "light-blue";
        case "ELITE":
            return "green";
        case "ESSENTIEL":
            return "orange";
        case "PERFORMANCE":
            return "blue"
        case "active":
            return "green";
        case "inactive":
            return "orange";
        case "deleted":
            return "red";
        case "suspended":
            return "default";
        case "demo_planed":
            return "orange";
        case "new":
            return "light-blue";
        case "proposition":
            return "purple"
        case "expired":
            return "red";
        case "paid":
            return "green";
        case "using":
            return "orange"
        case "CRITICAL":
            return "red";
        case "READ":
            return "light-blue";
        case "read":
            return "light-blue";
        case "SENSITIVE":
            return "orange";
        case "WRITE":
            return "orange";
        case "write":
            return "orange";
        case "deactivated":
            return "default";


        default:
            return "default";
    }
}

const Badge = ({ variant, type, icon, children, className, iconOnly }: { variant?: BadgeVariant, type?: BadgeType, icon?: ReactNode, children?: ReactNode, className?: string, iconOnly?: boolean }) => {
    return (
        <div className={`py-1 px-2 w-fit flex items-center justify-center gap-2 rounded-lg text-xs font-semibold ${getBadgeVariantClasses(variant || getBadgeVariant(type))} ${iconOnly ? "!px-1 !py-1 !rounded-full" : ""} ${className}`}>
            {icon && (
                <span className="flex items-center size-4 [&>svg]:size-full">
                    {icon}
                </span>
            )}
            {type && <span> {getBadgeText(type)} </span>}

            {children && children}
        </div>
    )
}

export default Badge