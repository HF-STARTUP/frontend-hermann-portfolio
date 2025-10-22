/**
 * Export central pour les composants de liste de flottes
 * 
 * Utilisations:
 * - FleetListReactTable : Version de base avec tri et footer
 * - FleetListAdvanced : Version avec recherche et export
 * - FleetListWithPagination : Version paginée pour grandes listes
 */

// Composants principaux
export { FleetListReactTable, FleetListReactTable as default } from "./fleetListWithReactTable";
export { FleetListAdvanced } from "./fleetListAdvanced";
export { FleetListWithPagination } from "./fleetListWithPagination";

// Configuration des colonnes
export { fleetColumns, calculateFleetFooterData } from "./fleetColumns";

// Composants utilitaires
export { AbonStatusBadge, SubscriptionBadge } from "./fleetColumns";

