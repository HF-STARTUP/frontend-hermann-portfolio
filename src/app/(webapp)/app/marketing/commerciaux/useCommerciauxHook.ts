"use client";

import React, { useCallback, useMemo, useState } from "react";
import Badge from "@/components/display/Badge";
import { Column, RowAction } from "@/components/display/CustomTableDisplay";
import {
  useGetSalesAgents,
  useUpdateCommercialStatus,
  useDeleteCommercial,
} from "@/hooks/marketing/useMarketing";
import {
  SalesAgent,
  SalesAgentFilters,
  SalesAgentPerformance,
} from "@/types/marketing.types";
import { Eye, Pencil, Trash2, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useGetActiveCurrency } from "@/hooks/__globlal/useGlobalHook";

const PERFORMANCE_LABELS: Record<SalesAgentPerformance, string> = {
  VERY_WEAK: "Très faible",
  WEAK: "Faible",
  AVERAGE: "Moyen",
  GOOD: "Bon",
  EXCELLENT: "Excellent",
};

const PERFORMANCE_COLORS: Record<SalesAgentPerformance, string> = {
  VERY_WEAK: "text-red-600",
  WEAK: "text-orange-600",
  AVERAGE: "text-yellow-600",
  GOOD: "text-blue-600",
  EXCELLENT: "text-green-600",
};

export const useSalesAgentHook = () => {
  const [params, setParams] = useState<SalesAgentFilters>({
    itemPerPage: 10,
    page: 1,
  });

  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [editingAgentId, setEditingAgentId] = useState<string | null>(null);
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);

  const {
    data: salesAgentsData,
    totalRecords,
    totalPages,
    currentPage,
    isLoading,
    raw: rawResponse,
  } = useGetSalesAgents(params);

  const { currency } = useGetActiveCurrency();

  const { mutate: updateStatus } = useUpdateCommercialStatus();
  const { mutate: deleteCommercial } = useDeleteCommercial();

  const handleStatusChange = useCallback(
    (commercialId: string, newStatus: "actif" | "inactif") => {
      updateStatus({ commercialId, status: newStatus });
    },
    [updateStatus],
  );

  const handleDelete = useCallback(
    (commercialId: string) => {
      if (confirm("Êtes-vous sûr de vouloir supprimer ce commercial ?")) {
        deleteCommercial(commercialId);
      }
    },
    [deleteCommercial],
  );

  const handleView = useCallback((agent: SalesAgent) => {
    setSelectedAgentId(agent.id);
  }, []);

  const handleEdit = useCallback((agent: SalesAgent) => {
    setEditingAgentId(agent.id);
    setAddDialogOpen(true);
  }, []);

  const tableColumns: Column<SalesAgent>[] = useMemo(
    () => [
      {
        header: "Date d'ajout",
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
        header: "Nom et Prénoms",
        accessor: (item) => {
          const name =
            `${item.first_name ?? ""} ${item.last_name ?? ""}`.trim();
          const initials = [item.first_name, item.last_name]
            .filter(Boolean)
            .map((n) => n![0])
            .join("")
            .slice(0, 2)
            .toUpperCase();

          return React.createElement(
            "div",
            { className: "flex items-center gap-3" },
            React.createElement(
              "div",
              {
                className:
                  "w-7 h-7 rounded-full bg-blue-100 shrink-0 flex items-center justify-center text-blue-600 font-semibold text-[10px]",
              },
              initials || "—",
            ),
            React.createElement(
              "div",
              { className: "flex flex-col overflow-hidden" },
              React.createElement(
                "span",
                { className: "font-medium text-gray-900 truncate" },
                name,
              ),
              React.createElement(
                "span",
                { className: "text-[10px] text-gray-500 truncate" },
                item.email || "—",
              ),
            ),
          );
        },
      },
      {
        header: "Pays",
        accessor: (item) => item.country?.name ?? "—",
      },
      {
        header: "Codes utilisés",
        accessor: (item) => item.metrics?.codes_used ?? 0,
      },
      {
        header: "Conv. Rate",
        accessor: (item) => `${item.metrics?.conversion_rate ?? 0}%`,
      },
      {
        header: "Revenu généré",
        accessor: (item) =>
          React.createElement(
            "span",
            { className: "font-medium" },
            `${new Intl.NumberFormat("fr-FR").format(item.metrics?.revenue_generated ?? 0)} ${currency}`,
          ),
      },
      {
        header: "Performance",
        accessor: (item) => {
          const perf = item.metrics?.performance ?? "VERY_WEAK";
          return React.createElement(
            "span",
            {
              className: cn(
                "font-medium",
                PERFORMANCE_COLORS[perf as SalesAgentPerformance],
              ),
            },
            PERFORMANCE_LABELS[perf as SalesAgentPerformance],
          );
        },
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

  const rowActions = useCallback(
    (item: SalesAgent): RowAction<SalesAgent>[] => {
      const isActive = item.status === "ACTIVE";

      return [
        {
          id: "view",
          label: "Voir les détails",
          icon: React.createElement(Eye, { className: "size-4" }),
          onClick: (agent) => handleView(agent),
        },
        {
          id: "edit",
          label: "Modifier",
          icon: React.createElement(Pencil, { className: "size-4" }),
          onClick: (agent) => handleEdit(agent),
        },
        {
          id: "toggle-status",
          label: isActive ? "Désactiver" : "Activer",
          icon: React.createElement(isActive ? XCircle : CheckCircle, {
            className: "size-4",
          }),
          variant: isActive ? "destructive" : "vaBlue",
          onClick: (agent) =>
            handleStatusChange(agent.id, isActive ? "inactif" : "actif"),
        },
        // {
        //   id: "delete",
        //   label: "Supprimer",
        //   icon: React.createElement(Trash2, { className: "size-4" }),
        //   variant: "destructive",
        //   onClick: (agent) => handleDelete(agent.id),
        // },
      ];
    },
    [handleDelete, handleEdit, handleView, handleStatusChange],
  );

  const pagination = useMemo(
    () => ({
      currentPage: currentPage ?? 1,
      totalPages: totalPages ?? 1,
      onPageChange: (page: number) => setParams((prev) => ({ ...prev, page })),
      totalEntries: totalRecords ?? 0,
      pageSize: params.itemPerPage??1,
      onPageSizeChange: (size: number) => {
        setParams((prev) => ({ ...prev, itemPerPage: size, page: 1 }));
      },
    }),
    [currentPage, totalPages, totalRecords, params.itemPerPage],
  );

  return {
    salesAgents: salesAgentsData ?? [],
    isLoading,
    rawResponse,
    tableColumns,
    rowActions,
    pagination,
    params,
    setParams,
    dialogs: {
      add: {
        isOpen: addDialogOpen,
        setOpen: setAddDialogOpen,
        editId: editingAgentId,
        setEditId: setEditingAgentId,
        handleClose: () => {
          setAddDialogOpen(false);
          setEditingAgentId(null);
        },
      },
      details: { id: selectedAgentId, setId: setSelectedAgentId },
    },
    handleView,
    handleEdit,
    handleStatusChange,
  };
};
