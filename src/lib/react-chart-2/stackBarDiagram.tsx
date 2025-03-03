"use client";

import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {Bar} from 'react-chartjs-2';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        x: {
            stacked: true,
            grid: {
                display: false
            }
        },
        y: {
            stacked: true,
            ticks: {
                //display: false,
                //beginAtZero: true,
            },
            grid: {
                display: false,
                drawBorder: false
            },
            border: {
                display: false
            }
        }
    },
    plugins: {
        title: {
            display: true,
            text: '',
        },
        legend: {
            display: false,
        },
    },
};


export default function StackBarChart({idata, ilabels}: { idata: any[], ilabels: any[] }) {
    const datas = {
        labels: ilabels,
        datasets: idata,
    }
    return <Bar options={options} data={datas} className={"min-h-[300px]"}/>
}
