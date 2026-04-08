"use client";

import React, { Dispatch, JSX } from 'react';
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
} from 'chart.js';
import { Chart } from 'react-chartjs-2';
import { Circle } from 'lucide-react';
import CardTitle from '@/components/ui/custom/CardTitle';
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TransactionsParams } from '@/types/transactions.type';
import { useGetActiveCurrency } from '@/hooks/__globlal/useGlobalHook';
import { formatNumber } from '@/lib/utils';

ChartJS.register(
    LinearScale, CategoryScale, BarElement,
    PointElement, LineElement, Legend, Tooltip, Filler
);

// --- Composant Skeleton Local ---
const Skeleton = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <div
        className={`animate-pulse bg-gray-100 rounded ${className}`}
        style={style}
    />
);

const TransactionEvolutionChart = ({
    chartLabel = [],
    commissionValues = [],
    incomingValues = [],
    outgoingValues = [],
    isLoading = true,
    transacFilters
}: {
    chartLabel?: string[],
    commissionValues?: number[],
    incomingValues?: number[],
    outgoingValues?: number[],
    isLoading?: boolean,
    transacFilters: Dispatch<React.SetStateAction<TransactionsParams>>
}): JSX.Element => {

    const { currency } = useGetActiveCurrency()

    const data: any = {
        labels: chartLabel,
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

    const options: any = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function (context: any) {
                        let label = context.dataset.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += formatNumber(context.parsed.y) + ' ' + currency;
                        }
                        return label;
                    }
                }
            },
        },
        scales: {
            x: { grid: { display: false }, ticks: { color: '#6b7280' } },
            y: {
                beginAtZero: true,
                ticks: {
                    color: '#6b7280',
                    callback: function (value: any) {
                        return formatNumber(value);
                    }
                },
            },
        },
    };

    return (
        <div className="w-full p-6 bg-white rounded-2xl h-full border border-gray-100">
            {/* Header Skeleton / Content */}
            <div className="mb-8">
                {isLoading ? (
                    <div className="space-y-4">
                        <Skeleton className="h-7 w-1/3" />
                        <div className="flex gap-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <Skeleton className="h-3 w-3 rounded-full" />
                                    <Skeleton className="h-4 w-24" />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="flex items-center justify-between">
                            <CardTitle title='Évolution des transactions' />
                            <Select defaultValue='day' onValueChange={(value) => transacFilters(prev => ({
                                ...prev,
                                group_by: value as "week" | "day",
                            })
                            )}>
                                <SelectTrigger className="rounded-xl">
                                    <SelectValue placeholder="Periode" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="day">Jour</SelectItem>
                                    <SelectItem value="week">Semaine</SelectItem>
                                    {/* <SelectItem value="month">Mois</SelectItem>
                                    <SelectItem value="year">Année</SelectItem> */}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex flex-wrap gap-6 text-sm text-vaTextPrimary">
                            <div className="flex items-center gap-2">
                                <Circle size={12} className="text-vaGreen fill-current" />
                                <span>Trans. Entrantes</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Circle size={12} className="text-vaOrange fill-current" />
                                <span>Commissions</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Circle size={12} className="text-vaRed fill-current" />
                                <span>Trans. Sortantes</span>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Chart Skeleton / Content */}
            <div className="h-[400px] w-full relative">
                {isLoading ? (
                    <div className="flex h-full w-full">
                        {/* Simulation de l'axe Y (lignes de grille) */}
                        <div className="flex flex-col justify-between h-full pr-4 pb-8">
                            {[1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-2 w-8" />)}
                        </div>

                        {/* Simulation des barres du graphique */}
                        <div className="flex-1 flex items-end justify-between gap-2 px-2 pb-8 border-l border-b border-gray-50">
                            {Array.from({ length: 14 }).map((_, i) => (
                                <div key={i} className="flex flex-col items-center gap-1 w-full">
                                    <Skeleton
                                        className="w-full opacity-40"
                                        style={{ height: `${Math.floor(Math.random() * 60) + 20}%` }}
                                    />
                                    <Skeleton className="h-2 w-full mt-2" /> {/* Label X skeleton */}
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <Chart type="bar" data={data} options={options} />
                )}
            </div>
        </div>
    );
};

export default TransactionEvolutionChart;