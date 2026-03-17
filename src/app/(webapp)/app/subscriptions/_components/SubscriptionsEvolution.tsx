import CardTitle from "@/components/ui/custom/CardTitle"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Circle } from "lucide-react"
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Tooltip,
    Legend,
    Filler,
  } from "chart.js";


  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Tooltip,
    Legend,
    Filler
  );

const SubscriptionsEvolution = () => {

    const data = {
        labels: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
        datasets: [
            {
                label: "Essentiel",
                data: [20, 23, 4, 21, 25, 12, 10],
                borderColor: "#ff9900",
                backgroundColor: (context: any) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                    gradient.addColorStop(0, "rgba(55, 48, 163, 0.15)");
                    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
                    return gradient;
                },
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 5,
            },
            {
                label: "Croissance",
                data: [2, 3, 40, 39, 28, 1, 17],
                borderColor: "#018bfb",
                backgroundColor: (context: any) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                    gradient.addColorStop(0, "rgba(14, 165, 233, 0.15)");
                    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
                    return gradient;
                },
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 5,
            },
            {
                label: "Performance",
                data: [21, 32, 36, 2, 31, 12, 37],
                borderColor: "#6d00fb",
                backgroundColor: (context: any) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                    gradient.addColorStop(0, "rgba(14, 165, 233, 0.15)");
                    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
                    return gradient;
                },
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 5,
            },
            {
                label: "Elite",
                data: [22, 32, 44, 19, 18, 14, 19],
                borderColor: "#00a757",
                backgroundColor: (context: any) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                    gradient.addColorStop(0, "rgba(14, 165, 233, 0.15)");
                    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
                    return gradient;
                },
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 5,
            }
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                mode: "index" as const,
                intersect: false,
            },
        },
        scales: {
            x: { grid: { display: false } },
            y: {               
                grid: { display: false },
            },
        },
    };

    return (
        <div className="rounded-2xl bg-white p-6 flex flex-col space-y-6">
            <div className="flex items-center justify-between">
                <CardTitle title="Évolution des abonnements" />
                <Select defaultValue="PROFESSIONEL">
                    <SelectTrigger className="bg-vaDarkBlue text-vaMainBlue font-semibold">
                        <SelectValue placeholder="Type de compte" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="PROFESSIONEL">
                            Professionnel
                        </SelectItem>
                        <SelectItem value="PARTICULIER">
                            Particulier
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div className="legend flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                    <Circle className="size-4 text-vaOrange fill-current" />
                    <p className="font-semibold text-lg text-vaTextPrimary">Essentiel</p>
                </div>
                <div className="flex items-center gap-2">
                    <Circle className="size-4 text-vaBlue fill-current" />
                    <p className="font-semibold text-lg text-vaTextPrimary">Croissance</p>
                </div>
                <div className="flex items-center gap-2">
                    <Circle className="size-4 text-vaPurple fill-current" />
                    <p className="font-semibold text-lg text-vaTextPrimary">Performance</p>
                </div>
                <div className="flex items-center gap-2">
                    <Circle className="size-4 text-vaGreen fill-current" />
                    <p className="font-semibold text-lg text-vaTextPrimary">Elite</p>
                </div>
            </div>

            <div className="h-80">
                <Line data={data} options={options} />
            </div>
        </div>
    )
}

export default SubscriptionsEvolution