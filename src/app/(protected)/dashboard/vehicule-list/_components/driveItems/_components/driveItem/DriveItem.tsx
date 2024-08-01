import React from "react";
import ImageWithAvatar from "@/components/box/ImageWithAvatar";
import {
    CardItemContainer,
    CardItemMenu,
    CardItemMenuContainer,
    ItemContentAfter,
    ItemContentBefore
} from "@/components/box/AdminListItemComponents";
import {
    ProceedToPassation
} from "@/app/(protected)/dashboard/vehicule-list/actions/proceedToPassation/ProceedToPassation";
import ChangeDriverReceiver
    from "@/app/(protected)/dashboard/vehicule-list/actions/changeDriverReceiver/ChangeDriverReceiver";
import Vehicule from "@/model/vehicule/Vehicule";
import {useToggleVehiculeDeactivation} from "@/hooks/vehicule/useVehicule";
import notify from "@/utils/func/notification";
import {
    SimpleSuccessDialogWithContent
} from "@/app/(protected)/dashboard/_components/globalActions/successDialog/SimpleSuccessDialog";
import BtnBase from "@/components/elements/BtnBase";
import {VehicleInfosDialog} from "@/components/actions/VehiculeInfosDialog";
import {
    ExchangeIcon,
    HandStopIcon,
    LockIconAlt,
    VolumeIcon
} from "@/components/layout/admin/sidebar/_navIcons/NavIcons";

const DriveItem: React.FC<{ vehicule: Vehicule }> = ({vehicule}) => {
    const [passationDialogIsOpen, setPassationDialogIsOpen] = React.useState(false)
    const [changeDialogReceiverIsOpen, setChangeDialogReceiverIsOpen] = React.useState(false)
    const [suspendDialogIsOpen, setSuspendDialogIsOpen] = React.useState<boolean>(false)
    const [seeInfoIsOpen, setSeeInfoIsOpen] = React.useState(false)

    const {isLoading, isSuccess, isError, error, mutate: suspendSupplier, refresh} = useToggleVehiculeDeactivation()


    React.useEffect(() => {
        if (isSuccess && !isLoading) {
            notify(vehicule.isDeactivated ? `${vehicule.getFullName} reactiver avec success` : `${vehicule.getFullName} suspendus avec success`)
            setSuspendDialogIsOpen(true)
            refresh().then()
        }
        if (isError && !isLoading) {
            console.log(error)
            notify(vehicule.isDeactivated ? `Une erreur s'est produite lors de la reactivation du véhicule` : `Une erreur s'est produite lors de la suspension du véhicule`, 'error')
        }
    }, [isSuccess, isError, error])

    const handleDeactivateVehicule = () => {
        suspendSupplier({mode: 'deactivate', id: vehicule.id})
        refresh().then()
    }

    const handleReactivateVehicule = () => {
        suspendSupplier({mode: 'activate', id: vehicule.id})
        refresh().then()
    }

    const handleTogglePassationDialog = () => {
        setPassationDialogIsOpen(!passationDialogIsOpen)
    }

    const handleToggleChangeDialogReceiverIsOpen = () => {
        setChangeDialogReceiverIsOpen(!changeDialogReceiverIsOpen)
    }

    const titles: string[] = [
        vehicule.getBrandWithColor,
        vehicule.getRegistration,
        vehicule.getPrincipalDriverDisplayName,
        vehicule.getPrincipalDriverHourPassation,
    ]

    const itemStatusVariant = vehicule.isDeactivated ? 'error' : 'normal'

    return (
        <div onClick={() => {
            setSeeInfoIsOpen(true)
        }}>
            <CardItemContainer
                variant={itemStatusVariant}
                before={<>
                    <ImageWithAvatar
                        bgImage={vehicule?.getCover}
                        avatar={vehicule.getPrincipalDriverDisplayAvatar}
                    />
                    <ItemContentBefore
                        title={titles}
                        badgeStatus={vehicule.isDeactivated ? 'error' : "active"}
                        vehicle={vehicule}
                    />
                </>}>
                <div className={`flex flex-col justify-end items-end gap-[7px]`}>
                    <ItemContentAfter
                        // badge={'Débutant'}
                        // image={`/assets/faker/default-next-car-driver.png`}
                        // title={`Prochain chauffeur sur ce vehicule`}
                        // subtitle={`William Eloundou`}
                    >
                        <div className={"flex items-start gap-2"}>
                            <VehicleActions/>
                            <CardItemMenuContainer>
                                {/*<CardItemMenu */}
                                {/*    onClick={handleTogglePassationDialog} */}
                                {/*    name={'Proceder à la passassion'}*/}
                                {/*/>*/}
                                {/*<CardItemMenu */}
                                {/*    onClick={handleToggleChangeDialogReceiverIsOpen}*/}
                                {/*    name={'Changer le chaffeur receveur'}*/}
                                {/*/>*/}
                                <CardItemMenu
                                    onClick={() => setSeeInfoIsOpen(true)}
                                    name={'Voir les infos du véhicule'}
                                />
                                {!vehicule.isDeactivated && <CardItemMenu
                                    onClick={handleDeactivateVehicule}
                                    variant={'red'}
                                    name={isLoading ? 'Desactivation...' : 'Désactiver le véhicule'}
                                />}
                                {vehicule.isDeactivated && <CardItemMenu
                                    onClick={handleDeactivateVehicule}
                                    variant={'red'}
                                    name={isLoading ? 'Activation...' : 'Lever la suspension'}
                                />}
                            </CardItemMenuContainer>
                        </div>
                    </ItemContentAfter>
                    {vehicule.isDeactivated && <div>
                        <BtnBase
                            fontWeight={'bold'}
                            loading={isLoading}
                            disabled={isLoading}
                            to={''}
                            color={'red'}
                            variant={'outline'}
                            shape={'square'}
                            onClick={handleReactivateVehicule}
                        >
                            Lever la suspension
                        </BtnBase>
                    </div>}
                </div>
            </CardItemContainer>
            <>

                <VehicleInfosDialog
                    vehicule={vehicule}
                    isOpen={seeInfoIsOpen}
                    onClose={() => setSeeInfoIsOpen(false)}
                />

                <ProceedToPassation
                    vehicule={vehicule}
                    image={'/assets/faker/default-car-1.png'}
                    isOpen={passationDialogIsOpen} handleToggleDialog={handleTogglePassationDialog}
                />

                <ChangeDriverReceiver
                    isOpen={changeDialogReceiverIsOpen}
                    onClose={handleToggleChangeDialogReceiverIsOpen
                    }/>

                <SimpleSuccessDialogWithContent
                    fchild={<div>
                        {!vehicule.isDeactivated &&
                            <div><b>{vehicule.getFullName}</b> a été correctement reintegre dans votre flotte.</div>}
                        {vehicule.isDeactivated && <div>
                            <b>{vehicule.getFullName}</b> ne fait plus désormais partie de votre flotte.
                        </div>}
                    </div>}
                    title={!vehicule.isDeactivated ? `Véhicule reintegré avec succès!` : `Vehicule désactivé avec succès!`}
                    image={vehicule.getCover}
                    handleToggleDialog={() => setSuspendDialogIsOpen(false)}
                    isOpen={suspendDialogIsOpen}
                    isSubDialog={false}
                />
            </>
        </div>
    )
}

const VehicleActions = () => {

    return (
        <div className={"flex flex-col justify-end items-end gap-[13.54px]"}>
            <div className={"flex items-center gap-2"}>
                <VehicleAction>
                    <VolumeIcon/>
                </VehicleAction>
                <VehicleAction>
                    <HandStopIcon/>
                </VehicleAction>
                <VehicleAction>
                    <LockIconAlt/>
                </VehicleAction>
            </div>
            <VehicleAction>
                <ExchangeIcon/>
            </VehicleAction>
        </div>
    )
}

const VehicleAction: React.FC<React.HTMLAttributes<HTMLButtonElement>> = ({children}) => {

    return (
        <button onClick={(e) => e.stopPropagation()}>
            {children}
        </button>
    )
}


export default DriveItem
