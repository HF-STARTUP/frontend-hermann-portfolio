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
import Vehicule from "@/model/vehicule/Vehicule";
import {AddCarDialog} from "@/app/(protected)/dashboard/vehicule-list/actions/addCar/addCarDialog";
import {ImageUploadFieldGroup} from "@/components/form/TextField";
import {useGetVehicle, useGetVehicleAllData} from "@/hooks/vehicule/useVehicule";
import Loading from "@/components/ui/Loader";
import {useGetCurrency} from "@/hooks/__globlal/useGlobalHook";

export const VehicleInfosDialog: React.FC<{
    isOpen: boolean,
    onClose: (value: boolean) => void,
    vehicule?: Vehicule,
    isUpdate?: boolean,
} & React.HTMLAttributes<HTMLDivElement>> = ({vehicule, isOpen, onClose, children, isUpdate, ...props}) => {

    const [updateVehiculeDialogIsOpen, setUpdateVehiculeDialogIsOpen] = React.useState(false)
    const [vehicleID, setVehicleID] = React.useState<string>()

    const {currency} = useGetCurrency()

    const {isLoading, vehicle: vcle} = useGetVehicle(vehicleID as string)
    const {vehicle: vleAllData} = useGetVehicleAllData(vehicleID as string)

    React.useEffect(() => {
        if (isOpen) {
            setVehicleID(vehicule?.id)
            console.log("Requesting vehicle info")
        }
    }, [vehicule, isOpen])


    return (
        <div {...props}>
            <DialogBase isSubDialog={false} variant={'sm'} isOpenned={isOpen} onClose={onClose} bgType={'whited'}>
                <AdminDialogHead withBack={false} title={'Voir les informations du véhicule'}
                                 handleToggle={onClose as unknown as MouseEventHandler<HTMLDivElement>}/>
                {isLoading &&
                    <div className={"h-[400px] flex items-center justify-center"}>
                        <Loading/>
                    </div>
                }
                {!isLoading && vcle && <DefaultDialogMainBody>
                    <DialogInfoGroup groupTitle={`Informations générales`}>

                        <ImageUploadFieldGroup
                            label={''}
                            handleChange={(files) => {
                            }}
                            existingImages={vcle.images_presentation}
                        />

                        {/*<DialogInfoItem label={`Type`} value={`${vehicule.get}`} />*/}
                        <DialogInfoItem label={`Marque:`} value={`${vcle?.getBrand}`}/>
                        <DialogInfoItem label={`Model:`} value={`${vcle?.getModel}`}/>
                        <DialogInfoItem label={`Immatriculation:`} value={`${vcle?.getRegistration}`}/>
                        <DialogInfoItem label={`Couleur:`} value={`${vcle?.getColor}`}/>
                        <DialogInfoItem label={`Numéro de chassis:`} value={`${vcle?.getChasisNumber}`}/>
                        {!vehicule?.getGpsNumber.length ? '' :
                            <DialogInfoItem label={`Numéro de GPS :`} value={`${vcle?.getGpsNumber}`}/>}
                    </DialogInfoGroup>

                    <DialogInfoDivider/>

                    <DialogInfoGroup groupTitle={`Contrat de propriété`}>
                        <DialogInfoItem
                            label={`Nom du propriétaire:`}
                            value={``}
                        />
                        <DialogInfoItem label={`Type de Contrat:`} value={`${vehicule?.getModel}`}/>
                        <DialogInfoItem label={`Durée du contrat:`} value={`${vehicule?.getRegistration}`}/>
                    </DialogInfoGroup>

                    <DialogInfoDivider/>

                    <DialogInfoGroup groupTitle={`Validité d’assurance`}>
                        <DialogInfoItem
                            label={`Année de mise en circulation :`}
                            value={`${vcle?.entryFleetAt}`}
                        />
                        <DialogInfoItem
                            label={`Date d’entrée en flotte :`}
                            value={`${vcle?.circultateAt}`}
                        />
                    </DialogInfoGroup>
                    <DialogInfoDivider/>


                    {vcle.recipe && <DialogInfoGroup groupTitle={`Objectif de recette`}>
                        <DialogInfoItem
                            label={`Type d’encaissement :`}
                            value={`${vcle?.recipeTitle}`}
                        />
                        <ul>
                            {vcle.recipesArrays.map(({amount, period}, i) => (
                                <li key={i}>{period} : {amount} {currency}</li>
                            ))}
                        </ul>
                    </DialogInfoGroup>}
                    <DialogInfoDivider/>


                    <DialogInfoGroup groupTitle={`Tarifs de courses :`}>
                        <ul>
                            {vcle.courseTarifs.map(({amount, period}, i) => (
                                <li key={i}>{period} : {amount} {currency}</li>
                            ))}
                        </ul>
                    </DialogInfoGroup>

                    <DialogInfoDivider/>


                    {/*<DialogInfoGroup groupTitle={`VTC Lock :`}>*/}
                    {/*</DialogInfoGroup>*/}


                </DefaultDialogMainBody>}
                <DialogActions className={`pt-[30px]`}>

                    <BtnBase
                        color={'blue'}
                        variant={'contained'}
                        fullwidth={true}
                        shape={'square'}
                        type={"submit"}
                        to={''}
                        disabled={!vcle || !vleAllData}
                        onClick={() => setUpdateVehiculeDialogIsOpen(true)}
                    >
                        Modifier les infos du véhicule
                    </BtnBase>

                </DialogActions>
            </DialogBase>
            <div>
                <AddCarDialog
                    vehicule={vcle}
                    vehiculeAllData={vleAllData}
                    isUpdate={true}
                    isOpen={updateVehiculeDialogIsOpen}
                    onClose={() => setUpdateVehiculeDialogIsOpen(false)}
                />
            </div>
        </div>
    )
}
