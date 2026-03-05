"use client";

import React, { useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { formatNumber } from '@/lib/utils';

// Enregistrement des éléments nécessaires pour Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const PREDEFINED_COLORS = [
  '#2563eb', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6',
  '#ec4899', '#06b6d4', '#f97316', '#64748b', '#22c55e'
];

export interface RevenueData {
  name: string;
  value: number;
}

const RevenueBySourceChart = ({ data, currency }: { data: RevenueData[], currency?:string }) => {
  const total = useMemo(() => data.reduce((acc, item) => acc + item.value, 0), [data]);

  // Préparation des données et des couleurs aléatoires
  const { labels, values, colors } = useMemo(() => {
    const shuffledColors = [...PREDEFINED_COLORS].sort(() => Math.random() - 0.5);
    return {
      labels: data.map(d => d.name),
      values: data.map(d => d.value),
      colors: data.map((_, i) => shuffledColors[i % shuffledColors.length])
    };
  }, [data]);

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: values,
        backgroundColor: colors,
        borderWidth: 0,
        borderRadius: 15, // Donne l'effet arrondi des segments
        spacing: 10,      // Crée l'espace entre les segments
        cutout: '75%',    // Taille du trou central
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // On utilise notre propre légende personnalisée
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#1e293b',
        padding: 12,
        borderRadius: 10,
      }
    },
  };

  return (
    <div className="bg-white p-6 rounded-2xl">
      <h2 className="text-2xl font-semibold text-vaTextPrimary mb-6">Revenus par source</h2>
      
      <div className="relative h-80 w-full flex items-center justify-center">
        <Doughnut data={chartData} options={options} />
        
        {/* Texte Central */}
        <div className="absolute flex flex-col items-center justify-center z-0">
          <span className="text-vaLightGray text-lg font-semibold tracking-wider">Total</span>
          <span className="text-2xl font-black text-black">
            {formatNumber(total)} <span className="text-lg font-bold">{ currency }</span>
          </span>
        </div>
      </div>

      {/* Légende personnalisée (correspond à ton image) */}
      <div className="mt-8 space-y-4 overflow-y-auto max-h-40 custom-scrollbar">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: colors[index] }} 
              />
              <span className="text-vaLightGray font-semibold text-lg">
                {item.name}
              </span>
            </div>
            <div className="text-right">
              <span className="font-bold text-vaTextPrimary text-lg">
                {formatNumber(item.value)} <span className="text-xs font-normal">{ currency }</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenueBySourceChart;