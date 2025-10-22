# 🎨 Stylisation conditionnelle des lignes

## 📋 Vue d'ensemble

Le composant DataTable supporte maintenant la stylisation conditionnelle des lignes selon les données affichées. Cette fonctionnalité est utilisée pour griser les flottes sans abonnement actif.

---

## ✨ Fonctionnalité ajoutée

### Prop `getRowClassName`

Une nouvelle prop optionnelle `getRowClassName` permet de personnaliser le style de chaque ligne du tableau en fonction des données de cette ligne.

```typescript
getRowClassName?: (row: TData) => string;
```

---

## 🚀 Utilisation

### Exemple : Griser les flottes sans abonnement actif

```tsx
import { FleetModel } from "@/model/ADMIN/fleet";

const getRowClassName = React.useCallback(
    (fleet: FleetModel) => {
        if (!fleet.hasActiveSubscription) {
            return "bg-gray-100 hover:bg-gray-200 opacity-60";
        }
        return "";
    },
    []
);

<DataTable
    columns={columns}
    data={fleets}
    getRowClassName={getRowClassName}
    // ... autres props
/>
```

### Résultat

- ✅ Les flottes **avec abonnement actif** : Apparence normale
- 🔘 Les flottes **sans abonnement actif** : Fond gris, opacité réduite

---

## 🎨 Classes CSS utilisées

| Classe | Description | Valeur |
|--------|-------------|--------|
| `bg-gray-100` | Fond gris clair | #f3f4f6 |
| `hover:bg-gray-200` | Hover gris plus foncé | #e5e7eb |
| `opacity-60` | Opacité réduite | 60% |

Ces classes se combinent avec les classes de base :
- `hover:bg-slate-100` (ligne normale)
- `transition duration-200 ease-in` (animation)
- `cursor-pointer` (si cliquable)

---

## 📊 Implémentation technique

### 1. Types mis à jour

**Fichier :** `src/types/dataTable.types.ts`

```typescript
export interface DataTableProps<TData, TValue> {
    // ... autres props
    getRowClassName?: (row: TData) => string;  // ← NOUVEAU
}
```

### 2. DataTable modifié

**Fichier :** `src/components/ui/DataTable.tsx`

```tsx
// Extraction du prop
const { getRowClassName, ...otherProps } = props;

// Application dans le rendu
<TableRow
    className={cn(
        "hover:bg-slate-100 transition duration-200 ease-in",
        onRowClick && "cursor-pointer",
        getRowClassName && getRowClassName(row.original)  // ← NOUVEAU
    )}
>
```

### 3. Implémentation dans les composants de liste

**Fichiers modifiés :**
- `fleetListWithReactTable.tsx`
- `fleetListAdvanced.tsx`
- `fleetListWithPagination.tsx`

Tous implémentent la même logique :

```tsx
const getRowClassName = React.useCallback(
    (fleet: FleetModel) => {
        if (!fleet.hasActiveSubscription) {
            return "bg-gray-100 hover:bg-gray-200 opacity-60";
        }
        return "";
    },
    []
);
```

---

## 💡 Autres cas d'usage

### Mettre en évidence les lignes importantes

```tsx
const getRowClassName = (item: MyData) => {
    if (item.priority === "high") {
        return "bg-red-50 border-l-4 border-red-500";
    }
    if (item.priority === "medium") {
        return "bg-yellow-50 border-l-4 border-yellow-500";
    }
    return "";
};
```

### Alterner les couleurs de lignes (rayures)

```tsx
const getRowClassName = (item: MyData, index: number) => {
    return index % 2 === 0 ? "bg-gray-50" : "bg-white";
};
```

### Désactiver visuellement certaines lignes

```tsx
const getRowClassName = (item: MyData) => {
    if (item.status === "disabled") {
        return "opacity-50 cursor-not-allowed hover:bg-transparent";
    }
    return "";
};
```

### Indiquer des états avec des bordures

```tsx
const getRowClassName = (item: MyData) => {
    const statusClasses = {
        success: "border-l-4 border-green-500 bg-green-50",
        warning: "border-l-4 border-yellow-500 bg-yellow-50",
        error: "border-l-4 border-red-500 bg-red-50",
        info: "border-l-4 border-blue-500 bg-blue-50",
    };
    return statusClasses[item.status] || "";
};
```

---

## 🎓 Bonnes pratiques

### 1. Utiliser `useCallback` pour la performance

```tsx
// ✅ Bon : mémorisé
const getRowClassName = React.useCallback(
    (row: MyData) => {
        return row.isActive ? "bg-green-50" : "bg-gray-50";
    },
    [] // Dépendances vides si la logique ne dépend pas de props/state
);

// ❌ Éviter : recréé à chaque render
const getRowClassName = (row: MyData) => {
    return row.isActive ? "bg-green-50" : "bg-gray-50";
};
```

### 2. Conserver les classes de base

Les classes retournées par `getRowClassName` **s'ajoutent** aux classes de base. Ne pas dupliquer :

```tsx
// ✅ Bon : ajoute seulement les classes spécifiques
return "bg-gray-100 opacity-60";

// ❌ Éviter : duplique les classes de base
return "hover:bg-gray-100 transition duration-200 bg-gray-100 opacity-60";
```

### 3. Utiliser des classes Tailwind

```tsx
// ✅ Bon : classes Tailwind
return "bg-gray-100 hover:bg-gray-200";

// ❌ Éviter : styles inline
return "background-color: #f3f4f6";
```

### 4. Retourner une chaîne vide si pas de style

```tsx
// ✅ Bon
if (!condition) {
    return "";
}

// ❌ Éviter
if (!condition) {
    return undefined;
}
```

### 5. Gérer plusieurs conditions

```tsx
const getRowClassName = React.useCallback((row: MyData) => {
    const classes: string[] = [];
    
    if (!row.isActive) {
        classes.push("opacity-60");
    }
    
    if (row.isImportant) {
        classes.push("font-bold");
    }
    
    if (row.hasError) {
        classes.push("bg-red-50 border-l-4 border-red-500");
    }
    
    return classes.join(" ");
}, []);
```

---

## 🔍 Vérifications

### Checklist d'implémentation

- [x] Prop `getRowClassName` ajoutée aux types
- [x] DataTable utilise la fonction
- [x] Fonction mémorisée avec `useCallback`
- [x] Classes Tailwind valides
- [x] Pas de duplication de classes de base
- [x] Testé visuellement
- [x] Linting passé

### Tests à effectuer

1. **Visuel** : Vérifier que les lignes ont le bon style
2. **Hover** : Vérifier que le hover fonctionne toujours
3. **Clic** : Vérifier que le clic fonctionne toujours
4. **Tri** : Vérifier que les styles persistent après tri
5. **Performance** : Pas de ralentissement visible

---

## 🎨 Personnalisation des styles

### Modifier les couleurs de fond

Pour changer les couleurs des flottes sans abonnement :

```tsx
// Plus clair
return "bg-gray-50 hover:bg-gray-100 opacity-70";

// Plus foncé
return "bg-gray-200 hover:bg-gray-300 opacity-50";

// Autre couleur
return "bg-blue-50 hover:bg-blue-100 opacity-60";
```

### Modifier l'opacité

```tsx
// Moins transparent
return "bg-gray-100 hover:bg-gray-200 opacity-80";

// Plus transparent
return "bg-gray-100 hover:bg-gray-200 opacity-40";

// Sans opacité
return "bg-gray-100 hover:bg-gray-200";
```

### Ajouter une bordure

```tsx
return "bg-gray-100 hover:bg-gray-200 opacity-60 border-l-4 border-gray-400";
```

### Ajouter une icône ou un badge

Vous pouvez aussi modifier les cellules pour afficher un indicateur :

```tsx
// Dans fleetColumns.tsx
{
    accessorKey: "name",
    header: "Nom de la flotte",
    cell: ({ row }) => {
        const fleet = row.original as FleetModel;
        return (
            <div className="flex items-center gap-2">
                {!fleet.hasActiveSubscription && (
                    <span className="text-xs text-gray-500">⚠️</span>
                )}
                <div className="font-medium text-nowrap">
                    {row.getValue("name")}
                </div>
            </div>
        );
    },
}
```

---

## 📝 Exemple complet

```tsx
"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { FleetModel } from "@/model/ADMIN/fleet";
import { DataTable } from "@/components/ui/DataTable";
import { fleetColumns, calculateFleetFooterData } from "./fleetColumns";

interface FleetListProps {
    fleets: FleetModel[];
    isLoading: boolean;
}

export const FleetList: React.FC<FleetListProps> = ({ fleets, isLoading }) => {
    const router = useRouter();

    // Footer avec totaux
    const footerData = useMemo(() => {
        return calculateFleetFooterData(fleets);
    }, [fleets]);

    // Navigation au clic
    const handleRowClick = React.useCallback(
        (fleet: FleetModel) => {
            router.push(`/app/fleet/${fleet.id}/dashboard`);
        },
        [router]
    );

    // Stylisation conditionnelle des lignes
    const getRowClassName = React.useCallback(
        (fleet: FleetModel) => {
            // Griser si pas d'abonnement actif
            if (!fleet.hasActiveSubscription) {
                return "bg-gray-100 hover:bg-gray-200 opacity-60";
            }
            
            // Autres conditions possibles
            // if (fleet.hasWarning) {
            //     return "bg-yellow-50 border-l-4 border-yellow-500";
            // }
            
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
            showFooter={true}
            footerData={footerData}
            variant="v2"
        />
    );
};
```

---

## 🐛 Résolution de problèmes

### Les styles ne s'appliquent pas

**Cause** : Classes Tailwind non compilées

**Solution** : Vérifier que les classes sont dans le fichier ou ajouter au `tailwind.config.ts` :

```js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // ...
}
```

### Le hover ne fonctionne plus

**Cause** : Classes qui override le hover de base

**Solution** : S'assurer que les classes hover personnalisées ne bloquent pas le hover de base :

```tsx
// ❌ Mauvais
return "hover:bg-transparent";

// ✅ Bon
return "hover:bg-gray-200";
```

### Les performances sont dégradées

**Cause** : Fonction non mémorisée

**Solution** : Utiliser `useCallback` :

```tsx
const getRowClassName = React.useCallback(
    (fleet: FleetModel) => {
        // logique
    },
    [] // dépendances
);
```

---

## ✅ Validation

### Tests effectués

- [x] Flottes sans abonnement : Grisées ✓
- [x] Flottes avec abonnement : Normales ✓
- [x] Hover fonctionne : Oui ✓
- [x] Clic fonctionne : Oui ✓
- [x] Tri conserve les styles : Oui ✓
- [x] Performance OK : Oui ✓
- [x] Linting passé : Oui ✓

---

**Date d'implémentation** : Octobre 2025  
**Version** : 1.1.0  
**Statut** : ✅ Opérationnel

