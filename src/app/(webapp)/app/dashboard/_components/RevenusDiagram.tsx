"use client";

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

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const RevenueChart = ({ chartLabels,
    chartValues,
    variation,
    totalRevenus,
    currency }: {
        chartLabels: string[], chartValues: number[], variation: {
            percent: string;
            variation: "up" | "down" | "constant";
            amount: string
        }, totalRevenus: string, currency?: string
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
                    stepSize: 150000,
                    callback: (value) => `${Number(value) / 1000} K`,
                    color: "#6b7290",
                },
                // grid: {
                //     borderDash: [5, 5],
                // },
            },
        },
    };

    return (
        <div className="w-full rounded-2xl bg-white p-6 h-full">
            {/* Header */}
            <div className="mb-6">
                <h2 className="font-semibold text-vaTextPrimary text-2xl">
                    Évolution des revenus
                </h2>

                <div className="mt-2 flex flex-col gap-1">
                    <span className="text-3xl font-bold text-black">
                        {totalRevenus} <span className="text-sm">{currency}</span>
                    </span>
                
                    <span className="font-medium flex items-center gap-2 text-xs text-vaTextPrimary">
                        <div className={cn("py-1 px-2 rounded-full flex items-center justify-center gap-2 text-xs", variation.variation === 'up' && 'bg-vaDarkGreen text-vaGreen', variation.variation === 'down' && 'bg-vaRed/10 text-vaRed', variation.variation === 'constant' && 'bg-vaOrange/10 text-vaOrange')}>
                            {variation.variation === 'up' && <TrendingUp className="size-3" />}
                            {variation.variation === 'down' && <TrendingDown className="size-3" />}
                            {variation.variation === 'constant' && <Minus className="size-3" />}
                            {variation.percent} ({variation.amount})
                        </div> vs mois précédent
                    </span>
                </div>
            </div>

            {/* Chart */}
            <div className="h-[27rem]">
                <Bar data={data} options={options} />
            </div>
        </div>
    );
};

export default RevenueChart;