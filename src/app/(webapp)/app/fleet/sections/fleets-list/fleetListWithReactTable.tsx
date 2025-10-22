"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { FleetModel } from "@/model/ADMIN/fleet";
import { DataTable } from "@/components/ui/DataTable";
import { fleetColumns, calculateFleetFooterData } from "./fleetColumns";

interface FleetListReactTableProps {
    fleets: FleetModel[];
    isLoading: boolean;
    // Props pour la pagination côté serveur
    pageIndex?: number;
    pageSize?: number;
    totalPages?: number;
    totalRecords?: number;
    onPageChange?: (page: number) => void;
    onPageSizeChange?: (pageSize: number) => void;
}

/**
 * Composant optimisé pour afficher la liste des flottes avec React Table
 * 
 * Optimisations:
 * - Utilisation de useMemo pour éviter les recalculs inutiles
 * - Colonnes mémorisées pour éviter les re-renders
 * - Footer calculé uniquement quand les données changent
 * - Navigation performante avec Next.js router
 * - Pagination côté serveur pour de meilleures performances avec de grandes quantités de données
 */
export const FleetListReactTable: React.FC<FleetListReactTableProps> = ({ 
    fleets, 
    isLoading,
    pageIndex = 0,
    pageSize = 10,
    totalPages = 1,
    totalRecords = 0,
    onPageChange,
    onPageSizeChange
}) => {
    const router = useRouter();

    // Mémoiser les données du footer pour éviter les recalculs
    const footerData = useMemo(() => {
        return calculateFleetFooterData(fleets);
    }, [fleets]);

    // Handler pour la navigation vers le détail d'une flotte
    const handleRowClick = React.useCallback(
        (fleet: FleetModel) => {
            router.push(`/app/fleet/${fleet.id}/dashboard`);
        },
        [router]
    );

    // Fonction pour déterminer le style de la ligne selon l'état de l'abonnement
    const getRowClassName = React.useCallback(
        (fleet: FleetModel) => {
            if (!fleet.hasActiveSubscription) {
                return "bg-gray-100 hover:bg-gray-200 opacity-60";
            }
            return "";
        },
        []
    );

    return (
        <DataTable
                isLoading={isLoading}
                columns={fleetColumns}
                data={fleets}
                onRowClick={handleRowClick}
                getRowClassName={getRowClassName}
                enableSorting={true}
                enablePagination={true}
                showFooter={true}
                footerData={footerData}
                variant="v2"
                emptyMessage="Aucune flotte disponible"
                // Configuration de la pagination côté serveur
                manualPagination={true}
                pageIndex={pageIndex}
                pageSize={pageSize}
                totalPages={totalPages}
                totalRecords={totalRecords}
                onPageChange={onPageChange}
                onPageSizeChange={onPageSizeChange}
                pageSizeOptions={[5, 10, 20, 50, 100]}
            />
    );
};

export default FleetListReactTable;

