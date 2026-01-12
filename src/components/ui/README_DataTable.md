# DataTable Component

> Un composant de tableau moderne, performant et réutilisable basé sur @tanstack/react-table

## 🎯 Vue rapide

```tsx
import { DataTable } from "@/components/ui/DataTable";

<DataTable 
    columns={columns} 
    data={data} 
    enableSorting={true}
/>
```

## 📦 Fichiers du composant

| Fichier | Description |
|---------|-------------|
| `DataTable.tsx` | Composant principal |
| `DataTable.utils.tsx` | Utilitaires et hooks |
| `DataTableActions.tsx` | Composants d'actions |
| `DataTable.md` | Documentation complète |
| `__tests__/DataTable.example.tsx` | Exemples d'utilisation |

## ✨ Fonctionnalités

- ✅ Tri multi-colonnes
- ✅ Pagination
- ✅ Footer avec totaux
- ✅ Navigation sur les lignes
- ✅ Recherche intégrée
- ✅ Export de données
- ✅ Performance optimisée
- ✅ TypeScript complet

## 📚 Documentation

### Documentation complète
Voir `DataTable.md` pour la documentation détaillée avec :
- Guide d'utilisation complet
- Tous les props disponibles
- Exemples avancés
- Guide de migration
- Optimisations

### Guide de démarrage rapide
Voir `../../../QUICK_START_REACT_TABLE.md` dans la racine du projet

### Exemples interactifs
Voir `__tests__/DataTable.example.tsx` pour des exemples fonctionnels

## 🚀 Utilisation de base

### 1. Définir les colonnes

```tsx
import { ColumnDef } from "@tanstack/react-table";

interface MesData {
    id: string;
    nom: string;
    email: string;
}

const columns: ColumnDef<MesData>[] = [
    {
        accessorKey: "nom",
        header: "Nom",
        cell: ({ row }) => <div>{row.getValue("nom")}</div>,
    },
    {
        accessorKey: "email",
        header: "Email",
    },
];
```

### 2. Utiliser le composant

```tsx
import { DataTable } from "@/components/ui/DataTable";

export function MonTableau({ data }: { data: MesData[] }) {
    return <DataTable columns={columns} data={data} />;
}
```

## 🎨 Exemples

### Avec footer

```tsx
const footerData = {
    nom: "Total",
    email: `${data.length} utilisateurs`,
};

<DataTable 
    columns={columns}
    data={data}
    showFooter={true}
    footerData={footerData}
/>
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
<DataTable 
    columns={columns}
    data={data}
    onRowClick={(row) => router.push(`/detail/${row.id}`)}
/>
```

## 🔧 Props principales

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `columns` | `ColumnDef[]` | - | **Requis** - Définition des colonnes |
| `data` | `TData[]` | - | **Requis** - Données à afficher |
| `enableSorting` | `boolean` | `true` | Activer le tri |
| `enablePagination` | `boolean` | `false` | Activer la pagination |
| `pageSize` | `number` | `10` | Taille de page |
| `showFooter` | `boolean` | `false` | Afficher le footer |
| `onRowClick` | `function` | - | Callback au clic sur ligne |

Voir `DataTable.md` pour la liste complète des props.

## 🛠️ Utilitaires

### Hooks

```tsx
import { useDataTableState } from "./DataTable.utils";

const { globalFilter, setGlobalFilter } = useDataTableState();
```

### Formatage

```tsx
import { formatCurrency, formatDate } from "./DataTable.utils";

formatCurrency(1500);  // "1 500 FCFA"
formatDate("2024-01-15");  // "15/01/2024"
```

### Actions

```tsx
import { DataTableActions } from "./DataTableActions";

<DataTableActions
    searchValue={search}
    onSearchChange={setSearch}
    onExport={handleExport}
/>
```

## 📊 Implémentation réelle

Voir l'implémentation complète pour le listing des flottes :
- `src/app/(webapp)/app/fleet/sections/fleets-list/fleetColumns.tsx`
- `src/app/(webapp)/app/fleet/sections/fleets-list/fleetListWithReactTable.tsx`

## 🎯 Optimisations

Le composant utilise plusieurs techniques d'optimisation :

1. **React.memo** pour éviter les re-renders inutiles
2. **useMemo** pour mémoriser les calculs coûteux
3. **useCallback** pour stabiliser les callbacks
4. **Virtual scrolling** via React Table
5. **Pagination** pour grandes listes

## 🐛 Résolution de problèmes

### Le tri ne fonctionne pas
→ Vérifiez que `enableSorting={true}` est défini

### Le footer n'apparaît pas
→ Passez `showFooter={true}` et `footerData`

### Performance lente
→ Activez la pagination avec `enablePagination={true}`

## 💡 Bonnes pratiques

1. Mémorisez vos colonnes avec `useMemo`
2. Calculez le footer une seule fois
3. Utilisez `useCallback` pour `onRowClick`
4. Activez la pagination pour >50 éléments
5. Typez correctement vos données

## 📞 Support

- Documentation technique : `DataTable.md`
- Guide rapide : Racine du projet `/QUICK_START_REACT_TABLE.md`
- Exemples : `__tests__/DataTable.example.tsx`
- Migration : `/MIGRATION_REACT_TABLE.md`

## 🔗 Liens utiles

- [React Table Documentation](https://tanstack.com/table/latest)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/)

---

**Version** : 1.0.0  
**Statut** : ✅ Production Ready  
**Dernière mise à jour** : Octobre 2025

