"use client"
//
// import AdminSubNav from "@/components/layout/admin/SubNav/AdminSubNav";
// import React from "react";
// import OverallTurnover from "./_components/overallTurnover/OverallTurnover";
// import IndividualTurnover from "./_components/individualTurnover/IndividualTurnover";
// import useDashboardStore from "@/stores/protected/dashboard/app/useDahsboardApp.store";
// import {
//     DashboardAfterTitle
// } from "@/app/(protected)/dashboard/status-accounts/_components/_UtilsComponents/UtilsComponent";
// import {
//     AccountStatSubtitleContainer,
//     StatContainer,
//     StatMonthSelect,
//     StatStatus,
//     StatSubTitle,
//     StatTitle
// } from "@/app/(protected)/dashboard/_components/_utils/DashUtils";
// import {
//     BandeStat,
//     DiagramCard,
//     DiagramCardContent,
//     DiagramCardFooter,
//     DiagramCardHead,
//     DiagramCardHeadTitle,
//     DiagramLegend,
//     DiagramLegends,
//     DiagramMoreButton,
//     OrdersStat,
//     StatCardStack
// } from "@/app/(protected)/dashboard/_components/_utils/DiagramUtils";
// import {useRequestAccountingState, useRequestFleetChatData} from "@/hooks/acounting/useAcounting";
// import {useGetCurrency} from "@/hooks/__globlal/useGlobalHook";
// import {
//     DateWithPreviewsDateType,
//     getCurrentMonthYear,
//     getMonthDates,
//     getPreviousMonthYear,
//     getSpecifiedMonthYear
// } from "@/lib/utils";
// import {LoadingBar} from "@/components/ui/Loader";
// import {CustomChartLineUtils2} from "@/app/(protected)/dashboard/_components/_utils/CustomChartLine.utils";
// import {useDashboardStore2} from "@/app/(protected)/dashboard/_store/useDashboardSotre";
// import {
//     Select,
//     SelectContent,
//     SelectGroup,
//     SelectItem,
//     SelectLabel,
//     SelectTrigger,
//     SelectValue
// } from "@/components/ui/select";
//
// export default function DashboardPage() {
//
//     const {resetState} = useDashboardStore()
//
//     React.useEffect(() => {
//         resetState()
//     }, [])
//
//     return (
//         <div>
//             <AdminSubNav
//                 withUserSetting={false}
//                 afterTitle={<DashboardAfterTitle/>}
//             />
//             <div className={"grid grid-cols-12 gap-y-[16px] gap-x-[32px]"}>
//                 <div className={"col-span-12 lg:col-span-6 2xl:col-span-4 flex"}>
//                     <div className="flex-1">
//                         <StatCard1/>
//                     </div>
//                 </div>
//                 <div className={"col-span-12 lg:col-span-6 2xl:col-span-4 flex"}>
//                     <div className="flex-1">
//                         <StatCard2/>
//                     </div>
//                 </div>
//                 <div className={"col-span-12  2xl:col-span-4 flex"}>
//                     <div className="flex-1">
//                         <StatCard3/>
//                     </div>
//                 </div>
//                 <div className={"col-span-12"}>
//                     <div className={`flex flex-col gap-[16px]`}>
//                         <OverallTurnover/>
//                         <IndividualTurnover/>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }
//
//
// const StatCard1 = () => {
//     const {year, month} = getCurrentMonthYear()
//
//     const [initialDate, setInitialDate] = React.useState<DateWithPreviewsDateType>(getMonthDates(month, year))
//
//     const {isLoading, data: accounting} = useRequestAccountingState(initialDate)
//     const {currency} = useGetCurrency()
//     const [activeDiagram, setActiveDiagram] = React.useState("1")
//
//     const {activeMonth: activeMonths, setMonth} = useDashboardStore2()
//
//     const {} = useRequestFleetChatData()
//
//     React.useEffect(() => {
//         setInitialDate(getMonthDates(activeMonths, 2024))
//     }, [activeMonths])
//
//     return (
//         <StatCardStack head={
//             (<StatContainer>
//                 <AccountStatSubtitleContainer>
//                     {accounting?.result && <StatTitle
//                         title={"Total chiffre d’affaires :"}
//                         value={`${accounting?.result.difference_current_month} ${currency}`}
//                         className={"text-[#2554AE]"}
//                     />}
//                     {accounting?.result && <div className={"flex gap-2 items-center"}>
//                         <StatSubTitle>vs. {getPreviousMonthYear(activeMonths, year)}</StatSubTitle>
//                         <StatStatus
//                             variant={accounting?.expensePercent.status}>{accounting?.result.difference_last_month}</StatStatus>
//                     </div>}
//                     {isLoading || !accounting && <LoadingBar/>}
//                 </AccountStatSubtitleContainer>
//                 <StatMonthSelect
//                     value={'' + activeMonths}
//                     onMonthChange={(v) => {
//                         setMonth(+v)
//                     }}
//                 />
//             </StatContainer>)
//         }>
//             <DiagramCard>
//                 <DiagramCardHead>
//                     <DiagramCardHeadTitle>{getSpecifiedMonthYear(activeMonths, year)}</DiagramCardHeadTitle>
//                     <Select
//                         defaultValue={activeDiagram}
//                         onValueChange={(d) => {
//                             setActiveDiagram(d)
//                         }}
//                     >
//                         <SelectTrigger className="w-fit">
//                             <SelectValue placeholder="Type de diagramme"/>
//                         </SelectTrigger>
//                         <SelectContent>
//                             <SelectGroup>
//                                 <SelectLabel>Sélectionner le type de giagramme</SelectLabel>
//                                 {["Diagramme circulaire", "Diagramme en bande"].map((value, index) => (
//                                     <SelectItem key={index} value={`${index + 1}`}>
//                                         {value}
//                                     </SelectItem>
//                                 ))}
//                             </SelectGroup>
//                         </SelectContent>
//                     </Select>
//                 </DiagramCardHead>
//                 <DiagramCardContent>
//                     {activeDiagram==="1"&&<OrdersStat/>}
//                     {activeDiagram==="2"&&<BandeStat/>}
//                 </DiagramCardContent>
//                 <DiagramCardFooter>
//                     <DiagramLegends>
//                         <DiagramLegend className={"bg-blue-700"}>VTC</DiagramLegend>
//                         <DiagramLegend className={"bg-sky-500"}>Courses</DiagramLegend>
//                         <DiagramLegend className={"bg-yellow-400"}>Autres</DiagramLegend>
//                     </DiagramLegends>
//                     <DiagramMoreButton>Voir le détail</DiagramMoreButton>
//                 </DiagramCardFooter>
//             </DiagramCard>
//         </StatCardStack>
//     )
// }
//
// const StatCard2 = () => {
//
//     const {year, month} = getCurrentMonthYear()
//
//     const [activeDiagram, setActiveDiagram] = React.useState("2")
//     const [initialDate, setInitialDate] = React.useState<DateWithPreviewsDateType>(getMonthDates(month, year))
//
//     const {isLoading, data: accounting} = useRequestAccountingState(initialDate)
//     const {currency} = useGetCurrency()
//
//
//     const {activeMonth: activeMonths, setMonth} = useDashboardStore2()
//     React.useEffect(() => {
//         setInitialDate(getMonthDates(activeMonths, 2024))
//     }, [activeMonths])
//
//
//     return (
//         <StatCardStack head={
//             (<StatContainer>
//                 <AccountStatSubtitleContainer>
//                     {accounting?.result && <StatTitle
//                         title={"Total dépenses  :"}
//                         value={`${accounting?.result.difference_current_month} ${currency}`}
//                         className={"text-red-600"}
//                     />}
//                     {accounting?.result && <div className={"flex gap-2 items-center"}>
//                         <StatSubTitle>vs. {getPreviousMonthYear(activeMonths, year)}</StatSubTitle>
//                         <StatStatus
//                             variant={accounting?.expensePercent.status}>{accounting?.result.difference_last_month}</StatStatus>
//                     </div>}
//                     {isLoading || !accounting && <LoadingBar/>}
//                 </AccountStatSubtitleContainer>
//             </StatContainer>)
//         }>
//             <DiagramCard>
//                 <DiagramCardHead>
//                     <DiagramCardHeadTitle>{getSpecifiedMonthYear(activeMonths, year)}</DiagramCardHeadTitle>
//                     <Select
//                         defaultValue={activeDiagram}
//                         onValueChange={(v) => {
//                             setActiveDiagram(v)
//                         }}
//                     >
//                         <SelectTrigger className="w-fit">
//                             <SelectValue placeholder="Type de diagramme"/>
//                         </SelectTrigger>
//                         <SelectContent>
//                             <SelectGroup>
//                                 <SelectLabel>Sélectionner le type de giagramme</SelectLabel>
//                                 {["Diagramme circulaire", "Diagramme en bande"].map((value, index) => (
//                                     <SelectItem key={index} value={`${index + 1}`}>
//                                         {value}
//                                     </SelectItem>
//                                 ))}
//                             </SelectGroup>
//                         </SelectContent>
//                     </Select>
//                 </DiagramCardHead>
//                 <DiagramCardContent>
//                     {activeDiagram==="1"&&<OrdersStat/>}
//                     {activeDiagram==="2"&&<BandeStat/>}
//                 </DiagramCardContent>
//                 <DiagramCardFooter>
//                     <DiagramLegends>
//                         <DiagramLegend className={"bg-blue-700"}>VTC</DiagramLegend>
//                         <DiagramLegend className={"bg-sky-500"}>Courses</DiagramLegend>
//                         <DiagramLegend className={"bg-yellow-400"}>Autres</DiagramLegend>
//                     </DiagramLegends>
//                     <DiagramMoreButton>Voir le détail</DiagramMoreButton>
//                 </DiagramCardFooter>
//             </DiagramCard>
//         </StatCardStack>
//     )
// }
//
// const StatCard3 = () => {
//     const {year, month} = getCurrentMonthYear()
//
//     const [activeMonth, setActiveMonth] = React.useState<number>(month)
//     const [initialDate, setInitialDate] = React.useState<DateWithPreviewsDateType>(getMonthDates(month, year))
//
//     const {activeMonth: activeMonths, setMonth} = useDashboardStore2()
//
//     const {isLoading, data: accounting} = useRequestAccountingState(initialDate)
//     const {currency} = useGetCurrency()
//
//
//     return (
//         <StatCardStack head={
//             (<StatContainer>
//                 <AccountStatSubtitleContainer>
//                     {accounting?.result && <StatTitle
//                         title={"Résultat :"}
//                         value={`${accounting?.result.difference_current_month} ${currency}`}
//                         className={"text-amber-600"}
//                     />}
//                     {accounting?.result && <div className={"flex gap-2 items-center"}>
//                         <StatSubTitle>vs. {getPreviousMonthYear(activeMonths, year)}</StatSubTitle>
//                         <StatStatus
//                             variant={accounting?.expensePercent.status}>{accounting?.result.difference_last_month}</StatStatus>
//                     </div>}
//                     {isLoading || !accounting && <LoadingBar/>}
//                 </AccountStatSubtitleContainer>
//             </StatContainer>)
//         }>
//             <DiagramCard>
//                 <DiagramCardHead>
//                     <DiagramCardHeadTitle>{getSpecifiedMonthYear(activeMonths, year)}</DiagramCardHeadTitle>
//                     {/*<PeriodSelect values={["Mensuel"]}/>*/}
//                 </DiagramCardHead>
//                 <DiagramCardContent>
//                     <CustomChartLineUtils2/>
//                 </DiagramCardContent>
//                 {/*<DiagramCardFooter>*/}
//                 {/*    <DiagramLegends>*/}
//                 {/*        <DiagramLegend className={"bg-blue-700"}>VTC</DiagramLegend>*/}
//                 {/*        <DiagramLegend className={"bg-sky-500"}>Courses</DiagramLegend>*/}
//                 {/*        <DiagramLegend className={"bg-yellow-400"}>Autres</DiagramLegend>*/}
//                 {/*    </DiagramLegends>*/}
//                 {/*    <DiagramMoreButton>Voir le détail</DiagramMoreButton>*/}
//                 {/*</DiagramCardFooter>*/}
//             </DiagramCard>
//         </StatCardStack>
//     )
// }
//

export default function Page(){
    return <div></div>
}