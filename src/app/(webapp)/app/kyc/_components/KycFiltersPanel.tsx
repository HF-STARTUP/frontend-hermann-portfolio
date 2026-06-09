"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Calendar, ChevronDown, Search, User } from "lucide-react";
import { KycOwnerTypeMap, KycStatusMap } from "../utils";
import { GetKycSubmissionsParams } from "@/types/admin/kyc.type";
import { KycOwnerType, KycStatus } from "@/types/admin/kyc.type";
import { cn } from "@/lib/utils";

interface KycFiltersPanelProps {
  filters: GetKycSubmissionsParams;
  onFilterChange: <K extends keyof GetKycSubmissionsParams>(
    key: K,
    value: GetKycSubmissionsParams[K],
  ) => void;
}

const filterTriggerClass =
  "h-auto px-3 py-2.5 bg-white rounded-[10px] border border-gray-200 inline-flex items-center gap-2 shadow-none focus:ring-0 w-auto [&>svg:last-child]:hidden";

export function KycFiltersPanel({
  filters,
  onFilterChange,
}: KycFiltersPanelProps) {
  const ownerLabel =
    filters.owner_type && filters.owner_type !== "all"
      ? KycOwnerTypeMap[filters.owner_type as KycOwnerType]
      : "Tous";

  const statusLabel =
    filters.status && filters.status !== "all"
      ? KycStatusMap[filters.status as KycStatus]
      : "Tous";

  return (
    <div className="px-5 pt-7 pb-4 bg-white rounded-2xl shadow-[0_4px_7px_0_rgba(0,0,0,0.10)] flex flex-col gap-3.5">
      <div className="flex items-center gap-2.5 px-4 py-3 bg-white rounded-[10px] border border-gray-200">
        <Search className="size-4 text-gray-400 shrink-0" />
        <input
          type="search"
          placeholder="Rechercher par nom, email, téléphone ou ID client…"
          value={filters.search ?? ""}
          onChange={(e) => onFilterChange("search", e.target.value)}
          className="flex-1 text-sm text-neutral-950 placeholder:text-neutral-500 bg-transparent outline-none min-w-0"
        />
      </div>

      <div className="flex flex-wrap items-start gap-2.5">
        <Select
          value={filters.owner_type ?? "all"}
          onValueChange={(value) =>
            onFilterChange("owner_type", value as KycOwnerType | "all")
          }
        >
          <SelectTrigger className={filterTriggerClass}>
            <User className="size-3.5 text-gray-400 shrink-0" />
            <span className="text-sm font-medium text-gray-600">Profil :</span>
            <span className="text-sm font-semibold text-gray-600">{ownerLabel}</span>
            <ChevronDown className="size-3.5 text-gray-400 shrink-0 ml-1" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            {Object.entries(KycOwnerTypeMap).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.status ?? "all"}
          onValueChange={(value) =>
            onFilterChange("status", value as KycStatus | "all")
          }
        >
          <SelectTrigger className={filterTriggerClass}>
            <User className="size-3.5 text-gray-400 shrink-0" />
            <span className="text-sm font-medium text-gray-600">Statut KYC :</span>
            <span className="text-sm font-semibold text-gray-600">{statusLabel}</span>
            <ChevronDown className="size-3.5 text-gray-400 shrink-0 ml-1" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            {Object.entries(KycStatusMap).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <button
          type="button"
          className={cn(filterTriggerClass, "opacity-60 cursor-not-allowed")}
          disabled
        >
          <Calendar className="size-4 text-gray-400" />
          <span className="text-sm text-gray-600">Date de soumission</span>
          <ChevronDown className="size-3.5 text-gray-400 shrink-0 ml-1" />
        </button>

        <button
          type="button"
          className={cn(filterTriggerClass, "opacity-60 cursor-not-allowed")}
          disabled
        >
          <Calendar className="size-4 text-gray-400" />
          <span className="text-sm text-gray-600">Date d&apos;inscription</span>
          <ChevronDown className="size-3.5 text-gray-400 shrink-0 ml-1" />
        </button>
      </div>
    </div>
  );
}
