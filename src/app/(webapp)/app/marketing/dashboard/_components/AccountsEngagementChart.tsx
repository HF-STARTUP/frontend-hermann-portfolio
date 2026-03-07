"use client";
import React, { JSX } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import CardTitle from '@/components/ui/custom/CardTitle';
import { Circle } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const EngagementChart = ({chartLabels, createdAccountValues, activeUserAccount, innactiveAccountValue}:{chartLabels: string[], createdAccountValues: number[], activeUserAccount: number[], innactiveAccountValue: number[]}): JSX.Element => {
  
  // Fonction magique pour arrondir uniquement le sommet de la pile
  const getBorderRadius = (context: any) => {
    const chart = context.chart;
    const { datasetIndex, index } = context;
    const datasets = chart.data.datasets;

    // On cherche si un dataset au-dessus de celui-ci a de la donnée pour cette colonne
    for (let i = datasetIndex + 1; i < datasets.length; i++) {
      if (datasets[i].data[index] > 0) {
        return 0; // Il y a quelque chose au-dessus, donc on ne courbe pas
      }
    }
    return 8; // C'est le sommet, on arrondit
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
       display: false,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      }
    },
    scales: {
      x: {
        stacked: true,
        grid: { display: false },
        border: { display: false }
      },
      y: {
        stacked: true,
        beginAtZero: true,
        // On retire le "max: 250" fixe pour laisser Chart.js calculer 
        // la hauteur réelle de la pile (somme des 3 datasets)
        ticks: {
          stepSize: 100,
          color: '#94a3b8'
        },
        grid: {
          color: '#f1f5f9',
        },
        border: { dash: [4, 4], display: false } // Lignes pointillées pour le style
      },
    },
  };

  const labels = chartLabels;

  const data: ChartData<'bar'> = {
    labels,
    datasets: [
      {
        label: 'Comptes créés',
        data: createdAccountValues,
        backgroundColor: '#01BEFB',
        borderRadius: { topLeft: getBorderRadius, topRight: getBorderRadius } as any,
        borderSkipped: false, // Important pour que l'arrondi s'applique même si empilé
      },
      {
        label: 'Utilisateurs actifs',
        data: activeUserAccount,
        backgroundColor: '#00A757',
        borderRadius: { topLeft: getBorderRadius, topRight: getBorderRadius } as any,
        borderSkipped: false,
      },
      {
        label: 'Utilisateurs inactifs',
        data: innactiveAccountValue,
        backgroundColor: '#FFC700',
        borderRadius: { topLeft: getBorderRadius, topRight: getBorderRadius } as any,
        borderSkipped: false,
      },
    ],
  };

  return (
    <div className="w-full p-6 bg-white rounded-2xl">
      <CardTitle title="Vue d'ensemble comptes & engagement" />
      <div className="legeng flex items-center gap-4 space-x-8 flex-wrap">
        <div className="flex items-center gap-3">
            <Circle className='size-5 text-vaBlue fill-current' />
            <p className='text-base font-medium text-black'>Comptes crées</p>
        </div>
        <div className="flex items-center gap-3">
            <Circle className='size-5 text-vaGreen fill-current' />
            <p className='text-base font-medium text-black'>Utilisateurs actifs</p>
        </div>
        <div className="flex items-center gap-3">
            <Circle className='size-5 text-vaOrange fill-current' />
            <p className='text-base font-medium text-black'>Utilisateurs inactifs</p>
        </div>
      </div>
      <div className="h-[400px] mt-4">
        <Bar options={options} data={data} />
      </div>
    </div>
  );
};

export default EngagementChart;