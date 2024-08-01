"use client"

import React from "react";
import {InfoIcon} from "@/components/layout/admin/sidebar/_navIcons/NavIcons";
import Image from "next/image";
import {CustomScroll} from "@/components/box/CustomScroll";
import AdminSearchFieldWithFilter from "@/components/elements/AdminSearchFieldWithFilter";
import {Badge} from "@/components/box/Chip";
import {CardItemMenu, CardItemMenuContainer} from "@/components/box/AdminListItemComponents";
import useGeolocationStore from "@/stores/protected/dashboard/geolocation/useGeolocationStore";
import CarDetailledInfos
    from "@/app/(protected)/dashboard/geolocation/_components/mapCarStat/_components/carDetailledInfos/CarDetailledInfos";
import {useGetVehicules} from "@/hooks/vehicule/useVehicule";
import Vehicule from "@/model/vehicule/Vehicule";
import Loading from "@/components/ui/Loader";


export type ReceiptUserProps = {
    id?: number, avatar: string, role: string, name: string, active: boolean
}

const MapCarStats: React.FC = () => {

    const {getSelectCar} = useGeolocationStore()

    return (
        <div>
            {getSelectCar() && <CarDetailledInfos/>

            }
            {!getSelectCar() && <div className={`bg-white rounded-[18px] px-[20px] py-[18px]`}>
                <MapCarStatHead/>
                <CarList/>
            </div>}
        </div>
    )
}


const MapCarStatHead: React.FC = () => {
    return (
        <div>
            <div className={`flex flex-col gap-[17px] mb-[9px]`}>
                <div className={`flex justify-between items-center`}>
                    <div className="text-admin-primary text-xl font-bold  leading-[25px]">Liste des véhicules</div>
                </div>
                <AdminSearchFieldWithFilter/>
            </div>
        </div>
    )
}

const CarList: React.FC = () => {

    const {data: vehicles, isLoading} = useGetVehicules()

    return (
        <CustomScroll ctx={`extends`}>
            <div>
                {isLoading && <Loading/>}
                {vehicles && <div className={`flex flex-col gap-[7px]`}>
                    {vehicles.map((vehicle, index) => (
                        <Car vcle={vehicle} key={index}/>
                    ))
                    }
                </div>}
            </div>
        </CustomScroll>
    )
}

const Car: React.FC<{ vcle: Vehicule }> = ({vcle}) => {
    const {
        getBrandWithColor,
        getGpsNumber,
        getCover
    } = vcle

    const {setSelectedCar} = useGeolocationStore()

    const handleSelectCar = () => {
        setSelectedCar(1)
    }

    return (
        <div
            onClick={() => handleSelectCar()}
            className={`flex justify-between bg-[#F4F7FE] p-2 rounded-2xl cursor-pointer border border-transparent hover:border-text-body transition duration-200`}>
            <div className={`flex gap-[10px]`}>
                <div>
                    <Image width={44} height={44} className={`rounded-[10.38px] h-[44px] w-auto`}
                           src={getCover} alt={'default use receipt'}/>
                </div>
                <div className={`text-admin-primary font-medium text-[14px] leading-[25px]`}>
                    <div className={``}>{getBrandWithColor}</div>
                    <div className={`font-normal`}>No: {getGpsNumber}</div>
                </div>
            </div>
            <div className={`flex gap-2 items-center`}>
                <Badge variant={`green`}/>
                <CardItemMenuContainer toggleIcon={<InfoIcon className={`text-admin-primary`}/>}>
                    <CardItemMenu name={'Historique de trajet'}/>
                    <CardItemMenu name={'Faire sonner l’alarme'}/>
                    <CardItemMenu variant={'red'} name={'Arrêter le véhicule'}/>
                </CardItemMenuContainer>
            </div>
        </div>
    )
}


export default MapCarStats
