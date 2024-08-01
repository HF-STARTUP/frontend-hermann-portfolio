"use client"

import React from "react";
import {AdminPageTitle} from "@/components/typo/typo";
import {
    GroupOptionField,
    GroupOptionItemContainer,
    GroupTitle
} from "@/app/(protected)/dashboard/schedule/schedule-settings/add-group/_components/_UtilsComponents";
import {RadioField} from "@/components/form/TextField";
import {Divider} from "@/components/box/Card";
import {
    InterimaireAssigmentType,
    PrincipalAssigmentType,
    useRotationGroupStore
} from "@/stores/protected/dashboard/schedule/useRotationGroupStore";

const AddGroupTMPWorkersPage: React.FC = () => {

    const {updateRotationGroupConfig, principalDriverConf, interimaireDriverConf} = useRotationGroupStore()

    return (
        <div>
            <AdminPageTitle withMb={true}>Chauffeurs et intermédiaires</AdminPageTitle>
            <div className={`flex flex-col gap-5`}>
                <div className={`flex flex-col gap-4`}>
                    <GroupTitle title={`Principal`}/>
                    <GroupOptionItemContainer>
                        <GroupTitle title={`Nombre de jour de repos par chauffeur :`}/>
                        <GroupOptionField
                            defaultValue={''+principalDriverConf.day_rest}
                            onSelectItem={(v) => {
                                updateRotationGroupConfig({principalDriverConf: {...principalDriverConf, day_rest: +v}})
                            }}
                            items={[{label: '01', value: '01'}, {label: '02', value: '02'}]}
                        />
                    </GroupOptionItemContainer>
                    <GroupTitle title={`Configuration de travail en cas d’indisponibilité du véhicule principal :`}/>
                    <div className={`flex flex-col gap-3`}>
                        <div className={`flex flex-col gap-3`}>
                            <RadioField
                                onChange={(checked)=>{
                                    checked&&updateRotationGroupConfig({principalDriverConf: {
                                        ...principalDriverConf, assingmentType:
                                            PrincipalAssigmentType.driver_indisponibility
                                    }})
                                }
                                }
                                defaultChecked={true}
                                variant={'text'}
                                label={`Peut prendre le relais sur un autre véhicule lorsqu’un le chauffeur est indisponible`}
                                name={`attribute3`}
                            />
                            <RadioField
                                variant={'text'}
                                label={`Ne travaille jamais ailleurs que sur son véhicule`}
                                name={`attribute3`}
                                onChange={(checked)=>{
                                    checked&&updateRotationGroupConfig({principalDriverConf: {
                                            ...principalDriverConf, assingmentType:
                                            PrincipalAssigmentType.fixe
                                        }})
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
                    <GroupTitle title={`Intérimaire`}/>
                    <GroupOptionItemContainer>
                        <GroupTitle title={`Nombre de jour de repos par chauffeur intermédiaire :`}/>
                        <GroupOptionField
                            items={[{label: '01', value: '01'}, {label: '02', value: '02'}]}
                            defaultValue={''+interimaireDriverConf.day_rest}
                            onSelectItem={(v) => {
                                updateRotationGroupConfig({interimaireDriverConf: {...interimaireDriverConf, day_rest: +v}})
                            }}
                        />
                    </GroupOptionItemContainer>
                    <GroupTitle title={`Configuration des jours de travail de l’intermédiaire :`}/>
                    <div className={`flex flex-col gap-3`}>
                        <div className={`flex flex-col gap-3`}>
                            <RadioField
                                defaultChecked={true}
                                variant={'text'}
                                label={`Lorsqu’il est sollicitée`}
                                name={`attribute4`}
                                onChange={(checked)=>{
                                    checked&&updateRotationGroupConfig({interimaireDriverConf: {
                                            ...interimaireDriverConf, assingmentType: InterimaireAssigmentType.day_rest_principal_driver
                                        }})
                                }
                                }
                            />
                            <RadioField
                                variant={'text'}
                                label={`Uniquement les jours de repos chauffeurs`}
                                name={`attribute4`}
                                onChange={(checked)=>{
                                    checked&&updateRotationGroupConfig({interimaireDriverConf: {
                                            ...interimaireDriverConf, assingmentType: InterimaireAssigmentType.solicity
                                        }})
                                }}
                            />
                            <RadioField
                                variant={'text'}
                                label={`Les deux`}
                                name={`attribute4`}
                                onChange={(checked)=>{
                                    checked&&updateRotationGroupConfig({interimaireDriverConf: {
                                            ...interimaireDriverConf, assingmentType: InterimaireAssigmentType.both
                                        }})
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddGroupTMPWorkersPage
