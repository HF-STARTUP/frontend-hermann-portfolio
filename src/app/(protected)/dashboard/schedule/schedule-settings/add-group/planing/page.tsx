export default function Page(){

    return <div></div>
}

// "use client"
//
// import React from "react";
// import {AdminPageTitle} from "@/components/typo/typo";
// import {
//     AdminPlaningLabel,
//     AdminSettingBorderedCard,
//     ExpendableCheckbox,
//     GroupOptionField,
//     GroupOptionItemContainer,
//     GroupOptionTitle,
//     GroupRadioField,
//     SelectDayField,
//     SelectHourField
// } from "@/app/(protected)/dashboard/schedule/schedule-settings/add-group/_components/_UtilsComponents";
// import {
//     Frequency,
//     PlaningPassationModel,
//     PlaningType,
//     useRotationGroupStore
// } from "@/stores/protected/dashboard/schedule/useRotationGroupStore";
//
// const AddGroupSettingPlaningPage: React.FC = () => {
//
//     const {
//         planingType,
//         updateRotationGroupConfig,
//         passation_daylyDetails,
//         passation_weeklyDetails,
//         passation_monthlyDetails
//     } = useRotationGroupStore()
//
//     return (
//         <div>
//             <AdminPageTitle withMb={true}>Planning</AdminPageTitle>
//             <div className={`mb-[20px]`}>
//                 <AdminPlaningLabel>Type de planning</AdminPlaningLabel>
//             </div>
//             <div className={`flex flex-col gap-5`}>
//
//                 <ExpendableCheckbox
//                     checkbox={
//                         <GroupRadioField
//                             checked={planingType === PlaningType.daily}
//                             label={`Journalier`}
//                             name={'planingFrequency'}
//                             onChange={(checked) => {
//                                 checked && updateRotationGroupConfig({planingType: PlaningType.daily})
//                             }}
//                         />
//                     }
//                     expended={planingType === PlaningType.daily}
//                 >
//                     <AdminSettingBorderedCard>
//                         <AdminPlaningLabel>Les passations s’effectuent chaque jour entre:</AdminPlaningLabel>
//                         <GroupOptionItemContainer>
//                             <GroupOptionField
//                                 items={[{label: '01', value: '01'}, {label: '02', value: '02'}]}
//                                 onSelectItem={(item) => {
//                                     updateRotationGroupConfig({
//                                         passation_daylyDetails: {...passation_daylyDetails, driversNumber: +item}
//                                     })
//                                 }}
//                             />
//                             <GroupOptionTitle title={`chauffeurs`}/>
//                         </GroupOptionItemContainer>
//                         <GroupOptionTitle title={`Heure de passation journalière:`}/>
//                         <SelectHourField
//                             onSelectItem={(item) => {
//                                 updateRotationGroupConfig({
//                                     passation_daylyDetails: {...passation_daylyDetails, hour_id: +item}
//                                 })
//                             }}
//                         />
//                     </AdminSettingBorderedCard>
//                 </ExpendableCheckbox>
//
//
//                 <ExpendableCheckbox
//                     checkbox={
//                         <GroupRadioField
//                             name={`planingFrequency`}
//                             label={`Hebdomadaire`}
//                             checked={planingType === PlaningType.weekly}
//                             onChange={(checked) => {
//                                 checked && updateRotationGroupConfig({planingType: PlaningType.weekly})
//                             }}
//                         />
//                     }
//                     expended={planingType === PlaningType.weekly}
//                 >
//                     <AdminSettingBorderedCard>
//                         <AdminPlaningLabel>Les passations s’effectuent chaque semaine entre:</AdminPlaningLabel>
//                         <GroupOptionItemContainer>
//                             <GroupOptionField
//                                 items={[{label: '01', value: '01'}, {label: '02', value: '02'}]}
//                                 onSelectItem={(item) => {
//                                     updateRotationGroupConfig({
//                                         passation_weeklyDetails: {...passation_weeklyDetails, driversNumber: +item}
//                                     })
//                                 }}
//                             />
//                             <GroupOptionTitle title={`chauffeurs`}/>
//                         </GroupOptionItemContainer>
//                         <GroupOptionTitle title={`Jour de passation hebdomadaire d’un chauffeur à un autre:`}/>
//                         <div className={`flex gap-2 opacity-65`}>
//                             <GroupRadioField
//                                 name={'weeklyModel'}
//                                 checked={true}
//                                 label={`Modèle de passation continu`}
//                                 onChange={(checked) => {
//                                     checked && updateRotationGroupConfig({
//                                         passation_weeklyDetails: {
//                                             ...passation_weeklyDetails,
//                                             passationModel: PlaningPassationModel.continue
//                                         }
//                                     })
//                                 }}
//                             />
//                             <GroupRadioField
//                                 name={'weeklyModel'}
//                                 label={`Modèle discontinu`}
//                                 onChange={(checked) => {
//                                     checked && updateRotationGroupConfig({
//                                         passation_weeklyDetails: {
//                                             ...passation_weeklyDetails,
//                                             passationModel: PlaningPassationModel.discontinue
//                                         }
//                                     })
//                                 }}
//                             />
//                         </div>
//                         <GroupOptionItemContainer>
//                             <SelectDayField
//                                 onSelectItem={(item) => {
//                                     updateRotationGroupConfig({
//                                         passation_weeklyDetails: {
//                                             ...passation_weeklyDetails,
//                                             continueModelPassationDay_id: +item
//                                         }
//                                     })
//                                 }}
//                             />
//                             <GroupOptionTitle title={`à`}/>
//                             <SelectHourField
//                                 onSelectItem={(item) => {
//                                     updateRotationGroupConfig({
//                                         passation_weeklyDetails: {
//                                             ...passation_weeklyDetails,
//                                             continueModelPassationHour_id: +item
//                                         }
//                                     })
//                                 }}
//                             />
//                         </GroupOptionItemContainer>
//                     </AdminSettingBorderedCard>
//                 </ExpendableCheckbox>
//
//                 <ExpendableCheckbox
//                     checkbox={
//                         <GroupRadioField
//                             checked={planingType === PlaningType.monthly}
//                             label={`Mensuel`}
//                             name={`planingFrequency`}
//                             onChange={(checked) => {
//                                 checked && updateRotationGroupConfig({planingType: PlaningType.monthly})
//                             }}
//                         />
//                     }
//                     expended={planingType === PlaningType.monthly}
//                 >
//                     <AdminSettingBorderedCard>
//                         <AdminPlaningLabel>Les passations s’effectuent chaque mois entre:</AdminPlaningLabel>
//                         <GroupOptionItemContainer>
//                             <GroupOptionField
//                                 items={[{label: '01', value: '01'}, {label: '02', value: '02'}]}
//                                 onSelectItem={(item) => {
//                                     updateRotationGroupConfig({
//                                         passation_monthlyDetails: {...passation_monthlyDetails, driversNumber: +item}
//                                     })
//                                 }}
//                             />
//                             <GroupOptionTitle title={`chauffeurs`}/>
//                         </GroupOptionItemContainer>
//
//                         <div className={`flex gap-2 opacity-65`}>
//                             <GroupRadioField
//                                 name={'monthlyModel'}
//                                 checked={true}
//                                 label={`Modèle de passation continu`}
//                                 onChange={(checked) => {
//                                     checked && updateRotationGroupConfig({
//                                         passation_monthlyDetails: {
//                                             ...passation_monthlyDetails,
//                                             passationModel: PlaningPassationModel.continue
//                                         }
//                                     })
//                                 }}
//                             />
//                             <GroupRadioField
//                                 name={'monthlyModel'}
//                                 label={`Modèle discontinu`}
//                                 onChange={(checked) => {
//                                     checked && updateRotationGroupConfig({
//                                         passation_monthlyDetails: {
//                                             ...passation_monthlyDetails,
//                                             passationModel: PlaningPassationModel.discontinue
//                                         }
//                                     })
//                                 }}
//                             />
//                         </div>
//
//                         <GroupOptionTitle title={`Sélectionnez la fréquence de passation d’un chauffeur à un autre`}/>
//                         <GroupOptionField items={[
//                             {label: 'A la fin de chaque semaine', value: Frequency.Weekend},
//                             {label: 'Chaque deux semaines', value: Frequency.TwoWeeks},
//                             {label: 'Chaque trois semaines', value: Frequency.ThreeWeeks}
//                         ]}
//                                           onSelectItem={(item) => {
//                                               updateRotationGroupConfig({
//                                                   passation_monthlyDetails: {
//                                                       ...passation_monthlyDetails,
//                                                       frequency: item as Frequency
//                                                   }
//                                               })
//                                           }}
//                         />
//                         <GroupOptionTitle title={`Jour de passation`}/>
//                         <GroupOptionItemContainer>
//                             <SelectHourField
//                                 onSelectItem={(item) => {
//                                     updateRotationGroupConfig({
//                                         passation_monthlyDetails: {
//                                             ...passation_monthlyDetails,
//                                             continueModelPassationDay_id: +item
//                                         }
//                                     })
//                                 }}
//                             />
//                             <GroupOptionTitle title={`à`}/>
//                             <SelectDayField
//                                 onSelectItem={(item) => {
//                                     updateRotationGroupConfig({
//                                         passation_monthlyDetails: {
//                                             ...passation_monthlyDetails,
//                                             continueModelPassationHour_id: +item
//                                         }
//                                     })
//                                 }}
//                             />
//                         </GroupOptionItemContainer>
//                     </AdminSettingBorderedCard>
//                 </ExpendableCheckbox>
//
//             </div>
//         </div>
//     )
// }
//
// export default AddGroupSettingPlaningPage
