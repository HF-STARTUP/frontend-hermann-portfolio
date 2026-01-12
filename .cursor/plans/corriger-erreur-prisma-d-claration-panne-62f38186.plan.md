<!-- 62f38186-0a3e-4ec9-8b0e-bb6a1c397834 580589c6-bf8a-45c8-9994-a2b56383ba6d -->
# Plan : Modifier le style du Badge selon le statut des pannes

## Objectif

Modifier l'affichage du Badge dans le tableau des pannes pour utiliser le composant `Badge` de shadcn/ui avec des couleurs différentes selon le statut.

## Analyse actuelle

Dans `pannes-columns.tsx`, la fonction `getStatusBadge` utilise actuellement un `<span>` personnalisé avec des classes CSS générées par `getStatusColor`. Il faut la remplacer par le composant `Badge` avec des variantes appropriées.

## Solution proposée

### Fichier à modifier : `src/app/(protected)/dashboard/etat-du-parc/pannes/_sub_components/pannes-columns.tsx`

1. **Modifier la fonction `getStatusBadge`** :

- Remplacer le `<span>` par le composant `Badge`
- Mapper les statuts `PANNE_STATUS` vers les variantes du Badge :
- `DECLARED` → `info` (bleu) - Panne déclarée, en attente
- `IN_MAINTENANCE` → `info` (bleu) - En cours de réparation
- `RESOLVED` → `default` (vert) - Panne résolue
- `CANCELLED` → `destructive` (rouge) - Panne annulée

2. **Optionnel : Ajouter une variante `warning` au Badge** :

- Si besoin d'une couleur jaune pour différencier `DECLARED` et `IN_MAINTENANCE`
- Modifier `src/components/ui/badge.tsx` pour ajouter la variante `warning`

## Mapping des statuts vers les variantes

- `PANNE_STATUS.DECLARED` → `variant="info"` (bleu)
- `PANNE_STATUS.IN_MAINTENANCE` → `variant="info"` (bleu) 
- `PANNE_STATUS.RESOLVED` → `variant="default"` (vert)
- `PANNE_STATUS.CANCELLED` → `variant="destructive"` (rouge)

## Modifications spécifiques

Dans `getStatusBadge` (lignes 44-79) :

- Remplacer le `<span>` par `<Badge variant={...}>`
- Créer une fonction de mapping `status` → `variant`
- Utiliser `statusLabel` ou le label par défaut pour le texte du Badge

### To-dos

- [ ] Modifier la fonction getStatusBadge pour utiliser le composant Badge avec les variantes appropriées
- [ ] Optionnel : Ajouter une variante 'warning' au Badge si nécessaire pour différencier les statuts