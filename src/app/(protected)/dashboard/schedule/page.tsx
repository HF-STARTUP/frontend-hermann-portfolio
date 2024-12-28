"use client"
//
// import AdminSubNav from "@/components/layout/admin/SubNav/AdminSubNav";
// import React from "react";
// import BtnBase, {SubNavButton, SubNavButtonGroup} from "@/components/elements/BtnBase";
// import PlaningUsersList from "@/app/(protected)/dashboard/schedule/_components/PlaningUsersList/PlaningUsersList";
// import PlaningTable from "@/app/(protected)/dashboard/schedule/_components/PlaningTable/PlaningTable";
// import useScheduleStore from "@/stores/protected/dashboard/schedule/useScheduleStore";
// import {PLANING_TYPES} from "@/utils/staticData";
// import {PlaningType} from "@/types/dashboard.schedule.type";
// import Scafold from "@/components/box/Scafold";
// import Loading from "@/components/ui/Loader";
// import {ListDetailsIcon} from "@/components/layout/admin/sidebar/_navIcons/NavIcons";
// import EntitySelectDialog from "@/components/actions/EntitySelectDialog.action";
// import {DialogVehiculeGroupItem} from "@/components/dialog/Dialog";
// import {useGetVehiculeGroup, useGetVehicules} from "@/hooks/vehicule/useVehicule";
// import {CreateNewVehiculeGroup} from "@/app/(protected)/dashboard/schedule/actions/vehiculeGroup/CreateVehiculeGroup";
// import VehiculeGroup from "@/model/vehicule/VehiculeGroup";
//
// export default function ReceiptsPage() {
//
//     const {resetState} = useScheduleStore()
//
//     React.useEffect(() => {
//         return () => resetState();
//     }, [resetState]);
//
//     return (
//         <React.Suspense fallback={<Loading/>}>
//             <Scafold title={'Planing'}>
//                 <div>
//                     <div>
//                         <AdminSubNav
//                             beforeChild={<SubNavActions/>}
//                             withFilterSection={false}
//                             withUserSetting={false}
//                             endTitle={<VehiculeGroupConfig/>}
//                         />
//                     </div>
//                     <div className={`flex gap-[31px]`}>
//                         <div className={``}>
//                             <PlaningUsersList/>
//                         </div>
//                         <div className={``}>
//                             <PlaningTable/>
//                         </div>
//                     </div>
//                 </div>
//             </Scafold>
//         </React.Suspense>
//     )
// }
//
// const VehiculeGroupConfig: React.FC = () => {
//     const [groupVehiculeIsOpen, setGroupVehiculeIsOpen] = React.useState(false)
//     const [createVehiculeGroupIsOpen, setCreateVehiculeGroupIsOpen] = React.useState(false)
//     const {activePlaningType} = useScheduleStore()
//     const {data: vehicules} = useGetVehicules()
//     const {data: vehiculesGroup} = useGetVehiculeGroup()
//
//
//     const planingTypeNotIsDriver = activePlaningType !== PLANING_TYPES.drivers
//     //if (!planingTypeNotIsDriver) return
//
//
//     return (
//         <div>
//             <BtnBase className={`mb-1`}
//                      size={'sm'}
//                      color={'blueLighten'}
//                      variant={'contained'}
//                      shape={'square'}
//                      fullwidth={true}
//                      to={''}
//                      onClick={() => setGroupVehiculeIsOpen(true)}
//                      icon={<ListDetailsIcon/>}
//             >
//                 Groupes de véhicules
//             </BtnBase>
//             <div>
//                 <EntitySelectDialog<VehiculeGroup, typeof DialogVehiculeGroupItem>
//                     title={"Groupes de véhicules"}
//                     emptyMessage={"Aucun groupe créé pour l’instant"}
//                     actionLabel={"Créer un nouveau groupe de véhicules"}
//                     DisplayItem={DialogVehiculeGroupItem}
//                     isSelect={true}
//                     getData={() => vehiculesGroup}
//                     isOpen={groupVehiculeIsOpen}
//                     onClose={() => setGroupVehiculeIsOpen(false)}
//                     isValid={true}
//                     onValidate={() => {
//                         //setGroupVehiculeIsOpen(false)
//                         setCreateVehiculeGroupIsOpen(true)
//                     }}
//                 />
//
//                 <CreateNewVehiculeGroup
//                     isOpen={createVehiculeGroupIsOpen}
//                     onClose={() => setCreateVehiculeGroupIsOpen(false)}
//                 />
//
//             </div>
//         </div>
//     )
// }
//
// const SubNavActions: React.FC = () => {
//
//     const scheduleStore = useScheduleStore()
//     const [activeValue, setActiveValue] = React.useState<PlaningType>(scheduleStore.activePlaningType)
//
//     const handleUpdatePlaningType = (planingType: PlaningType) => {
//         setActiveValue(planingType)
//         scheduleStore.setActivePlaningType(planingType)
//     }
//
//     return (
//         <SubNavButtonGroup>
//             {
//                 Object.values(PLANING_TYPES).map((item, k) => (
//                     <SubNavButton onClick={() => handleUpdatePlaningType(item)} key={k}
//                                   activeValue={activeValue}>{item}</SubNavButton>
//                 ))
//             }
//         </SubNavButtonGroup>
//     )
// }

export default function Page(){
    return <div></div>
}