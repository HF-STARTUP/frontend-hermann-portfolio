import { EmptyData } from "@/components/box/PageNetworkState";
import FleetJournalModel from "@/model/ADMIN/FleetJournalModel";
import React from "react";

export function JournalRow({ item }: { item: FleetJournalModel }) {
    return (
        <div className="relative flex flex-col gap-2 w-full border-l px-6 pb-2 border-vaGray/20">
            <p className="text-vaTextPrimary font-semibold text-sm">{item.title}</p>
            <p className="text-vaLightGray text-xs">{item?.createdAt}</p>

            <div className="absolute size-7 rounded-full bg-vaDarkGreen flex items-center justify-center -left-[15px] top-0">
                <div className="size-3 bg-vaLightGreen rounded-full" />
            </div>

            <p className="text-sm text-vaTextPrimary">
                {item.description}
            </p>
        </div>
    );
}

export function JournalShimmer() {
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

interface JournalListProps {
    isLoading: boolean;
    items: FleetJournalModel[];
    setSentinelRef: (node: HTMLDivElement | null) => void; // Type modifié
    isFetching: boolean;
    page?: number;
  }

  export default function JournalList({
    isLoading,
    items,
    setSentinelRef, // Maintenant c'est une callback
    isFetching,
    page
  }: JournalListProps) {
    if (isLoading && items.length === 0) {
      return <JournalShimmer />;
    }

    if (!isLoading && items.length === 0) {
      return <EmptyData message="Aucun evenement n'a ete trouve" />;
    }
  
    return (
      <div className="flex flex-col p-4 w-full">
        <div className="flex flex-col">
          {items.map((item, index) => (
            <JournalRow item={item} key={item.id || index} />
          ))}
        </div>
  
        {isFetching && (
          <div className="mt-4">
            <JournalShimmer />
          </div>
        )}
        
        {/* {page} */}
        
        <div ref={setSentinelRef} className="h-1 w-full" />
      </div>
    );
  }