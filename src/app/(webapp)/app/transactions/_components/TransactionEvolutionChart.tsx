"use client";

import React, { JSX } from 'react';
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    Filler,
    ChartOptions,
    ChartData,
    // Ajout du type spécifique pour les datasets mixtes
    ChartDataset
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { ArrowUpLeft, ArrowDownRight, Banknote, Circle } from 'lucide-react';
import CardTitle from '@/components/ui/custom/CardTitle';

ChartJS.register(
    LinearScale, CategoryScale, BarElement,
    PointElement, LineElement, Legend, Tooltip, Filler
);

const TransactionEvolutionChart = ({ chartLabel, commissionValues, incomingValues, outgoingValues }: { chartLabel: string[], commissionValues: number[], incomingValues: number[], outgoingValues: number[] }): JSX.Element => {
    const labels = chartLabel;

    // 1. On utilise le type "bar" pour le composant maître, 
    // mais on autorise les datasets à être de n'importe quel type compatible
    const data: ChartData<"bar" | "line", number[], string> = {
        labels,
        datasets: [
            {
                type: 'line' as const,
                label: 'Commissions',
                data: commissionValues,
                borderColor: '#FFC700',
                backgroundColor: '#FFC700',
                borderWidth: 5,
                tension: 0.4,
                pointRadius: 0,
            },
            {
                type: 'bar' as const,
                label: 'Trans. Entrantes',
                data: incomingValues,
                backgroundColor: '#216E58',
                borderRadius: 8,
                barPercentage: 0.6,
            },
            {
                type: 'bar' as const,
                label: 'Trans. Sortantes',
                data: outgoingValues,
                backgroundColor: '#F04A4A',
                borderRadius: 8,
                barPercentage: 0.6,
            },
        ],
    };

    // 2. Pour les options, on peut rester sur "bar" ou passer en "any" 
    // si TS râle sur des propriétés spécifiques à la ligne
    const options: any = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: { mode: 'index', intersect: false },
        },
        scales: {
            x: { grid: { display: false }, ticks: { color: '#6b7280' } },
            y: {
                min: 0,
                max: 600,
                ticks: { stepSize: 150, color: '#6b7280' },
            },
        },
    };

    return (
        <div className="w-full p-6 bg-white rounded-2xl h-full">
            <div className="mb-6">
                <CardTitle title='Évolution des transactions' />
                <div className="flex flex-wrap gap-6 text-base text-vaTextPrimary">
                    <div className="flex items-center gap-2">
                        <Circle size={16} className="text-vaGreen fill-current" />
                        <span>Trans. Entrantes</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Circle size={16} className="text-vaOrange fill-current" />
                        <span>Commissions</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Circle size={16} className="text-vaRed fill-current" />
                        <span>Trans. Sortantes</span>
                    </div>
                </div>
            </div>

            <div className="h-[400px]">
                {/* On peut utiliser n'importe quel type ici pour le graphique mixte */}
                <Chart type="bar" data={data} options={options} />
            </div>
        </div>
    );
};

export default TransactionEvolutionChart;