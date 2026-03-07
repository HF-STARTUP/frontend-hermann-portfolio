"use client";

import React, { useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { formatNumber } from '@/lib/utils';
import CardTitle from '@/components/ui/custom/CardTitle';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

ChartJS.register(ArcElement, Tooltip, Legend);

// Couleurs fixes : Vert (Hommes), Bleu (Femmes), Gris (Non spécifié)
const AUDIENCE_COLORS = ['#bbf7d0', '#bae6fd', '#f1f5f9'];

export interface AudienceData {
    name: string;
    value: number;
}

const AudienceChart = ({ data, total }: { data: AudienceData[], total : number }) => {

    const chartData = {
        labels: data.map(d => d.name),
        datasets: [
            {
                data: data.map(d => d.value),
                backgroundColor: AUDIENCE_COLORS,
                borderWidth: 0,
                borderRadius: 20,
                spacing: 2,
                cutout: '80%',
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                enabled: true,
                callbacks: {
                    // Affiche le pourcentage dans le tooltip pour plus de clarté
                    label: (context: any) => {
                        const val = context.raw;
                        const percent = ((val / total) * 100).toFixed(1);
                        return ` ${context.label}: ${percent}%`;
                    }
                }
            }
        },
    };

    return (
        <div className="bg-white p-6 rounded-2xl h-full">
            <div className="flex items-center justify-between w-full flex-wrap">
                <CardTitle title='Public atteint' />
                <Select>
                    <SelectTrigger className='bg-vaLightGray/10 border-none rounded-xl text-vaLightGray min-w-40 w-fit -mt-5'>
                        <SelectValue placeholder="Periode" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='this-week'>Cette semaine</SelectItem>
                        <SelectItem value='this-month'>Ce mois</SelectItem>
                        <SelectItem value='today'>Aujourd'hui</SelectItem>
                        <SelectItem value='yesterday'>Hier</SelectItem>
                        <SelectItem value='custom'>Personnaliser</SelectItem>
                    </SelectContent>
                </Select>
            </div>


            <div className="relative h-72 w-full mt-4 flex items-center justify-center">
                <Doughnut data={chartData} options={options} />

                {/* Centre du graphique : Total Audience */}
                <div className="absolute flex flex-col items-center justify-center text-center">
                    <span className="text-slate-400 text-sm font-medium">Total Audience</span>
                    <span className="text-3xl font-bold text-slate-900">
                        {formatNumber(total)}
                    </span>
                </div>
            </div>

            {/* Légende horizontale centrée */}
            <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-2">
                {data.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: AUDIENCE_COLORS[index % AUDIENCE_COLORS.length] }}
                        />
                        <span className="text-slate-600 font-semibold text-sm">
                            {item.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AudienceChart;