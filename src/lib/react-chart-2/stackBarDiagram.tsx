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
import { Bar } from 'react-chartjs-2';


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
            ticks:{
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

const labels = ['01', '02', '03', '04', '05', '06'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: [200, 300, 100, 50, 180, 40],
            backgroundColor: '#FF716A',
        },
        {
            label: 'Dataset 2',
            data: [300, 120, 400, 50, 180, 50],
            backgroundColor: '#BFC2F5',
        },
        {
            label: 'Dataset 3',
            data: [250, 150, 100, 50, 180, 200],
            backgroundColor: '#FFDE6C',
        },
    ],
};

export default function StackBarChart() {
    return <Bar options={options} data={data} className={"min-h-[300px]"} />
}
