import { queryClient } from "@/app/_utils/network/reactQuery";
import AuthManagerGuard from "@/guard/AuthManagerGuard";
import { DashBoardApiRoutes } from "@/services/DashboardService";
import { FleetApiPath } from "@/services/admin/fleet/fleetService";
import { TicketApiPath } from "@/services/admin/ticket/ticketService";

export const useNavbarHook = () => {
    const invalidateDependentQueries = (
        params?: { prevCityId?: string; prevCurrencyId?: number }
    ) => {
        const currentCityId = AuthManagerGuard.getEnabledCity;
        const currentCurrencyId = AuthManagerGuard.getCurrencyId;
        const prevCityId = params?.prevCityId;
        const prevCurrencyId = params?.prevCurrencyId;

        // Invalider les queries réellement utilisées par les hooks (prefix match)
        const queryKeysToInvalidate = [
            [DashBoardApiRoutes.GetMetrics],
            [DashBoardApiRoutes.GetRevenueChartData],
            [DashBoardApiRoutes.GetBestFleets],
            [DashBoardApiRoutes.GetExpiringSubscriptions],
            [DashBoardApiRoutes.GetInactiveFleets],
            [FleetApiPath.SubscriptionPlanRevenus],
            [FleetApiPath.OperatorRevenus],
            [TicketApiPath.GetTicket],
        ];

        queryKeysToInvalidate.forEach((key) => {
            void queryClient.invalidateQueries({ queryKey: key });
        });

        // Fallback robuste: invalider toute query qui dépend de la ville/devise courante ou précédente
        void queryClient.invalidateQueries({
            predicate: (query) => {
                const key = query.queryKey;
                // Tester contre la ville courante ET l'ancienne ville
                const matchesCity =
                    key.includes(currentCityId) ||
                    (prevCityId && key.includes(prevCityId));
                // Tester contre la devise courante ET l'ancienne devise
                const matchesCurrency =
                    key.includes(currentCurrencyId) ||
                    (prevCurrencyId && key.includes(prevCurrencyId));
                return matchesCity || matchesCurrency;
            },
        });
    };

    return {
        invalidateDependentQueries,
    };
};