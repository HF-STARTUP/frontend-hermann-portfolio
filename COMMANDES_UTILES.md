# 🔧 Commandes utiles - React Table

## 🚀 Démarrage

### Lancer le serveur de développement
```bash
npm run dev
```

Puis visitez : http://localhost:3000/app/fleet

---

## 🧪 Tests et vérifications

### Vérifier le linting
```bash
npm run lint
```

### Vérifier les types TypeScript
```bash
npx tsc --noEmit
```

### Lancer les tests (si configurés)
```bash
npm test
```

---

## 📦 Build

### Build de production
```bash
npm run build
```

### Démarrer en production
```bash
npm start
```

---

## 🔍 Vérifications rapides

### Vérifier que React Table est installé
```bash
npm list @tanstack/react-table
```

Devrait afficher : `@tanstack/react-table@8.21.3`

### Rechercher tous les usages de DataTable
```bash
# Windows PowerShell
Get-ChildItem -Recurse -Include *.tsx,*.ts | Select-String "DataTable" | Select-Object Path -Unique

# Bash/Linux/Mac
grep -r "DataTable" src/ --include="*.tsx" --include="*.ts" | cut -d: -f1 | sort -u
```

### Compter les lignes de code ajoutées
```bash
# Windows PowerShell
(Get-Content src/components/ui/DataTable.tsx).Length

# Bash/Linux/Mac
wc -l src/components/ui/DataTable.tsx
```

---

## 📊 Navigation rapide

### Ouvrir le listing des flottes
```
URL: http://localhost:3000/app/fleet
```

### Composants à vérifier
1. DataTable principal
   ```
   src/components/ui/DataTable.tsx
   ```

2. Implémentation flottes
   ```
   src/app/(webapp)/app/fleet/sections/fleets-list/fleetListWithReactTable.tsx
   ```

3. Colonnes des flottes
   ```
   src/app/(webapp)/app/fleet/sections/fleets-list/fleetColumns.tsx
   ```

---

## 🐛 Debug

### Afficher les logs React Table (dans votre composant)
```tsx
import { useReactTable } from "@tanstack/react-table";

const table = useReactTable({
    // ... config
    debugTable: true,  // Active les logs
});
```

### Inspecter l'état du tableau
```tsx
console.log("Table state:", table.getState());
console.log("Rows:", table.getRowModel().rows);
console.log("Sorted:", table.getState().sorting);
```

---

## 📝 Modification rapide

### Changer la version actuelle du tableau des flottes

#### Version de base (actuelle)
```tsx
// src/app/(webapp)/app/fleet/sections/fleets-list/fleetList.tsx
import FleetListReactTable from "./fleetListWithReactTable";
<FleetListReactTable fleets={fleetList}/>
```

#### Version avec recherche et export
```tsx
// Remplacer par :
import FleetListAdvanced from "./fleetListAdvanced";
<FleetListAdvanced fleets={fleetList}/>
```

#### Version paginée
```tsx
// Remplacer par :
import FleetListWithPagination from "./fleetListWithPagination";
<FleetListWithPagination fleets={fleetList} pageSize={20}/>
```

---

## 🔄 Mise à jour de React Table

### Vérifier les mises à jour
```bash
npm outdated @tanstack/react-table
```

### Mettre à jour
```bash
npm update @tanstack/react-table
```

### Installer une version spécifique
```bash
npm install @tanstack/react-table@8.21.3
```

---

## 📚 Documentation

### Ouvrir la doc locale

#### Windows
```powershell
start QUICK_START_REACT_TABLE.md
start MIGRATION_REACT_TABLE.md
start src/components/ui/DataTable.md
```

#### Mac
```bash
open QUICK_START_REACT_TABLE.md
open MIGRATION_REACT_TABLE.md
open src/components/ui/DataTable.md
```

#### Linux
```bash
xdg-open QUICK_START_REACT_TABLE.md
xdg-open MIGRATION_REACT_TABLE.md
xdg-open src/components/ui/DataTable.md
```

---

## 🔧 VSCode

### Ouvrir les fichiers clés rapidement
```
Ctrl+P (Cmd+P sur Mac)
```

Puis taper :
- `DataTable.tsx` → Composant principal
- `fleetColumns.tsx` → Colonnes des flottes
- `fleetList.tsx` → Page d'intégration

### Rechercher dans tout le projet
```
Ctrl+Shift+F (Cmd+Shift+F sur Mac)
```

---

## ✅ Checklist de vérification

Après modification du code :

```bash
# 1. Vérifier le linting
npm run lint

# 2. Vérifier les types
npx tsc --noEmit

# 3. Tester en développement
npm run dev

# 4. Vérifier dans le navigateur
# → http://localhost:3000/app/fleet

# 5. Tester le tri, le clic, le footer

# 6. Build de production (optionnel)
npm run build
```

---

## 🎯 Raccourcis utiles

### Git
```bash
# Voir les fichiers modifiés
git status

# Voir les différences
git diff src/app/(webapp)/app/fleet/sections/fleets-list/fleetList.tsx

# Ajouter les nouveaux fichiers
git add src/components/ui/DataTable.tsx
git add src/app/(webapp)/app/fleet/sections/fleets-list/

# Commit
git commit -m "feat: Migration vers React Table pour le listing des flottes"
```

### NPM
```bash
# Nettoyer les modules et réinstaller
rm -rf node_modules package-lock.json
npm install

# Audit de sécurité
npm audit

# Corriger les vulnérabilités
npm audit fix
```

---

## 📊 Performance

### Mesurer les performances

Dans le composant :
```tsx
import { Profiler } from 'react';

<Profiler id="DataTable" onRender={(id, phase, actualDuration) => {
    console.log(`${id} (${phase}) took ${actualDuration}ms`);
}}>
    <DataTable {...props} />
</Profiler>
```

### Chrome DevTools
```
F12 → Performance → Record → Interact → Stop
```

---

## 💡 Tips

### Activer le mode strict
```tsx
// src/app/layout.tsx
<React.StrictMode>
    <App />
</React.StrictMode>
```

### Clear le cache Next.js
```bash
rm -rf .next
npm run dev
```

### Voir les logs du serveur
Les logs apparaissent automatiquement dans le terminal où vous avez lancé `npm run dev`

---

## 📞 Aide

### Documentation officielle
- React Table : https://tanstack.com/table/latest
- Next.js : https://nextjs.org/docs
- TypeScript : https://www.typescriptlang.org/docs

### Documentation locale
- Quick Start : `/QUICK_START_REACT_TABLE.md`
- Migration : `/MIGRATION_REACT_TABLE.md`
- Technique : `/src/components/ui/DataTable.md`

---

**Bon développement ! 🚀**

