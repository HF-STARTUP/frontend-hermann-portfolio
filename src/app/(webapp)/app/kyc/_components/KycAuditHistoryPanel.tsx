"use client";

import { KycAuditEventModel } from "@/model/ADMIN/KycSubmissionDetail";
import { cn } from "@/lib/utils";
import {
  Check,
  FileText,
  History,
  Loader2,
  Sparkles,
  Upload,
  User,
  X,
} from "lucide-react";
import { EmptyData } from "@/components/box/PageNetworkState";
import { KycTableErrorState } from "./KycTableStates";

const variantStyles = {
  success: {
    iconBg: "bg-lime-50",
    iconColor: "text-emerald-600",
    commentBg: "bg-violet-50",
    commentBorder: "border-emerald-600",
    commentText: "text-emerald-600",
    Icon: Check,
  },
  rejected: {
    iconBg: "bg-red-50",
    iconColor: "text-red-600",
    commentBg: "bg-red-50",
    commentBorder: "border-red-600",
    commentText: "text-red-600",
    Icon: X,
  },
  review: {
    iconBg: "bg-blue-100",
    iconColor: "text-blue-800",
    commentBg: "bg-violet-50",
    commentBorder: "border-blue-800",
    commentText: "text-blue-800",
    Icon: FileText,
  },
  upload: {
    iconBg: "bg-gray-100",
    iconColor: "text-gray-400",
    commentBg: "bg-gray-50",
    commentBorder: "border-gray-400",
    commentText: "text-gray-600",
    Icon: Upload,
  },
  init: {
    iconBg: "bg-gray-100",
    iconColor: "text-gray-400",
    commentBg: "bg-gray-50",
    commentBorder: "border-gray-400",
    commentText: "text-gray-600",
    Icon: Sparkles,
  },
} as const;

function KycAuditTimelineItem({
  event,
  isLast,
}: {
  event: KycAuditEventModel;
  isLast: boolean;
}) {
  const style = variantStyles[event.timelineVariant];
  const Icon = style.Icon;

  return (
    <div className="flex items-start gap-4 w-full">
      <div className="flex flex-col items-center self-stretch">
        <div
          className={cn(
            "size-9 rounded-2xl flex items-center justify-center shrink-0",
            style.iconBg,
          )}
        >
          <Icon className={cn("size-4", style.iconColor)} />
        </div>
        {!isLast && (
          <div className="w-0.5 flex-1 min-h-6 py-1 flex flex-col">
            <div className="w-0.5 flex-1 min-h-4 bg-gray-200" />
          </div>
        )}
      </div>

      <div className="flex-1 pb-6 flex flex-col gap-0.5 min-w-0">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-base font-semibold text-neutral-950 leading-5">
            {event.action}
          </p>
          {event.createdAtTimeline && (
            <p className="text-xs text-gray-400 leading-4 whitespace-nowrap shrink-0">
              {event.createdAtTimeline}
            </p>
          )}
        </div>

        {event.actorLabel && (
          <div className="flex items-center gap-1.5 pt-0.5">
            <User className="size-3 text-gray-600 shrink-0" />
            <p className="text-sm text-gray-600 leading-5">{event.actorLabel}</p>
          </div>
        )}

        {event.documentLabel && !event.comment && (
          <p className="text-sm text-gray-500 leading-5 pt-0.5">
            {event.documentLabel}
          </p>
        )}

        {event.comment && (
          <div
            className={cn(
              "px-3 py-2 rounded-tr-lg rounded-br-lg border-l-2 mt-2",
              style.commentBg,
              style.commentBorder,
            )}
          >
            <p className={cn("text-sm leading-5", style.commentText)}>
              {event.comment}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

interface KycAuditHistoryPanelProps {
  events?: KycAuditEventModel[];
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
}

export function KycAuditHistoryPanel({
  events,
  isLoading,
  isError,
  onRetry,
}: KycAuditHistoryPanelProps) {
  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_7px_0_rgba(0,0,0,0.10)] px-6 pt-8 pb-6 flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <History className="size-4 text-slate-500" />
        <h2 className="text-xl font-semibold text-neutral-950 leading-6">
          Historique d&apos;audit
        </h2>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-[280px]">
          <Loader2 className="size-6 animate-spin text-blue-800" />
        </div>
      ) : isError ? (
        <KycTableErrorState onRetry={onRetry} />
      ) : !events || events.length === 0 ? (
        <EmptyData
          message="Aucun historique"
          description="Aucune action d'audit enregistrée pour ce dossier."
          className="h-[280px]"
        />
      ) : (
        <div className="pl-1 flex flex-col">
          {events.map((event, index) => (
            <KycAuditTimelineItem
              key={`${event.type}-${event.createdAtTimeline}-${index}`}
              event={event}
              isLast={index === events.length - 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
