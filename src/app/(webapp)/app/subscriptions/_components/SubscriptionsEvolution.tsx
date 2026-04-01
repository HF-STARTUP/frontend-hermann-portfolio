import CardTitle from "@/components/ui/custom/CardTitle";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Circle } from "lucide-react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";
import { SubscriptionsEvolutionModel } from "@/model/subscription/SubscriptionEvolutionModel";
import Loading from "@/components/ui/Loader";
import { Dispatch, SetStateAction } from "react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

const DISTINCT_COLORS = [
    "#ff9900", "#018bfb", "#6d00fb", "#00a757", "#ef4444",
    "#06b6d4", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981",
    "#3b82f6", "#6366f1", "#d946ef", "#f43f5e", "#14b8a6",
    "#fbbf24", "#2dd4bf", "#a855f7", "#22c55e", "#64748b"
];

const SubscriptionsEvolution = ({
    evolutionData,
    groupBy,
    isLoading,
    setGroupBy,
}: {
    evolutionData?: SubscriptionsEvolutionModel,
    groupBy?: "day" | "week",
    isLoading?: boolean,
    setGroupBy: Dispatch<SetStateAction<"day" | "week">>;

}) => {

    const planNames = evolutionData?.allPlanNames || [];

    const chartData = {
        labels: evolutionData?.labels || [],
        datasets: planNames.map((planName, index) => {
            const color = DISTINCT_COLORS[index % DISTINCT_COLORS.length];

            return {
                label: planName,
                data: evolutionData?.getPlanData(planName) || [],
                borderColor: color,
                backgroundColor: (context: any) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                    gradient.addColorStop(0, `${color}26`);
                    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
                    return gradient;
                },
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 5,
            };
        }),
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                mode: "index" as const,
                intersect: false,
                padding: 12,
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                titleColor: "#1e293b",
                bodyColor: "#475569",
                borderColor: "#e2e8f0",
                borderWidth: 1,
                bodySpacing: 8,
            },
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { color: "#94a3b8", font: { size: 12 } }
            },
            y: {
                beginAtZero: true,
                grid: { color: "#f1f5f9" },
                ticks: { color: "#94a3b8", font: { size: 12 } }
            },
        },
    };

    return (
        <div className="rounded-2xl bg-white p-6 flex flex-col space-y-6 h-full border border-slate-100">
            <div className="flex items-center justify-between">
                <CardTitle title="Évolution des abonnements" />

                <Select value={groupBy} onValueChange={(value: "day" | "week") => setGroupBy(value)} defaultValue="day">
                    <SelectTrigger className="bg-vaDarkBlue text-vaMainBlue font-semibold border-none outline-none">
                        <SelectValue placeholder="Grouper par" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="day">Par jour</SelectItem>
                        <SelectItem value="week">Par semaine</SelectItem>
                    </SelectContent>
                </Select>
                {/* {groupBy} */}
            </div>

            {/* Légende Dynamique */}
            <div className="legend flex items-center gap-x-6 gap-y-3 flex-wrap">
                {chartData.datasets.map((ds, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <Circle
                            className="size-3 fill-current"
                            style={{ color: ds.borderColor as string }}
                        />
                        <p className="font-semibold text-sm text-slate-700">{ds.label}</p>
                    </div>
                ))}
            </div>

            <div className="h-80 relative mt-4">
                {isLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/60 z-10">
                        <Loading />
                    </div>
                ) : (
                    <Line data={chartData} options={options} />
                )}
            </div>
        </div>
    );
};

export default SubscriptionsEvolution;