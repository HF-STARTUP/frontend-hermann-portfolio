import { formatCurrency } from "@/components/ui/DataTable.utils"
import { FleetKpiCardProps } from "../components/_sub_components/fleetDetailKpi"
import { useGetActiveCurrency } from "@/hooks/__globlal/useGlobalHook"
import { formatNumber } from "@/lib/utils"
import { DetailRowProps } from "../components/detailSections/Profile"
import { useGetFleetOverview, useGetFleetProfile } from "@/hooks/admin/useFleetHook"

export const useFleetDetailsHook = (fleetId?:string) => {

    const { currency } = useGetActiveCurrency()
    const { data, isLoading: isLoadingFleetOverview } = useGetFleetOverview(fleetId??"")
    const { data: fleetProfileData, isLoading: isLoadingFleetProfile } = useGetFleetProfile(fleetId??"")
    const ProfileItems: DetailRowProps[] = fleetProfileData?.profileItems || []
    const KpiItems: FleetKpiCardProps[] = [
        {
            title: "Chiffre d'affaires",
            value: `${ data?.revenueAmount } ${currency}`,
            variation: data?.revenueTrend,
            variant: "green",
            hint: data?.revenuePercentage,            
        },
        {
            title: "Véhicules",
            value: data?.vehicles ?? "0",
            variant: "blue",
            hint: `(${ data?.driversCount } chauffeurs) `,
        },
        {
            title: "Transactions",
            value: data?.transactionCount ?? "0",
            variant: "orange",
            variation: data?.transactionTrend,
            hint: data?.transactionPercentage,
        },
    ]

    return {
        KpiItems,
        ProfileItems,
        isLoadingFleetOverview,
        isLoadingFleetProfile,
    }
}