import { KpiItem } from "@/components/display/Kpi";
import React, { useMemo } from "react";
import { Crown, Users } from "lucide-react";
import { formatNumber } from "@/lib/utils";
import { useGetAllSubscriptionsKpis } from "@/hooks/subscription/useSubscription";
import { useGetActiveCurrency } from "@/hooks/__globlal/useGlobalHook";
import { GetSubscriptionsPricingParams } from "@/types/subscription.types";

export const useSubscriptionsHook = (globalFilters?: GetSubscriptionsPricingParams) => {
  const { currency } = useGetActiveCurrency()

  const apiParams: GetSubscriptionsPricingParams = useMemo(() => {
    return {
      start_date: globalFilters?.start_date,
      end_date: globalFilters?.end_date,
      city_id: globalFilters?.city_id,
      account_type: globalFilters?.account_type
    };
  }, [globalFilters]);
  const {data: kpiData, isLoading: isLoadingKpi} = useGetAllSubscriptionsKpis(apiParams)
  const kpiItems: KpiItem[] = [
    {
      icon: React.createElement(Users),
      title: "Total projeté des abonnements",
      variant: "light-blue",
      items: [
        {
          label: "Abonnements",
          value: kpiData?.totalSubs??0,
          unit: currency,
        },
        {
          label: "Réabonnements",
          value: kpiData?.totalResubs??0,
          unit: currency,
        },
      ],
    },
    {
        icon: React.createElement(Users),
        title: "Montant abonnement par profil",
        variant: "light-blue",
        items: kpiData?.byProfileAmount
      },
      {
        icon: React.createElement(Crown),
        title: "Abonnements actifs",
        variant: "green",
        value: kpiData?.subsRatio,
        variation: kpiData?.activeSubsVariation,
        hint: kpiData?.activeSubsLabel
      },
      {
        icon: React.createElement(Crown),
        title: "Nouveaux abonnés",
        variant: "light-blue",
        value: kpiData?.newSubscribersCount,
        variation: kpiData?.newSubscribersVariation,
        hint: kpiData?.newSubscribersLabel
      },
  ];


  return {
    kpiItems,
    isLoadingKpi
  }
};
