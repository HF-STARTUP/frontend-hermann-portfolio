import { useMutationProvider, useQueryProvider } from "@/hooks/hooksProvider";
import SubscriptionService, {
  SubscriptionApiPath,
} from "@/services/suscription/SubscriptionService";
import { useGetMyPosition } from "@/hooks/__globlal/useGlobalHook";
import {
  GetSubscriptionsPricingParams,
  PackageFormData,
  UpdatePackageFormData,
} from "@/types/subscription.types";

export const usGetSubscriptionPacks = (country_code?: string) => {
    return useQueryProvider({
        queryFn: () => SubscriptionService.getSubscriptions({country_code}),
        queryKey: [SubscriptionApiPath.GetSubscriptionPacks, country_code],
        enabled: !!country_code
    })
}

export const useInitSubscription = () => {
    return useMutationProvider({
        mutationFn: SubscriptionService.initSubscription,
        successMessage: "Transaction initiée",
    })
}

export const useGetOperators = () => {

    const {data} = useGetMyPosition()
    //data.country_code

    return useQueryProvider({
        queryFn: () => SubscriptionService.getOperators({country_code: data?.country_code as string}),
        queryKey: [SubscriptionApiPath.Operator],
        enabled: !!data?.country_code
    })
}

export const useCheckTransactionStatus = (id: string, refreshRate: number) => {
    return useQueryProvider({
        queryFn: () => SubscriptionService.checkTransactionStatus({id: id}),
        queryKey: [SubscriptionApiPath.CheckTransaction, `pool-count-key:${refreshRate}}`],
        enabled: !!id
    })
}

export const useCheckActiveSubscriptionInfos = () => {
    return useQueryProvider({
        queryFn: () => SubscriptionService.checkActiveSubscriptionInfos(),
        queryKey: [SubscriptionApiPath.CheckActiveSubscriptionInfos],
    })
}

export const useCheckActiveSubscription = () => {
    return useQueryProvider({
        queryFn: () => SubscriptionService.checkActiveSubscription(),
        queryKey: [SubscriptionApiPath.CheckActiveSubscription],
    })
}


export const useGetAllSubscriptions = (params?: GetSubscriptionsPricingParams) => {
    return useQueryProvider({
        queryFn: () => SubscriptionService.getAllSubscriptions(params),
        queryKey: [SubscriptionApiPath.GetAllSubscriptionsPackages, params],
    })
}

export const useGetAllSubscriptionsKpis = (params?: GetSubscriptionsPricingParams) => {
    return useQueryProvider({
        queryFn: () => SubscriptionService.getAllSubscriptionsKpi(params),
        queryKey: [SubscriptionApiPath.GetAllSubscriptionsPackagesKpis, params],
    })
}

export const useGetAllSubscriptionsEvolution = (params?: GetSubscriptionsPricingParams) => {
    return useQueryProvider({
        queryFn: () => SubscriptionService.getAllSubscriptionsEvolution(params),
        queryKey: [SubscriptionApiPath.GetAllSubscriptionsEvolution, params],
    })
}


export const useGetRenewalsVsExpired = (params?: GetSubscriptionsPricingParams) => {
    return useQueryProvider({
        queryFn: () => SubscriptionService.getRenewalVsExpired(params),
        queryKey: [SubscriptionApiPath.GetRenewalVsExpired, params],
    })
}

export const useGetSubsByPayments = (params?: GetSubscriptionsPricingParams) => {
    return useQueryProvider({
        queryFn: () => SubscriptionService.getSubsByPaymentMethods(params),
        queryKey: [SubscriptionApiPath.GetSubsByPaymentMethods, params],
    })
}


export const useGetSubscription = (subsId?: string) => {
    return useQueryProvider({
        queryFn: () => SubscriptionService.getSubsData(subsId),
        queryKey: [SubscriptionApiPath.GetSubscription, subsId],
        enabled: !!subsId,
    })
}

export const useCreateSubscriptionPackage = () => {
  return useMutationProvider<PackageFormData, Awaited<ReturnType<typeof SubscriptionService.createSubscriptionPackage>>>(
    {
      mutationFn: SubscriptionService.createSubscriptionPackage,
      successMessage: "Package créé.",
      onSuccess: () => {
        void SubscriptionService.invalidateAllSubscriptionsList();
      },
    },
  );
};

export const useUpdateSubscriptionPackage = (id?: string) => {
  return useMutationProvider<
    UpdatePackageFormData,
    Awaited<ReturnType<typeof SubscriptionService.updateSubscriptionPackage>>
  >({
    mutationFn: (data: UpdatePackageFormData) => {
      if (!id) {
        throw new Error("Impossible de mettre à jour : l'ID est manquant");
      }
      return SubscriptionService.updateSubscriptionPackage(id, data);
    },
    successMessage: "Package mis à jour.",
    updateMessage: "Package mis à jour.",
    onSuccess: () => {
      void SubscriptionService.invalidateAllSubscriptionsList();
      void SubscriptionService.invalidateSubscription(id);
    },
  });
};

export const useDeleteSubscriptionPackage = () => {
  return useMutationProvider<
    { id: string },
    Awaited<ReturnType<typeof SubscriptionService.deleteSubscriptionPackage>>
  >({
    mutationFn: ({ id }) => SubscriptionService.deleteSubscriptionPackage(id),
    successMessage: "Package supprimé.",
    onSuccess: (_, variables) => {
      void SubscriptionService.invalidateAllSubscriptionsList();
      void SubscriptionService.invalidateSubscription(variables.id);
    },
  });
};

