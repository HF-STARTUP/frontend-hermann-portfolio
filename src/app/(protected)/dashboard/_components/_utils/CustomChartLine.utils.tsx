"use client"

import {Line} from "react-chartjs-2";
import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement,
    ArcElement,
} from 'chart.js';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);
export const getRandomNumber = () => {
    const min = 100;
    const max = 2000;
    const random = Math.random()

    const randomNumber = Math.floor(random * (max - min + 1)) + min;

    return randomNumber;
}

const CustomChartLineUtils:React.FC<{isWeekly?: boolean}> = ({isWeekly = false})=> {

    const datasetConfBase = {
        backgroundColor: 'white',
        fill: true,
        label: '2024',
        tension: 0.3,
        borderWidth: 4,
        pointRadius: 0,
        hoverRadius: 5,
        pointHitRadius: 50
    }

    const driverData = {
        labels: ['JAN', 'FEV', 'MAR', 'AVR', 'MAI', 'JUI', "JUL", "AOUT", "SEPT", "OCT", "NOV", "DEC"],
        datasets: [
            {
                data: [getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(),],
                borderColor: "#205DD3",
                ...datasetConfBase
            },
            {
                data: [getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(),],
                borderColor: "#FFC700",
                ...datasetConfBase
            }
        ]
    }

    const driverDataWeekly = {
        labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Semadi', 'Dimanche'],
        datasets: [
            {
                data: [getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber()],
                borderColor: "#205DD3",
                ...datasetConfBase
            },
            {
                data: [getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber()],
                borderColor: "#FFC700",
                ...datasetConfBase
            }
        ]
    }

    const options = {
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                ticks:{
                    display: false,
                    beginAtZero: true,
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
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: false,
            },
        },
    }


    return (
        <div className={`w-full grow h-[275px]`}>
            <Line data={isWeekly ? driverDataWeekly : driverData} options={options} width={100} height={100}/>
        </div>
    )
}

export const CustomChartLineUtils2:React.FC<{isWeekly?: boolean}> = ({isWeekly = false})=> {

    const datasetConfBase = {
        backgroundColor: 'white',
        fill: true,
        label: '2024',
        tension: 0.3,
        borderWidth: 4,
        pointRadius: 0,
        hoverRadius: 5,
        pointHitRadius: 50
    }

    const driverData = {
        labels: ['JAN', 'FEV', 'MAR', 'AVR', 'MAI', 'JUI', "JUL", "AOUT", "SEPT", "OCT", "NOV", "DEC"],
        datasets: [
            {
                data: [0,0,0,0,0,0],
                borderColor: "#FFC700",
                ...datasetConfBase
            }
        ]
    }

    const driverDataWeekly = {
        labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Semadi', 'Dimanche'],
        datasets: [
            {
                data: [getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber()],
                borderColor: "#205DD3",
                ...datasetConfBase
            },
            {
                data: [getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber()],
                borderColor: "#FFC700",
                ...datasetConfBase
            }
        ]
    }

    const options = {
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                // ticks:{
                //     //display: false,
                //     beginAtZero: true,
                // },
                grid: {
                    display: false,
                    drawBorder: false
                },
                border: {
                    display: false
                }
            }
        },
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: false,
            },
        },
    }


    return (
        <div className={`w-full grow h-[275px]`}>
            <Line data={isWeekly ? driverDataWeekly : driverData} options={options} width={100} height={100}/>
        </div>
    )
}


export const CustomChartLineUtils3:React.FC<{isWeekly?: boolean, idata: number[], ilabels: string[]}> = ({isWeekly = false, idata, ilabels})=> {

    const datasetConfBase = {
        backgroundColor: 'white',
        fill: true,
        label: '2024',
        tension: 0.3,
        borderWidth: 4,
        pointRadius: 0,
        hoverRadius: 5,
        pointHitRadius: 50
    }

    const driverData = {
        labels: ilabels,
        datasets: [
            {
                data: idata,
                borderColor: "#FFC700",
                ...datasetConfBase
            }
        ]
    }

    const driverDataWeekly = {
        labels: ilabels,
        datasets: [
            {
                data: [getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber(), getRandomNumber()],
                borderColor: "#205DD3",
                ...datasetConfBase
            },
        ]
    }

    const options = {
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: {
                    display: false
                }
            },
            y: {
                // ticks:{
                //     //display: false,
                //     beginAtZero: true,
                // },
                grid: {
                    display: false,
                    drawBorder: false
                },
                border: {
                    display: false
                }
            }
        },
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: false,
            },
        },
    }


    return (
        <div className={`w-full grow h-[180px] lg:h-[275px]`}>
            <Line data={isWeekly ? driverDataWeekly : driverData} options={options} width={100} height={100}/>
        </div>
    )
}

export default CustomChartLineUtils

