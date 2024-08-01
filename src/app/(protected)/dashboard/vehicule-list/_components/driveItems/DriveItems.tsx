import React from "react";
import DriveItem from "./_components/driveItem/DriveItem";
import {useGetVehicules} from "@/hooks/vehicule/useVehicule";
import Loading from "@/components/ui/Loader";
import {EmptyData} from "@/components/box/PageNetworkState";
import MotionListWrapper from "@/components/ui/framer-list-wrapper";
import {VerticalDisplayListItemsContainer} from "@/components/box/Items";
import useAppStore from "@/stores/global/useAppStore";
import {useDynamicSearch} from "@/hooks/__globlal/useGlobalHook";
import Vehicule from "@/model/vehicule/Vehicule";
import {logger} from "@/utils/func/devmode/debug";

const DriveItems: React.FC = () => {

    const {data: vehicules, isLoading, isError, error, isSuccess} = useGetVehicules()
    const {getFindToken, getFilterToken, getSortAsc} = useAppStore()

    const dataFiltered = useDynamicSearch<Vehicule>(vehicules || [], getFindToken(), getFilterToken() as keyof Vehicule, getSortAsc());

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

    if (isSuccess && (!vehicules || vehicules.length === 0)) {
        return (<EmptyData
            message={`Aucun véhicule enregistré pour l’instant`}
            description={`Pour ajouter un véhicule appuyez sur le bouton “+” ci-dessus`}
        />)
    }

    if (isSuccess && dataFiltered.length === 0) {
        return (
            <EmptyData
                message={"Aucun véhicule trouvé!"}
                description={"Aucun véhicule ne correspond à votre recherche."}
            />
        );
    }

    const items = dataFiltered || vehicules


    return (
        <VerticalDisplayListItemsContainer>
            {
                items.map((vehicule, index) => (
                    <MotionListWrapper key={vehicule.id} shouldAnimate={index === 0} index={index}>
                        <DriveItem vehicule={vehicule}/>
                    </MotionListWrapper>
                ))
            }
        </VerticalDisplayListItemsContainer>
    )
}


export default DriveItems
