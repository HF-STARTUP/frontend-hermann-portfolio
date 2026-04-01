import { useGetSubsByPayments } from "@/hooks/subscription/useSubscription"
import { GetSubscriptionsPricingParams } from "@/types/subscription.types"
import { useMemo } from "react";

export const useSubsByPaymentsHook = (globalFilters?: GetSubscriptionsPricingParams)=>{
    
    const apiParams: GetSubscriptionsPricingParams = useMemo(() => {
        return {
          start_date: globalFilters?.start_date,
          end_date: globalFilters?.end_date,
          city_id: globalFilters?.city_id,
          account_type: globalFilters?.account_type,
        };
      }, [globalFilters]);
    const { isLoading, data } = useGetSubsByPayments(apiParams)

    return{
        isLoading,
        data,
    }
}