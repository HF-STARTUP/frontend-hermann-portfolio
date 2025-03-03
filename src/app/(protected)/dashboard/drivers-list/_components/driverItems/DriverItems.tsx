"use client";

import React from "react";
import DriverItem from "./_components/driverItem/DriverItem";
import {useGetDrivers} from "@/hooks/driver/useDriver";
import Loading from "@/components/ui/Loader";
import {EmptyData} from "@/components/box/PageNetworkState";
import MotionListWrapper from "@/components/ui/framer-list-wrapper";
import {VerticalDisplayListItemsContainer} from "@/components/box/Items";
import useAppStore from "@/stores/global/useAppStore";
import {useDynamicSearch} from "@/hooks/__globlal/useGlobalHook";
import Driver from "@/model/driver/Driver";
import {logger} from "@/utils/func/devmode/debug";

const DrivesItems: React.FC = () => {

    const {isLoading, isError, error, data: drivers, isSuccess} = useGetDrivers()
    const {getFindToken, getFilterToken, getSortAsc} = useAppStore()

    const dataFiltered = useDynamicSearch<Driver>(drivers || [], getFindToken(), getFilterToken() as keyof Driver, getSortAsc());

    if(isLoading){
        return (
            <Loading/>
        )
    }

    if(isError){

        logger.log(error)

        return (
            <div>Erreur lors du chargement des données.</div>
        )
    }


    if (isSuccess && (!drivers || drivers.length === 0)) {
        return (<EmptyData
            message={`Vous n'avez pas encore de chauffeur  dans votre flotte !`}
            description={`Vos chauffeur actifs s'aficherons ici.`}
        />)
    }

    if (isSuccess && dataFiltered.length === 0) {
        return (
            <EmptyData
                message={"Aucun chauffeur trouvé!"}
                description={"Aucun chauffeur ne correspond à votre recherche."}
            />
        );
    }

    const items = dataFiltered || drivers


    return (
        <VerticalDisplayListItemsContainer>
            {items.map((driver, index) => (
                <MotionListWrapper key={driver.id} shouldAnimate={index === 0} index={index}>
                    <DriverItem driver={driver}/>
                </MotionListWrapper>
            ))}
        </VerticalDisplayListItemsContainer>
    )
}


export default DrivesItems
