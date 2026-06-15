"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KycSubmissionDetailModel } from "@/model/ADMIN/KycSubmissionDetail";
import { Button } from "@/components/ui/button";
import { Download, FileText, History, Loader2, RefreshCw } from "lucide-react";
import { KycDocumentCard } from "./KycDocumentCard";
import { EmptyData } from "@/components/box/PageNetworkState";
import { cn } from "@/lib/utils";
import { downloadFileFromUrl } from "@/utils/func/downloadFile";
import { useGetKycSubmissionHistory } from "@/hooks/admin/useKycHook";
import { KycAuditHistoryPanel } from "./KycAuditHistoryPanel";

const tabTriggerClass =
  "rounded-none border-b-2 border-transparent data-[state=active]:border-blue-800 data-[state=active]:text-blue-800 data-[state=inactive]:text-gray-600 data-[state=active]:bg-transparent data-[state=active]:rounded-none data-[state=active]:shadow-none bg-transparent shadow-none px-4 py-3 h-auto text-base font-medium leading-4 gap-2 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 [&_svg]:size-4 data-[state=active]:[&_svg]:text-blue-800 data-[state=inactive]:[&_svg]:text-gray-600";

export function KycDetailTabs({
  detail,
  onDocumentUpdated,
  isRefreshing = false,
  onRefresh,
}: {
  detail: KycSubmissionDetailModel;
  onDocumentUpdated?: () => void;
  isRefreshing?: boolean;
  onRefresh?: () => void;
}) {
  const documents = detail.documents;
  const [isDownloadingAll, setIsDownloadingAll] = useState(false);
  const [activeTab, setActiveTab] = useState("documents");

  const {
    data: auditHistory,
    isLoading: isHistoryLoading,
    isError: isHistoryError,
    refetch: refetchHistory,
  } = useGetKycSubmissionHistory(detail.kycId, activeTab === "audit");

  const handleDownloadAll = async () => {
    const docsWithUrl = documents.filter((doc) => doc.fileUrl);
    if (docsWithUrl.length === 0) return;

    setIsDownloadingAll(true);
    try {
      for (const doc of docsWithUrl) {
        await downloadFileFromUrl(doc.fileUrl!, doc.downloadFileName);
        await new Promise((resolve) => setTimeout(resolve, 300));
      }
    } finally {
      setIsDownloadingAll(false);
    }
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="w-full">
      <TabsList className="bg-transparent border-b border-gray-200 rounded-none w-full justify-start h-auto p-0 gap-1">
        <TabsTrigger value="documents" className={tabTriggerClass}>
          <FileText className="size-4" />
          Documents ({documents.length})
        </TabsTrigger>
        <TabsTrigger value="audit" className={tabTriggerClass}>
          <History className="size-4" />
          Historique d&apos;audit
        </TabsTrigger>
      </TabsList>

      <TabsContent value="documents" className="mt-3">
        <div
          className={cn(
            "bg-white rounded-2xl shadow-[0_4px_7px_0_rgba(0,0,0,0.10)]",
            "px-6 pt-8 pb-6 flex flex-col gap-4",
          )}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="size-4 text-slate-500" />
              <h2 className="text-xl font-semibold text-neutral-950">
                Documents soumis
              </h2>
            </div>
            <div className="flex items-center gap-2">
              {detail.hasPendingSystemValidation && (
                <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
                  <Loader2 className="size-3.5 animate-spin" />
                  Analyse IA en cours…
                </span>
              )}
              {onRefresh && (
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-[10px] gap-2 text-sm border-gray-200 text-slate-500 h-10 px-4"
                  onClick={onRefresh}
                  disabled={isRefreshing}>
                  <RefreshCw
                    className={cn("size-4", isRefreshing && "animate-spin")}
                  />
                  Rafraîchir
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                className="rounded-[10px] gap-2 text-sm border-gray-200 text-slate-500 h-10 px-4"
                onClick={handleDownloadAll}
                disabled={documents.length === 0 || isDownloadingAll}>
                <Download className="size-4" />
                {isDownloadingAll ? "Téléchargement..." : "Tout télécharger"}
              </Button>
            </div>
          </div>

          {documents.length === 0 ? (
            <EmptyData
              message="Aucun document soumis"
              description="Ce dossier ne contient pas encore de pièces jointes."
              className="h-[280px]"
            />
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              {documents.map((doc) => (
                <KycDocumentCard
                  key={doc.id}
                  document={doc}
                  submissionId={detail.kycId}
                  canModerate={detail.canModerate}
                  onDocumentUpdated={onDocumentUpdated}
                />
              ))}
            </div>
          )}
        </div>
      </TabsContent>

      <TabsContent value="audit" className="mt-3">
        <KycAuditHistoryPanel
          events={auditHistory}
          isLoading={isHistoryLoading}
          isError={isHistoryError}
          onRetry={() => refetchHistory()}
        />
      </TabsContent>
    </Tabs>
  );
}
