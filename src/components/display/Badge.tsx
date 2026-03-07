import { ReactNode } from "react";

export type BadgeVariant = 'green' | "orange" | "red" | "purple" | "blue" | "default"

export const getBadgeVariantClasses = (variant: BadgeVariant): string => {
    switch (variant) {
        case 'blue':
            return "bg-vaMainBlue/10 text-vaMainBlue";
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

export const getBadgeText = (type: string) => {
    switch (type) {
        case "finished":
            return "Terminer";
        case "processing":
            return "En cours";
        case "todo":
            return "À faire";

        default:
            return "Inconnu";
    }
}

export const getBadgeVariant = (type?: string): BadgeVariant => {
    switch (type) {
        case "finished":
            return "green";
        case "processing":
            return "orange";
        case "todo":
            return "purple";

        default:
            return "default";
    }
}

const Badge = ({ variant, type, icon, children }: { variant?: BadgeVariant, type?: string, icon?: ReactNode, children?: ReactNode }) => {
    return (
        <div className={`py-1 px-2 w-fit flex items-center justify-center gap-2 rounded-lg text-xs font-semibold ${getBadgeVariantClasses(variant || getBadgeVariant(type))}`}>
            {
                icon && icon
            }
            {type && <span> {getBadgeText(type)} </span>}

            {children && children}
        </div>
    )
}

export default Badge