"use client";

import React from "react";
import CardTitle from "@/components/ui/custom/CardTitle";
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
    ChartOptions,
} from "chart.js";
import { Minus, TrendingDown, TrendingUp } from "lucide-react";
import { Bar } from "react-chartjs-2";
import { RevenueChartLocalFilters } from "../_hook/useDashboardSectionsHooks";
import { PeriodType } from "@/types/dashboard.type";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const ChartShimmer = () => (
    <div className="space-y-4">
        {/* Header shimmer */}
        <div className="flex items-center justify-between mb-6">
            <div className="h-6 w-40 bg-gray-200 rounded animate-pulse" />
            <div className="h-10 w-32 bg-gray-200 rounded-xl animate-pulse" />
        </div>

        {/* Stats shimmer */}
        <div className="mb-6 space-y-2">
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
            <div className="h-6 w-56 bg-gray-200 rounded animate-pulse" />
        </div>

        {/* Chart bars shimmer */}
        <div className="flex items-end justify-between gap-3 h-80 pt-8">
            {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div
                        className="w-full bg-gray-200 rounded-t animate-pulse"
                        style={{ height: `${Math.random() * 70 + 20}%` }}
                    />
                    <div className="h-3 w-8 bg-gray-200 rounded animate-pulse" />
                </div>
            ))}
        </div>
    </div>
);

const RevenueChart = (
    { chartLabels,
        chartValues,
        variation,
        totalRevenus,
        currency,
        setLocalFilters,
        localFilters,
        isLoading
    }: {
        chartLabels: string[],
        chartValues: number[], 
        variation: {
            percent: string;
            variation: "up" | "down" | "constant";
            amount: string
        },
        totalRevenus: string,
        currency?: string,
        setLocalFilters: React.Dispatch<React.SetStateAction<RevenueChartLocalFilters>>,
        localFilters: RevenueChartLocalFilters,
        isLoading: boolean
    }) => {
    const labels = chartLabels

    const dataValues = chartValues

    const data = {
        labels,
        datasets: [
            {
                data: dataValues,
                borderRadius: 8,
                barThickness: 32,
                backgroundColor: "#6E98EB"
            },
        ],
    };

    const options: ChartOptions<"bar"> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: (ctx) =>
                        `${ctx.raw?.toLocaleString()} ${currency}`,
                },
            },
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: {
                    color: "#6b7280",
                    font: { size: 13 },
                },
            },
            y: {
                beginAtZero: true,
                ticks: {
                    callback: (value) => `${Number(value) / 1000} K`,
                    color: "#6b7290",
                },
            },
        },
    };

    return (
        <div className="w-full rounded-2xl bg-white p-6 h-full">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center justify-between">
                    <CardTitle title="Évolution des revenus" />
                    <Select value={localFilters.groupBy} onValueChange={(value) => setLocalFilters({ groupBy: value as PeriodType })}>
                        <SelectTrigger className="rounded-xl">
                            <SelectValue placeholder="Periode" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="day">Jour</SelectItem>
                            <SelectItem value="week">Semaine</SelectItem>
                            <SelectItem value="month">Mois</SelectItem>
                            <SelectItem value="year">Année</SelectItem>
                        </SelectContent>
                    </Select>
                </div>


            </div>
            {/* Chart */}
            {isLoading ? <ChartShimmer /> :
                <div className="h-[28rem]">
                    <div className="mb-8 flex flex-col gap-1">
                        <span className="text-3xl font-bold text-black">
                            {totalRevenus} <span className="text-sm">{currency}</span>
                        </span>

                        <span className="font-medium flex items-center gap-2 text-xs text-vaTextPrimary">
                            <div className={cn("py-1 px-2 rounded-full flex items-center justify-center gap-2 text-xs", variation.variation === 'up' && 'bg-vaDarkGreen text-vaGreen', variation.variation === 'down' && 'bg-vaRed/10 text-vaRed', variation.variation === 'constant' && 'bg-vaOrange/10 text-vaOrange')}>
                                {variation.variation === 'up' && <TrendingUp className="size-3" />}
                                {variation.variation === 'down' && <TrendingDown className="size-3" />}
                                {variation.variation === 'constant' && <Minus className="size-3" />}
                                {variation.percent} ({variation.amount})
                            </div> vs période précédente
                        </span>
                    </div>
                    <div className="h-[20rem]">
                        <Bar data={data} options={options} />
                    </div>

                </div>
            }


        </div>
    );
};

export default RevenueChart;