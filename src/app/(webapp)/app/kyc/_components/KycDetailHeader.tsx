"use client";

import { ReactNode } from "react";
import { KycSubmissionDetailModel } from "@/model/ADMIN/KycSubmissionDetail";
import { CompletionRing } from "./CompletionRing";
import { KycDetailStatusBadge } from "./KycDetailStatusBadge";
import { KycOwnerTypeMap } from "../utils";
import { Button } from "@/components/ui/button";
import {
  Ban,
  Building2,
  Calendar,
  CheckCircle2,
  Globe,
  Mail,
  Phone,
  Store,
  User,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPhoneNumber } from "@/utils/func/formatPhoneNumber";

interface KycDetailHeaderProps {
  detail: KycSubmissionDetailModel;
  onApprove: () => void;
  onReject: () => void;
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 min-h-9">
      <div className="size-9 bg-violet-50 rounded-[10px] flex items-center justify-center shrink-0 text-slate-500">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs text-gray-400 leading-4">{label}</p>
        <p className="text-sm font-semibold text-neutral-950 leading-4 truncate">
          {value}
        </p>
      </div>
    </div>
  );
}

export function KycDetailHeader({
  detail,
  onApprove,
  onReject,
}: KycDetailHeaderProps) {
  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_7px_0_rgba(0,0,0,0.10)] px-6 pt-6 pb-8 flex flex-col gap-5">
      <div className="flex items-start gap-4">
        {detail.photoUrl ? (
          <img
            src={detail.photoUrl}
            alt={detail.clientName}
            className="size-16 rounded-full object-cover shrink-0 shadow-md"
          />
        ) : (
          <div className="size-16 rounded-full bg-gradient-to-b from-amber-400 to-amber-500 flex items-center justify-center text-white text-2xl font-bold shrink-0 shadow-md">
            {detail.initials}
          </div>
        )}

        <div className="flex-1 min-w-0 space-y-2">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl font-bold text-neutral-950 leading-7">
              {detail.clientName}
            </h1>
            <KycDetailStatusBadge status={detail.status} />
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 rounded-md text-xs font-semibold text-gray-600">
            {detail.isProfessional ? (
              <Building2 className="size-3.5" />
            ) : (
              <User className="size-3.5" />
            )}
            {KycOwnerTypeMap[detail.ownerType]}
          </span>
        </div>

        <div className="flex flex-col items-center gap-1.5 shrink-0">
          <CompletionRing value={detail.completionPercent} />
          <span className="text-xs text-gray-400">Dossier complété</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="py-5 border-y border-gray-100 grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-4">
          <InfoRow
            icon={<Globe className="size-4" />}
            label="Pays"
            value={detail.country}
          />
          <InfoRow
            icon={<Mail className="size-4" />}
            label="Email"
            value={detail.email}
          />
          <InfoRow
            icon={<Phone className="size-4" />}
            label="Téléphone"
            value={formatPhoneNumber(detail.phone)}
          />
          <InfoRow
            icon={<Calendar className="size-4" />}
            label="Inscrit le"
            value={detail.registeredAt}
          />
        </div>

        {detail.isProfessional && (
          <div className="pb-5 border-b border-gray-100 grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-4">
            <InfoRow
              icon={<Store className="size-4" />}
              label="Registre de Commerce"
              value={detail.rccmNumber}
            />
            <InfoRow
              icon={<Wallet className="size-4" />}
              label="Numéro de contribuable"
              value={detail.ncc}
            />
          </div>
        )}
      </div>

      <div className="flex items-center justify-end gap-3">
        <Button
          variant="outline"
          className="rounded-xl border-red-600 text-red-600 hover:bg-red-50 gap-2 h-11 px-5"
          onClick={onReject}
          disabled={detail.isReviewFinalized}>
          <Ban className="size-4" />
          Rejeter le KYC
        </Button>
        <Button
          className="rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white gap-2 h-11 px-5"
          onClick={onApprove}
          disabled={detail.isReviewFinalized}>
          <CheckCircle2 className="size-4" />
          Approuver le KYC
        </Button>
      </div>
    </div>
  );
}
