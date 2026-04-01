import { PageTitle } from '@/components/ui/custom/PageTitle';
import React from 'react';
import { useTransactionsHook } from './_hook/useTransactionsHook';
import KpiGrid from '@/components/display/Kpi';
import TransactionEvolutionChart from './_components/TransactionEvolutionChart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import TransactionCloseFilters from './_components/_sub_components/TransactionsCloseFilters';
import Link from 'next/link';
import CommissionVTCCChart from './_components/CommissionVTCCChart';
import { Crumb } from '@/components/ui/custom/crumb';
import PeriodSelector from '@/components/elements/PeriodSelector';
import { toIsoDate } from '@/services/Service';

const TransactionBody: React.FC = () => {

    const {
        incomingKpi,
        outgoingKpi,
        commissionChartValues,
        evolutionChartLabels,
        incomingChartValues,
        outgoingChartValues,
        commissionData,
        totalAmount,
        currency,
        isLoadingKpi,
        setTransacFilters,
        transacFilters,
        currencies,
        isLoadingCurrecies,
        isLoadingEvolution,
        isLoadingCommissionsData
    } = useTransactionsHook()

    return (
        <div className='space-y-4'>
            <div className="flex items-center justify-between w-full">
                <Crumb
                    items={[
                        {
                            label: "Transactions",
                            url: "transactions",
                        }
                    ]}
                />
                <PeriodSelector defaultPeriod={"current_month"} onChange={(range) => setTransacFilters(prev => ({
                    ...prev,
                    start_date: toIsoDate(range?.from),
                    end_date: toIsoDate(range?.to)
                }))} />
            </div>
            <PageTitle
                page_title={"Transactions Entrantes"}
                withSelect={false}
                close_component={<TransactionCloseFilters currencies={currencies} isLoading={isLoadingCurrecies} setFilters={setTransacFilters} />}
                end_component={<Link href={"/app/transactions/incoming"} className='text-vaMainBlue font-semibold underline cursor-pointer text-lg'>
                    Voir les détails
                </Link>}
            />

            {/* Kpi des transactons entrantes */}

            <KpiGrid items={incomingKpi} isLoading={isLoadingKpi} />



            <PageTitle
                page_title={"Transactions Sortantes"}
                withSelect={false}
                end_component={<Link href={"/app/transactions/outgoing"} className='text-vaMainBlue font-semibold underline cursor-pointer text-lg'>
                    Voir les détails
                </Link>}
            />

            {/* Kpi des transactons sortantes */}
            <KpiGrid items={outgoingKpi} isLoading={isLoadingKpi} />



            <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 gap-4 col-span-12">
                {/* Evolution des transactions */}
                <div className="lg:col-span-2 xl:col-span-3">
                    <TransactionEvolutionChart transacFilters={setTransacFilters} chartLabel={evolutionChartLabels} commissionValues={commissionChartValues} incomingValues={incomingChartValues} outgoingValues={outgoingChartValues} isLoading={isLoadingEvolution} />
                </div>
                {/* Commission VTCC par moyen de paiement */}
                <div className="xl:col-span-2">
                    <CommissionVTCCChart data={commissionData} title='Commission VTCC par moyen de paiement' isLoading={isLoadingCommissionsData} />
                </div>
            </div>
        </div>);
};

export default TransactionBody