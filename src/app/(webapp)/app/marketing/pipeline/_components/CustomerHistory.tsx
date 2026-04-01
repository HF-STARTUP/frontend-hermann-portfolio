import { EmptyData } from "@/components/box/PageNetworkState";
import React from "react";
import { HistoryItem } from "../_hooks/useHistoryHook";

export function HistoryRow({ item }: { item: HistoryItem }) {
    return (
        <div className="relative flex flex-col gap-2 w-full border-l px-6 pb-4 border-vaGray/20">
            <p className="text-vaTextPrimary font-semibold text-sm">{item.title}</p>
            <p className="text-vaLightGray text-xs"> {item.userName}:  {item?.dateTime}</p>

            <div className="absolute size-7 rounded-full bg-vaDarkBlue flex items-center justify-center -left-[15px] top-0">
                <div className="size-3 bg-vaMainBlue rounded-full" />
            </div>

            <p className="text-sm text-vaTextPrimary">
                {item.desc}
            </p>
        </div>
    );
}

export function HistoryShimmer() {
    return (
        <div className="flex flex-col gap-2 w-full p-4">
            {[...Array(3)].map((_, index) => (
                <div key={index} className="relative flex flex-col gap-2 w-full border-l px-6 pb-4 border-gray-100">
                    <div className="w-1/2 h-4 bg-gray-100 animate-pulse rounded" />
                    <div className="w-1/3 h-3 bg-gray-100 animate-pulse rounded" />
                    <div className="absolute size-7 rounded-full bg-gray-100 animate-pulse -left-[15px] top-0" />
                    <div className="w-full h-3 bg-gray-100 animate-pulse rounded" />
                </div>
            ))}
        </div>
    );
}

interface HistoryListProps {
    isLoading: boolean;
    items: HistoryItem[];
    // setSentinelRef: (node: HTMLDivElement | null) => void;
    // isFetching: boolean;
    page?: number;
  }

  export default function HistoryList({
    isLoading,
    items,
    // setSentinelRef,
    // isFetching,
    page
  }: HistoryListProps) {
    if (isLoading && items.length === 0) {
      return <HistoryShimmer />;
    }

    if (!isLoading && items.length === 0) {
      return <EmptyData message="Aucun evenement n'a ete trouve" />;
    }
  
    return (
      <div className="flex flex-col p-4 w-full">
        <div className="flex flex-col">
          {items.map((item, index) => (
            <HistoryRow item={item} key={index} />
          ))}
        </div>
  
        {/* {isFetching && (
          <div className="mt-4">
            <HistoryShimmer />
          </div>
        )}
        
        <div ref={setSentinelRef} className="h-1 w-full" /> */}
      </div>
    );
  }