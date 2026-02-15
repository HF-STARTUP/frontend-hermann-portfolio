import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import marketingService from "@/services/MarketingService";
import {
  MarketingFilters,
  CreatePromoCodePayload,
  CreatePromoCodeFormData,
  PromoCode,
  MarketingKpi,
  CodeUsageData,
  Commercial,
  CommercialFilters,
  CreateCommercialPayload,
  CreateSalesAgentPayload,
  PromoCodeMetricsFilterParams,
  SalesAgentFilters,
} from "@/types/marketing.types";
import { createPromoCodeSchema } from "@/schema/marketing.schema";
import { useMutationProvider } from "@/hooks/hooksProvider";

export const MARKETING_QUERY_KEYS = {
  kpis: "marketing-kpis",
  codes: "marketing-codes",
  promoCodeDetails: "marketing-promo-code-details",
  codeUsageStats: "marketing-code-usage-stats",
  usageByType: "marketing-usage-by-type",
  commercials: "marketing-commercials",
  salesAgents: "marketing-sales-agents",
  commercialKpis: "marketing-commercial-kpis",
} as const;

export function useGetMarketingKpis() {
  const { data, isLoading, error, refetch } = useQuery<MarketingKpi>({
    queryKey: [MARKETING_QUERY_KEYS.kpis],
    queryFn: () => marketingService.getKpis(),
  });

  return { data, isLoading, error, refetch };
}

export function useGetPromoCodes(filters?: MarketingFilters) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [MARKETING_QUERY_KEYS.codes, filters],
    queryFn: () => marketingService.getPromoCodes(filters),
  });

  return {
    data: data?.data ?? [],
    totalRecords: data?.totalRecords ?? 0,
    isLoading,
    error,
    refetch,
  };
}

export function useGetPromoCodeDetails(id: string | undefined) {
  const result = useQuery({
    queryKey: [MARKETING_QUERY_KEYS.promoCodeDetails, id],
    queryFn: () => marketingService.getPromoCodeById(id!),
    enabled: Boolean(id),
  });

  return {
    ...result,
    data: result.data ?? null,
  };
}

export function useGetPromoCodeMetrics(filters?: PromoCodeMetricsFilterParams) {
  const { ...options } = useQuery({
    queryKey: [MARKETING_QUERY_KEYS.codes, filters],
    queryFn: () => marketingService.getCodeUsageMetrics(filters),
  });

  return {
    ...options,
  };
}

export function useGetPromoCodeUsageByType(
  filters?: PromoCodeMetricsFilterParams,
) {
  const { ...options } = useQuery({
    queryKey: [MARKETING_QUERY_KEYS.usageByType, filters],
    queryFn: () => marketingService.getUsageByType(filters),
  });

  return {
    ...options,
    data: options.data ?? [],
  };
}

export function useGetCodeUsageStats() {
  const { data, isLoading, error, refetch } = useQuery<CodeUsageData[]>({
    queryKey: [MARKETING_QUERY_KEYS.codeUsageStats],
    queryFn: () => marketingService.getCodeUsageStats(),
  });

  return { data: data ?? [], isLoading, error, refetch };
}

export function useCreatePromoCode() {
  const queryClient = useQueryClient();

  const { data, loading, isSuccess, isError, handleMutation } =
    useMutationProvider<CreatePromoCodePayload, PromoCode>({
      mutationFn: (payload) => marketingService.createPromoCode(payload),
      successMessage: "Code promo créé.",
    });

  React.useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries({ queryKey: [MARKETING_QUERY_KEYS.codes] });
      queryClient.invalidateQueries({ queryKey: [MARKETING_QUERY_KEYS.kpis] });
      queryClient.invalidateQueries({
        queryKey: [MARKETING_QUERY_KEYS.codeUsageStats],
      });
    }
  }, [isSuccess, queryClient]);

  return {
    handleMutation,
    data,
    isLoading: loading,
    isError,
    isSuccess,
  };
}

export function useUpdatePromoCode() {
  const queryClient = useQueryClient();

  const { data, loading, isSuccess, isError, handleMutation } =
    useMutationProvider<
      { id: string; payload: CreatePromoCodePayload },
      PromoCode
    >({
      mutationFn: ({ id, payload }) =>
        marketingService.updatePromoCode(id, payload),
      successMessage: "Code promo modifié.",
    });

  React.useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries({ queryKey: [MARKETING_QUERY_KEYS.codes] });
      queryClient.invalidateQueries({
        queryKey: [MARKETING_QUERY_KEYS.promoCodeDetails],
      });
      queryClient.invalidateQueries({ queryKey: [MARKETING_QUERY_KEYS.kpis] });
      queryClient.invalidateQueries({
        queryKey: [MARKETING_QUERY_KEYS.codeUsageStats],
      });
    }
  }, [isSuccess, queryClient]);

  return {
    handleMutation,
    data,
    isLoading: loading,
    isError,
    isSuccess,
  };
}

const INITIAL_CREATE_PROMO_FORM_DATA: CreatePromoCodeFormData = {
  code_label: "",
  code_type: "",
  discount_type: "",
  discount_value: "",
  validity_days: "",
  max_usage_per_user: "",
  is_stackable: false,
};

function mapFormDataToPayload(
  formData: CreatePromoCodeFormData,
): CreatePromoCodePayload {
  return {
    code_label: formData.code_label.trim(),
    code_type: formData.code_type as CreatePromoCodePayload["code_type"],
    discount_type:
      formData.discount_type as CreatePromoCodePayload["discount_type"],
    discount_value: Number(formData.discount_value),
    validity_days: Number(formData.validity_days),
    max_usage_per_user: Number(formData.max_usage_per_user),
    is_stackable: formData.is_stackable,
  };
}

export interface UseCreatePromoCodeFormOptions {
  onSuccess?: () => void;
  onClose?: () => void;
}

export function useCreatePromoCodeForm(
  options?: UseCreatePromoCodeFormOptions,
) {
  const [formData, setFormData] = React.useState<CreatePromoCodeFormData>(
    INITIAL_CREATE_PROMO_FORM_DATA,
  );
  const [currentStep, setCurrentStep] = React.useState(1);
  const [fieldErrors, setFieldErrors] = React.useState<Record<string, string>>(
    {},
  );
  const successProcessedRef = React.useRef(false);

  const { handleMutation, isLoading, isSuccess } = useCreatePromoCode();

  const handleClose = React.useCallback(() => {
    setCurrentStep(1);
    setFormData(INITIAL_CREATE_PROMO_FORM_DATA);
    setFieldErrors({});
    options?.onClose?.();
  }, [options]);

  React.useEffect(() => {
    if (isSuccess && !successProcessedRef.current) {
      successProcessedRef.current = true;
      options?.onSuccess?.();
      handleClose();
    }
  }, [isSuccess, options, handleClose]);

  const setField = React.useCallback(
    <K extends keyof CreatePromoCodeFormData>(
      field: K,
      value: CreatePromoCodeFormData[K],
    ) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    },
    [],
  );

  const handleStep1Submit = React.useCallback(
    (data: CreatePromoCodeFormData) => {
      setFormData(data);
      setCurrentStep(2);
    },
    [],
  );

  const handleBack = React.useCallback(() => {
    setCurrentStep(1);
  }, []);

  const handleFinalSubmit = React.useCallback(() => {
    const payload = mapFormDataToPayload(formData);
    const { error } = createPromoCodeSchema.validate(payload, {
      abortEarly: false,
    });
    if (error) {
      const errors: Record<string, string> = {};
      error.details.forEach((d) => {
        const key = d.path[0] as string;
        if (key) errors[key] = d.message;
      });
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    successProcessedRef.current = false;
    handleMutation(payload);
  }, [formData, handleMutation]);

  return {
    formData,
    setField,
    fieldErrors,
    currentStep,
    handleStep1Submit,
    handleBack,
    handleFinalSubmit,
    handleClose,
    isLoading,
  };
}

export function useUpdatePromoCodeStatus() {
  const queryClient = useQueryClient();

  const mutation = useMutationProvider({
    mutationFn: ({
      codeId,
      status,
    }: {
      codeId: string;
      status: "actif" | "suspendu";
    }) => marketingService.updatePromoCodeStatus(codeId, status),
    successMessage: "Statut du code promo mis à jour.",
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MARKETING_QUERY_KEYS.codes] });
      queryClient.invalidateQueries({
        queryKey: [MARKETING_QUERY_KEYS.promoCodeDetails],
      });
      queryClient.invalidateQueries({ queryKey: [MARKETING_QUERY_KEYS.kpis] });
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
}

export function useDeletePromoCode() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (codeId: string) => marketingService.deletePromoCode(codeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [MARKETING_QUERY_KEYS.codes] });
      queryClient.invalidateQueries({ queryKey: [MARKETING_QUERY_KEYS.kpis] });
      queryClient.invalidateQueries({
        queryKey: [MARKETING_QUERY_KEYS.codeUsageStats],
      });
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
}

// Hooks pour les Commerciaux
export function useGetCommercials(filters?: CommercialFilters) {
  const { data, isLoading, error, refetch } = useQuery<Commercial[]>({
    queryKey: [MARKETING_QUERY_KEYS.commercials, filters],
    queryFn: () => marketingService.getCommercials(filters),
  });

  return { data: data ?? [], isLoading, error, refetch };
}

export function useGetSalesAgents(filters?: SalesAgentFilters) {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: [MARKETING_QUERY_KEYS.salesAgents, filters],
    queryFn: () => marketingService.getSalesAgents(filters),
  });

  return {
    data: data?.data ?? [],
    totalRecords: data?.totalRecords ?? 0,
    raw: data,
    isLoading,
    error,
    refetch,
  };
}

export function useCreateCommercial() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: CreateCommercialPayload) =>
      marketingService.createCommercial(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MARKETING_QUERY_KEYS.commercials],
      });
      queryClient.invalidateQueries({
        queryKey: [MARKETING_QUERY_KEYS.commercialKpis],
      });
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    reset: mutation.reset,
  };
}

export function useCreateSalesAgent() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (payload: CreateSalesAgentPayload) =>
      marketingService.createSalesAgent(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MARKETING_QUERY_KEYS.commercials],
      });
      queryClient.invalidateQueries({
        queryKey: [MARKETING_QUERY_KEYS.salesAgents],
      });
      queryClient.invalidateQueries({
        queryKey: [MARKETING_QUERY_KEYS.commercialKpis],
      });
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
    reset: mutation.reset,
  };
}

export function useUpdateCommercialStatus() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({
      commercialId,
      status,
    }: {
      commercialId: string;
      status: "actif" | "inactif";
    }) => marketingService.updateCommercialStatus(commercialId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MARKETING_QUERY_KEYS.commercials],
      });
      queryClient.invalidateQueries({
        queryKey: [MARKETING_QUERY_KEYS.commercialKpis],
      });
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
}

export function useDeleteCommercial() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (commercialId: string) =>
      marketingService.deleteCommercial(commercialId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [MARKETING_QUERY_KEYS.commercials],
      });
      queryClient.invalidateQueries({
        queryKey: [MARKETING_QUERY_KEYS.commercialKpis],
      });
    },
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    error: mutation.error,
  };
}
