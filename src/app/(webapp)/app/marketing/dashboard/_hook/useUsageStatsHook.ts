import { useMemo } from 'react';

export interface UsageData {
  name: string;
  count: number;
  color: string;
}

export const useUsageStatsHook = () => {
  const data: UsageData[] = useMemo(() => [
    { name: 'Tableau de bord', count: 285, color: '#1e40af' }, // Bleu foncé
    { name: 'Flottes', count: 845, color: '#0ea5e9' },        // Bleu ciel
    { name: 'État de parc', count: 245, color: '#f87171' },   // Rouge/Corail
    { name: 'Finances', count: 275, color: '#fbbf24' },       // Orange/Jaune
    { name: 'Performances', count: 235, color: '#94a3b8' },   // Gris/Bleu
    { name: 'GPS', count: 250, color: '#6366f1' },            // Indigo
    { name: 'Commission', count: 125, color: '#60a5fa' },     // Bleu clair
    { name: 'Paramètres', count: 300, color: '#3b82f6' },     // Royal Blue
  ], []);

  return { data };
};