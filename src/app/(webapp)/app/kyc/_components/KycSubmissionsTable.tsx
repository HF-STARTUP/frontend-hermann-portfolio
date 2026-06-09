"use client";

import { cn } from "@/lib/utils";
import KycSubmissionModel from "@/model/ADMIN/KycSubmission";
import { PaginationProps, RowAction } from "@/components/display/CustomTableDisplay";
import { KycStatusBadge } from "./KycStatusBadge";
import { KycOwnerTypeMap } from "../utils";
import {
  Building2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  FileText,
  Loader2,
  MoreVertical,
  User,
  XCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ReactNode } from "react";
import { formatPhoneNumber } from "@/utils/func/formatPhoneNumber";

const GRID_COLS =
  "grid-cols-[minmax(220px,1.6fr)_minmax(120px,1fr)_minmax(150px,1fr)_minmax(100px,0.8fr)_minmax(130px,0.9fr)_minmax(120px,0.9fr)_minmax(70px,0.5fr)_minmax(170px,1.2fr)_minmax(90px,0.6fr)]";

function TableCompletenessBar({ value }: { value: number }) {
  const clamped = Math.min(Math.max(value, 0), 100);
  const barColor =
    clamped >= 100
      ? "bg-emerald-600"
      : clamped >= 70
        ? "bg-blue-800"
        : "bg-yellow-600";
  const textColor =
    clamped >= 100
      ? "text-emerald-600"
      : clamped >= 70
        ? "text-blue-800"
        : "text-yellow-600";

  return (
    <div className="inline-flex items-center gap-2">
      <div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full", barColor)}
          style={{ width: `${clamped}%` }}
        />
      </div>
      <span className={cn("text-xs font-semibold leading-3", textColor)}>
        {clamped}%
      </span>
    </div>
  );
}

function ProfileBadge({ item }: { item: KycSubmissionModel }) {
  const isPro = item.ownerType === "professionnel";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold whitespace-nowrap",
        isPro ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-600",
      )}
    >
      {isPro ? (
        <Building2 className="size-3.5" />
      ) : (
        <User className="size-3.5" />
      )}
      {item.ownerType ? KycOwnerTypeMap[item.ownerType] : item.ownerTypeLabel}
    </span>
  );
}

function DocsBadge({ count }: { count: number }) {
  return (
    <div className="inline-flex items-center gap-1.5 h-7 px-2 bg-violet-50 rounded-full min-w-[44px] justify-center">
      <FileText className="size-3.5 text-gray-600" />
      <span className="text-sm font-semibold text-gray-600">{count}</span>
    </div>
  );
}

function ActionMenuItem({
  label,
  icon,
  onClick,
  variant = "default",
}: {
  label: string;
  icon: ReactNode;
  onClick: () => void;
  variant?: "default" | "success" | "destructive";
}) {
  const colorClass =
    variant === "success"
      ? "text-emerald-600 focus:text-emerald-600"
      : variant === "destructive"
        ? "text-red-600 focus:text-red-600"
        : "text-zinc-500 focus:text-zinc-500";

  return (
    <DropdownMenuItem
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={cn(
        "min-w-36 px-2.5 py-1.5 rounded-lg flex items-center gap-2.5 cursor-pointer text-xs font-normal leading-5 focus:bg-gray-50",
        colorClass,
      )}
    >
      <span className="shrink-0 [&_svg]:size-3">{icon}</span>
      {label}
    </DropdownMenuItem>
  );
}

function RowActions({
  item,
  getActions,
}: {
  item: KycSubmissionModel;
  getActions: (item: KycSubmissionModel) => RowAction<KycSubmissionModel>[];
}) {
  const actions = getActions(item);
  const primaryActions = actions.filter((a) =>
    ["view", "download"].includes(a.id),
  );
  const moderateActions = actions.filter((a) =>
    ["approve", "reject"].includes(a.id),
  );

  const getVariant = (id: string): "default" | "success" | "destructive" => {
    if (id === "approve") return "success";
    if (id === "reject") return "destructive";
    return "default";
  };

  const getIcon = (id: string, fallback: ReactNode) => {
    switch (id) {
      case "view":
        return <Eye className="size-3" />;
      case "download":
        return <Download className="size-3" />;
      case "approve":
        return <CheckCircle2 className="size-3" />;
      case "reject":
        return <XCircle className="size-3" />;
      default:
        return fallback;
    }
  };

  const viewAction = actions.find((a) => a.id === "view");

  return (
    <div
      className="inline-flex items-center gap-0.5"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"
        onClick={() => viewAction?.onClick(item)}
        aria-label="Voir le détail"
      >
        <Eye className="size-4" />
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 hover:bg-gray-100 text-gray-400 rounded-lg"
            aria-label="Actions"
          >
            <MoreVertical className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="p-2 bg-white rounded-xl shadow-[0px_4px_40px_0px_rgba(0,0,0,0.10)] border border-gray-200 w-36"
        >
          <div className="flex flex-col gap-1.5">
            {primaryActions.map((action) => (
              <ActionMenuItem
                key={action.id}
                label={action.label}
                icon={getIcon(action.id, action.icon)}
                onClick={() => action.onClick(item)}
              />
            ))}

            {moderateActions.length > 0 && (
              <div className="h-px bg-gray-100 my-0.5" />
            )}

            {moderateActions.map((action) => (
              <ActionMenuItem
                key={action.id}
                label={action.label}
                icon={getIcon(action.id, action.icon)}
                onClick={() => action.onClick(item)}
                variant={getVariant(action.id)}
              />
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function TableRow({
  item,
  rowActions,
  onRowClick,
  isLoading,
}: {
  item: KycSubmissionModel;
  rowActions: (item: KycSubmissionModel) => RowAction<KycSubmissionModel>[];
  onRowClick?: (item: KycSubmissionModel) => void;
  isLoading?: boolean;
}) {
  return (
    <div
      role={onRowClick ? "button" : undefined}
      tabIndex={onRowClick && !isLoading ? 0 : undefined}
      onKeyDown={
        onRowClick && !isLoading
          ? (e) => e.key === "Enter" && onRowClick(item)
          : undefined
      }
      onClick={onRowClick && !isLoading ? () => onRowClick(item) : undefined}
      className={cn(
        "grid items-center border-b border-gray-100 relative transition-colors",
        GRID_COLS,
        isLoading
          ? "opacity-70 pointer-events-none bg-blue-50/30"
          : onRowClick
            ? "cursor-pointer hover:bg-gray-50/80"
            : "",
      )}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-10 col-span-full">
          <Loader2 className="size-5 animate-spin text-blue-800" />
        </div>
      )}

      <div className="pl-4 pr-3.5 py-3 flex items-center gap-2.5 min-w-0">
        {item.avatarUrl ? (
          <img
            src={item.avatarUrl}
            alt={item.clientName}
            className="size-9 rounded-2xl object-cover shrink-0 shadow-sm"
          />
        ) : (
          <div
            className={cn(
              "size-9 rounded-2xl flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-sm",
              item.ownerType === "professionnel"
                ? "bg-sky-500"
                : "bg-gradient-to-b from-amber-400 to-amber-500",
            )}
          >
            {item.initials}
          </div>
        )}
        <div className="min-w-0">
          <p className="text-sm font-semibold text-neutral-950 leading-4 truncate">
            {item.clientName}
          </p>
          <p className="text-xs text-gray-400 leading-4 truncate">{item.email}</p>
        </div>
      </div>

      <div className="px-3.5 py-4">
        <ProfileBadge item={item} />
      </div>

      <div className="px-3.5 py-5 text-sm text-gray-600 leading-5 whitespace-nowrap">
        {formatPhoneNumber(item.phone)}
      </div>

      <div className="px-3.5 py-5 text-sm text-gray-600 leading-5">
        {item.submittedAt}
      </div>

      <div className="px-3.5 py-6">
        <TableCompletenessBar value={item.completeness} />
      </div>

      <div className="px-3.5 py-4">
        <KycStatusBadge status={item.status} />
      </div>

      <div className="px-3.5 py-4 flex justify-center">
        <DocsBadge count={item.documentsCount} />
      </div>

      <div className="px-3.5 py-5 text-sm text-gray-600 leading-5 whitespace-nowrap">
        {item.updatedAt}
      </div>

      <div className="px-3.5 py-3.5">
        <RowActions item={item} getActions={rowActions} />
      </div>
    </div>
  );
}

function KycTablePagination({ pagination }: { pagination: PaginationProps }) {
  const {
    currentPage,
    totalPages,
    onPageChange,
    totalEntries,
    pageSize,
    onPageSizeChange,
  } = pagination;

  const startEntry = totalEntries === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endEntry = Math.min(currentPage * pageSize, totalEntries);

  const pages: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pages.push(i);
    }
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-1 pt-4 pb-1">
      <p className="text-sm text-gray-400 leading-5">
        Affichage de {startEntry} à {endEntry} sur {totalEntries} entrées
      </p>

      <div className="flex items-center gap-1">
        <button
          type="button"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="size-8 flex items-center justify-center rounded-lg disabled:opacity-30 hover:bg-gray-100 transition-colors"
          aria-label="Page précédente"
        >
          <ChevronLeft className="size-4 text-gray-400" />
        </button>

        {pages.map((page) => (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={cn(
              "min-w-8 h-8 px-3.5 rounded-lg text-sm leading-5 transition-colors",
              currentPage === page
                ? "bg-blue-800 text-white"
                : "text-gray-600 hover:bg-gray-100",
            )}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="size-8 flex items-center justify-center rounded-lg disabled:opacity-30 hover:bg-gray-100 transition-colors"
          aria-label="Page suivante"
        >
          <ChevronRight className="size-4 text-gray-400" />
        </button>
      </div>

      <Select
        value={pageSize.toString()}
        onValueChange={(value) => onPageSizeChange(Number(value))}
      >
        <SelectTrigger className="h-auto border-0 bg-transparent shadow-none p-0 text-sm text-gray-400 focus:ring-0 w-auto gap-1">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {[10, 20, 50, 100].map((size) => (
            <SelectItem key={size} value={size.toString()}>
              {size} / page
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

const HEADERS = [
  "Client",
  "Profil",
  "Téléphone",
  "Soumission",
  "Complétude",
  "Statut KYC",
  "Docs",
  "Mise à jour",
  "",
];

function TableShimmer({ rows = 5 }: { rows?: number }) {
  return (
    <div className="flex flex-col animate-pulse">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className={cn("grid items-center border-b border-gray-100 py-4", GRID_COLS)}
        >
          {Array.from({ length: 9 }).map((__, j) => (
            <div key={j} className="px-3.5">
              <div className="h-4 bg-gray-200 rounded w-full max-w-[120px]" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

interface KycSubmissionsTableProps {
  submissions: KycSubmissionModel[];
  pagination: PaginationProps;
  rowActions: (item: KycSubmissionModel) => RowAction<KycSubmissionModel>[];
  onRowClick?: (item: KycSubmissionModel) => void;
  loadingRowId?: string | null;
  isLoading?: boolean;
  emptyContent?: ReactNode;
}

export function KycSubmissionsTable({
  submissions,
  pagination,
  rowActions,
  onRowClick,
  loadingRowId,
  isLoading,
  emptyContent,
}: KycSubmissionsTableProps) {
  return (
    <div className="px-5 pt-7 pb-4 bg-white rounded-2xl shadow-[0_4px_7px_0_rgba(0,0,0,0.10)] flex flex-col">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-neutral-950 leading-6">
          Soumissions KYC
        </h2>
        <p className="text-sm text-gray-400 leading-5 mt-1">
          {pagination.totalEntries} client
          {pagination.totalEntries > 1 ? "s" : ""}
        </p>
      </div>

      <div className="overflow-x-auto custom-scrollbar min-w-0">
        <div className="min-w-[1150px]">
          <div
            className={cn(
              "grid bg-blue-950 text-white text-xs font-semibold tracking-tight leading-3",
              GRID_COLS,
            )}
          >
            {HEADERS.map((header, index) => (
              <div
                key={header || "actions"}
                className={cn(
                  "px-3.5 py-3",
                  index === 0 && "pl-4 rounded-tl-[10px]",
                  index === HEADERS.length - 1 && "rounded-tr-[10px]",
                  header === "Docs" && "text-center",
                )}
              >
                {header}
              </div>
            ))}
          </div>

          {isLoading ? (
            <TableShimmer rows={pagination.pageSize} />
          ) : submissions.length === 0 && emptyContent ? (
            <div className="py-8">{emptyContent}</div>
          ) : (
            submissions.map((item) => (
              <TableRow
                key={item.kycId}
                item={item}
                rowActions={rowActions}
                onRowClick={onRowClick}
                isLoading={loadingRowId === item.kycId}
              />
            ))
          )}
        </div>
      </div>

      {!isLoading && submissions.length > 0 && (
        <KycTablePagination pagination={pagination} />
      )}
    </div>
  );
}
