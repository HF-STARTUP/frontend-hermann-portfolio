"use client"

import React from "react";
import ImageWithAvatar from "@/components/box/ImageWithAvatar";
import {
    CardItemContainer,
    CardItemMenu,
    CardItemMenuContainer,
    ItemContentAfter,
    ItemContentBefore
} from "@/components/box/AdminListItemComponents";
import {AddSupplierDialog} from "@/app/(protected)/dashboard/suppliers-list/actions/addSupplier/AddSupplierDialog";
import {SupplierInfos} from "@/app/(protected)/dashboard/suppliers-list/actions/supplierInfos/SupplierInfos";
import Supplier from "@/model/supplier/Supplier";
import {
    SimpleSuccessDialogWithContent
} from "@/app/(protected)/dashboard/_components/globalActions/successDialog/SimpleSuccessDialog";
import {useSuspendSupplier} from "@/hooks/supplier/useSupplier";
import notify from "@/utils/func/notification";
import BtnBase from "@/components/elements/BtnBase";

const SupplierItem: React.FC<{ supplier: Supplier }> = ({supplier}) => {

    const [addSupplierDialogIsOpen, setAddSupplierDialogIsOpen] = React.useState<boolean>(false)
    const [suspendSupplierDialogIsOpen, setSuspendSupplierDialogIsOpen] = React.useState<boolean>(false)
    const {isLoading, isSuccess, isError, error, mutate: suspendSupplier, invalidData} = useSuspendSupplier()

    React.useEffect(() => {
        if (isSuccess && !isLoading) {
            notify(supplier.isDeactivated ? `${supplier.getDisplayName} reactiver avec success` : `${supplier.getDisplayName} suspendus avec success`)
            setSuspendSupplierDialogIsOpen(true)
            invalidData().then()
        }
        if (isError && !isLoading) {
            notify(supplier.isDeactivated ? `Une erreur s'est produite lors de la reactivation du fournisseur` : `Une erreur s'est produite lors de la suspension du fournisseur`, 'error')
        }
    }, [isSuccess, isError, error])

    const handleToggleSupplierDialog = () => {
        setAddSupplierDialogIsOpen(!addSupplierDialogIsOpen)
    }

    const handleSuspendSupplier = () => {
        suspendSupplier({id: '' + supplier.id, mode: 'suspend'})
    }

    const handleReactiveSupplier = (event: React.MouseEvent) => {
        event.preventDefault()
        event.stopPropagation()
        suspendSupplier({id: '' + supplier.id, mode: 'unsuspend'})
    }

    const titles: string[] = [
        supplier.getDisplayName,
        supplier.getLocation,
        '',
        supplier.getActivity
    ]

    const itemStatusVariant = supplier.isDeactivated ? 'error' : 'normal'

    return (
        <>
            <SupplierInfos supplier={supplier}>
                <CardItemContainer
                    variant={itemStatusVariant}
                    before={<>
                        <ImageWithAvatar variant={"default"} bgImage={supplier.getLogo}/>
                        <ItemContentBefore title={titles}/>
                    </>}
                >
                    <div className={`flex flex-col justify-end items-end gap-[7px]`}>
                        <ItemContentAfter>
                            <CardItemMenuContainer>
                                <CardItemMenu onClick={handleToggleSupplierDialog} name={'Modifier les infos'}/>
                                {!supplier.isDeactivated &&
                                    <CardItemMenu
                                        onClick={handleSuspendSupplier}
                                        variant={'red'}
                                        name={isLoading ? 'Suspension...' : 'Desactiver le fournisseur'}
                                    />}
                                {supplier.isDeactivated && <CardItemMenu
                                    onClick={handleReactiveSupplier}
                                    variant={'red'}
                                    name={isLoading ? 'Reactivation...' : 'Activer le fournisseur'}
                                />}
                            </CardItemMenuContainer>
                        </ItemContentAfter>
                        {supplier.isDeactivated && <div>
                            <BtnBase
                                fontWeight={'bold'}
                                loading={isLoading}
                                disabled={isLoading}
                                to={''}
                                color={'red'}
                                variant={'outline'}
                                shape={'square'}
                                onClick={handleReactiveSupplier}
                            >
                                Reactiver le fournisseur
                            </BtnBase>
                        </div>}
                    </div>
                </CardItemContainer>
            </SupplierInfos>
            <>
                <AddSupplierDialog client={supplier} supplier={supplier} isMain={false} isOpen={addSupplierDialogIsOpen}
                                   onClose={handleToggleSupplierDialog}/>
                <SimpleSuccessDialogWithContent
                    fchild={<div>
                        {!supplier.isDeactivated &&
                            <div><b>{supplier.getDisplayName}</b> a été correctement reintegre vos fournisseurs agréés.</div>}
                        {supplier.isDeactivated && <div>
                            <b>{supplier.getDisplayName}</b> ne fait plus désormais partie de vos fournisseurs agréés.
                        </div>}
                    </div>}
                    title={!supplier.isDeactivated ? `Fournisseur reintegré avec succès!` : `Fournisseur désactivé avec succès!`}
                    image={supplier.getLogo}
                    handleToggleDialog={() => setSuspendSupplierDialogIsOpen(false)}
                    isOpen={suspendSupplierDialogIsOpen}
                    isSubDialog={false}
                />
            </>
        </>
    )
}


export default SupplierItem
