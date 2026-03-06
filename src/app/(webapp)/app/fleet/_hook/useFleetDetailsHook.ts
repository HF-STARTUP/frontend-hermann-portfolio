import { formatCurrency } from "@/components/ui/DataTable.utils"
import { FleetKpiCardProps } from "../components/_sub_components/fleetDetailKpi"
import { useGetActiveCurrency } from "@/hooks/__globlal/useGlobalHook"
import { formatNumber } from "@/lib/utils"
import { DetailRowProps } from "../components/detailSections/Profile"

export const useFleetDetailsHook = () => {

    const { currency } = useGetActiveCurrency()

    const ProfileItems: DetailRowProps[] = [
        {
            label: "ID Flotte",
            value: "FLT0001012",
        },
        {
            label: "Nom de la flotte",
            value: "Urban Drivers",
        },
        {
            label: "Date d'ajout",
            value: "15 Jan 2025 à 15h00",
        },
        {
            label: "Type de compte",
            value: "Professionnel",
        },
        {
            label: "Pays",
            value: "Cote d'ivoire",
        },
        {
            label: "Ville",
            value: "Abidjan",
        },
        {
            label: "Devise",
            value: "XOF",
        },
        {
            label: "Propriétaire",
            value: "Amadou Diallo",
        },
        {
            label: "Email",
            value: "amadou.diallo@example.com",
        },
        {
            label: "Numéro de téléphone",
            value: "+225 07 00 00 00 00",
        },
    ]

    const KpiItems: FleetKpiCardProps[] = [
        {
            title: "Chaiffre d'affaires",
            value: formatCurrency(50, currency),
            variation: "up",
            variant: "green",
            hint: "+12.5% ce mois",            
        },
        {
            title: "Véhicules",
            value: formatNumber(50),
            variant: "blue",
            hint: "(12 chauffeurs)",
        },
        {
            title: "Transactions",
            value: formatNumber(510),
            variant: "orange",
            variation: "up",
            hint: "+10% ce mois",
        },
    ]

    return {
        KpiItems,
        ProfileItems,
    }
}