"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";

export type KycKpiHintVariant = "up" | "down" | "neutral";

export interface KycKpiCardProps {
  icon: ReactNode;
  title: string;
  value: string | number;
  iconClassName: string;
  hint?: string;
  hintVariant?: KycKpiHintVariant;
}

export function KycKpiCard({
  icon,
  title,
  value,
  iconClassName,
  hint,
  hintVariant = "up",
}: KycKpiCardProps) {
  const hintColor =
    hintVariant === "down"
      ? "text-red-600"
      : hintVariant === "neutral"
        ? "text-emerald-600"
        : "text-emerald-600";

  return (
    <div className="px-5 pt-5 pb-6 bg-white rounded-2xl shadow-[0_4px_7px_0_rgba(0,0,0,0.10)] flex flex-col gap-1">
      <div
        className={cn(
          "size-10 rounded-xl inline-flex items-center justify-center",
          iconClassName,
        )}
      >
        {icon}
      </div>
      <p className="pt-2.5 text-sm font-normal text-gray-600 leading-5">
        {title}
      </p>
      <p className="text-3xl font-bold text-neutral-950 leading-8">{value}</p>
      {hint && (
        <div className={cn("pt-1.5 inline-flex items-center gap-1.5", hintColor)}>
          {hintVariant === "down" ? (
            <TrendingDown className="size-3.5" />
          ) : (
            <TrendingUp className="size-3.5" />
          )}
          <span className="text-xs font-normal leading-4">{hint}</span>
        </div>
      )}
    </div>
  );
}

export function KycKpiShimmerGrid({ count = 5 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 w-full">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="px-5 pt-5 pb-6 bg-white rounded-2xl shadow-[0_4px_7px_0_rgba(0,0,0,0.10)] animate-pulse"
        >
          <div className="size-10 bg-gray-200 rounded-xl" />
          <div className="h-4 w-24 bg-gray-200 rounded mt-4" />
          <div className="h-8 w-12 bg-gray-200 rounded mt-2" />
          <div className="h-4 w-20 bg-gray-100 rounded mt-3" />
        </div>
      ))}
    </div>
  );
}
