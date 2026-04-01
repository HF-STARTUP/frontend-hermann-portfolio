"use client";

import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import CardTitle from "@/components/ui/custom/CardTitle";
import { useSubsByPaymentsHook } from "../_hooks/useByPaymentsHook";
import { useGetActiveCurrency } from "@/hooks/__globlal/useGlobalHook";
import { GetSubscriptionsPricingParams } from "@/types/subscription.types";
import { PaymentMethodStatModel } from "@/model/subscription/SubsByPaymentMethods";
import Loading from "@/components/ui/Loader";
import { EmptyData } from "@/components/box/PageNetworkState";

ChartJS.register(ArcElement, Tooltip, Legend);


const CHART_COLORS = [
  "#018bfb", "#ff9900", "#6d00fb", "#00a757",
  "#ef4444", "#f59e0b", "#06b6d4", "#8b5cf6"
];

interface RepartitionProps {
  title?: string;
  globalFilters?: GetSubscriptionsPricingParams;
}



interface PaymentMethodItemProps {
  method: PaymentMethodStatModel;
  color: string;
}

const PaymentMethodItem = ({ method, color }: PaymentMethodItemProps) => {
  const percentage = method.percentage;

  const data = {
    datasets: [
      {
        data: [percentage, 100 - percentage],
        backgroundColor: [color, "#e5e7eb"],
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

  const { currency } = useGetActiveCurrency();

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
        <p className="text-vaTextPrimary font-medium capitalize">{method.paymentMethod}</p>
        <p className="text-lg font-bold text-black">
          {method.amount} <span className="text-xs font-semibold">{currency}</span>
        </p>
      </div>
    </div>
  );
};



const RepartitionByPaymentMethods = ({
  title = "Répartition des abonnements par moyen de paiement",
  globalFilters
}: RepartitionProps) => {
  const { data, isLoading } = useSubsByPaymentsHook(globalFilters);

  return (
    <div className="bg-white rounded-2xl p-6 h-full">
      <CardTitle title={title} />

      <div className="mt-8 flex flex-wrap justify-around items-end gap-8 relative min-h-[200px]">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loading />
          </div>
        ) : data?.stats && data.stats.length > 0 ? (
          data.stats.map((method, index) => (
            <PaymentMethodItem
              key={index}
              method={method}
              color={CHART_COLORS[index % CHART_COLORS.length]}
            />
          ))
        ) : (
         <EmptyData message="Aucune donnée disponible" />
        )}
      </div>
    </div>
  );
};

export default RepartitionByPaymentMethods;