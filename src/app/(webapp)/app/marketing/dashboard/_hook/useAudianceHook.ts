import { useMemo } from 'react';
import { AudienceData } from '../_components/PublicAtteintChart';


export const useAudianceHook = () => {
  // Données basées sur ton image (1 200 000 au total)
  const data: AudienceData[] = useMemo(() => [
    { name: 'Hommes', value: 46300 },         // ~38.6%
    { name: 'Femmes', value: 70200 },         // ~58.6%
    { name: 'Non spécifié', value: 33600 },    // ~2.8% (ajusté pour le total)
  ], []);

  // Calcul du total pour l'affichage central
  const totalAudience = useMemo(() => 
    data.reduce((acc, item) => acc + item.value, 0), 
  [data]);

  return {
    data,
    totalAudience,
    isLoading: false, // Utile si tu ajoutes un fetch plus tard
  };
};