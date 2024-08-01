"use client"

import React from "react";
import AdminSubNav from "@/components/layout/admin/SubNav/AdminSubNav";
import {AddIcon, EditIcon, TrashIcon} from "@/components/layout/admin/sidebar/_navIcons/NavIcons";
import VLinkProvider from "@/components/helpers/VLinkProvider";
import {useGetRotationsGroup} from "@/hooks/shedule/useSchedule";
import Loading from "@/components/ui/Loader";
import {EmptyData} from "@/components/box/PageNetworkState";
import RotationGroup from "@/model/schedule/RotationGroup";

const PlaningSettingsPage: React.FC = () => {

    return (
        <div>
            <AdminSubNav title={`Paramètres planning`} withUserSetting={false} isSubPage={true}/>
            <div>
                <PlaningConfHead/>
                <PlaningConfBody/>
            </div>
        </div>
    )
}

const PlaningConfHead: React.FC = () => {
    return (
        <div className={`mb-[20px] flex justify-between items-center`}>
            <h4 className={`text-black font-extrabold text-[24px] leading-[42px] tracking-[-2%]`}>Sélectionner un groupe
                de rotation</h4>
            <VLinkProvider to={`/dashboard/schedule/schedule-settings/add-group`}
                           className={`text-[#205DD3] font-extrabold text-[14px] leading-[25px] tracking-[-2%] flex items-center gap-1 hover:opacity-85`}>
                <AddIcon/>
                <div>Ajouter un groupe de rotation</div>
            </VLinkProvider>
        </div>
    )
}

const PlaningConfBody = () => {

    const {data: rotations, isLoading, isError} = useGetRotationsGroup()

    React.useEffect(() => {
    }, [rotations])

    if (isLoading) {
        return (
            <Loading/>
        )
    }

    if (isError || !rotations || !rotations.length) {
        return (
            <EmptyData message={`Aucun groupe de rotation pour l'instant`}/>
        )
    }

    return (
        <div className={`flex flex-wrap gap-[13px]`}>
            {rotations.map((r, k) => (<GroupConf rotation={r} key={k}/>))}
        </div>
    )
}

const GroupConf: React.FC<{ rotation: RotationGroup }> = ({rotation}) => {
    return (
        <div className={`w-[268px]`}>
            <div
                className={`rounded-2xl text-[#506D82] hover:text-white hover:bg-[#8E9BBA] transition duration-200 border border-[#8E9BBA] px-[7px] py-[12px] cursor-pointer`}>

                <div className={`flex justify-between items-center
           font-extrabold text-[20px] leading-[42px] tracking-[-2%] mb-[7px]
           `}>
                    <div>{rotation.getDisplatName}</div>
                    <div className={`flex items-center gap-[10px]`}>
                        <button><EditIcon width={28} height={28}/></button>
                        <button><TrashIcon width={28} height={28}/></button>
                    </div>
                </div>
                <div className={`flex flex-col gap-[1px] text-[14px] leading-[24px]`}>
                    <div>Nombre de chauffeurs: {rotation.getDriversCount}</div>
                    <div>Nombre d’interimaires: {rotation.getInterimaireCount}</div>
                    <div>Nombre de véhicules: {rotation.getVehiculeCount}</div>
                </div>
            </div>
        </div>
    )
}

export default PlaningSettingsPage
