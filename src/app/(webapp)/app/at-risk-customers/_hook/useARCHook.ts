import { KpiItem } from "@/components/display/Kpi";
import { useGetARCClientDetails, useGetARCClients, useGetARCKpi } from "@/hooks/at-risk-customers/useAtRiskCustomers";
import { ARCGroupBy, AtRiskCustomersParams } from "@/types/at-risk-customers.type";
import { BadgePercent, Banknote, Clock, GraduationCap, Repeat, Star } from "lucide-react";
import React, { useState } from "react";

export const useARCHook = () => {
    const [params, setParams] = useState<AtRiskCustomersParams>({
        page: 1,
        itemPerPage: 20,
        group_by: ARCGroupBy.NONE
    })


    const { data: kpiData, isLoading: isLoadingKpi } = useGetARCKpi();
    const { data: priorityData, isLoading: isLoadingPriority } = useGetARCClients();
    const {
        clients,
        currentPage,
        filteredCountLabel,
        isLoading: isLoadingCustomers,
        totalPages, totalRecords
    } = useGetARCClientDetails(params)


    const kpiItems: KpiItem[] = [
        {
            value: String(kpiData?.discountRequests ?? "-"),
            title: "Demande de remise",
            variation: kpiData?.discountRequestsTrendStatus ?? "stable",
            variant: "orange",
            hint: kpiData?.discountRequestsTrend,
            icon: React.createElement(BadgePercent),
        },
        {
            value: String(kpiData?.trainingRequired ?? "-"),
            title: "Formation requise",
            variation: kpiData?.trainingRequiredTrendStatus ?? "stable",
            variant: "blue",
            hint: kpiData?.trainingRequiredTrend,
            icon: React.createElement(GraduationCap),
        },
        {
            value: String(kpiData?.financialDifficulties ?? "-"),
            title: "Difficultés financières",
            variation: kpiData?.financialDifficultiesTrendStatus ?? "stable",
            variant: "red",
            hint: kpiData?.financialDifficultiesTrend,
            icon: React.createElement(Banknote),
        },
        {
            value: String(kpiData?.pendingFollowUps ?? "-"),
            title: "Relances en attente",
            variation: kpiData?.pendingFollowUpsTrendStatus ?? "stable",
            variant: "default",
            hint: kpiData?.pendingFollowUpsTrend,
            icon: React.createElement(Clock),
        },
        {
            value: String(kpiData?.subscriptionChanges ?? "-"),
            title: "Changement d'abonnement",
            variation: kpiData?.subscriptionChangesTrendStatus ?? "stable",
            variant: "blue",
            hint: kpiData?.subscriptionChangesTrend,
            icon: React.createElement(Repeat),
        },
        {
            value: String(kpiData?.renewalOpportunities ?? "-"),
            title: "Opportunités de renouvellement",
            variation: kpiData?.renewalOpportunitiesTrendStatus ?? "stable",
            variant: "green",
            hint: kpiData?.renewalOpportunitiesTrend,
            icon: React.createElement(Star),
        },
    ];

    return {
        kpiItems,
        isLoadingKpi,
        priorityData,
        isLoadingPriority,
        clients,
        currentPage,
        filteredCountLabel,
        isLoadingCustomers,
        totalRecords,
        totalPages,
        setParams,
        params,
    };
};