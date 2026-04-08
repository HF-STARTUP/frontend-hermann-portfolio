"use client";

import React, { JSX, useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions, ChartData } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { sampleSize } from 'lodash';
import { formatNumber } from '@/lib/utils';
import CardTitle from '@/components/ui/custom/CardTitle';
import { useGetActiveCurrency } from '@/hooks/__globlal/useGlobalHook';
import { CommissionByPaymentMethodModel } from '@/model/transactions/CommisionsByPayment';

ChartJS.register(ArcElement, Tooltip, Legend);

const Skeleton = ({ className }: { className?: string }) => (
    <div className={`animate-pulse bg-gray-100 rounded-md ${className}`} />
);

interface CommissionVTCCChartProps {
    data?: CommissionByPaymentMethodModel;
    title?: string;
    isLoading?: boolean
}

const COLOR_PALETTE = [
    '#0047AB', '#FBBF24', '#38BDF8', '#A78BFA',
    '#F472B6', '#4ADE80', '#F97316', '#64748B'
];

const CommissionVTCCChart = ({
    data,
    title = "Répartition par moyen de paiement",
    isLoading = false
}: CommissionVTCCChartProps): JSX.Element => {
    const { currency } = useGetActiveCurrency();
    const totalValue = data?.total || 0;
    const hasData = data && data.byPaymentMethod.length > 0;

    const processedData = useMemo(() => {
        if (!data) return [];
        const colors = sampleSize(COLOR_PALETTE, data.byPaymentMethod.length);

        return data.byPaymentMethod.map((model, index) => ({
            name: model.name,
            value: model.amount,
            color: colors[index],
            formattedAmount: model.formattedAmount,
            percentage: model.formattedPercentage
        }));
    }, [data]);

    const chartData: ChartData<"doughnut"> = {
        labels: hasData ? processedData.map(d => d.name) : ["Aucune donnée"],
        datasets: [
            {
                data: hasData ? processedData.map(d => d.value) : [1],
                backgroundColor: hasData ? processedData.map(d => d.color) : ["#f3f4f6"],
                borderWidth: 0,
                ...({
                    circumference: 180,
                    rotation: 270,
                    borderRadius: hasData ? 8 : 0,
                    cutout: '75%',
                } as any),
            },
        ],
    };

    const options: ChartOptions<"doughnut"> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: { enabled: hasData },
        },
    };

    return (
        <div className="w-full p-6 bg-white rounded-2xl border border-gray-100">
            <div className="mb-6">
                {isLoading ? <Skeleton className="h-7 w-48" /> : <CardTitle title={title} />}
            </div>

            <div className="h-[220px] relative">
                {isLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center pt-10">
                        {/* Shimmer circulaire pour imiter le Doughnut */}
                        <div className="w-48 h-48 rounded-full border-[18px] border-gray-50 border-t-gray-100 animate-spin" />
                    </div>
                ) : (
                    <Doughnut data={chartData} options={options} />
                )}

                {/* Valeur Totale au centre */}
                <div className="absolute inset-x-0 bottom-4 text-center flex flex-col items-center">
                    <p className="text-sm font-medium text-gray-400">Total</p>
                    {isLoading ? (
                        <Skeleton className="h-10 w-32 mt-1" />
                    ) : (
                        <div className="flex items-baseline gap-1.5 font-bold text-slate-900">
                            <span className="text-3xl">{formatNumber(totalValue)}</span>
                            <span className="text-lg">{currency}</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Légende HTML */}
            <div className="space-y-3 mt-6 max-h-64 overflow-y-auto custom-scrollbar">
                {isLoading ? (
                    [1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <Skeleton className="w-3 h-3 rounded-full" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                            <Skeleton className="h-4 w-20" />
                        </div>
                    ))
                ) : !hasData ? (
                    <div className="text-center py-4 text-gray-400 text-sm italic">
                        Aucune transaction enregistrée
                    </div>
                ) : (
                    processedData.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span
                                    className="w-2.5 h-2.5 rounded-full"
                                    style={{ backgroundColor: item.color }}
                                />
                                <span className="font-semibold text-slate-700">{item.name}</span>
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="font-extrabold text-slate-900">{formatNumber(item.value)}</span>
                                <span className="font-medium text-xs text-vaLightGray">{currency}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CommissionVTCCChart;