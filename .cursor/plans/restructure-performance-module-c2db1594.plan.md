<!-- c2db1594-83cf-494d-924b-cbb0d59b6fcb 520bcc6f-ff07-4be8-89b9-5c6b3bb1cfcf -->
# Restructuration du Module Performance pour Chauffeur

## 1. Modifier la gestion d'état et la sélection de chauffeur

**Fichier**: `src/app/(protected)/dashboard/performance/page.tsx`

- Ajouter un état pour le chauffeur sélectionné (`selectedDriver`)
- Passer les props nécessaires à `LeftSide` et `ResumeChauffeurs`
- Gérer le changement de sélection de chauffeur

**Fichier**: `src/app/(protected)/dashboard/performance/_components/suppliersItems/LeftSide.tsx`

- Ajouter une prop `onDriverSelect` pour notifier la sélection
- Transmettre cette prop à `DriverList`

**Fichier**: `src/app/(protected)/dashboard/performance/_components/suppliersItems/_components/DriverList.tsx`

- Modifier la sélection pour permettre un seul chauffeur sélectionné (radio au lieu de checkbox)
- Ajouter un callback `onDriverSelect` pour notifier le parent

**Fichier**: `src/app/(protected)/dashboard/performance/_components/suppliersItems/_components/SupplierItem/DriverItem.tsx`

- Rendre le composant cliquable pour sélectionner le chauffeur
- Ajouter un état visuel pour le chauffeur sélectionné

## 2. Créer le composant DriverDetailView

**Nouveau fichier**: `src/app/(protected)/dashboard/performance/_components/driverOverview/DriverDetailView.tsx`

Structure du composant :

- Header avec nom du chauffeur + sélecteur de période (Mois/Semaine)
- Grid de 6 StatCards (Chiffres d'affaires, Dettes, Dépenses, Salaires, Temps d'activité, Incidents)
- Score Chauffeur (composant circulaire avec 92% + 3 métriques)
- Graphique de revenus avec tableau mensuel synchronisé
- Graphique d'incidents (semi-donut, réutiliser `IncidentsCard`)
- Tableau de formations

## 3. Créer le composant DriverScoreCard

**Nouveau fichier**: `src/app/(protected)/dashboard/performance/_components/driverOverview/_components/DriverScoreCard.tsx`

Afficher :

- Graphique circulaire avec le score global (92%)
- Liste des métriques : Ponctualité (12 pts), Conduite (12 pts), Recettes (12 pts)
- Design avec Doughnut de Chart.js

## 4. Créer le composant RevenueWithTableCard

**Nouveau fichier**: `src/app/(protected)/dashboard/performance/_components/driverOverview/_components/RevenueWithTableCard.tsx`

Afficher :

- Graphique en barres des revenus mensuels (gauche)
- Tableau scrollable des mois avec montants (droite)
- Sélecteur Mois/Semaine/Chiffre d'affaires
- Total des revenus en haut
- Synchronisation entre graphique et tableau

## 5. Créer le composant FormationsTableCard

**Nouveau fichier**: `src/app/(protected)/dashboard/performance/_components/driverOverview/_components/FormationsTableCard.tsx`

Afficher :

- Tableau avec colonnes : Formation, Nombre, Cause
- Données des formations (Eco conduite, etc.)
- Style cohérent avec le design

## 6. Modifier ResumeChauffeurs pour afficher la vue détaillée

**Fichier**: `src/app/(protected)/dashboard/performance/_components/suppliersItems/ResumeChauffeurs.tsx`

- Accepter une prop `selectedDriver`
- Si un chauffeur est sélectionné, afficher `DriverDetailView`
- Sinon, afficher la vue résumé actuelle (vue globale)

## 7. Ajuster les StatCards existants

**Fichiers**:

- `src/app/(protected)/dashboard/performance/_components/suppliersItems/_components/SupplierItem/StatCard.tsx`

Réutiliser pour la vue détaillée avec les bonnes données du chauffeur sélectionné.

### To-dos

- [ ] Modifier la logique de sélection de chauffeur (single select au lieu de multi-select)
- [ ] Créer le composant DriverDetailView avec header et layout principal
- [ ] Créer le composant DriverScoreCard avec graphique circulaire et métriques
- [ ] Créer le composant RevenueWithTableCard avec graphique et tableau synchronisés
- [ ] Créer le composant FormationsTableCard avec tableau de formations
- [ ] Intégrer DriverDetailView dans ResumeChauffeurs avec gestion conditionnelle
- [ ] Connecter la gestion d'état entre page.tsx, LeftSide, DriverList et ResumeChauffeurs