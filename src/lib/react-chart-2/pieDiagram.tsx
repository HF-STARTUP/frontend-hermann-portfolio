import React, { useEffect, useRef, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData, Chart } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { cn } from "@/lib/utils";

interface DataItem {
  name: string;
  value: number;
}

interface LegendProps {
  labels: string[];
  data: DataItem[];
  backgroundColors: string[];
  borderColors: string[];
  unit: string,
}

interface PieStatProps {
  label: string,
  unit: string,
  dataItems: DataItem[];
  backgroundColors: string[];
  borderColors: string[];
}

const LegendComponent: React.FC<LegendProps> = ({ labels, unit, data, backgroundColors, borderColors }) => {
  return (
      <ul className="flex justify-between mt-[19.41px]">
        {labels.map((label, index) => (
            <li className="flex items-center gap-[9.24px]" key={index}>
              <div className={cn("w-[10.61px] h-[10.61px] rounded-full border")}
                   style={{ backgroundColor: backgroundColors[index], borderColor: borderColors[index] }} />
              <div>
                <div className="text-zinc-800 text-sm font-bold font-yMulish leading-tight">{label}</div>
                <div className="text-zinc-800 text-[10px] font-normal font-yMulish capitalize leading-[14px]">{data[index].value} {unit}</div>
              </div>
            </li>
        ))}
      </ul>
  );
};

const PieStat: React.FC<React.HTMLAttributes<HTMLDivElement>&PieStatProps> = ({ dataItems, label, unit, backgroundColors, borderColors }) => {
  const chartRef = useRef<Chart<'doughnut', number[], string>>(null);
  const [labels, setLabels] = useState<string[]>([]);

  useEffect(() => {
    if (chartRef.current) {
      setLabels(chartRef.current.data.labels as string[]);
    }
  }, [chartRef]);

  ChartJS.register(ArcElement, Tooltip, Legend);

  const chartData: ChartData<'doughnut'> = {
    labels: dataItems.map(v => v.name),
    datasets: [
      {
        label: label,
        data: dataItems.map(v => v.value),
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
      <div className="py-[21px]">
        <Doughnut ref={chartRef} data={chartData} options={options} />
        {/*<LegendComponent unit={unit} labels={labels} data={dataItems} backgroundColors={backgroundColors} borderColors={borderColors} />*/}
      </div>
  );
};


export default PieStat