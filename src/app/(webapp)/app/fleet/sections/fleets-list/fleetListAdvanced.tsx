"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { FleetModel } from "@/model/ADMIN/fleet";
import { DataTable } from "@/components/ui/DataTable";
import { DataTableActions } from "@/components/ui/DataTableActions";
import { fleetColumns, calculateFleetFooterData } from "./fleetColumns";
import { Download, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FleetListAdvancedProps {
    fleets: FleetModel[];
    isLoading?: boolean;
    onRefresh?: () => void;
}

/**
 * Version avancée du listing des flottes avec fonctionnalités supplémentaires
 * 
 * Fonctionnalités:
 * - Recherche globale
 * - Export CSV/Excel
 * - Actualisation des données
 * - Tri avancé
 * - Footer avec totaux dynamiques
 */
export const FleetListAdvanced: React.FC<FleetListAdvancedProps> = ({ 
    fleets,
    isLoading = false,
    onRefresh 
}) => {
    const router = useRouter();
    const [searchValue, setSearchValue] = useState("");

    // Filtrer les flottes selon la recherche
    const filteredFleets = useMemo(() => {
        if (!searchValue) return fleets;
        
        const search = searchValue.toLowerCase();
        return fleets.filter(fleet => 
            fleet.name.toLowerCase().includes(search) ||
            fleet.ownerName.toLowerCase().includes(search) ||
            fleet.city.toLowerCase().includes(search) ||
            fleet.suscription_name.toLowerCase().includes(search)
        );
    }, [fleets, searchValue]);

    // Calculer le footer avec les données filtrées
    const footerData = useMemo(() => {
        return calculateFleetFooterData(filteredFleets);
    }, [filteredFleets]);

    // Handler pour la navigation
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

    // Export CSV
    const handleExportCSV = React.useCallback(() => {
        const headers = [
            "Nom de la flotte",
            "Propriétaire",
            "Ville",
            "Véhicules",
            "Chauffeurs",
            "Date d'ajout",
            "CA total",
            "Prix",
            "Abonnement",
            "Date d'exp",
            "Statut"
        ];

        const rows = filteredFleets.map(fleet => [
            fleet.name,
            fleet.ownerName,
            fleet.city,
            fleet.number_vehicle,
            fleet.driver_number,
            fleet.start_date || "-",
            fleet.ca_total,
            fleet.subscription_amount || 0,
            fleet.suscription_name,
            fleet.end_date || "-",
            fleet.abon_status
        ]);

        const csvContent = [
            headers.join(","),
            ...rows.map(row => row.join(","))
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        
        link.setAttribute("href", url);
        link.setAttribute("download", `flottes_${new Date().toISOString()}.csv`);
        link.style.visibility = "hidden";
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, [filteredFleets]);

    // Export Excel (JSON pour import dans Excel)
    const handleExportExcel = React.useCallback(() => {
        const data = filteredFleets.map(fleet => ({
            "Nom de la flotte": fleet.name,
            "Propriétaire": fleet.ownerName,
            "Ville": fleet.city,
            "Véhicules": fleet.number_vehicle,
            "Chauffeurs": fleet.driver_number,
            "Date d'ajout": fleet.start_date || "-",
            "CA total": fleet.ca_total,
            "Prix": fleet.subscription_amount || 0,
            "Abonnement": fleet.suscription_name,
            "Date d'exp": fleet.end_date || "-",
            "Statut": fleet.abon_status
        }));

        const jsonContent = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonContent], { type: "application/json" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        
        link.setAttribute("href", url);
        link.setAttribute("download", `flottes_${new Date().toISOString()}.json`);
        link.style.visibility = "hidden";
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }, [filteredFleets]);

    return (
        <div className="flex gap-[30px] flex-wrap flex-col">
            {/* Actions du tableau */}
            <DataTableActions
                searchValue={searchValue}
                onSearchChange={setSearchValue}
                onRefresh={onRefresh}
                showSearch={true}
                showRefresh={!!onRefresh}
                showExport={false}
            >
                {/* Boutons d'export personnalisés */}
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleExportCSV}
                    className="gap-2"
                >
                    <Download className="h-4 w-4" />
                    CSV
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleExportExcel}
                    className="gap-2"
                >
                    <FileSpreadsheet className="h-4 w-4" />
                    Excel
                </Button>
            </DataTableActions>

            {/* Informations sur les résultats */}
            <div className="text-sm text-gray-600">
                {searchValue && (
                    <span>
                        {filteredFleets.length} résultat(s) trouvé(s) sur {fleets.length} au total
                    </span>
                )}
            </div>

            {/* Tableau des flottes */}
            <DataTable
                columns={fleetColumns}
                data={filteredFleets}
                isLoading={isLoading}
                onRowClick={handleRowClick}
                getRowClassName={getRowClassName}
                enableSorting={true}
                enablePagination={false}
                showFooter={true}
                footerData={footerData}
                variant="v2"
                emptyMessage={
                    searchValue 
                        ? "Aucune flotte ne correspond à votre recherche" 
                        : "Aucune flotte disponible"
                }
            />
        </div>
    );
};

export default FleetListAdvanced;

