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
} from 'chart.js';
import { Circle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Loading from "@/components/ui/Loader";
import { Dispatch, SetStateAction } from "react";

ChartJS.register(
    LinearScale, CategoryScale, BarElement,
    PointElement, LineElement, Legend, Tooltip, Filler
);

interface ExpiredSubscriptionsProps {
    labels?: string[];
    expiredData?: number[];
    renewalData?: number[];
    isLoading?: boolean;
    groupBy?: "day" | "week";
    setGroupBy: Dispatch<SetStateAction<"day" | "week">>; 
}

const ExpiredSubscriptions = ({ 
    labels, 
    expiredData, 
    renewalData, 
    isLoading,
    groupBy,
    setGroupBy 
}: ExpiredSubscriptionsProps) => {

    const data = {
        labels: labels,
        datasets: [
            {
                type: 'bar' as const,
                label: 'Renouvellements',
                data: renewalData,
                backgroundColor: '#018bfb',
                borderRadius: 6,
                barPercentage: 0.6,
                categoryPercentage: 0.5,
            },
            {
                type: 'bar' as const,
                label: 'Abonnements expirés',
                data: expiredData,
                backgroundColor: '#2554ae',
                borderRadius: 6,
                barPercentage: 0.6,
                categoryPercentage: 0.5,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: { mode: 'index' as const, intersect: false },
        },
        scales: {
            x: { grid: { display: false }, ticks: { color: '#94a3b8' } },
            y: {
                beginAtZero: true,
                grid: { color: '#f3f4f6', drawTicks: false },
                border: { display: false },
                ticks: { color: '#94a3b8', stepSize: 1 },
            },
        },
    };

    return (
        <div className="rounded-2xl bg-white p-6 flex flex-col space-y-6 h-full border border-slate-100">
            <div className="flex items-center justify-between">
                <CardTitle title="Renouvellements Vs Abonnements expirés" />
                
                {/* onValueChange de Radix/Shadcn renvoie une string.
                   On doit la caster en "day" | "week" pour que le Dispatch l'accepte.
                */}
                <Select 
                    value={groupBy} 
                    onValueChange={(value: "day" | "week") => setGroupBy(value)}
                >
                    <SelectTrigger className="w-[150px] bg-vaDarkBlue text-vaMainBlue font-semibold border-none outline-none">
                        <SelectValue placeholder="Grouper par" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="day">Par jour</SelectItem>
                        <SelectItem value="week">Par semaine</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="h-80 relative">
                {isLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-10">
                        <Loading />
                    </div>
                ) : (
                    <Chart type="bar" data={data} options={options as any} />
                )}
            </div>

            <div className="legend flex items-center gap-6 flex-wrap justify-center pt-2">
                <div className="flex items-center gap-2">
                    <Circle className="size-3 text-[#018bfb] fill-current" />
                    <p className="font-semibold text-sm text-vaTextPrimary">Renouvellements</p>
                </div>
                <div className="flex items-center gap-2">
                    <Circle className="size-3 text-[#2554ae] fill-current" />
                    <p className="font-semibold text-sm text-vaTextPrimary">Abonnements expirés</p>
                </div>
            </div>
        </div>
    )
}

export default ExpiredSubscriptions;