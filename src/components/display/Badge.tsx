import { LeadStatus } from "@/app/(webapp)/app/marketing/campagnes/_hook/useCampagneLeadsHook";
import { CampagneStatus } from "@/app/(webapp)/app/marketing/campagnes/_hook/useCampagnesHook";
import { ReactNode } from "react";

export type BadgeVariant = 'green' | "orange" | "red" | "purple" | "blue" | "light-blue" | "default"

export type BadgeType = LeadStatus | CampagneStatus

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
            return "bg-vaRed/10 text-vaRed"

        default:
            return "text-black/10 bg-vaLightGray";
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


        default:
            return "default";
    }
}

const Badge = ({ variant, type, icon, children, className }: { variant?: BadgeVariant, type?: BadgeType, icon?: ReactNode, children?: ReactNode, className?: string }) => {
    return (
        <div className={`py-1 px-2 w-fit flex items-center justify-center gap-2 rounded-lg text-xs font-semibold ${getBadgeVariantClasses(variant || getBadgeVariant(type))} ${className}`}>
            {
                icon && icon
            }
            {type && <span> {getBadgeText(type)} </span>}

            {children && children}
        </div>
    )
}

export default Badge