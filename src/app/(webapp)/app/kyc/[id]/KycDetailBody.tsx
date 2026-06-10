"use client";

import { useCallback, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { KycCrumb } from "../_components/KycCrumb";
import { useGetKycSubmissionDetail } from "@/hooks/admin/useKycHook";
import { KycDetailHeader } from "../_components/KycDetailHeader";
import { KycDetailTabs } from "../_components/KycDetailTabs";
import { ApproveKycDialog } from "../_components/ApproveKycDialog";
import { RejectKycDialog } from "../_components/RejectKycDialog";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { KycTableErrorState } from "../_components/KycTableStates";

export function KycDetailBody() {
  const params = useParams();
  const router = useRouter();
  const kycId = params?.id as string;

  const { data: detail, isLoading, isError, refetch } =
    useGetKycSubmissionDetail(kycId);

  const [isApproveOpen, setIsApproveOpen] = useState(false);
  const [isRejectOpen, setIsRejectOpen] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleDocumentUpdated = useCallback(() => {
    void refetch();
  }, [refetch]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="size-8 animate-spin text-vaPrimary" />
      </div>
    );
  }

  if (isError || !detail) {
    return (
      <div className="space-y-6">
        <KycCrumb currentLabel="Détail" showBack />
        <KycTableErrorState onRetry={() => refetch()} />
        <div className="flex justify-center">
          <Button variant="outline" onClick={() => router.push("/app/kyc")}>
            Retour à la liste
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-6 relative">
      {processing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
          <div className="bg-white rounded-2xl px-8 py-6 flex items-center gap-3 shadow-xl">
            <Loader2 className="size-6 animate-spin text-vaPrimary" />
            <span className="text-sm font-medium text-[#506D82]">
              Traitement du dossier en cours...
            </span>
          </div>
        </div>
      )}

      <KycCrumb currentLabel={detail.clientName} showBack />

      <KycDetailHeader
        detail={detail}
        onApprove={() => setIsApproveOpen(true)}
        onReject={() => setIsRejectOpen(true)}
      />

      <KycDetailTabs
        detail={detail}
        onDocumentUpdated={handleDocumentUpdated}
      />

      <ApproveKycDialog
        isOpen={isApproveOpen}
        onClose={() => setIsApproveOpen(false)}
        submissionId={detail.kycId}
        clientName={detail.clientName}
        onLoadingChange={setProcessing}
        onSuccess={() => refetch()}
      />

      <RejectKycDialog
        isOpen={isRejectOpen}
        onClose={() => setIsRejectOpen(false)}
        submissionId={detail.kycId}
        clientName={detail.clientName}
        clientCode={detail.clientCode}
        avatarInitials={detail.initials}
        avatarColor={detail.avatarColor}
        onLoadingChange={setProcessing}
        onSuccess={() => refetch()}
      />
    </div>
  );
}
