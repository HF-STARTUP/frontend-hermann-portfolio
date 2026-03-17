"use client";

import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import CardTitle from "@/components/ui/custom/CardTitle";
import { formatNumber } from "@/lib/utils";

ChartJS.register(ArcElement, Tooltip, Legend);

// --- Interfaces ---

interface PaymentMethod {
  label: string;
  amount: string;
  percentage: number;
  color: string;
}

interface RepartitionProps {
  title?: string;
  methods?: PaymentMethod[];
}

// --- Sous-composant Interne ---

const PaymentMethodItem = ({ 
  label, 
  amount, 
  percentage, 
  color 
}: PaymentMethod) => {
  const data = {
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: [color, "#e5e7eb"], // Gris clair tailwind (gray-200)
        borderWidth: 0,
        borderRadius: 10,
        cutout: "65%",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false },
    },
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Graphique avec texte central */}
      <div className="relative h-32 w-32 md:h-40 md:w-40">
        <Doughnut data={data} options={options} />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl md:text-2xl font-bold" style={{ color }}>
            {percentage}%
          </span>
        </div>
      </div>

      {/* Libellés */}
      <div className="text-center">
        <p className="text-vaTextPrimary font-medium">{label}</p>
        <p className="text-lg font-bold text-black">
          {amount} <span className="text-xs font-semibold">XOF</span>
        </p>
      </div>
    </div>
  );
};

// --- Composant Principal ---

const RepartitionByPaymentMethods = ({
  title = "Répartition des abonnements par moyen de paiement",
  methods = [
    { label: "Wave", amount: formatNumber(1338750), percentage: 46, color: "#1e40af" },
    { label: "Mobile Money", amount: formatNumber(1041250), percentage: 35, color: "#22c55e" },
    { label: "Carte visa", amount: formatNumber(595000), percentage: 20, color: "#f97316" },
  ],
}: RepartitionProps) => {
  return (
    <div className="bg-white rounded-2xl p-6">
      <CardTitle title={title} />
      
      <div className="mt-8 flex flex-wrap justify-around items-end gap-8">
        {methods.map((method, index) => (
          <PaymentMethodItem 
            key={`${method.label}-${index}`} 
            {...method} 
          />
        ))}
      </div>
    </div>
  );
};

export default RepartitionByPaymentMethods;