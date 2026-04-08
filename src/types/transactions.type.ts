import { FleetType } from "./admin/fleet.type";
import { PaginationResponse } from "./dashboard.type";

export interface MetricDetail {
    current: number;
    previous: number;
    percentChange: number;
  }
  
  export interface TransactionFlow {
    totalAmount: MetricDetail;
    totalFees: MetricDetail;
    commissionVtcc: MetricDetail;
  }
  
  export interface TransactionStatsData {
    incoming: TransactionFlow;
    outgoing: TransactionFlow;
  }

  export interface TransactionsParams {
    start_date?: string;
    end_date?: string;
    city_id?: number | string;
    country_id?: number | string;
    currency_id?: number | string;
    account_type?: FleetType;
    group_by?: "day" | "week";
    search?: string,
    itemPerPage?: number,
    page?: number,
    direction?: "incoming" | "outgoing",
  }

  export interface TransactionEvolutionItem {
    period: string; // Format "YYYY-MM-DD"
    incomingAmount: number;
    outgoingAmount: number;
    commission: number;
  }
  
  export interface TransactionsEvolutionData {
    series: TransactionEvolutionItem[];
  }

  export interface CommissionByPayementMethodData{
    total: number,
    byPaymentMethod: { 
      paymentMethod: string, 
      amount: number,
      percentage: number
     }[]
  }


  export interface TransactionItem {
    park_id: number;
    fleet_name: string;
    owner_name: string;
    account_type: string;
    payment_method: string;
    total_amount: number;
    total_fees: number;
    commission_vtcc: number;
  }

  export interface TransactionData extends PaginationResponse{
    data: TransactionItem[]
  }