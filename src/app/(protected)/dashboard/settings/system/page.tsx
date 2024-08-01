"use client"

import React from "react";
import {AdminSettingBox} from "@/components/box/Card";
import {AdminPageTitle} from "@/components/typo/typo";
import {SystemOptionItem} from "@/components/box/FormGroup";
import {useGetCurencies} from "@/hooks/vehicule/useVehicule";
import Curency from "@/model/vehicule/Curency";

const SystemPage: React.FC = () => {

    const {
        data: curenciesData,
        isLoading: loadingCurencies,
    } = useGetCurencies()

    return (
        <AdminSettingBox>
            <AdminPageTitle withMb={true}>Système</AdminPageTitle>
            <div className={`flex flex-col gap-[29px] w-full`}>
                <SystemContentBox>
                    <SystemOptionItem items={[{label: 'Français', value: 'fr'}, {label: 'Anglais', value: 'en'}]}
                                      title={'Choisir la langue'}/>
                    <SystemOptionItem
                        loading={loadingCurencies}
                        items={Curency.toVSelect(curenciesData)}
                        title={'Choisir la devise'}
                    />
                </SystemContentBox>
                <SystemContentBox>
                    <div className="text-admin-primary text-lg font-semibold leading-[27.11px]">Region</div>
                    <SystemOptionItem
                        items={[{label: 'Kinshasa', value: 'kinshasa'}, {label: 'Douala', value: 'douala'}]}
                        title={'Changer de ville d’activité'}/>
                </SystemContentBox>
            </div>
        </AdminSettingBox>
    )
}


const SystemContentBox: React.FC<{ children: React.ReactNode }> = ({children}) => {

    return (
        <div className={`pl-[84px] flex flex-col gap-[20px]`}>
            {children}
        </div>
    )
}


export default SystemPage
