"use client";

import React, {MouseEventHandler} from "react";
import DialogBase, {
    AdminDialogHead,
    DefaultDialogMainBody,
    DialogActions,
    DialogInfoDivider,
    DialogInfoGroup,
    DialogInfoItem
} from "@/components/dialog/Dialog";
import BtnBase from "@/components/elements/BtnBase";
import {ImageUploadFieldGroup} from "@/components/form/TextField";
import Driver from "@/model/driver/Driver";
import {EditDriverDialog} from "@/app/(protected)/dashboard/drivers-list/actions/editDriver/editDriverDialog";
import {useGetDriver, useGetDriverInfos} from "@/hooks/driver/useDriver";
import Loading from "@/components/ui/Loader";
import {useGetVehicleAllData} from "@/hooks/vehicule/useVehicule";

export const DriverInfoDialog: React.FC<{
    isOpen: boolean,
    onClose: (value: boolean) => void,
    driver?: Driver,
    isUpdate?: boolean,
} & React.HTMLAttributes<HTMLDivElement>> = ({driver, isOpen, onClose, children, isUpdate, ...props}) => {

    const [driverID, setDriverID] = React.useState<string>()
    const [updateVehiculeDialogIsOpen, setUpdateVehiculeDialogIsOpen] = React.useState(false)

    React.useEffect(() => {
        if (driver && isOpen) {
            setDriverID(driver?.id)
        }
    }, [driver?.id, isOpen])


    const {data: lDriver, isLoading} = useGetDriver(driverID)
    const {data: lDriverAll, isLoading: loadingAllInfos} = useGetDriverInfos(driverID)


    return (
        <div {...props}>
            <DialogBase isSubDialog={false} variant={'sm'} isOpenned={isOpen} onClose={onClose} bgType={'whited'}>
                <AdminDialogHead withBack={false} title={`Informations du chauffeur`}
                                 handleToggle={onClose as unknown as MouseEventHandler<HTMLDivElement>}/>
                {isLoading &&
                    <Loading/>
                }
                {lDriver && <DefaultDialogMainBody>
                    <DialogInfoGroup groupTitle={`Informations générales`}>
                        <ImageUploadFieldGroup
                            label={''}
                            handleChange={(files) => {
                            }}
                            existingImages={[lDriver?.getAvatar as string]}
                        />
                        <div className={`flex gap-[13px] items-center`}>
                            <DialogInfoItem label={`Nom:`} value={`${lDriver?.getLastname}`}/>
                            <DialogInfoItem label={`Prénom:`} value={`${lDriver?.getFirstname}`}/>
                        </div>
                        <DialogInfoItem label={`Date de naissance:`} value={`${lDriver?.getBirthday}`}/>
                        <DialogInfoItem label={`Sexe:`} value={`${lDriver?.sex}`}/>
                        <DialogInfoItem label={`Numéro de téléphone:`} value={`${lDriver?.getPhone}`}/>
                        <DialogInfoItem label={`Numéro Carte d’identité:`} value={`${lDriver?.getCNINumber}`}/>
                        {driver?.getTag && <DialogInfoItem label={`Tag:`} value={`${lDriver?.getTag}`}/>}
                    </DialogInfoGroup>
                    <DialogInfoDivider/>
                    <DialogInfoGroup groupTitle={`Informations techniques`}>
                        <DialogInfoItem label={`Type de chauffeur:`} value={`${lDriver?.getDriverType}`}/>
                        <DialogInfoItem label={`Grade:`} value={`${lDriver?.getGrade}`}/>
                        <DialogInfoItem label={`Jour de repos:`} value={`${lDriver?.dayOffs.join(", ")}`}/>
                    </DialogInfoGroup>
                    <DialogInfoDivider/>
                    {lDriver.vehicle && <DialogInfoGroup groupTitle={`Véhicule`}>
                        <div className={`flex gap-2`}>
                            <DialogInfoItem label={`Marque:`} value={lDriver.vehicle.getBrand}/>
                            <DialogInfoItem label={`Modèle:`} value={lDriver.vehicle.getModel}/>
                        </div>
                    </DialogInfoGroup>}
                    <DialogInfoDivider/>
                    <DialogInfoGroup groupTitle={`Permis de conduire`}>
                        <div className={`flex gap-2`}>
                            <DialogInfoItem label={`N° de permis:`} value={`${lDriver.driverLicenceNumber}`}/>
                            <DialogInfoItem label={`Type de permis:`} value={`${lDriver.licenceType}`}/>
                        </div>
                        <DialogInfoItem label={`Pays de délivrance:`} value={`${lDriver.licenceCountry}`}/>
                        <DialogInfoItem label={`Date de délivrance:`} value={lDriver.licenceDeliveryOn}/>
                        <DialogInfoItem label={`Date d’expiration:`} value={lDriver.licenceExpireAt}/>
                    </DialogInfoGroup>
                </DefaultDialogMainBody>}
                <DialogActions className={`pt-[30px]`}>

                    <BtnBase
                        color={'blue'}
                        variant={'contained'}
                        fullwidth={true}
                        shape={'square'}
                        type={"submit"}
                        to={''}
                        disabled={!lDriver||!lDriverAll}
                        onClick={() => setUpdateVehiculeDialogIsOpen(true)}
                    >
                        Modifier les infos du chauffeur
                    </BtnBase>

                </DialogActions>
            </DialogBase>
            <div>
                {<EditDriverDialog
                    driver={driver}
                    driverInfos={lDriverAll}
                    isOpen={updateVehiculeDialogIsOpen}
                    onClose={() => setUpdateVehiculeDialogIsOpen(false)}
                />}
            </div>
        </div>
    )
}
