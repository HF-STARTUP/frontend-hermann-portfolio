import {useMutationProvider, useQueryProvider} from "@/hooks/hooksProvider";
import SubscriptionService, {SubscriptionApiPath} from "@/services/suscription/SubscriptionService";
import {useGetMyPosition} from "@/hooks/__globlal/useGlobalHook";

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


