import ARCService, { ARCApiPath } from "@/services/AtRiskCustomersService";
import { AtRiskCustomersParams } from "@/types/at-risk-customers.type";
import { useQuery } from "@tanstack/react-query";

export const useGetARCKpi = () => {

    const { isLoading, data } = useQuery({
        queryKey: [ARCApiPath.GetARCKpi],
        queryFn: () => ARCService.getARCKpi(),
    });

    return { isLoading, data };
};

export const useGetARCClients = () => {

    const { isLoading, data } = useQuery({
        queryKey: [ARCApiPath.GetARCClientsPriorities],
        queryFn: () => ARCService.getARCClientsPriorities(),
    });

    return { isLoading, data };
};

export const useGetARCClientDetails = (params: AtRiskCustomersParams) => {

    const { isLoading, data } = useQuery({
        queryKey: [ARCApiPath.GetAtRiskCustomers, params],
        queryFn: () => ARCService.getARCClientDetails(params),
    });

    return {
        clients: data?.data,
        totalRecords: data?.meta.totalRecords,
        totalPages: data?.meta.totalPages,
        currentPage: data?.meta.currentPage,
        filteredCountLabel: data?.meta.filtered_count_label ?? "",
        isLoading,
    };
};


export const useGetARCClientProfile = (params: AtRiskCustomersParams) => {
    const { isLoading, data } = useQuery({
        queryKey: [ARCApiPath.GetAtRiskCustomer, params],
        queryFn: () => ARCService.getARCClientProfile(params),
        enabled: !!params.park_id,
    });

    return { isLoading, profile: data };
};

export const useGetARCInteractions = (params: AtRiskCustomersParams) => {
    const { isLoading, data } = useQuery({
        queryKey: [ARCApiPath.GetARCInteractions, params],
        queryFn: () => ARCService.getARCInteractions(params),
        enabled: !!params.park_id,
    });

    return {
        interactions: data?.data ?? [],
        totalRecords: data?.meta.totalRecords ?? 0,
        totalPages: data?.meta.totalPages ?? 1,
        currentPage: data?.meta.currentPage ?? 1,
        isLoading,
    };
};


export const useGetARCInteractionDetail = (params: AtRiskCustomersParams) => {
    const { isLoading, data } = useQuery({
        queryKey: [ARCApiPath.GetARCInteractions, params],
        queryFn: () => ARCService.getARCInteractionDetail(params),
        enabled: !!params.park_id && !!params.interraction_id,
    });

    return { isLoading, interaction: data };
};