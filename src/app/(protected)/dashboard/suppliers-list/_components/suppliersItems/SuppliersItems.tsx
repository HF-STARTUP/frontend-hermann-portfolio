import React from "react";
import SupplierItem
    from "@/app/(protected)/dashboard/suppliers-list/_components/suppliersItems/_components/SupplierItem/SupplierItem";
import {useGetSuppliers} from "@/hooks/supplier/useSupplier";
import Loading from "@/components/ui/Loader";
import {useDynamicSearch, useGetRegion} from "@/hooks/__globlal/useGlobalHook";
import {EmptyData} from "@/components/box/PageNetworkState";
import MotionListWrapper from "@/components/ui/framer-list-wrapper";
import {VerticalDisplayListItemsContainer} from "@/components/box/Items";
import useAppStore from "@/stores/global/useAppStore";
import Supplier from "@/model/supplier/Supplier";

const SuppliersItems: React.FC = () => {

    const {region_id} = useGetRegion()
    const {isLoading, data: suppliers, isError, isSuccess} = useGetSuppliers(region_id)
    const {getFindToken, getFilterToken, getSortAsc} = useAppStore()

    const dataFiltered = useDynamicSearch<Supplier>(suppliers || [], getFindToken(), getFilterToken() as keyof Supplier, getSortAsc());

    if(isLoading){
        return (
            <Loading/>
        )
    }

    if(isError){
        return (
            <div>Erreur lors du chargement des données.</div>
        )
    }

    if (isSuccess && (!suppliers || suppliers.length === 0)) {
        return (
            <EmptyData
                message={"Vous n'avez pas encore de fournisseurs !"}
                description={`Vos fournisseurs actifs s'aficherons ici.`}
            />
        )
    }

    if (isSuccess &&  dataFiltered.length === 0) {
        return (
            <EmptyData
                message={"Aucun fournisseur trouvé!"}
                description={"Aucun fournisseur ne correspond à votre recherche."}
            />
        );
    }

    const items = dataFiltered || suppliers


    return (
        <div>
            <VerticalDisplayListItemsContainer>
                {items && items.map((supplier, index) => (
                    <MotionListWrapper key={supplier.id} shouldAnimate={index === 0} index={index}>
                        <SupplierItem supplier={supplier}/>
                    </MotionListWrapper>
                ))}
            </VerticalDisplayListItemsContainer>
        </div>
    )
}


export default SuppliersItems
