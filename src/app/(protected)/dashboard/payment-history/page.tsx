// "use client"
//
// import React from "react";
// import AdminSubNav from "@/components/layout/admin/SubNav/AdminSubNav";
// import useGeolocationStore from "@/stores/protected/dashboard/geolocation/useGeolocationStore";
// import {FilterSection, FilterType} from "@/app/(protected)/dashboard/payment-history/components/tabs";
// import {
//     Transaction
// } from "@/app/(protected)/dashboard/status-accounts/soldes/components/lastTransactions/lastTransactions";
//
// const PaymentHistory: React.FC = () => {
//
//     const {resetState} = useGeolocationStore()
//
//     React.useEffect(() => {
//         return (() => resetState())
//     }, [])
//
//     return (
//         <div>
//             <AdminSubNav
//                 title={`Historique de paiements`}
//                 withUserSetting={false}
//                 isSubPage={true}
//             />
//             <div className={"flex flex-col gap-[25px] 2xl:w-[878px]"}>
//                 <FilterSection activeFilter={FilterType.neutral}/>
//                 <SectionDate>Aujourd’hui</SectionDate>
//                 <div className={"flex flex-col gap-1"}>
//                     <Transaction/>
//                 </div>
//                 <SectionDate>Hier</SectionDate>
//                 <div className={"flex flex-col gap-1"}>
//                     <Transaction/>
//                     <Transaction/>
//                     <Transaction/>
//                 </div>
//                 <SectionDate>21/08/2024</SectionDate>
//                 <div className={"flex flex-col gap-1"}>
//                     <Transaction/>
//                     <Transaction/>
//                     <Transaction/>
//                     <Transaction/>
//                 </div>
//             </div>
//         </div>
//     )
// }
//
//
// const SectionDate: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children}) => {
//
//     return (
//         <div className="text-blue-800 text-base font-bold leading-[25px]">{children}</div>
//     )
// }
//
//
// export default PaymentHistory

export default function Page(){
    return <div></div>
}