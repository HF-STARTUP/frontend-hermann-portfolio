import { useGetAllSubscriptionsEvolution } from "@/hooks/subscription/useSubscription";
import { GetSubscriptionsPricingParams } from "@/types/subscription.types";
import { useMemo, useState } from "react";

export const useEvolutionHook = (
  globalFilters?: GetSubscriptionsPricingParams,
) => {
  const [groupBy, setGroupBy] = useState<"day" | "week">("day");
  const apiParams: GetSubscriptionsPricingParams = useMemo(() => {
    return {
      start_date: globalFilters?.start_date,
      end_date: globalFilters?.end_date,
      city_id: globalFilters?.city_id,
      account_type: globalFilters?.account_type,
      group_by: groupBy,
    };
  }, [globalFilters, groupBy]);
  const { isLoading: isLoadingEvolutionData, data: evolutionData } =
    useGetAllSubscriptionsEvolution(apiParams);

  return {
    isLoadingEvolutionData,
    evolutionData,
    groupBy,
    setGroupBy,
  };
};
