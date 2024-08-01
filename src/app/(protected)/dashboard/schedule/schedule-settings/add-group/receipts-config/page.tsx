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
import BtnBase from "@/components/elements/BtnBase";
import {
    CollectFrequency,
    CollectingTime,
    LocationCollecting,
    useRotationGroupStore
} from "@/stores/protected/dashboard/schedule/useRotationGroupStore";
import {useSetConfigurationGroup} from "@/hooks/shedule/useSchedule";
import notify from "@/utils/func/notification";
import {useGetParkID, useGetRegion} from "@/hooks/__globlal/useGlobalHook";
import {logger} from "@/utils/func/devmode/debug";
import {redirect, useRouter} from "next/navigation";

const AddGroupTRecipsPage: React.FC = () => {

    const {updateRotationGroupConfig, collectConfig} = useRotationGroupStore()

    const days = [`Lundi`, `Mardi`, `Mercredi`, `Jeudi`, `Vendredi`, `Samedi`, `Dimanche`]

    return (
        <div>
            <AdminPageTitle withMb={true}>Encaissements</AdminPageTitle>
            <div className={`flex flex-col gap-5`}>
                <div className={`flex flex-col gap-4`}>
                    <GroupTitle title={`Fréquence d’encaissement chauffeurs`}/>
                    <RadioField
                        onChange={(checked) => {
                            checked && updateRotationGroupConfig({
                                collectConfig: {
                                    ...collectConfig,
                                    frequency: CollectFrequency.everyDay
                                }
                            })
                        }}
                        variant={'text'}
                        label={`Tous les jours ouvrés (sélectionnez les jours ouvrés)`}
                        name={`attribute4`}
                        defaultChecked={true}
                    />
                    <div className={`flex flex-wrap gap-[20px] mb-5`}>
                        {days.map((d, k) => (
                            <TogglableDay label={d} key={k}/>
                        ))}
                    </div>
                    <GroupOptionItemContainer>
                        <RadioField
                            variant={'text'}
                            label={`Uniquement le`}
                            name={`attribute4`}
                            onChange={(checked) => {
                                checked && updateRotationGroupConfig({
                                    collectConfig: {
                                        ...collectConfig,
                                        frequency: CollectFrequency.oneDay
                                    }
                                })
                            }}
                        />
                        <GroupOptionField
                            items={[{label: 'Lundi', value: '01'}, {label: 'Mardi', value: '02'}]}
                            onSelectItem={(day_id) => {
                                updateRotationGroupConfig({collectConfig: {...collectConfig, day_id: +day_id}})
                            }}
                        />
                    </GroupOptionItemContainer>
                </div>
            </div>
            <div className={`my-5`}>
                <Divider/>
            </div>
            <div className={`flex flex-col gap-5`}>
                <div className={`flex flex-col gap-4`}>
                    <GroupTitle title={`Lieu d’encaissement des recettes`}/>
                    <GroupOptionItemContainer>
                        <RadioField
                            defaultChecked={true}
                            variant={'text'}
                            label={`Chez l’agent`}
                            name={`attribute5`}
                            onChange={(checked) => {
                                checked && updateRotationGroupConfig({
                                    collectConfig: {
                                        ...collectConfig,
                                        locationCollecting: LocationCollecting.atAgent
                                    }
                                })
                            }}
                        />
                        <GroupOptionField
                            onSelectItem={(item) => {
                                updateRotationGroupConfig({
                                    collectConfig: {
                                        ...collectConfig,
                                        collectingTime: item as CollectingTime
                                    }
                                })
                            }}
                            items={[
                                {label: 'Pendant le checking', value: CollectingTime.inChecking},
                                {label: 'À la passation', value: CollectingTime.onPassation},
                                {label: 'Les deux', value: CollectingTime.both}]
                            }
                        />
                    </GroupOptionItemContainer>
                    <GroupOptionItemContainer>
                        <RadioField
                            variant={'text'}
                            label={`À la caisse`}
                            name={`attribute5`}
                            onChange={(checked) => {
                                checked && updateRotationGroupConfig({
                                    collectConfig: {
                                        ...collectConfig,
                                        locationCollecting: LocationCollecting.inbox
                                    }
                                })
                            }}
                        />
                        <GroupOptionField
                            onSelectItem={(item) => {
                                console.log(`item===>${item}`)
                                updateRotationGroupConfig({
                                    collectConfig: {
                                        ...collectConfig,
                                        collectingTime: item as CollectingTime
                                    }
                                })
                            }}
                            items={[
                                {label: 'Pendant le checking', value: CollectingTime.inChecking},
                                {label: 'À la passation', value: CollectingTime.onPassation},
                                {label: 'Les deux', value: CollectingTime.both}
                            ]}
                        />
                    </GroupOptionItemContainer>
                </div>
            </div>
            <div className={`mb-5`}></div>
            <Divider/>
            <SaveConfiguration/>
        </div>
    )
}


const TogglableDay: React.FC<{ label: string }> = ({label}) => {
    const [isActive, setIsActive] = React.useState(false)
    return (
        <div onClick={() => setIsActive(!isActive)} className={`border border-[#707EAE] rounded-[6px] py-[2px] 
        px-[10px] font-normal text-[14px] leading-[24px] tracking-[-2%]  cursor-pointer 
        ${isActive ? 'bg-admin-primary text-white' : 'text-[#707EAE] hover:bg-[#707EAE]/20'}
        `}>
            {label}
        </div>
    )
}

const SaveConfiguration = () => {

    const {mutate, isLoading, isError, error, isSuccess, invalidRotationsGroup} = useSetConfigurationGroup()
    const {prepareRotationGroupInputs, updateRotationGroupConfig} = useRotationGroupStore()
    const {parkID} = useGetParkID()
    const $router = useRouter()

    React.useEffect(()=>{
        if(isError && error){
            logger.log(error)
            notify(error.message, 'error')
        }
    }, [isError, error])

    React.useEffect(()=>{
        if(isSuccess && !isError){
            invalidRotationsGroup().then(()=>{
                notify('Groupe de rotation creer avec success')
                $router.push('/dashboard/schedule/schedule-settings')
                updateRotationGroupConfig({name: 'Saisir le nom du groupe de rotation'})
            })
        }
    }, [isSuccess])

    const handleSaveConfigurationGroup = ()=> {
        const inputs = prepareRotationGroupInputs()
        mutate({...inputs, region_id: parkID})
    }

    return (
        <div className={`h-[120px] flex items-center justify-end relative`}>
            <BtnBase
                variant={"contained"}
                shape={"square"}
                color={"blue"}
                to={``}
                loading={isLoading}
                disabled={isLoading}
                onClick={handleSaveConfigurationGroup}
            >
                Sauvegarder la configuration
            </BtnBase>
        </div>
    )
}

export default AddGroupTRecipsPage
