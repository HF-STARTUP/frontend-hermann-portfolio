"use client"

import React from "react";
import AdminSubNav, {SubNavSeeAll} from "@/components/layout/admin/SubNav/AdminSubNav";
import AddGroupSidebar
    from "@/app/(protected)/dashboard/schedule/schedule-settings/add-group/_components/AddGroupSidebar";
import {
    GroupOptionField
} from "@/app/(protected)/dashboard/schedule/schedule-settings/add-group/_components/_UtilsComponents";
import SeeAllDriversDialog from "@/app/(protected)/dashboard/drivers-list/actions/seeAllDrivers/SeeAllDrivers";
import {useGetVehiculeGroup} from "@/hooks/vehicule/useVehicule";
import Driver from "@/model/driver/Driver";
import {DialogDriverItem} from "@/components/dialog/Dialog";
import EntitySelectDialog from "@/components/actions/EntitySelectDialog.action";
import {useGetDrivers} from "@/hooks/driver/useDriver";
import VehiculeGroup from "@/model/vehicule/VehiculeGroup";
import {SelectField} from "@/components/form/TextField";
import {useRotationGroupStore} from "@/stores/protected/dashboard/schedule/useRotationGroupStore";

const Template: React.FC<{ children: React.ReactNode }> = ({children}) => {

    const [selectDriverIsOpen, setSelectDriverIsOpen] =React.useState(false)
    const {isLoading, data: gVehicules} = useGetVehiculeGroup()
    const {data: drivers, isLoading: dloading, isError: derrors} = useGetDrivers()
    const {updateRotationGroupConfig, groupe_id} = useRotationGroupStore()


    return (
        <div className={`relative`}>
            <AdminSubNav editableTitle={true} title={`Saisir le nom du groupe de rotation`} isSubPage={true} withFilterSection={false} withUserSetting={false}/>
            <div className={`flex gap-5 justify-end`}>
                <div className={`leading-[24px] font-normal text-[18px] text-admin-primary`}>Ce groupe de rotation concerne :</div>
                <React.Fragment>
                    {isLoading||!gVehicules&&(
                        <div></div>
                    )}
                    {gVehicules&&!isLoading&&(
                        <React.Fragment>

                            <SelectField
                                items={VehiculeGroup.toVSelect(gVehicules)}
                                fit={true}
                                variant={'rounded'}
                                size={'sm'}
                                defaultValue={groupe_id}
                                handleSelect={(v)=>{updateRotationGroupConfig({groupe_id: ''+v})}}
                            />

                            <SubNavSeeAll custom={true} onClick={()=>{setSelectDriverIsOpen(true)}} label={`Sélectionnez les chauffeurs concernés`}/>
                        </React.Fragment>
                    )}
                </React.Fragment>
            </div>
            <div className={`flex bg-white min-h-[70vh] rounded-2xl overflow-hidden`}>
                <AddGroupSidebar/>
                <div className={`w-full px-[20px] py-[35px]`}>
                    {children}
                </div>
            </div>
            <EntitySelectDialog<Driver, typeof DialogDriverItem>
                title={"Sélectionnez les chauffeurs concernés"}
                emptyMessage={"Aucun chauffer créé pour l’instant"}
                DisplayItem={DialogDriverItem}
                isSelect={true}
                getData={()=>drivers}
                isOpen={selectDriverIsOpen}
                onClose={()=>setSelectDriverIsOpen(false)}
                onValidate={() => {
                    setSelectDriverIsOpen(false)
                }}
                handleSelectItems={(items) => {
                    //updateSelectedItem({driver: items[0]})
                }}
            />
        </div>
    )
}


export default Template
