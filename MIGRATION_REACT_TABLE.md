# Migration vers React Table - Documentation

## 📋 Vue d'ensemble

Ce document décrit la migration du système de tableau de l'application vers **@tanstack/react-table**, avec une implémentation complète pour le listing des flottes.

## ✨ Nouvelles fonctionnalités

### Composant DataTable
Un composant de tableau moderne et performant avec :

- ✅ **Tri multi-colonnes** : Triez par plusieurs colonnes simultanément
- ✅ **Pagination intelligente** : Gérez de grandes listes efficacement
- ✅ **Footer dynamique** : Totaux et agrégations automatiques
- ✅ **Recherche intégrée** : Filtrage en temps réel
- ✅ **Export de données** : CSV et Excel en un clic
- ✅ **Navigation fluide** : Clic sur les lignes pour naviguer
- ✅ **Performance optimisée** : Mémoisation et re-renders minimaux
- ✅ **Design cohérent** : Respecte la guideline existante

## 📁 Structure des fichiers

### Composants principaux
```
src/components/ui/
├── DataTable.tsx              # Composant principal React Table
├── DataTable.utils.tsx        # Utilitaires et hooks personnalisés
├── DataTableActions.tsx       # Composants d'actions (recherche, export, etc.)
└── DataTable.md              # Documentation complète
```

### Types TypeScript
```
src/types/
└── dataTable.types.ts         # Types pour DataTable
```

### Implémentation pour les flottes
```
src/app/(webapp)/app/fleet/sections/fleets-list/
├── fleetColumns.tsx                  # Définition des colonnes
├── fleetListWithReactTable.tsx      # Version de base
├── fleetListAdvanced.tsx            # Version avec recherche/export
├── fleetListWithPagination.tsx      # Version paginée
├── fleetList.tsx                    # Intégration dans l'app (modifié)
└── index.ts                         # Exports centralisés
```

## 🚀 Utilisation

### Version de base (actuellement intégrée)

```tsx
import { FleetListReactTable } from "./fleetListWithReactTable";

// Dans votre composant
<FleetListReactTable fleets={fleetList} />
```

**Fonctionnalités incluses :**
- Tri sur toutes les colonnes
- Footer avec totaux
- Navigation au clic
- Design conforme

### Version avancée (recommandée)

Pour activer la recherche et l'export, remplacez dans `fleetList.tsx` :

```tsx
// Avant
import FleetListReactTable from "./fleetListWithReactTable";
<FleetListReactTable fleets={fleetList} />

// Après
import FleetListAdvanced from "./fleetListAdvanced";
<FleetListAdvanced fleets={fleetList} onRefresh={refetch} />
```

**Fonctionnalités supplémentaires :**
- Recherche globale en temps réel
- Export CSV
- Export Excel/JSON
- Bouton d'actualisation
- Compteur de résultats

### Version paginée (pour grandes listes)

Si vous avez plus de 50 flottes :

```tsx
import FleetListWithPagination from "./fleetListWithPagination";

<FleetListWithPagination 
    fleets={fleetList} 
    pageSize={20} 
/>
```

**Fonctionnalités :**
- Pagination automatique
- Navigation entre pages
- Footer avec totaux globaux

## 🎨 Personnalisation

### Créer vos propres colonnes

```tsx
import { ColumnDef } from "@tanstack/react-table";
import { VotreType } from "@/types";

export const mesColonnes: ColumnDef<VotreType>[] = [
    {
        accessorKey: "nom",
        header: "Nom",
        cell: ({ row }) => (
            <div className="font-bold">
                {row.getValue("nom")}
            </div>
        ),
    },
    // ... autres colonnes
];
```

### Ajouter un footer personnalisé

```tsx
const footerData = {
    colonne1: "Total",
    colonne2: data.reduce((sum, item) => sum + item.valeur, 0),
    colonne3: "-",
};

<DataTable 
    columns={mesColonnes}
    data={data}
    showFooter={true}
    footerData={footerData}
/>
```

### Styliser une cellule

Les cellules héritent automatiquement des styles existants. Pour personnaliser :

```tsx
{
    accessorKey: "montant",
    header: "Montant",
    cell: ({ row }) => {
        const montant = row.getValue("montant") as number;
        return (
            <div className={cn(
                "font-medium",
                montant > 1000 ? "text-green-600" : "text-gray-600"
            )}>
                {montant.toLocaleString()} FCFA
            </div>
        );
    },
}
```

## 🔧 Utilitaires disponibles

### Hooks

```tsx
import { useDataTableState } from "@/components/ui/DataTable.utils";

const { globalFilter, setGlobalFilter, rowSelection } = useDataTableState();
```

### Formatage

```tsx
import { formatCurrency, formatDate } from "@/components/ui/DataTable.utils";

const montantFormate = formatCurrency(15000); // "15 000 FCFA"
const dateFormatee = formatDate("2024-01-15"); // "15/01/2024"
```

### Agrégations

```tsx
import { createAggregatedFooter, aggregations } from "@/components/ui/DataTable.utils";

const footer = createAggregatedFooter(data, {
    nombre: aggregations.sum("nombre"),
    montant: aggregations.sum("montant"),
    moyenne: aggregations.avg("valeur"),
});
```

## 📊 Comparaison : Avant vs Après

| Fonctionnalité | AdminTableDisplayData (avant) | DataTable (après) |
|----------------|-------------------------------|-------------------|
| Tri | ❌ Non | ✅ Oui, multi-colonnes |
| Pagination | ❌ Non | ✅ Oui |
| Recherche | ⚠️ Externe seulement | ✅ Intégrée |
| Export | ❌ Non | ✅ CSV et Excel |
| Performance | ⚠️ Moyenne | ✅ Excellente |
| TypeScript | ⚠️ Partiel | ✅ Complet |
| Réutilisabilité | ⚠️ Limitée | ✅ Totale |
| Maintenance | ⚠️ Complexe | ✅ Simple |

## 🎯 Optimisations appliquées

### 1. Mémoisation intelligente

```tsx
// Les colonnes sont mémorisées
const columns = useMemo(() => fleetColumns, []);

// Le footer est recalculé uniquement si les données changent
const footerData = useMemo(() => 
    calculateFleetFooterData(fleets), 
    [fleets]
);
```

### 2. Callbacks optimisés

```tsx
// useCallback pour éviter les re-créations
const handleRowClick = useCallback(
    (fleet) => router.push(`/app/fleet/${fleet.id}`),
    [router]
);
```

### 3. Rendu conditionnel

```tsx
// React Table ne rend que les lignes visibles
// La pagination ne charge que les données nécessaires
```

### 4. Recherche optimisée

```tsx
// Recherche côté client avec mémoisation
const filteredData = useMemo(() => {
    if (!search) return data;
    return data.filter(item => /* ... */);
}, [data, search]);
```

## 🐛 Résolution de problèmes

### Le tri ne fonctionne pas

Vérifiez que `enableSorting={true}` est défini :

```tsx
<DataTable 
    columns={columns}
    data={data}
    enableSorting={true}  // ← Important
/>
```

### Le footer n'apparaît pas

Assurez-vous de passer `showFooter={true}` et `footerData` :

```tsx
<DataTable 
    showFooter={true}
    footerData={monFooter}
    // ...
/>
```

### Les styles ne s'appliquent pas

Le composant utilise les classes Tailwind du design system existant. Vérifiez que votre configuration Tailwind inclut les fichiers nécessaires.

### Performance lente avec beaucoup de données

Activez la pagination :

```tsx
<DataTable 
    enablePagination={true}
    pageSize={20}
    // ...
/>
```

## 📚 Exemples d'utilisation

### Exemple 1 : Tableau simple

```tsx
import { DataTable } from "@/components/ui/DataTable";

const columns = [
    { accessorKey: "nom", header: "Nom" },
    { accessorKey: "email", header: "Email" },
];

<DataTable columns={columns} data={users} />
```

### Exemple 2 : Avec navigation

```tsx
import { useRouter } from "next/navigation";

const router = useRouter();

<DataTable 
    columns={columns}
    data={items}
    onRowClick={(item) => router.push(`/detail/${item.id}`)}
/>
```

### Exemple 3 : Avec recherche et export

```tsx
import { DataTableActions } from "@/components/ui/DataTableActions";

const [search, setSearch] = useState("");

<>
    <DataTableActions 
        searchValue={search}
        onSearchChange={setSearch}
        onExport={handleExport}
        showSearch={true}
        showExport={true}
    />
    <DataTable columns={columns} data={filteredData} />
</>
```

## 🔄 Migration d'un tableau existant

### Étapes

1. **Créer le fichier de colonnes** (`mesColonnes.tsx`)
2. **Créer le composant** (`monTableau.tsx`)
3. **Remplacer l'ancien composant** dans la page
4. **Tester** toutes les fonctionnalités
5. **Nettoyer** l'ancien code (optionnel)

### Template de migration

```tsx
// 1. Définir les colonnes
export const mesColonnes: ColumnDef<MonType>[] = [
    // Copier depuis l'ancien 'headers' array
];

// 2. Créer le composant
export const MonTableauReactTable = ({ data }) => {
    const router = useRouter();
    
    return (
        <DataTable
            columns={mesColonnes}
            data={data}
            onRowClick={(row) => router.push(`/detail/${row.id}`)}
            enableSorting={true}
            showFooter={true}
            footerData={calculateFooter(data)}
        />
    );
};

// 3. Utiliser dans la page
<MonTableauReactTable data={mesData} />
```

## 🎓 Bonnes pratiques

1. **Mémorisez les colonnes** : Évitez de redéfinir les colonnes à chaque render
2. **Calculez le footer une fois** : Utilisez `useMemo` pour le footer
3. **Utilisez `useCallback`** : Pour les handlers de clic
4. **Paginez les grandes listes** : >50 éléments
5. **Typez correctement** : Utilisez TypeScript pour la sécurité
6. **Testez la performance** : Avec des données réelles
7. **Documentez vos colonnes** : Commentez les colonnes complexes

## 📞 Support

Pour toute question ou problème :
- Consultez la documentation complète : `src/components/ui/DataTable.md`
- Regardez les exemples : dossier `fleets-list/`
- Contactez l'équipe de développement

## 🎉 Conclusion

La migration vers React Table apporte des améliorations significatives en termes de :
- **Performance** : Rendu optimisé et mémoisation
- **Fonctionnalités** : Tri, pagination, recherche, export
- **Maintenabilité** : Code plus propre et réutilisable
- **Expérience utilisateur** : Interface plus réactive et intuitive

Le système est maintenant prêt à être déployé et peut être facilement étendu pour d'autres tableaux de l'application.

