"use client";

import React, { JSX, useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions, ChartData } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { sampleSize } from 'lodash';
import { formatNumber } from '@/lib/utils';
import CardTitle from '@/components/ui/custom/CardTitle';

// Enregistrement des composants nécessaires pour Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

// --- Types ---

export interface PaymentData {
  id: string;
  name: string;
  value: number;
}

interface CommissionVTCCChartProps {
  data: PaymentData[];
  totalValue?: number;
  title?: string;
  currency?: string;
}

const COLOR_PALETTE = [
  '#0047AB', '#FBBF24', '#38BDF8', '#A78BFA', 
  '#F472B6', '#4ADE80', '#F97316', '#64748B'
];

const CommissionVTCCChart = ({ 
  data, 
  totalValue = 0, 
  title = "Répartition par moyen de paiement",
  currency = "XOF"
}: CommissionVTCCChartProps): JSX.Element => {

  // 1. Préparation des données et des couleurs aléatoires
  const processedData = useMemo(() => {
    const colors = sampleSize(COLOR_PALETTE, data.length);
    return data.map((item, index) => ({
      ...item,
      color: colors[index],
    }));
  }, [data]);

  // 2. Configuration de Chart.js
  const chartData: ChartData<"doughnut"> = {
    labels: processedData.map(d => d.name),
    datasets: [
      {
        data: processedData.map(d => d.value),
        backgroundColor: processedData.map(d => d.color),
        borderWidth: 0,
        // On force le typage ici pour inclure les options de rendu
        ...({
          circumference: 180,
          rotation: 270,
          borderRadius: 8,
          cutout: '75%',
        } as any), 
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }, // Légende personnalisée en HTML en dessous
      tooltip: { enabled: true },
    },
  };

  return (
    <div className="w-full p-6 bg-white rounded-2xl">
      <CardTitle title={title} />
      
      {/* Conteneur du Graphique */}
      <div className="h-[220px] relative">
        <Doughnut data={chartData} options={options} />
        
        {/* Valeur Totale au centre */}
        <div className="absolute inset-x-0 bottom-4 text-center flex flex-col items-center">
          <p className="text-sm font-medium text-gray-400">Total</p>
          <div className="flex items-baseline gap-1.5 font-bold text-slate-900">
            <span className="text-3xl">
              {formatNumber(totalValue)}
            </span>
            <span className="text-lg">{ currency }</span>
          </div>
        </div>
      </div>

      {/* Légende HTML personnalisée */}
      <div className="space-y-3 mt-4 max-h-64 overflow-y-auto custom-scrollbar">
        {processedData.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span 
                className="w-2.5 h-2.5 rounded-full" 
                style={{ backgroundColor: item.color }} 
              />
              <span className="font-semibold text-slate-700">{item.name}</span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-extrabold text-slate-900">{formatNumber(item.value)}</span>
              <span className="font-medium text-xs text-vaLightGray">{ currency }</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommissionVTCCChart;