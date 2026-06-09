"use client";

import { useState } from "react";

import { Download, Loader2 } from "lucide-react";

import useKycListHook from "./_hook/useKycListHook";

import { ApproveKycDialog } from "./_components/ApproveKycDialog";

import { RejectKycDialog } from "./_components/RejectKycDialog";

import {
  KycTableEmptyState,
  KycTableErrorState,
} from "./_components/KycTableStates";

import { KycCrumb } from "./_components/KycCrumb";

import { KycKpiCard, KycKpiShimmerGrid } from "./_components/KycKpiCard";

import { KycFiltersPanel } from "./_components/KycFiltersPanel";

import { KycSubmissionsTable } from "./_components/KycSubmissionsTable";

export function KycBody() {
  const [processingId, setProcessingId] = useState<string | null>(null);

  const {
    kpiItems,

    isLoadingKpi,

    submissions,

    isLoading,

    isError,

    refetch,

    rowActions,

    pagination,

    filters,

    updateFilter,

    resetFilters,

    hasActiveFilters,

    handleRowClick,

    navigatingKycId,

    selectedSubmission,

    isApproveOpen,

    isRejectOpen,

    setIsApproveOpen,

    setIsRejectOpen,

    setSelectedSubmission,
  } = useKycListHook();

  return (
    <div className="flex flex-col space-y-6 relative">
      {processingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
          <div className="bg-white rounded-2xl px-8 py-6 flex items-center gap-3 shadow-xl">
            <Loader2 className="size-6 animate-spin text-vaPrimary" />

            <span className="text-sm font-medium text-[#506D82]">
              Traitement du dossier en cours...
            </span>
          </div>
        </div>
      )}

      {navigatingKycId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
          <div className="bg-white rounded-2xl px-8 py-6 flex items-center gap-3 shadow-xl">
            <Loader2 className="size-6 animate-spin text-vaPrimary" />

            <span className="text-sm font-medium text-[#506D82]">
              Chargement du dossier KYC...
            </span>
          </div>
        </div>
      )}

      <KycCrumb />

      <div className="flex items-center justify-between gap-4 min-h-10">
        <h1 className="text-slate-500 text-4xl font-bold leading-10">
          Vérifications KYC
        </h1>
        <button
          type="button"
          className="shrink-0 px-4 py-2.5 bg-white rounded-[10px] border border-gray-200 inline-flex items-center gap-2 text-slate-500 text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          <Download className="size-4" />
          Exporter
        </button>
      </div>

      {isLoadingKpi ? (
        <KycKpiShimmerGrid count={5} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 w-full">
          {kpiItems.map((item, index) => (
            <KycKpiCard key={index} {...item} />
          ))}
        </div>
      )}

      <KycFiltersPanel filters={filters} onFilterChange={updateFilter} />

      {isError ? (
        <KycTableErrorState onRetry={() => refetch()} />
      ) : (
        <KycSubmissionsTable
          submissions={submissions}
          pagination={pagination}
          rowActions={rowActions}
          onRowClick={handleRowClick}
          loadingRowId={navigatingKycId}
          isLoading={isLoading}
          emptyContent={
            !isLoading && submissions.length === 0 ? (
              <KycTableEmptyState
                onResetFilters={hasActiveFilters ? resetFilters : undefined}
              />
            ) : undefined
          }
        />
      )}

      <ApproveKycDialog
        isOpen={isApproveOpen}
        onClose={() => {
          setIsApproveOpen(false);

          setSelectedSubmission(undefined);

          setProcessingId(null);
        }}
        submissionId={selectedSubmission?.kycId}
        clientName={selectedSubmission?.clientName}
        onLoadingChange={(loading) =>
          setProcessingId(loading ? (selectedSubmission?.kycId ?? null) : null)
        }
        onSuccess={() => refetch()}
      />

      <RejectKycDialog
        isOpen={isRejectOpen}
        onClose={() => {
          setIsRejectOpen(false);

          setSelectedSubmission(undefined);

          setProcessingId(null);
        }}
        submissionId={selectedSubmission?.kycId}
        clientName={selectedSubmission?.clientName}
        avatarInitials={selectedSubmission?.initials}
        avatarColor={selectedSubmission?.avatarColor}
        onLoadingChange={(loading) =>
          setProcessingId(loading ? (selectedSubmission?.kycId ?? null) : null)
        }
        onSuccess={() => refetch()}
      />
    </div>
  );
}
