import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useMutationProvider, useQueryProvider } from "@/hooks/hooksProvider";
import KycService, { KycApiPath } from "@/services/admin/kyc/kycService";
import {
  GetKycSubmissionsParams,
  KycDocumentType,
  RejectKycPayload,
  UpdateKycDocumentPayload,
} from "@/types/admin/kyc.type";

export const useGetKycKpis = () => {
  const { isLoading, data } = useQueryProvider({
    queryKey: [KycApiPath.GetKpis],
    queryFn: () => KycService.getKpis(),
  });

  return { isLoading, data };
};

export const useGetKycSubmissions = (params: GetKycSubmissionsParams) => {
  const { isLoading, data, isFetching, isError, error, refetch } = useQuery({
    queryKey: [KycApiPath.GetSubmissions, params],
    queryFn: () => KycService.getSubmissions(params),
  });

  return { isLoading, data, isFetching, isError, error, refetch };
};

export const useGetKycSubmissionDetail = (id?: string) => {
  const { isLoading, data, isError, error, refetch, isFetching } = useQuery({
    queryKey: [KycApiPath.GetSubmissionDetail, id],
    queryFn: () => KycService.getSubmissionById(id!),
    enabled: !!id,
    refetchInterval: (query) => {
      const detail = query.state.data;
      if (!detail?.hasPendingSystemValidation) return false;
      return 4000;
    },
  });

  return { isLoading, data, isError, error, refetch, isFetching };
};

export const useGetKycSubmissionHistory = (
  id?: string,
  enabled = true,
) => {
  const { isLoading, data, isError, error, refetch, isFetching } = useQuery({
    queryKey: [KycApiPath.GetSubmissionHistory, id],
    queryFn: () => KycService.getSubmissionHistory(id!),
    enabled: !!id && enabled,
  });

  return { isLoading, data, isError, error, refetch, isFetching };
};

export const useApproveKycSubmission = () => {
  const { data, loading, isSuccess, isError, error, handleMutation } =
    useMutationProvider({
      mutationFn: (id: string) => KycService.approveSubmission(id),
      successMessage: "Dossier KYC approuvé avec succès.",
    });

  const onApprove = (id: string) => {
    handleMutation(id);
  };

  React.useEffect(() => {
    if (isSuccess) {
      void KycService.invalidateKycData();
    }
  }, [isSuccess]);

  return { data, loading, isSuccess, isError, error, onApprove };
};

export const useRejectKycSubmission = () => {
  const { data, loading, isSuccess, isError, error, handleMutation } =
    useMutationProvider({
      mutationFn: ({
        id,
        payload,
      }: {
        id: string;
        payload: RejectKycPayload;
      }) => KycService.rejectSubmission(id, payload),
      successMessage: "Dossier KYC rejeté.",
    });

  const onReject = (id: string, payload: RejectKycPayload) => {
    handleMutation({ id, payload });
  };

  React.useEffect(() => {
    if (isSuccess) {
      void KycService.invalidateKycData();
    }
  }, [isSuccess]);

  return { data, loading, isSuccess, isError, error, onReject };
};

export const useUpdateKycDocument = (options?: { onSuccess?: () => void }) => {
  const { data, loading, isSuccess, isError, error, handleMutation } =
    useMutationProvider({
      mutationFn: ({
        submissionId,
        documentType,
        payload,
      }: {
        submissionId: string;
        documentType: KycDocumentType;
        payload: UpdateKycDocumentPayload;
      }) => KycService.updateDocument(submissionId, documentType, payload),
      successMessage: "Statut du document mis à jour.",
      onSuccess: () => {
        void KycService.invalidateKycData();
        options?.onSuccess?.();
      },
    });

  const onUpdateDocument = (
    submissionId: string,
    documentType: KycDocumentType,
    payload: UpdateKycDocumentPayload,
  ) => {
    handleMutation({ submissionId, documentType, payload });
  };

  return { data, loading, isSuccess, isError, error, onUpdateDocument };
};
