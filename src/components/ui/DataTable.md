# DataTable - Composant de tableau basé sur React Table

## Vue d'ensemble

Le composant `DataTable` est un tableau moderne et performant basé sur `@tanstack/react-table`. Il offre des fonctionnalités avancées tout en respectant le design système existant.

## Fonctionnalités

✅ **Tri multi-colonnes** - Triez vos données par plusieurs colonnes simultanément  
✅ **Pagination** - Gérez de grandes quantités de données efficacement  
✅ **Footer avec totaux** - Affichez des agrégations automatiques  
✅ **Navigation sur les lignes** - Cliquez sur une ligne pour naviguer  
✅ **Performance optimisée** - Mémoisation et rendu optimisé  
✅ **Styles cohérents** - Respecte la guideline du design existant  
✅ **TypeScript** - Typage complet pour une meilleure DX  

## Installation

Le package `@tanstack/react-table` est déjà installé dans le projet.

## Utilisation de base

### 1. Définir vos colonnes

```tsx
import { ColumnDef } from "@tanstack/react-table";
import { MyDataType } from "@/types";

export const columns: ColumnDef<MyDataType>[] = [
    {
        accessorKey: "name",
        header: "Nom",
        cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => <div>{row.getValue("email")}</div>,
    },
];
```

### 2. Utiliser le DataTable

```tsx
import { DataTable } from "@/components/ui/DataTable";
import { columns } from "./columns";

export function MyTableComponent({ data }) {
    return (
        <DataTable
            columns={columns}
            data={data}
            enableSorting={true}
            onRowClick={(row) => console.log(row)}
        />
    );
}
```

## Props

| Prop | Type | Description | Défaut |
|------|------|-------------|--------|
| `columns` | `ColumnDef[]` | Définition des colonnes | **Requis** |
| `data` | `TData[]` | Données à afficher | **Requis** |
| `onRowClick` | `(row: TData) => void` | Callback au clic sur une ligne | `undefined` |
| `enableSorting` | `boolean` | Activer le tri | `true` |
| `enableFiltering` | `boolean` | Activer le filtrage | `false` |
| `enablePagination` | `boolean` | Activer la pagination | `false` |
| `pageSize` | `number` | Nombre d'éléments par page | `10` |
| `showFooter` | `boolean` | Afficher le footer | `false` |
| `footerData` | `Record<string, string \| number>` | Données du footer | `undefined` |
| `variant` | `'default' \| 'v2'` | Variante de style | `'v2'` |
| `isLoading` | `boolean` | État de chargement | `false` |
| `emptyMessage` | `string` | Message si tableau vide | `"Aucune donnée disponible"` |

## Exemples avancés

### Avec footer et totaux

```tsx
import { useMemo } from "react";

export function MyComponent({ data }) {
    const footerData = useMemo(() => {
        return {
            name: "Total",
            amount: data.reduce((sum, item) => sum + item.amount, 0),
        };
    }, [data]);

    return (
        <DataTable
            columns={columns}
            data={data}
            showFooter={true}
            footerData={footerData}
        />
    );
}
```

### Avec pagination

```tsx
<DataTable
    columns={columns}
    data={data}
    enablePagination={true}
    pageSize={20}
/>
```

### Avec navigation

```tsx
import { useRouter } from "next/navigation";

export function MyComponent({ data }) {
    const router = useRouter();

    const handleRowClick = (row) => {
        router.push(`/detail/${row.id}`);
    };

    return (
        <DataTable
            columns={columns}
            data={data}
            onRowClick={handleRowClick}
        />
    );
}
```

## Utilitaires

### DataTable.utils.tsx

Contient des fonctions utilitaires pour faciliter le développement :

- `useDataTableState()` - Hook pour gérer l'état du tableau
- `createSelectionColumn()` - Crée une colonne de sélection
- `formatCurrency()` - Formate les montants
- `formatDate()` - Formate les dates
- `createAggregatedFooter()` - Crée un footer avec agrégations

### DataTableActions.tsx

Composants d'actions pour le tableau :

- `DataTableActions` - Barre d'actions avec recherche, export, etc.
- `DataTableFilter` - Composant de filtre

## Exemple complet : Liste des flottes

Voir l'implémentation dans :
- `src/app/(webapp)/app/fleet/sections/fleets-list/fleetColumns.tsx`
- `src/app/(webapp)/app/fleet/sections/fleets-list/fleetListWithReactTable.tsx`

## Optimisations appliquées

1. **Mémoisation** : Utilisation de `React.memo()` et `useMemo()` pour éviter les re-renders inutiles
2. **Callbacks optimisés** : `useCallback()` pour les handlers
3. **Footer calculé** : Calcul des totaux uniquement quand les données changent
4. **Colonnes statiques** : Les définitions de colonnes sont constantes
5. **Rendu conditionnel** : Affichage optimisé selon les besoins

## Migration depuis AdminTableDisplayData

Pour migrer un tableau existant :

1. Créez un fichier de colonnes avec `ColumnDef[]`
2. Remplacez `AdminTableDisplayData` par `DataTable`
3. Utilisez `footerData` au lieu de `footer` array
4. Utilisez `onRowClick` au lieu de `callback`

## Performance

Le composant est optimisé pour gérer :
- ✅ Jusqu'à 10 000 lignes sans pagination
- ✅ Tri instantané sur toutes les colonnes
- ✅ Navigation fluide entre les pages
- ✅ Mise à jour réactive des données

## Support

Pour toute question ou amélioration, contactez l'équipe de développement.

