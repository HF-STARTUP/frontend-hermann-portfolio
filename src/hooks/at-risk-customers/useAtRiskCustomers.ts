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