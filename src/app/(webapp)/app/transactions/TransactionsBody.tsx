import { PageTitle } from '@/components/ui/custom/PageTitle';
import React from 'react';
import { useTransactionsHook } from './_hook/useTransactionsHook';
import KpiGrid from '@/components/display/Kpi';
import TransactionEvolutionChart from './_components/TransactionEvolutionChart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import TransactionCloseFilters from './_components/_sub_components/TransactionsCloseFilters';
import Link from 'next/link';
import CommissionVTCCChart from './_components/CommissionVTCCChart';

const TransactionBody: React.FC = () => {

    const { incomingKpi, outgoingKpi, commissionChartValues, evolutionChartLabels, incomingChartValues, outgoingChartValues, commissionData, totalAmount, currency } = useTransactionsHook()

    return (
        <div className='space-y-4'>
            <PageTitle
                page_title={"Transactions Entrantes"}
                withSelect={false}
                close_component={<TransactionCloseFilters />}   
                end_component={ <Link href={"/app/transactions/incoming"} className='text-vaMainBlue font-semibold underline cursor-pointer text-lg'>
                    Voir les détails
                </Link> }                               
            />

            {/* Kpi des transactons entrantes */}

                        <KpiGrid items={incomingKpi} />



                        <PageTitle
                            page_title={"Transactions Sortantes"}
                            withSelect={false}
                            end_component={ <Link href={"/app/transactions/outgoing"} className='text-vaMainBlue font-semibold underline cursor-pointer text-lg'>
                            Voir les détails
                        </Link> } 
                        />

                        {/* Kpi des transactons sortantes */}
                        <KpiGrid items={outgoingKpi} />



                        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 gap-4 col-span-12">
                            {/* Evolution des transactions */}
                            <div className="lg:col-span-2 xl:col-span-3">
                                <TransactionEvolutionChart chartLabel={evolutionChartLabels} commissionValues={commissionChartValues} incomingValues={incomingChartValues} outgoingValues={outgoingChartValues} />
                            </div>
                            {/* Commission VTCC par moyen de paiement */}
                            <div className="xl:col-span-2">
                                <CommissionVTCCChart data={ commissionData } title='Commission VTCC par moyen de paiement' totalValue={totalAmount} currency={currency} />
                            </div>
                        </div>
                    </div>);
};

            export default TransactionBody