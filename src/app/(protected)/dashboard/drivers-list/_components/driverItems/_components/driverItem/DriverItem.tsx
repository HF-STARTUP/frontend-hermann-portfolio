"use client";

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
    SeeDriverPlaningDialog
} from "@/app/(protected)/dashboard/drivers-list/actions/seeDriverPlaning/SeeDriverPlaningDialog";
import {SuspendDriverDialog} from "@/app/(protected)/dashboard/drivers-list/actions/suspendDriver/SuspendDriverDialog";
import {DeleteDriverDialog} from "@/app/(protected)/dashboard/drivers-list/actions/deleteDriver/DeleteDriver";
import Driver from "@/model/driver/Driver";
import BtnBase from "@/components/elements/BtnBase";
import {useDeactivateDriver} from "@/hooks/driver/useDriver";
import notify from "@/utils/func/notification";
import {
    SimpleSuccessDialogWithContent
} from "@/app/(protected)/dashboard/_components/globalActions/successDialog/SimpleSuccessDialog";
import {DriverInfoDialog} from "@/components/actions/DriverInfoDialog";
import Chip from "@/components/box/Chip";

const DriverItem: React.FC<{ driver: Driver }> = ({driver}) => {

    const [driverPlaningDialogIsOpen, setDriverPlaningDialogIsOpen] = React.useState<boolean>(false)
    const [suspendDriverDialogIsOpen, setSuspendDriverDialogIsOpen] = React.useState<boolean>(false)
    const [deleteDriverDialogIsOpen, setDeleteDriverDialogIsOpen] = React.useState<boolean>(false)
    const [driverInfoDialogIsOpen, setDriverInfoDialogIsOpen] = React.useState<boolean>(false)

    const [success, setSuccessIsOpen] = React.useState<boolean>(false)

    const {isLoading, refresh, isSuccess, isError, error, mutate} = useDeactivateDriver()

    React.useEffect(() => {
        if (isSuccess && !isLoading) {
            refresh().then()
            setSuccessIsOpen(true)
            notify('Reactivation effectué avec success', 'success')
        }
        if (isError && !isLoading) {
            notify('Une erreur est survenus lors de la réactivation du chauffeur', 'error')
        }
    }, [isSuccess, isError, error])

    const handlerActivateDriver = () => {
        mutate({id: driver.id, mode: 'activate'})
    }
    const handleToggleSuccess = () => {
        setSuccessIsOpen(false)
    }

    const handleToggleSuspendDriverIsOpen = () => {
        setSuspendDriverDialogIsOpen(!suspendDriverDialogIsOpen)
    }

    const handleToggleDeleteDriverIsOpen = () => {
        setDeleteDriverDialogIsOpen(!deleteDriverDialogIsOpen)
    }


    const handleToggleDriverPlaningDialogIsOpen = () => {
        setDriverPlaningDialogIsOpen(!driverPlaningDialogIsOpen)
    }

    const itemStatusVariant = driver.isSuspended ? 'error' : 'normal'
    const itemsVariant = driver.getDriverActivityUiStatus

    const titles: string[] = [
        driver.getUsername,
        driver.contactEmailAndPhone,
        '',
        driver?.currentVehicle
            ? "Actuellement sur: " + driver.currentVehicle.getFullName + " - " + driver.currentVehicle.getRegistration
            : "Aucun véhicule pris en service actuellement"
    ]

    return (
        <div onClick={() => setDriverInfoDialogIsOpen(true)}>
            <CardItemContainer
                variant={itemStatusVariant}
                before={<>
                    <div className={`${driver.isDeactivated ? 'opacity-30' : ''}`}>
                        <ImageWithAvatar
                            bgImage={driver.getAvatar}
                            avatar={driver.getPrincipalVehiculeImage}
                        />
                    </div>
                    <div className={`${driver.isDeactivated ? 'opacity-20' : ''}`}>
                        <ItemContentBefore title={titles} badgeStatus={driver.isDeactivated ? undefined : 'active'}
                                           variant={itemsVariant}/>
                    </div>
                </>}>
                <div className={`flex flex-col justify-end items-end gap-[7px]`}>
                    {!driver.isDeactivated && <div className={"flex gap-2 items-start"}>
                        <div className={"flex flex-col gap-2"}>
                            <Chip name={driver.getDriverType}/>
                            <Chip container={"v2"} name={driver.getGrade}/>
                        </div>
                        <ItemContentAfter
                            // badge={'Débutant'}
                            // image={`/assets/faker/default-next-car-driver.png`}
                            // title={`Prochain chauffeur sur ce vehicule`}
                            // subtitle={`William Eloundou`}
                        >
                            <CardItemMenuContainer>
                                <CardItemMenu onClick={() => setDriverInfoDialogIsOpen(true)}
                                              name={'Voir infos chauffeur'}/>
                                <CardItemMenu onClick={() => setDriverPlaningDialogIsOpen(true)}
                                              name={'Voir planning chauffeur'}/>
                                {!driver.isSuspended && <CardItemMenu onClick={() => setSuspendDriverDialogIsOpen(true)}
                                                                      name={'Suspendre chauffeur'}/>}
                                {driver.isSuspended && <CardItemMenu onClick={() => setSuspendDriverDialogIsOpen(true)}
                                                                     name={'Lever la suspension'}/>}
                                <CardItemMenu onClick={() => setDeleteDriverDialogIsOpen(true)} variant={'red'}
                                              name={'Désactiver chauffeur'}/>
                            </CardItemMenuContainer>
                        </ItemContentAfter>
                    </div>}
                    {driver.isSuspended && !driver.isDeactivated && <div>
                        <BtnBase
                            onClick={() => setSuspendDriverDialogIsOpen(true)}
                            fontWeight={'bold'}
                            to={''}
                            color={'red'}
                            variant={'outline'}
                            shape={'square'}
                        >
                            Lever la suspension
                        </BtnBase>
                    </div>}
                    {driver.isDeactivated && <div className={`pt-[37px]`}>
                        <BtnBase
                            onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                handlerActivateDriver()
                            }}
                            fontWeight={'bold'}
                            to={''}
                            color={'admin-primary'}
                            variant={'outline'}
                            shape={'square'}
                            loading={isLoading}
                            disabled={isLoading}
                        >
                            Lever la suspension
                        </BtnBase>
                    </div>}
                </div>
            </CardItemContainer>
            <>
                <DriverInfoDialog
                    driver={driver}
                    isOpen={driverInfoDialogIsOpen}
                    onClose={() => setDriverInfoDialogIsOpen(false)}
                />
                <SeeDriverPlaningDialog
                    driver={driver}
                    image={driver.getAvatar}
                    isOpen={driverPlaningDialogIsOpen}
                    handleToggleDialog={handleToggleDriverPlaningDialogIsOpen}
                />
                <DeleteDriverDialog
                    driver={driver}
                    isOpen={deleteDriverDialogIsOpen}
                    handleToggleDialog={handleToggleDeleteDriverIsOpen}
                />
                <SuspendDriverDialog
                    mode={driver.isSuspended ? 'unsuspend' : 'suspend'}
                    driver={driver}
                    isOpen={suspendDriverDialogIsOpen}
                    handleToggleDialog={handleToggleSuspendDriverIsOpen}
                />

                <SimpleSuccessDialogWithContent
                    isSubDialog={false}
                    fchild={<div>
                        <b>{driver.getUsername}</b> a été reintégré dans votre flotte.
                    </div>}
                    title={`Activation effectuée avec succès.`}
                    image={`${driver.getAvatar}`}
                    isOpen={success}
                    handleToggleDialog={handleToggleSuccess}
                >
                </SimpleSuccessDialogWithContent>
            </>
        </div>
    )
}


export default DriverItem
