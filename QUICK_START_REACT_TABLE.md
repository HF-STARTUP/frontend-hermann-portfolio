# 🚀 Guide de démarrage rapide - React Table

## En 3 minutes chrono

### 1️⃣ Importer le composant

```tsx
import { DataTable } from "@/components/ui/DataTable";
import { ColumnDef } from "@tanstack/react-table";
```

### 2️⃣ Définir vos colonnes

```tsx
const columns: ColumnDef<VotreType>[] = [
    {
        accessorKey: "nom",
        header: "Nom",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
];
```

### 3️⃣ Utiliser le tableau

```tsx
<DataTable 
    columns={columns} 
    data={vosData} 
/>
```

**C'est tout !** 🎉

---

## 📦 Avec plus de fonctionnalités

### Tri activé

```tsx
<DataTable 
    columns={columns} 
    data={vosData}
    enableSorting={true}  // ← Ajoutez cette ligne
/>
```

### Avec footer

```tsx
const footer = {
    nom: "Total",
    email: `${vosData.length} éléments`,
};

<DataTable 
    columns={columns} 
    data={vosData}
    showFooter={true}
    footerData={footer}
/>
```

### Navigation au clic

```tsx
<DataTable 
    columns={columns} 
    data={vosData}
    onRowClick={(item) => router.push(`/detail/${item.id}`)}
/>
```

### Avec pagination

```tsx
<DataTable 
    columns={columns} 
    data={vosData}
    enablePagination={true}
    pageSize={20}
/>
```

---

## 🎨 Personnaliser les cellules

### Style simple

```tsx
{
    accessorKey: "montant",
    header: "Montant",
    cell: ({ row }) => (
        <div className="font-bold text-green-600">
            {row.getValue("montant")} FCFA
        </div>
    ),
}
```

### Avec badge

```tsx
{
    accessorKey: "statut",
    header: "Statut",
    cell: ({ row }) => {
        const statut = row.getValue("statut");
        return (
            <div className={statut === "actif" 
                ? "bg-green-100 text-green-700 px-3 py-1 rounded"
                : "bg-red-100 text-red-700 px-3 py-1 rounded"
            }>
                {statut}
            </div>
        );
    },
}
```

---

## 🔥 Exemple complet

```tsx
"use client";

import React from "react";
import { DataTable } from "@/components/ui/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";

interface Utilisateur {
    id: string;
    nom: string;
    email: string;
    statut: string;
}

const columns: ColumnDef<Utilisateur>[] = [
    {
        accessorKey: "nom",
        header: "Nom",
        cell: ({ row }) => (
            <div className="font-medium">{row.getValue("nom")}</div>
        ),
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "statut",
        header: "Statut",
        cell: ({ row }) => (
            <div className="bg-green-100 text-green-700 px-3 py-1 rounded-sm inline-block">
                {row.getValue("statut")}
            </div>
        ),
    },
];

export function MonTableau({ utilisateurs }: { utilisateurs: Utilisateur[] }) {
    const router = useRouter();

    const footerData = {
        nom: "Total",
        email: `${utilisateurs.length} utilisateurs`,
        statut: "-",
    };

    return (
        <DataTable
            columns={columns}
            data={utilisateurs}
            enableSorting={true}
            showFooter={true}
            footerData={footerData}
            onRowClick={(user) => router.push(`/users/${user.id}`)}
        />
    );
}
```

---

## 💡 Astuces

### 1. Mémorisez vos calculs

```tsx
const footerData = useMemo(() => ({
    nom: "Total",
    montant: data.reduce((sum, item) => sum + item.montant, 0),
}), [data]);
```

### 2. Optimisez les callbacks

```tsx
const handleClick = useCallback(
    (item) => router.push(`/detail/${item.id}`),
    [router]
);
```

### 3. Utilisez les utilitaires

```tsx
import { formatCurrency, formatDate } from "@/components/ui/DataTable.utils";

// Dans vos cellules
<div>{formatCurrency(montant)}</div>
<div>{formatDate(date)}</div>
```

---

## 📚 Ressources

- **Documentation complète** : `src/components/ui/DataTable.md`
- **Guide de migration** : `MIGRATION_REACT_TABLE.md`
- **Exemples** : `src/components/ui/__tests__/DataTable.example.tsx`
- **Implémentation réelle** : `src/app/(webapp)/app/fleet/sections/fleets-list/`

---

## ❓ Questions fréquentes

**Q : Comment désactiver le tri sur une colonne ?**  
R : Ajoutez `enableSorting: false` dans la définition de la colonne.

**Q : Comment changer le style du header ?**  
R : Les styles sont déjà définis et cohérents. Pour personnaliser, modifiez `DataTable.tsx`.

**Q : Comment ajouter une recherche ?**  
R : Utilisez le composant `DataTableActions` (voir guide de migration).

**Q : Les performances sont lentes avec beaucoup de données**  
R : Activez la pagination avec `enablePagination={true}`.

---

## ✅ Checklist de démarrage

- [ ] Importer DataTable et ColumnDef
- [ ] Définir les colonnes avec le bon type
- [ ] Passer les données au composant
- [ ] Tester le tri
- [ ] Ajouter le footer si nécessaire
- [ ] Implémenter la navigation au clic
- [ ] Optimiser avec useMemo et useCallback
- [ ] Tester avec des données réelles

---

**Besoin d'aide ?** Consultez les exemples ou contactez l'équipe ! 🚀

