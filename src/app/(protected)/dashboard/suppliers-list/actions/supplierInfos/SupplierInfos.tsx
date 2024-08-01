"use client"

import React from "react";
import DialogBase, {AdminDialogHead, DialogActions} from "@/components/dialog/Dialog";
import {DialogCoverImage} from "@/components/dialog/DialogContentUtils";
import BtnBase from "@/components/elements/BtnBase";
import {
    SimpleSuccessDialog, SimpleSuccessDialogWithContent
} from "@/app/(protected)/dashboard/_components/globalActions/successDialog/SimpleSuccessDialog";
import {AddSupplierDialog} from "@/app/(protected)/dashboard/suppliers-list/actions/addSupplier/AddSupplierDialog";
import Supplier from "@/model/supplier/Supplier";
import supplier from "@/model/supplier/Supplier";
import {CardBody, CardContainer, CardItem} from "@/components/ui/3d-card";
import {useSuspendSupplier} from "@/hooks/supplier/useSupplier";
import notify from "@/utils/func/notification";

export const SupplierInfos: React.FC<{supplier: Supplier}&React.HTMLAttributes<HTMLDivElement>> = ({children, supplier}) => {

    const [isOpen, setIsOpen] = React.useState(false)
    const [addSupplierDialogIsOpen, setAddSupplierDialogIsOpen] = React.useState<boolean>(false)
    const [suspendSupplierDialogIsOpen, setSuspendSupplierDialogIsOpen] = React.useState<boolean>(false)
    const {isLoading, isSuccess, isError, error, mutate: suspendSupplier, invalidData} = useSuspendSupplier()

    React.useEffect(() => {
        if (isSuccess && !isLoading) {
            notify(supplier.isDeactivated ? `${supplier.getDisplayName} reactiver avec success` : `${supplier.getDisplayName} désactiver avec success`)
            setSuspendSupplierDialogIsOpen(true)
            invalidData().then()
        }
        if (isError && !isLoading) {
            notify(supplier.isDeactivated ? `Une erreur s'est produite lors de la reactivation du fournisseur` : `Une erreur s'est produite lors de la suspension du fournisseur`, 'error')
        }
    }, [isSuccess, isError, error])

    React.useEffect(()=>{

        return ()=> {
            //setAddSupplierDialogIsOpen(false)
        }
    })

    const handleToggleSupplierDialog = () => {
        setAddSupplierDialogIsOpen(!addSupplierDialogIsOpen)
    }


    const handleToggleDialog = () => {
        setIsOpen(!isOpen)
    }

    const handleSuspendSupplier = () => {
        suspendSupplier({id: '' + supplier.id, mode: 'suspend'})
    }

    const handleReactiveSupplier = (event: React.MouseEvent) => {
        event.preventDefault()
        event.stopPropagation()
        suspendSupplier({id: '' + supplier.id, mode: 'unsuspend'})
    }

    return (
        <div>
            <div onClick={handleToggleDialog}>
                {children}
            </div>
            <DialogBase isSubDialog={false} variant={'sm'} isOpenned={isOpen} onClose={handleToggleDialog}
                        bgType={'whited'}>
                <AdminDialogHead withBack={false} title={supplier.getDisplayName} handleToggle={handleToggleDialog}/>
                <CardContainer>
                    <CardBody>
                        <CardItem translateZ={100} className="w-full mt-4">
                            <DialogCoverImage image={supplier.getLogo} withSuccess={false}/>
                        </CardItem>
                    </CardBody>
                </CardContainer>
                <div className={`py-[25px] flex flex-col gap-[10px]`}>
                    <div  className={`text-admin-primary font-bold text-[24px] text-left tracking-[-2%] leading-[24px]`}>
                        {supplier.getLocation}
                    </div>
                    <div className={`text-admin-primary font-normal text-[20px] text-left tracking-[-2%] leading-[24.55px]`}>
                        {supplier.getActivity}
                    </div>
                </div>
                <DialogActions className={`pt-[0]`}>
                    {<BtnBase
                        onClick={() => setAddSupplierDialogIsOpen(true)}
                        color={'yellow'}
                        variant={'contained'}
                        fullwidth={true}
                        shape={'square'}
                        fontWeight={'bold'}
                        to={''}
                    >
                        Modifier les infos du fournisseur
                    </BtnBase>}

                    {!supplier.isDeactivated&&<BtnBase
                        color={'blue'}
                        variant={'contained'}
                        fullwidth={true}
                        shape={'square'}
                        to={''}
                        loading={isLoading}
                        disabled={isLoading}
                        onClick={handleSuspendSupplier}
                    >
                        Désactiver le fournisseur
                    </BtnBase>}

                    {supplier.isDeactivated&&<BtnBase
                        color={'red'}
                        variant={'outline'}
                        fullwidth={true}
                        shape={'square'}
                        to={''}
                        loading={isLoading}
                        disabled={isLoading}
                        onClick={handleReactiveSupplier}
                    >
                        Reactiver le fournisseur
                    </BtnBase>}
                </DialogActions>
            </DialogBase>
            <>
                <AddSupplierDialog client={supplier} isMain={false} isOpen={addSupplierDialogIsOpen}
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
        </div>
    )
}
