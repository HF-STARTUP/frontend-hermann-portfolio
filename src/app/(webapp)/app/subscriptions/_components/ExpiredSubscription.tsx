import CardTitle from "@/components/ui/custom/CardTitle"
import { Chart } from "react-chartjs-2";
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
import { Circle } from "lucide-react";


ChartJS.register(
    LinearScale, CategoryScale, BarElement,
    PointElement, LineElement, Legend, Tooltip, Filler
);
const ExpiredSubscriptions = () => {

    // 1. On utilise le type "bar" pour le composant maître, 
    // mais on autorise les datasets à être de n'importe quel type compatible
    const data = {
        labels: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
        datasets: [
            {
                type: 'bar',
                label: 'Renouvellements',
                data: [20, 23, 21, 4, 12, 22, 30],
                backgroundColor: '#018bfb',
                borderRadius: 10,
                barPercentage: 0.9,
            },
            {
                type: 'bar',
                label: 'Abonnements expirés',
                data: [10, 13, 11, 14, 2, 12, 10],
                backgroundColor: '#2554ae',
                borderRadius: 10,
                barPercentage: 0.9,
            },
        ],
    };

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
                grid: { display: false },
                ticks: { color: '#6b7280' },
            },
        },
    };
    return (
        <div className="rounded-2xl bg-white p-6 flex flex-col space-y-6">
            <CardTitle title="Renouvellements Vs Abonnements expirés" />
            <div className="h-80">
                <Chart type="bar" data={data as any} options={options} />
            </div>
            <div className="legend flex items-center gap-4 flex-wrap justify-center">
                <div className="flex items-center gap-2">
                    <Circle className="size-4 text-vaBlue fill-current" />
                    <p className="font-semibold text-lg text-vaTextPrimary">Renouvellements</p>
                </div>
                <div className="flex items-center gap-2">
                    <Circle className="size-4 text-vaMainBlue fill-current" />
                    <p className="font-semibold text-lg text-vaTextPrimary">Abonnements expirés</p>
                </div>
            </div>
        </div>
    )
}

export default ExpiredSubscriptions