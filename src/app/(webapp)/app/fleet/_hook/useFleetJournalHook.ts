import { useGetFleetJournal } from "@/hooks/admin/useFleetHook";
import FleetJournalModel from "@/model/ADMIN/FleetJournalModel";
import React from "react";

export default function useFleetJournalHook(fleetId?: string) {
    const [page, setPage] = React.useState(1);
    

    
    const { data: fleetJournalData, isLoading } = useGetFleetJournal(
        fleetId ?? "",
        page,
        10
    );

    return {
        journals: fleetJournalData?.journals,
        isLoadingFleetJournal: isLoading,
        page,
    };
}