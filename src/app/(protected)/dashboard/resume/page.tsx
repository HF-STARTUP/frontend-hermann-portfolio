"use client"
//
// import AdminSubNav from "@/components/layout/admin/SubNav/AdminSubNav";
// import React from "react";
// import useDashboardStore from "@/stores/protected/dashboard/app/useDahsboardApp.store";
// import {
//     DashboardAfterTitle
// } from "@/app/(protected)/dashboard/status-accounts/_components/_UtilsComponents/UtilsComponent";
// import {useGetCurrency} from "@/hooks/__globlal/useGlobalHook";
// import {ChevronRightIcon} from "lucide-react";
// import {cn} from "@/lib/utils";
// import {useRequestFleetDetails} from "@/hooks/acounting/useAcounting";
// import Loading, {LoadingBar} from "@/components/ui/Loader";
// import {DialogCarItem, DialogDriverItem} from "@/components/dialog/Dialog";
// import {useGetDrivers} from "@/hooks/driver/useDriver";
// import {ScrollArea} from "@/components/ui/scroll-area";
// import {useGetVehiclesFeaturedExpiredDoc, useGetVehicules} from "@/hooks/vehicule/useVehicule";
// import Course from "@/model/course/Course";
// import {useGetCourses} from "@/hooks/course/useCourse";
// import {CheckIcon, ClientCar} from "@/components/layout/admin/sidebar/_navIcons/NavIcons";
// import {CgClose} from "react-icons/cg";
// import Entretien from "@/model/entretien/Entretien";
// import {useGetEntretiens} from "@/hooks/entretien/useEntretien";
// import {
//     CancelEntretienDialog,
//     MarkMaintenanceAsEndedDialog
// } from "@/app/(protected)/dashboard/maintenance/actions/markMaintenanceAsEnded/markMaintenanceAsEnded.dialog";
// import {
//     UncollectedRevenusDialog
// } from "@/app/(protected)/dashboard/resume/actions/uncollectedRevenus/UncollectedRevenusDialog";
// import {CourseInfoDialog} from "@/app/(protected)/dashboard/races/_actions/courseInfos/CourseInfosDialog";
//
// export default function DashboardResumePage() {
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
//                 title={"Suivi de l’activité"}
//                 afterTitle={<DashboardAfterTitle/>}
//             />
//             <div className={"grid grid-cols-12 gap-y-[25px]"}>
//                 <div className={"col-span-12"}>
//                     <ResumeSection/>
//                 </div>
//                 <div className={"col-span-12"}>
//                     <ActivitiesSection/>
//                 </div>
//             </div>
//         </div>
//     )
// }
//
//
// const ResumeSection = () => {
//
//     const {currency} = useGetCurrency()
//     const {data: fleet, isLoading} = useRequestFleetDetails()
//     const {} = useGetVehiclesFeaturedExpiredDoc()
//     const [uncollectedRevenusDialogIsOpen, setUncollectedRevenusDialogIsOpen] = React.useState<boolean>(false)
//     const [expectedRevenusDialogIsOpen, setExpectedRevenusDialogIsOpen] = React.useState<boolean>(false)
//
//     if (isLoading) {
//         return <LoadingBar/>
//     }
//
//     if (fleet) {
//         return (
//             <>
//                 <div className={"grid grid-cols-12 gap-[24px]"}>
//                     <div className={"col-span-4"}>
//                         <HeadStatCard
//                             onClick={() => setUncollectedRevenusDialogIsOpen(true)}
//                             label={"Recettes antérieures non ecaissées :"}
//                             content={`${fleet.previousReceiptsNotCollected} ${fleet.currency}`}
//                             variant={"destructive"}
//                             className={"cursor-pointer"}
//                         />
//                     </div>
//                     <div className={"col-span-4"}>
//                         <HeadStatCard
//                             variant={"neutral"}
//                             label={"Recettes attendues aujourd’hui :"}
//                             content={`${fleet.actualRecipe} ${currency}`}
//                             onClick={() => setExpectedRevenusDialogIsOpen(true)}
//                             className={"cursor-pointer"}
//                         />
//                     </div>
//                     <div className={"col-span-4"}>
//                         <HeadStatCard
//                             variant={"semi-destructive"}
//                             label={"Documents expirés / expiration proche :"}
//                             content={`${fleet.futureExpiredDoc}`}
//                         />
//                     </div>
//                 </div>
//                 <UncollectedRevenusDialog
//                     isOpen={uncollectedRevenusDialogIsOpen}
//                     onClose={() => setUncollectedRevenusDialogIsOpen(false)}
//                 />
//
//                 <UncollectedRevenusDialog
//                     isExpected={true}
//                     isOpen={expectedRevenusDialogIsOpen}
//                     onClose={() => setExpectedRevenusDialogIsOpen(false)}
//                 />
//             </>
//         )
//     }
// }
//
// const HeadStatCard: React.FC<React.HTMLAttributes<HTMLDivElement> & {
//     variant?: 'destructive' | 'semi-destructive' | 'neutral',
//     label: string,
//     content: string,
// }> = ({variant = 'neutral', label, content, className, ...props}) => {
//
//
//     const isDestructive = variant === "destructive"
//     const isSemiDestructive = variant === "semi-destructive"
//
//     return (
//         <div className={cn(
//             "px-5 py-2.5 bg-white rounded-[20px] flex justify-between items-center border border-transparent hover:border-blue-300",
//             isDestructive && "bg-rose-50",
//             className
//         )}
//              {...props}
//         >
//             <div className={cn(
//                 "text-slate-500 text-lg font-semibold font-vInter max-w-[225px]",
//                 isDestructive && "text-[#E51D13]"
//             )}>
//                 <span>{label}</span>
//                 <span className={cn(
//                     `text-[#2554AE]`,
//                     isSemiDestructive && "text-[#E51D13]",
//                     isDestructive && "text-black"
//                 )}> {content}</span>
//             </div>
//             <div className="size-7 bg-[#7392C812] rounded-full flex items-center justify-center">
//                 <ChevronRightIcon className={cn(
//                     "text-[#2554AE]",
//                     isDestructive && "text-[#E51D13]"
//                 )
//                 }/>
//             </div>
//         </div>
//     )
// }
//
// const ActivitiesSection = () => {
//
//     return (
//         <div className={"grid grid-cols-12 gap-[24px]"}>
//             <div className={"col-span-12 md:col-span-6 xl:col-span-4  2xl:col-span-3"}>
//                 <ActiveCars/>
//             </div>
//             <div className={"col-span-12 md:col-span-6 xl:col-span-4  2xl:col-span-3"}>
//                 <OnlineDrivers/>
//             </div>
//             <div className={"col-span-12 md:col-span-6 xl:col-span-4  2xl:col-span-3"}>
//                 <CourseList/>
//             </div>
//             <div className={"col-span-12 md:col-span-6 xl:col-span-4  2xl:col-span-3"}>
//                 <ResumeEntretienList/>
//             </div>
//         </div>
//     )
// }
//
// const CourseList = () => {
//
//     const {data: courses, isLoading} = useGetCourses()
//
//     return (
//         <FleetCardContainer>
//             <FleetCardTitle>
//                 <div className={"flex items-center gap-2"}>
//                     <ClientCar/>
//                     <div>Courses à effectuer {courses && `(${courses.length})`}</div>
//                 </div>
//             </FleetCardTitle>
//             <ScrollArea className={"h-[480px]"}>
//                 <div className={"px-2 flex flex-col gap-[10px]"}>
//                     {courses && courses.map((driver, i) => (
//                         <ResumeOneCourse course={driver} key={i}/>
//                     ))}
//                 </div>
//             </ScrollArea>
//             {isLoading && <Loading/>}
//         </FleetCardContainer>
//     )
// }
//
// const ResumeEntretienList = () => {
//
//     const {data: entretiens, isLoading} = useGetEntretiens()
//
//     return (
//         <FleetCardContainer>
//             <FleetCardTitle>
//                 <div className={"flex items-center gap-2"}>
//                     <ClientCar/>
//                     <div>Entretiens programmés {entretiens && `(${entretiens.length})`}</div>
//                 </div>
//             </FleetCardTitle>
//             <ScrollArea className={"h-[480px]"}>
//                 <div className={"px-2 flex flex-col gap-[10px]"}>
//                     {entretiens && entretiens.map((driver, i) => (
//                         <ResumeOneEntretien entretien={driver} key={i}/>
//                     ))}
//                 </div>
//             </ScrollArea>
//             {isLoading && <Loading/>}
//         </FleetCardContainer>
//     )
// }
//
//
// const ResumeOneEntretien: React.FC<React.HTMLAttributes<HTMLDivElement> & { entretien: Entretien }> = ({entretien}) => {
//
//     const [cancelDialogIsOpen, setCancelDialogIsOpen] = React.useState(false)
//     const [endedDialogIsOpen, setEndedDialogIsOpen] = React.useState(false)
//
//     return (
//         <div className={"px-4 py-2 bg-slate-50 rounded-[17.55px] flex justify-between items-center"}
//              onClick={() => setEndedDialogIsOpen(true)}>
//             <div className={"flex flex-col gap-1"}>
//                 <ResumeItem className={"font-bold"}>{entretien.startAt} - {entretien.startHour}</ResumeItem>
//                 <ResumeItem>{entretien.vehicleName}</ResumeItem>
//                 <ResumeItem>{entretien.entretienContent}</ResumeItem>
//             </div>
//             <div className={"w-[30px] flex items-center justify-end"}>
//                 <button
//                     className={""}
//                     onClick={() => setCancelDialogIsOpen(true)}
//                 >
//                     <CgClose className={"text-[17px] text-[#E51D13]"}/>
//                 </button>
//             </div>
//             {entretien && <CancelEntretienDialog
//                 isOpen={cancelDialogIsOpen}
//                 onClose={() => setCancelDialogIsOpen(false)}
//                 entretien={entretien}
//             />}
//
//             <MarkMaintenanceAsEndedDialog
//                 entretien={entretien}
//                 isOpen={endedDialogIsOpen}
//                 closeDialog={() => setEndedDialogIsOpen(false)}
//             />
//
//         </div>
//     )
// }
//
//
// const ResumeOneCourse: React.FC<React.HTMLAttributes<HTMLDivElement> & { course: Course }> = ({course}) => {
//     const [courseInfoIsOpen, setCourseInfoIsOpen] = React.useState(false)
//
//     return (
//         <div
//             className={"px-4 py-2 bg-slate-50 rounded-[17.55px] flex justify-between items-center cursor-pointer"}
//             onClick={() => setCourseInfoIsOpen(true)}
//         >
//             <div className={"flex flex-col gap-1"}>
//                 <div
//                     className="text-text-body text-sm font-bold leading-none flex items-center gap-2">
//                     <div>{course.startAt} - {course.startHour}</div>
//                     {course.finished && <CheckIcon className={"size-4 text-green-400"}/>}
//                 </div>
//                 {course.currentDriver && <ResumeItem>Chauffeur : {course.currentDriver?.getUsername}</ResumeItem>}
//                 <ResumeItem>Client: {course.client.username}</ResumeItem>
//             </div>
//             <button
//                 disabled={course.finished}
//             >
//                 <CgClose className={cn(
//                     "text-[17px] text-[#E51D13]",
//                     course.finished && "text-[#E9E9E9]"
//                 )}/>
//             </button>
//             <CourseInfoDialog
//                 course={course}
//                 isMain={true}
//                 isOpen={courseInfoIsOpen}
//                 onClose={() => setCourseInfoIsOpen(false)}
//             />
//         </div>
//     )
// }
//
//
// const ResumeItem: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children, className}) => {
//     return (
//         <div className={cn(
//             "text-text-body text-sm font-normal leading-none",
//             className
//         )}>{children}</div>
//     )
// }
//
//
// const OnlineDrivers = () => {
//
//     const {data: drivers, isLoading} = useGetDrivers()
//
//     return (
//         <FleetCardContainer>
//             <FleetCardTitle>Chauffeurs en ligne {drivers && `(${drivers.length})`}</FleetCardTitle>
//             <ScrollArea className={"h-[480px]"}>
//                 <div className={"px-2 flex flex-col gap-[10px]"}>
//                     {drivers && drivers.map((driver, i) => (
//                         <DialogDriverItem item={driver} key={i}/>
//                     ))}
//                 </div>
//             </ScrollArea>
//             {isLoading && <Loading/>}
//         </FleetCardContainer>
//     )
// }
//
// const ActiveCars = () => {
//
//     const {data: vehicles, isLoading} = useGetVehicules()
//
//     return (
//         <FleetCardContainer>
//             <FleetCardTitle>Véhicules actifs {vehicles && `(${vehicles.length})`}</FleetCardTitle>
//             <ScrollArea className={"h-[480px]"}>
//                 <div className={"px-2 flex flex-col gap-[10px]"}>
//                     {vehicles && vehicles.map((vehicle, i) => (
//                         <DialogCarItem item={vehicle} key={i}/>
//                     ))}
//                 </div>
//             </ScrollArea>
//             {isLoading && <Loading/>}
//         </FleetCardContainer>
//     )
// }
//
//
// const FleetCardContainer: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children}) => {
//
//     return (
//         <div className={"px-[15px] py-4 bg-white rounded-[20px flex flex-col gap-4"}>
//             {children}
//         </div>
//     )
// }
//
// const FleetCardTitle: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children}) => {
//
//     return (
//         <h2 className={"text-blue-800 text-base font-bold leading-none py-[9px]"}>{children}</h2>
//     )
// }
//
//

export default function Page(){
    return <div></div>
}
