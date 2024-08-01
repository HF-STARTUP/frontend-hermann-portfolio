"use client"

import React from "react";
import {AdminPageTitle} from "@/components/typo/typo";
import {
    GroupOptionTitle,
    GroupTitle
} from "@/app/(protected)/dashboard/schedule/schedule-settings/add-group/_components/_UtilsComponents";
import {RadioField} from "@/components/form/TextField";
import {Divider} from "@/components/box/Card";
import {
    useRotationGroupStore,
    VehiclePrincipalDriverAssignmentType
} from "@/stores/protected/dashboard/schedule/useRotationGroupStore";

const AddGroupCarPage: React.FC = () => {

    const {updateRotationGroupConfig} = useRotationGroupStore()

    return (
        <div>
            <AdminPageTitle withMb={true}>Véhicules</AdminPageTitle>
            <div className={`flex flex-col gap-5`}>
                <div className={`flex flex-col gap-4`}>
                    <GroupTitle title={`Chauffeurs`}/>
                    <div className={`flex flex-col gap-3`}>
                        <GroupOptionTitle title={`Un véhicule peut être attribué principalement à : `}/>
                        <div className={`flex flex-col gap-3`}>

                            <RadioField
                                defaultChecked={true}
                                variant={'text'}
                                label={`Un ou plusieurs chauffeurs fixes`}
                                name={`attribute`}
                                onChange={(checked) => {
                                    checked && updateRotationGroupConfig({vehiclePrincipalDriverAssignment: VehiclePrincipalDriverAssignmentType.multipleDriverFixed})
                                }
                                }
                            />

                            <RadioField
                                variant={'text'}
                                label={`Un seul chauffeur fixe`}
                                name={`attribute`}
                                onChange={(checked) => {
                                    checked && updateRotationGroupConfig({vehiclePrincipalDriverAssignment: VehiclePrincipalDriverAssignmentType.singleDriverFixed})
                                }
                                }
                            />

                            <RadioField
                                variant={'text'}
                                label={`N’importe quel chauffeur`}
                                name={`attribute`}
                                onChange={(checked) => {
                                    checked && updateRotationGroupConfig({vehiclePrincipalDriverAssignment: VehiclePrincipalDriverAssignmentType.anyDriver})
                                }
                                }
                            />

                        </div>
                    </div>
                </div>
            </div>
            <div className={`my-5`}>
                <Divider/>
            </div>
            <div className={`flex flex-col gap-5`}>
                <div className={`flex flex-col gap-4`}>
                    <GroupTitle title={`Intermédiaire`}/>
                    <div className={`flex flex-col gap-3`}>
                        <GroupOptionTitle title={`Un véhicule peut être attribué à : `}/>
                        <div className={`flex flex-col gap-3`}>

                            <RadioField
                                defaultChecked={true}
                                variant={'text'}
                                label={`Un ou plusieurs chauffeurs intermédiaires fixes`}
                                name={`attribute2`}
                                onChange={(checked) => {
                                    checked && updateRotationGroupConfig({vehiclePrincipalDriverAssignment: VehiclePrincipalDriverAssignmentType.multipleDriverFixed})
                                }
                                }
                            />

                            <RadioField
                                variant={'text'}
                                label={`Un seul chauffeur intermédiaire fixe`}
                                name={`attribute2`}
                                onChange={(checked) => {
                                    checked && updateRotationGroupConfig({vehiclePrincipalDriverAssignment: VehiclePrincipalDriverAssignmentType.singleDriverFixed})
                                }
                                }
                            />

                            <RadioField
                                variant={'text'}
                                label={`N’importe quel chauffeur intermédiaire`}
                                name={`attribute2`}
                                onChange={(checked) => {
                                    checked && updateRotationGroupConfig({vehiclePrincipalDriverAssignment: VehiclePrincipalDriverAssignmentType.anyDriver})
                                }
                                }
                            />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddGroupCarPage
