import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import marketingService from "@/services/MarketingService"
import { 
  MarketingFilters, 
  CreatePromoCodePayload,
  PromoCode,
  MarketingKpi,
  CodeUsageData,
  Commercial,
  CommercialFilters,
  CreateCommercialPayload
} from "@/types/marketing.types"

export const MARKETING_QUERY_KEYS = {
  kpis: "marketing-kpis",
  codes: "marketing-codes",
  codeUsageStats: "marketing-code-usage-stats",
  commercials: "marketing-commercials",
} as const

export function useGetMarketingKpis() {
  const { data, isLoading, error, refetch } = useQuery<MarketingKpi>({
    queryKey: [MARKETING_QUERY_KEYS.kpis],
    queryFn: () => marketingService.getKpis(),
  })

  return { data, isLoading, error, refetch }
}

export function useGetPromoCodes(filters?: MarketingFilters) {
  const { data, isLoading, error, refetch } = useQuery<PromoCode[]>({
    queryKey: [MARKETING_QUERY_KEYS.codes, filters],
    queryFn: () => marketingService.getPromoCodes(filters),
  })

  return { data: data ?? [], isLoading, error, refetch }
}

export function useGetCodeUsageStats() {
  const { data, isLoading, error, refetch } = useQuery<CodeUsageData[]>({
    queryKey: [MARKETING_QUERY_KEYS.codeUsageStats],
    queryFn: () => marketingService.getCodeUsageStats(),
  })

  return { data: data ?? [], isLoading, error, refetch }
}

export function useCreatePromoCode() {
  const queryClient = useQueryClient()
  
  const mutation = useMutation({
    mutationFn: (payload: CreatePromoCodePayload) => 
      marketingService.createPromoCode(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MARKETING_QUERY_KEYS.codes] })
      queryClient.invalidateQueries({ queryKey: [MARKETING_QUERY_KEYS.kpis] })
      queryClient.invalidateQueries({ queryKey: [MARKETING_QUERY_KEYS.codeUsageStats] })
    },
  })

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    reset: mutation.reset,
  }
}

export function useUpdatePromoCodeStatus() {
  const queryClient = useQueryClient()
  
  const mutation = useMutation({
    mutationFn: ({ codeId, status }: { codeId: string; status: 'actif' | 'suspendu' }) => 
      marketingService.updatePromoCodeStatus(codeId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MARKETING_QUERY_KEYS.codes] })
      queryClient.invalidateQueries({ queryKey: [MARKETING_QUERY_KEYS.kpis] })
    },
  })

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  }
}

export function useDeletePromoCode() {
  const queryClient = useQueryClient()
  
  const mutation = useMutation({
    mutationFn: (codeId: string) => marketingService.deletePromoCode(codeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MARKETING_QUERY_KEYS.codes] })
      queryClient.invalidateQueries({ queryKey: [MARKETING_QUERY_KEYS.kpis] })
      queryClient.invalidateQueries({ queryKey: [MARKETING_QUERY_KEYS.codeUsageStats] })
    },
  })

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  }
}

// Hooks pour les Commerciaux
export function useGetCommercials(filters?: CommercialFilters) {
  const { data, isLoading, error, refetch } = useQuery<Commercial[]>({
    queryKey: [MARKETING_QUERY_KEYS.commercials, filters],
    queryFn: () => marketingService.getCommercials(filters),
  })

  return { data: data ?? [], isLoading, error, refetch }
}

export function useCreateCommercial() {
  const queryClient = useQueryClient()
  
  const mutation = useMutation({
    mutationFn: (payload: CreateCommercialPayload) => 
      marketingService.createCommercial(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MARKETING_QUERY_KEYS.commercials] })
      queryClient.invalidateQueries({ queryKey: [MARKETING_QUERY_KEYS.commercialKpis] })
    },
  })

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    reset: mutation.reset,
  }
}

export function useUpdateCommercialStatus() {
  const queryClient = useQueryClient()
  
  const mutation = useMutation({
    mutationFn: ({ commercialId, status }: { commercialId: string; status: 'actif' | 'inactif' }) => 
      marketingService.updateCommercialStatus(commercialId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MARKETING_QUERY_KEYS.commercials] })
      queryClient.invalidateQueries({ queryKey: [MARKETING_QUERY_KEYS.commercialKpis] })
    },
  })

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  }
}

export function useDeleteCommercial() {
  const queryClient = useQueryClient()
  
  const mutation = useMutation({
    mutationFn: (commercialId: string) => marketingService.deleteCommercial(commercialId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MARKETING_QUERY_KEYS.commercials] })
      queryClient.invalidateQueries({ queryKey: [MARKETING_QUERY_KEYS.commercialKpis] })
    },
  })

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  }
}
