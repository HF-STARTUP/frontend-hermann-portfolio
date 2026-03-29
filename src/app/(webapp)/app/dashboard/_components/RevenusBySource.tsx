"use client";

import React, { useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { EmptyData } from "@/components/box/PageNetworkState";

ChartJS.register(ArcElement, Tooltip, Legend);

const PREDEFINED_COLORS = ['#2563eb', '#10b981'];

export interface RevenueData {
  category: string;
  amount: number | string;
  percentage: number | string;
}

const RevenueBySourceChart = ({ 
  data, 
  currency, 
  totalRevenus, 
  chartValues, 
  isLoading 
}: { 
  data: RevenueData[], 
  currency?: string, 
  totalRevenus: string, 
  chartValues?: number[], 
  isLoading?: boolean  
}) => {

  const labels = data.map(d => d.category);

  const chartData = {
    labels,
    datasets: [
      {
        data: chartValues,
        backgroundColor: PREDEFINED_COLORS,
        borderWidth: 0,
        borderRadius: 15,
        spacing: 10,
        cutout: '75%',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1e293b',
        padding: 12,
        borderRadius: 10,
      }
    },
  };

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-2xl animate-pulse">
        <div className="h-8 w-48 bg-gray-200 rounded mb-6"></div>
        <div className="flex justify-center items-center h-80 w-full">
          <div className="rounded-full border-[20px] border-gray-100 h-64 w-64 flex flex-col items-center justify-center">
             <div className="h-4 w-12 bg-gray-200 rounded mb-2"></div>
             <div className="h-6 w-24 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="mt-8 space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-gray-200" />
                <div className="h-4 w-32 bg-gray-200 rounded" />
              </div>
              <div className="h-4 w-16 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl h-full flex flex-col">
      <h2 className="text-2xl font-semibold text-vaTextPrimary mb-6">Revenus par source</h2>
      
      {!isLoading && !data.length ? (
        <div className="flex-1 flex items-center justify-center py-10">
          <EmptyData message="Aucun revenu enregistré" description="Aucune source de revenu n'a ete trouver" />
        </div>
      ) : (
        <>
          <div className="relative h-80 w-full flex items-center justify-center">
            <Doughnut data={chartData} options={options} />
            <div className="absolute flex flex-col items-center justify-center pointer-events-none">
              <span className="text-vaLightGray text-lg font-semibold tracking-wider">Total</span>
              <span className="text-2xl font-black text-black">
                {totalRevenus} <span className="text-lg font-bold">{currency}</span>
              </span>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            {data.map((item, index) => (
              <div key={index} className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: PREDEFINED_COLORS[index] }} 
                  />
                  <span className="text-vaLightGray font-semibold text-lg">
                    {item.category}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-vaTextPrimary text-lg">
                    {item.amount} <span className="text-xs font-normal">{currency}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default RevenueBySourceChart;