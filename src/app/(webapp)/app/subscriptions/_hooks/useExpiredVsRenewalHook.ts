import { useGetRenewalsVsExpired } from "@/hooks/subscription/useSubscription";
import { GetSubscriptionsPricingParams } from "@/types/subscription.types";
import { useMemo, useState } from "react";

export const useExpiredVsRenewalHook = (
  globalFilters?: GetSubscriptionsPricingParams,
) => {
  const [groupExpiredBy, setGroupExpiredBy] = useState<"day" | "week">("day");

  const apiParams: GetSubscriptionsPricingParams = useMemo(() => {
    return {
      start_date: globalFilters?.start_date,
      end_date: globalFilters?.end_date,
      city_id: globalFilters?.city_id,
      account_type: globalFilters?.account_type,
      group_by: groupExpiredBy,
    };
  }, [globalFilters, groupExpiredBy]);

  const { isLoading: isLoadingExpiredVs, data: expiredVsData } =
    useGetRenewalsVsExpired(apiParams);

  return {
    isLoadingExpiredVs,
    expiredVsData,
    groupExpiredBy,
    setGroupExpiredBy,
  };
};
