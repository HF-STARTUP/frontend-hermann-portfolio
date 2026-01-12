"use client";

import React from "react";
import ClientItem
    from "@/app/(protected)/dashboard/clients/_components/suppliersItems/_components/SupplierItem/ClientItem";
import Loading from "@/components/ui/Loader";
import {useGetRegion} from "@/hooks/__globlal/useGlobalHook";
import {EmptyData} from "@/components/box/PageNetworkState";
import MotionListWrapper from "@/components/ui/framer-list-wrapper";
import {VerticalDisplayListItemsContainer} from "@/components/box/Items";
import useAppStore from "@/stores/global/useAppStore";
import {useGetClients} from "@/hooks/client/useClient";

const ClientItems: React.FC = () => {

    const {region_id} = useGetRegion()
    const {isLoading, data: clients} = useGetClients()
    const {getFindToken, getFilterToken, getSortAsc} = useAppStore()


    if (isLoading) {
        return (
            <Loading/>
        )
    }


    if (!isLoading && clients?.length == 0) {
        return (
            <EmptyData
                message={"Vous n'avez pas encore de clients !"}
                description={`Vos clients actifs s'aficherons ici.`}
            />
        )
    }

    if (clients?.length === 0) {
        return (
            <EmptyData
                message={"Aucun client trouvé!"}
                description={"Aucun client ne correspond à votre recherche."}
            />
        );
    }


    if (clients) {
        return (
            <div>
                <VerticalDisplayListItemsContainer>
                    {clients.map((client, index) => (
                        <MotionListWrapper key={index} shouldAnimate={index === 0} index={index}>
                            <ClientItem client={client}/>
                            <div></div>
                        </MotionListWrapper>
                    ))}
                </VerticalDisplayListItemsContainer>
            </div>
        )
    }
}


export default ClientItems
