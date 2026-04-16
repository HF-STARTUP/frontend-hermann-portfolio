"use client";

import React, { useCallback, useMemo, useState } from "react";
import Badge from "@/components/display/Badge";
import { Column, RowAction } from "@/components/display/CustomTableDisplay";
import { CopyToClipboard } from "@/components/ui/copy-to-clipboard";
import {
  useDeletePromoCode,
  useGetPromoCodes,
  useUpdatePromoCodeStatus,
} from "@/hooks/marketing/useMarketing";
import { CodeType, MarketingFilters, PromoCode } from "@/types/marketing.types";

const CODE_TYPE_LABELS: Record<CodeType, string> = {
  NEW_CLIENT: "Nouveau client",
  LOYALTY: "Fidélisation",
  FREE_COUPON: "Coupon gratuit",
  COMMERCIAL_RENDITION: "Reddition commerciale",
};

export const usePromoCodeHook = () => {
  const [params, setParams] = useState<MarketingFilters>({
    itemPerPage: 10,
    page: 1,
  });

  // --- RÉPLIQUE DES ÉTATS ---
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editCodeId, setEditCodeId] = useState<string | null>(null);
  const [statusConfirmOpen, setStatusConfirmOpen] = useState(false);
  const [pendingStatusChange, setPendingStatusChange] = useState<{
    codeId: string;
    status: "actif" | "suspendu";
  } | null>(null);
  const [selectedCodeId, setSelectedCodeId] = useState<string | null>(null);
  const [codeToAssign, setCodeToAssign] = useState<PromoCode | null>(null);
  const [selectedSalesAgentId, setSelectedSalesAgentId] = useState<
    string | null
  >(null);

  // --- HOOKS DATA ---
  const { data, isLoading } = useGetPromoCodes(params);
  const { mutate: updateStatus } = useUpdatePromoCodeStatus();
  const { mutate: deleteCode } = useDeletePromoCode();

  // --- RÉPLIQUE DES HANDLERS ---
  const handleStatusChange = (
    codeId: string,
    newStatus: "actif" | "suspendu",
  ) => {
    setPendingStatusChange({ codeId, status: newStatus });
    setStatusConfirmOpen(true);
  };

  const handleConfirmStatusChange = () => {
    if (pendingStatusChange) {
      updateStatus({
        codeId: pendingStatusChange.codeId,
        status: pendingStatusChange.status === "actif" ? "actif" : "suspendu",
      });
      setPendingStatusChange(null);
    }
    setStatusConfirmOpen(false);
  };

  const handleDelete = (codeId: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce code ?")) {
      deleteCode(codeId);
    }
  };

  const handleView = (code: PromoCode) => {
    setSelectedCodeId(code.id);
  };

  const handleEdit = (code: PromoCode) => {
    setEditCodeId(code.id);
    setCreateDialogOpen(true);
  };

  const handleAssignCommercial = (code: PromoCode) => {
    setCodeToAssign(code);
  };

  // --- STRUCTURE DES COLONNES (STRICTE) ---
  const tableColumns: Column<PromoCode>[] = useMemo(
    () => [
      {
        header: "Date de creation",
        accessor: (item) =>
          item.created_at
            ? new Date(item.created_at).toLocaleDateString("fr-FR", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "-",
      },
      {
        header: "Code",
        accessor: (item) =>
          React.createElement(CopyToClipboard, { text: item.code_label }),
      },
      {
        header: "Type",
        accessor: (item) => CODE_TYPE_LABELS[item.code_type] ?? "-",
      },
      {
        header: "Réduction",
        accessor: (item) =>
          item.discount_type === "PERCENTAGE"
            ? `${item.discount_value} %`
            : item.discount_type === "FIXED_AMOUNT"
              ? `${item.discount_value} (fixe)`
              : `${item.discount_value} (période)`,
      },
      {
        header: "Validité (jours)",
        accessor: (item) => `${item.validity_days ?? 0} jours`,
      },
      {
        header: "Utilisations",
        accessor: (item) => item.usage_count ?? "-",
      },
      {
        header: "Statut",
        accessor: (item) =>
          React.createElement(Badge, {
            type: item.status,
          }),
      },
    ],
    [],
  );

  // --- ACTIONS COMPLÉTÉES ---
  const rowActions = useCallback(
    (item: PromoCode): RowAction<PromoCode>[] => [
      {
        id: "view",
        label: "Voir les détails",
        onClick: (item) => handleView(item),
      },
      {
        id: "edit",
        label: "Modifier",
        onClick: (item) => handleEdit(item),
      },
      {
        id: "assign",
        label: "Assigner commercial",
        variant: "vaBlue",
        onClick: (item) => handleAssignCommercial(item),
      },
      {
        id: "Suspendre",
        label: item.status == "ACTIVE" ? "Suspendre" : "Activer",
        variant: item.status == "ACTIVE" ? "destructive" : "success",
        onClick: (item) =>
          handleStatusChange(
            item.id,
            item.status == "ACTIVE" ? "suspendu" : "actif",
          ),
      },
    ],
    [handleDelete, handleEdit, handleAssignCommercial],
  );

  // Pagination
  const pagination = useMemo(
    () => ({
      currentPage: data?.currentPage ?? 1,
      totalPages: Math.max(1, data?.totalPages ?? 1),
      onPageChange: (page: number) => setParams((prev) => ({ ...prev, page })),
      totalEntries: data?.totalRecords ?? 0,
      pageSize: params.itemPerPage ?? 10,
      onPageSizeChange: (size: number) => {
        setParams((prev) => ({ ...prev, itemPerPage: size, page: 1 }));
      },
    }),
    [data, params.itemPerPage],
  );

  return {
    promoCodes: data?.data ?? [],
    isLoading,
    tableColumns,
    rowActions,
    pagination,
    params,
    setParams,
    // Exports pour les dialogues dans le composant
    dialogs: {
      create: {
        isOpen: createDialogOpen,
        setOpen: setCreateDialogOpen,
        editId: editCodeId,
        setEditId: setEditCodeId,
      },
      status: {
        isOpen: statusConfirmOpen,
        setOpen: setStatusConfirmOpen,
        pending: pendingStatusChange,
        confirm: handleConfirmStatusChange,
      },
      details: { id: selectedCodeId, setId: setSelectedCodeId },
      assign: { code: codeToAssign, setCode: setCodeToAssign },
      agent: { id: selectedSalesAgentId, setId: setSelectedSalesAgentId },
    },
    handleDelete,
    handleView,
    handleStatusChange,
  };
};
