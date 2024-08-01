"use client"

import React from "react";
import {AdminPageTitle} from "@/components/typo/typo";
import {
    AdminPlaningLabel,
    AdminSettingBorderedCard, ExpendableCheckbox,
    GroupOptionField,
    GroupOptionItemContainer,
    GroupOptionTitle,
    GroupRadioField, SelectDayField, SelectHourField
} from "@/app/(protected)/dashboard/schedule/schedule-settings/add-group/_components/_UtilsComponents";
import {CheckingType, useRotationGroupStore} from "@/stores/protected/dashboard/schedule/useRotationGroupStore";

const AddGroupCheckingPage: React.FC = () => {

    const {updateRotationGroupConfig, checking} = useRotationGroupStore()

    return (
        <div>
            <AdminPageTitle withMb={true}>Checking</AdminPageTitle>
            <div className={`mb-[20px]`}>
                <AdminPlaningLabel>Type de checking</AdminPlaningLabel>
            </div>
            <div className={`flex flex-col gap-5`}>

                <ExpendableCheckbox
                    expended={checking.checkingType === CheckingType.daily}
                    checkbox={
                        <GroupRadioField
                            name={'checkingFrequency'}
                            checked={checking.checkingType === CheckingType.daily}
                            label={`Journalier`}
                            onChange={(checked) => {
                                checked && updateRotationGroupConfig({checking: {...checking, checkingType: CheckingType.daily}})
                            }}
                        />
                    }
                >
                    <AdminSettingBorderedCard>
                        <AdminPlaningLabel>Un contrôle du véhicule est effectué chaque jour:</AdminPlaningLabel>
                        <GroupOptionItemContainer>
                            <GroupOptionField
                                items={[{label: '01', value: '01'}, {label: '02', value: '02'}]}
                                onSelectItem={(item)=>{
                                    updateRotationGroupConfig({checking: {...checking, checkingDailyDetails: {
                                        numberOfTimes: +item
                                    }}
                                    })
                                }}
                            />
                            <GroupOptionTitle title={`fois`} />
                        </GroupOptionItemContainer>
                        <GroupOptionTitle title={`Heures de contrôle: `} />
                        <GroupOptionItemContainer>
                            <SelectHourField
                                onSelectItem={(item)=>{
                                    updateRotationGroupConfig({checking: {...checking, checkingDailyDetails: {
                                                hour_id: +item
                                            }}
                                    })
                                }}
                            />
                            <GroupOptionTitle title={`et`} />
                            <SelectHourField  />
                        </GroupOptionItemContainer>
                    </AdminSettingBorderedCard>
                </ExpendableCheckbox>

                <ExpendableCheckbox
                    expended={checking.checkingType === CheckingType.weekly}
                    checkbox={
                        <GroupRadioField
                            name={'checkingFrequency'}
                            label={`Hebdomadaire`}
                            checked={checking.checkingType === CheckingType.weekly}
                            onChange={(checked) => {
                                checked && updateRotationGroupConfig({checking: {...checking, checkingType: CheckingType.weekly}})
                            }}
                        />
                    }
                >
                    <AdminSettingBorderedCard>
                        <AdminPlaningLabel>Un contrôle du véhicule est effectué chaque semaine:</AdminPlaningLabel>
                        <GroupOptionItemContainer>
                            <GroupOptionField
                                items={[{label: '01', value: '01'}, {label: '02', value: '02'}]}
                                onSelectItem={(item)=>{
                                    updateRotationGroupConfig({checking: {...checking, checkingWeeklyDetails: {
                                                numberOfTimes: +item
                                            }}
                                    })
                                }}
                            />
                            <GroupOptionTitle title={`fois`} />
                        </GroupOptionItemContainer>
                        <GroupOptionTitle title={`Jour de contrôle: `} />
                        <GroupOptionItemContainer>
                            <SelectDayField
                                onSelectItem={(item)=>{
                                    updateRotationGroupConfig({checking: {...checking, checkingWeeklyDetails: {
                                                checkingDay_id: +item
                                            }}
                                    })
                                }}
                            />
                            <GroupOptionTitle title={`a`} />
                            <SelectHourField
                                onSelectItem={(item)=>{
                                    updateRotationGroupConfig({checking: {...checking, checkingWeeklyDetails: {
                                                checkingHour_id: +item
                                            }}
                                    })
                                }}
                            />
                        </GroupOptionItemContainer>
                        <GroupOptionItemContainer>
                            <SelectDayField
                                // onSelectItem={(item)=>{
                                //     updateRotationGroupConfig({checking: {...checking, checkingWeeklyDetails: {
                                //                 numberOfTimes: +item
                                //             }}
                                //     })
                                // }}
                            />
                            <GroupOptionTitle title={`a`} />
                            <SelectHourField />
                        </GroupOptionItemContainer>
                    </AdminSettingBorderedCard>
                </ExpendableCheckbox>

            </div>
        </div>
    )
}

export default AddGroupCheckingPage
