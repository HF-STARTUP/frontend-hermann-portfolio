"use client";

import React, { JSX, useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { formatNumber } from '@/lib/utils';
// Note : Assure-toi que CardTitle est bien exporté par défaut ou ajuste l'import
import CardTitle from '@/components/ui/custom/CardTitle';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

ChartJS.register(ArcElement, Tooltip, Legend);

export interface UsageData {
  name: string;
  count: number;
  color: string;
}

const UsageStatsChart = ({ data }: { data: UsageData[] }): JSX.Element => {
  
  const totalVisits = useMemo(() => data.reduce((acc, item) => acc + item.count, 0), [data]);

  const dataWithPercentages = useMemo(() => {
    return data.map(item => ({
      ...item,
      calculatedPercent: totalVisits > 0 ? ((item.count / totalVisits) * 100).toFixed(1) : "0"
    }));
  }, [data, totalVisits]);

  const chartData = {
    labels: data.map(d => d.name),
    datasets: [
      {
        data: data.map(d => d.count),
        backgroundColor: data.map(d => d.color),
        borderWidth: 0,
        borderRadius: 20,
        spacing: 4, // Espace entre les tranches
        /* L'épaisseur se gère ici : 
           Plus le cutout est grand (ex: 90%), plus la tranche est fine.
           Plus il est petit (ex: 50%), plus la tranche est épaisse.
        */
        cutout: '75%', 
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: { padding: 10 },
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true, // Réactivé pour le survol
        backgroundColor: '#1e293b',
        titleFont: { size: 13 },
        bodyFont: { size: 12 },
        padding: 12,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          // Calcul du pourcentage au survol
          label: (context: any) => {
            const value = context.raw as number;
            const percentage = totalVisits > 0 ? ((value / totalVisits) * 100).toFixed(1) + "%" : "0%";
            return ` ${context.label} : ${percentage} (${formatNumber(value)} visites)`;
          }
        }
      }
    },
  };

  return (
    <div className="bg-white p-6 rounded-2xl w-full ">
      <div className="flex items-center justify-between w-full flex-wrap">
                <CardTitle title='Fonctionnalités les plus utilisées' />
                <Select defaultValue='web'>
                    <SelectTrigger className='bg-vaLightGray/10 border-none rounded-xl text-vaLightGray min-w-24 w-fit -mt-5'>
                        <SelectValue placeholder="Plateforme" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='web'>Web</SelectItem>
                        <SelectItem value='mobile'>Mobile</SelectItem>
                    </SelectContent>
                </Select>
            </div>

      {/* Conteneur du graphique avec le total au centre */}
      <div className="relative h-80 w-full mb-10 flex justify-center items-center">
        <Doughnut data={chartData} options={options} />
      </div>

      {/* Liste des détails en dessous */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-8">
        {dataWithPercentages.map((item, index) => (
          <div key={index} className="space-y-3">
            <div className="flex justify-between items-end gap-2">
              <span className="text-vaTextPrimary text-xs font-bold truncate">
                {item.name}
              </span>
              <span className="text-black font-bold text-xs whitespace-nowrap">
                {item.calculatedPercent}%
              </span>
            </div>
            
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-1000"
                style={{ 
                  width: `${item.calculatedPercent}%`, 
                  backgroundColor: item.color 
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsageStatsChart;