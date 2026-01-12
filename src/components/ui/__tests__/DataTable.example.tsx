"use client";

import React from "react";
import { DataTable } from "@/components/ui/DataTable";
import { ColumnDef } from "@tanstack/react-table";

/**
 * Fichier d'exemple pour tester le composant DataTable
 * Peut être utilisé pour valider le fonctionnement
 */

// Type d'exemple
interface ExampleData {
    id: string;
    name: string;
    email: string;
    status: "active" | "inactive";
    amount: number;
}

// Données d'exemple
const exampleData: ExampleData[] = [
    { id: "1", name: "Jean Dupont", email: "jean@example.com", status: "active", amount: 1500 },
    { id: "2", name: "Marie Martin", email: "marie@example.com", status: "active", amount: 2300 },
    { id: "3", name: "Pierre Durant", email: "pierre@example.com", status: "inactive", amount: 800 },
    { id: "4", name: "Sophie Bernard", email: "sophie@example.com", status: "active", amount: 3200 },
    { id: "5", name: "Luc Petit", email: "luc@example.com", status: "inactive", amount: 1100 },
];

// Colonnes d'exemple
const exampleColumns: ColumnDef<ExampleData>[] = [
    {
        accessorKey: "name",
        header: "Nom",
        cell: ({ row }) => <div className="font-medium">{row.getValue("name")}</div>,
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => <div>{row.getValue("email")}</div>,
    },
    {
        accessorKey: "status",
        header: "Statut",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            return (
                <div
                    className={`px-3 py-1 rounded-sm inline-block ${
                        status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                    }`}
                >
                    {status === "active" ? "Actif" : "Inactif"}
                </div>
            );
        },
    },
    {
        accessorKey: "amount",
        header: "Montant",
        cell: ({ row }) => {
            const amount = row.getValue("amount") as number;
            return <div className="font-medium">{amount.toLocaleString()} FCFA</div>;
        },
    },
];

// Footer d'exemple
const exampleFooter = {
    name: "Total",
    email: "-",
    status: "-",
    amount: exampleData.reduce((sum, item) => sum + item.amount, 0).toLocaleString() + " FCFA",
};

/**
 * Exemple 1 : Tableau de base avec tri
 */
export const ExampleBasicTable = () => {
    return (
        <div className="p-8 space-y-4">
            <h2 className="text-2xl font-bold">Exemple 1 : Tableau de base</h2>
            <DataTable
                columns={exampleColumns}
                data={exampleData}
                enableSorting={true}
                variant="v2"
            />
        </div>
    );
};

/**
 * Exemple 2 : Tableau avec footer
 */
export const ExampleTableWithFooter = () => {
    return (
        <div className="p-8 space-y-4">
            <h2 className="text-2xl font-bold">Exemple 2 : Tableau avec footer</h2>
            <DataTable
                columns={exampleColumns}
                data={exampleData}
                enableSorting={true}
                showFooter={true}
                footerData={exampleFooter}
                variant="v2"
            />
        </div>
    );
};

/**
 * Exemple 3 : Tableau avec pagination
 */
export const ExampleTableWithPagination = () => {
    // Générer plus de données pour montrer la pagination
    const moreData = Array.from({ length: 25 }, (_, i) => ({
        id: `${i + 1}`,
        name: `Utilisateur ${i + 1}`,
        email: `user${i + 1}@example.com`,
        status: (i % 2 === 0 ? "active" : "inactive") as "active" | "inactive",
        amount: Math.floor(Math.random() * 5000) + 500,
    }));

    return (
        <div className="p-8 space-y-4">
            <h2 className="text-2xl font-bold">Exemple 3 : Tableau avec pagination</h2>
            <DataTable
                columns={exampleColumns}
                data={moreData}
                enableSorting={true}
                enablePagination={true}
                pageSize={10}
                variant="v2"
            />
        </div>
    );
};

/**
 * Exemple 4 : Tableau avec navigation au clic
 */
export const ExampleTableWithClick = () => {
    const handleRowClick = (row: ExampleData) => {
        alert(`Vous avez cliqué sur : ${row.name} (${row.email})`);
    };

    return (
        <div className="p-8 space-y-4">
            <h2 className="text-2xl font-bold">Exemple 4 : Tableau avec navigation</h2>
            <p className="text-gray-600">Cliquez sur une ligne pour voir l'effet</p>
            <DataTable
                columns={exampleColumns}
                data={exampleData}
                onRowClick={handleRowClick}
                enableSorting={true}
                variant="v2"
            />
        </div>
    );
};

/**
 * Composant principal pour afficher tous les exemples
 */
export const DataTableExamples = () => {
    return (
        <div className="space-y-12">
            <div className="p-8 bg-blue-50 rounded-lg">
                <h1 className="text-3xl font-bold mb-4">Exemples DataTable</h1>
                <p className="text-gray-700">
                    Cette page démontre les différentes utilisations du composant DataTable
                </p>
            </div>

            <ExampleBasicTable />
            <ExampleTableWithFooter />
            <ExampleTableWithPagination />
            <ExampleTableWithClick />
        </div>
    );
};

export default DataTableExamples;

