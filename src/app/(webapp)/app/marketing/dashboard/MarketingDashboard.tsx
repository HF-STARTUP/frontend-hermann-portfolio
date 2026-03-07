import { Crumb } from "@/components/ui/custom/crumb"
import { PageTitle } from "@/components/ui/custom/PageTitle"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useMarketingDashboardHook } from "./_hook/useMarketingDashboardHook"
import KpiGrid from "@/components/display/Kpi"
import EngagementChart from "./_components/AccountsEngagementChart"
import AudienceChart from "./_components/PublicAtteintChart"
import { useAudianceHook } from "./_hook/useAudianceHook"
import UsageStatsChart from "./_components/MostUsedModule"
import { useUsageStatsHook } from "./_hook/useUsageStatsHook"
import CityEngagementMap from "./_components/CitiesEngagements"

const MarketingDashboardBody = () => {
    const { KpiItems, activesAccountChartValues, createdAccountChartValues, inactivesAccountChartValues, overviewLabels } = useMarketingDashboardHook()
    const {data: audienceData, isLoading, totalAudience} = useAudianceHook();
    const { data: usageData } = useUsageStatsHook()
    return (
        <div className="space-y-6">
            <Crumb
                items={[
                    {
                        label: "Marketing & Communications",
                        url: "/app/marketing/dashboard",
                    }
                ]}
            />


            <PageTitle page_title="Dashboard général" withSelect={false} end_component={
                <Select defaultValue="current-month">
                    <SelectTrigger className="border-none bg-white rounded-xl text-lg px-4 min-w-44 w-fit">
                        <SelectValue placeholder="periode"></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="current-month">Ce mois-ci</SelectItem>
                        <SelectItem value="today">Aujourd'hui</SelectItem>
                        <SelectItem value="yesterday">Hier</SelectItem>
                        <SelectItem value="custom">Personaliser</SelectItem>
                    </SelectContent>
                </Select>} />

            <KpiGrid items={KpiItems} />
            <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-5 gap-4 col-span-12">
                <div className="lg:col-span-2 xl:col-span-3">
                    <EngagementChart activeUserAccount={activesAccountChartValues} chartLabels={overviewLabels} createdAccountValues={createdAccountChartValues} innactiveAccountValue={inactivesAccountChartValues} />
                </div>
                <div className="xl:col-span-2">
                    <AudienceChart data={audienceData} total = {totalAudience}  />
                </div>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <UsageStatsChart data={usageData} />
                <CityEngagementMap />
            </div>
        </div>
    )
}

export default MarketingDashboardBody