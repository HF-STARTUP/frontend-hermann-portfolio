"use client"

import React from "react"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import VLinkProvider from "@/components/helpers/VLinkProvider"

interface MarketingHeaderProps {
  period: string
  onPeriodChange: (period: string) => void
}

export const MarketingHeader: React.FC<MarketingHeaderProps> = ({
  period,
  onPeriodChange,
}) => {
  return (
    <div className="flex flex-col gap-2 mb-8">
      <div className="text-slate-500 text-sm font-medium leading-normal">
        <VLinkProvider 
          className="hover:underline underline-offset-4 transition delay-75 duration-200 ease-in"
          to="/app/dashboard"
        >
          Admin VTCControl
        </VLinkProvider>
        {" / "}
        <span>Marketing</span>
        {" / "}
        <span>Communications</span>
      </div>
      
      <div className="flex items-center justify-between">
        <h1 className="text-[34px] font-bold text-[#405768] leading-[42px]">
          Gestion des codes
        </h1>
        
        <Select value={period} onValueChange={onPeriodChange}>
          <SelectTrigger className="w-[180px] h-10 border-gray-200 rounded-lg bg-white">
            <SelectValue placeholder="Ce mois-ci" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="this_month">Ce mois-ci</SelectItem>
            <SelectItem value="last_month">Le mois dernier</SelectItem>
            <SelectItem value="last_3_months">3 derniers mois</SelectItem>
            <SelectItem value="last_6_months">6 derniers mois</SelectItem>
            <SelectItem value="this_year">Cette année</SelectItem>
            <SelectItem value="all_time">Tout le temps</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
