import { KycKpiCardProps } from "../_components/KycKpiCard";
import { RowAction } from "@/components/display/CustomTableDisplay";
import {
  useGetKycKpis,
  useGetKycSubmissions,
} from "@/hooks/admin/useKycHook";
import KycSubmissionModel from "@/model/ADMIN/KycSubmission";
import { GetKycSubmissionsParams } from "@/types/admin/kyc.type";
import {
  CheckCircle2,
  Clock3,
  Download,
  Eye,
  ShieldCheck,
  Users,
  XCircle,
} from "lucide-react";
import React, { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import notify from "@/utils/func/notification";

const useKycListHook = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [filters, setFilters] = useState<GetKycSubmissionsParams>({
    owner_type: "all",
    status: "all",
    search: "",
  });

  const [selectedSubmission, setSelectedSubmission] =
    useState<KycSubmissionModel>();
  const [isApproveOpen, setIsApproveOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [navigatingKycId, setNavigatingKycId] = useState<string | null>(null);

  const apiParams = useMemo(
    () => ({
      ...filters,
      page,
      itemPerPage,
    }),
    [filters, page, itemPerPage],
  );

  const { data: kpiData, isLoading: isLoadingKpi } = useGetKycKpis();
  const { data, isLoading, isFetching, isError, refetch } =
    useGetKycSubmissions(apiParams);

  const submissions = useMemo(() => data?.submissions ?? [], [data]);

  const pagination = useMemo(
    () => ({
      currentPage: data?.currentPage ?? page,
      totalPages: Math.max(1, data?.totalPages ?? 1),
      onPageChange: setPage,
      totalEntries: data?.totalRecords ?? 0,
      pageSize: itemPerPage,
      onPageSizeChange: (size: number) => {
        setItemPerPage(size);
        setPage(1);
      },
    }),
    [data, page, itemPerPage],
  );

  const kpiItems: KycKpiCardProps[] = useMemo(
    () => [
      {
        icon: <Users className="size-5 text-blue-800" />,
        title: "Total clients",
        value: kpiData?.totalClients ?? "0",
        iconClassName: "bg-indigo-100",
      },
      {
        icon: <CheckCircle2 className="size-5 text-emerald-600" />,
        title: "KYC approuvés",
        value: kpiData?.approved ?? "0",
        iconClassName: "bg-lime-50",
      },
      {
        icon: <Clock3 className="size-5 text-yellow-600" />,
        title: "KYC en attente",
        value: kpiData?.pending ?? "0",
        iconClassName: "bg-yellow-50",
        ...((kpiData?.pendingCount ?? 0) > 0
          ? { hint: "à traiter", hintVariant: "neutral" as const }
          : {}),
      },
      {
        icon: <XCircle className="size-5 text-red-600" />,
        title: "KYC rejetés",
        value: kpiData?.rejected ?? "0",
        iconClassName: "bg-rose-100",
      },
      {
        icon: <ShieldCheck className="size-5 text-gray-600" />,
        title: "KYC incomplets",
        value: kpiData?.incomplete ?? "0",
        iconClassName: "bg-gray-100",
        ...((kpiData?.incompleteCount ?? 0) > 0
          ? { hint: "jamais soumis", hintVariant: "neutral" as const }
          : {}),
      },
    ],
    [kpiData],
  );

  const updateFilter = <K extends keyof GetKycSubmissionsParams>(
    key: K,
    value: GetKycSubmissionsParams[K],
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const handleApprove = (submission: KycSubmissionModel) => {
    setSelectedSubmission(submission);
    setIsApproveOpen(true);
  };

  const handleReject = (submission: KycSubmissionModel) => {
    setSelectedSubmission(submission);
    setIsRejectOpen(true);
  };

  const resetFilters = () => {
    setFilters({
      owner_type: "all",
      status: "all",
      search: "",
    });
    setPage(1);
  };

  const hasActiveFilters = useMemo(() => {
    return (
      (filters.search && filters.search.trim() !== "") ||
      (filters.owner_type && filters.owner_type !== "all") ||
      (filters.status && filters.status !== "all")
    );
  }, [filters]);

  const handleRowClick = (submission: KycSubmissionModel) => {
    setNavigatingKycId(submission.kycId);
    router.push(`/app/kyc/${submission.kycId}`);
  };

  const handleView = (submission: KycSubmissionModel) => {
    setNavigatingKycId(submission.kycId);
    router.push(`/app/kyc/${submission.kycId}`);
  };

  const handleDownload = () => {
    notify("Le téléchargement du dossier sera disponible prochainement.", "info");
  };

  const rowActions = useCallback(
    (item: KycSubmissionModel): RowAction<KycSubmissionModel>[] => {
      const canModerate = item.status === "pending";

      const actions: RowAction<KycSubmissionModel>[] = [
        {
          id: "view",
          label: "Voir le détail",
          icon: <Eye className="size-4" />,
          onClick: () => handleView(item),
        },
        {
          id: "download",
          label: "Télécharger",
          icon: <Download className="size-4" />,
          onClick: () => handleDownload(),
        },
      ];

      if (canModerate) {
        actions.push(
          {
            id: "approve",
            label: "Approuver",
            icon: <CheckCircle2 className="size-4" />,
            variant: "success",
            onClick: () => handleApprove(item),
          },
          {
            id: "reject",
            label: "Rejeter",
            icon: <XCircle className="size-4" />,
            variant: "destructive",
            onClick: () => handleReject(item),
          },
        );
      }

      return actions;
    },
    [],
  );

  return {
    kpiItems,
    isLoadingKpi,
    submissions,
    isLoading: isLoading || isFetching,
    isError,
    refetch,
    rowActions,
    pagination,
    filters,
    updateFilter,
    resetFilters,
    hasActiveFilters,
    handleRowClick,
    handleView,
    navigatingKycId,
    selectedSubmission,
    isApproveOpen,
    isRejectOpen,
    setIsApproveOpen,
    setIsRejectOpen,
    setSelectedSubmission,
  };
};

export default useKycListHook;
