import React from "react";
import DialogBase, {
    AdminDialogHead,
    DefaultDialogMainBody,
    DialogActions,
    DialogCarItem
} from "@/components/dialog/Dialog";
import FormGroup from "@/components/box/FormGroup";
import TextField from "@/components/form/TextField";
import BtnBase from "@/components/elements/BtnBase";
import {SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import notify from "@/utils/func/notification";
import {AddNewVehiculeGroupInputs, addNewVehiculeGroupSchema} from "@/schema/vehicule.schema";
import EntitySelectDialog from "@/components/actions/EntitySelectDialog.action";
import Vehicule from "@/model/vehicule/Vehicule";
import {useGetVehicules, useSetVehiculeGroup} from "@/hooks/vehicule/useVehicule";
import {useGetParkID, useGetRegion} from "@/hooks/__globlal/useGlobalHook";

export const CreateNewVehiculeGroup: React.FC<{
    isOpen: boolean,
    onClose: () => void
} & React.HTMLAttributes<HTMLDivElement>> = ({isOpen, onClose, children}) => {
    const [selectVehiculeIsOpen, setSelectVehiculeIsOpen] = React.useState(false)
    const [groupName, setGroupName] = React.useState<string>('')
    const [vehiculesSelected, setVehiculesSelected] = React.useState<Vehicule[]>([])

    const {data: vehicules} = useGetVehicules()
    const {region_id} = useGetRegion()

    const {parkID} = useGetParkID()

    const {
        mutate,
        isSuccess,
        isLoading: savingGroupe,
        invalidData,
        isError,
        error,
        data
    } = useSetVehiculeGroup()


    const onSubmit: SubmitHandler<AddNewVehiculeGroupInputs> = (inputs, event) => {
        event?.preventDefault()
        setGroupName(inputs.title)
        setSelectVehiculeIsOpen(true)
    }

    const {
        register,
        handleSubmit,
        reset: resetForm,
        formState: {errors},
    } = useForm<AddNewVehiculeGroupInputs>({
        resolver: joiResolver(addNewVehiculeGroupSchema)
    })

    React.useEffect(() => {
        if (isError && error) {
            notify(error.message, 'error')
        }
    }, [isError, error])

    React.useEffect(() => {
        if (isSuccess) {
            notify('Groupe ajouté avec success', 'success')
            setSelectVehiculeIsOpen(false)
            invalidData().then(r => {
            })
            resetForm()
        }
    }, [isSuccess, data])

    const handleCreateGroup = () => {
        mutate({
            title: groupName,
            region_id: parkID,
            vehicles_ids: vehiculesSelected.map((v, i) => ({id: v.id}))
        })
    }

    return (
        <div>
            <DialogBase
                isSubDialog={false}
                variant={'sm'}
                isOpenned={isOpen}
                onClose={() => onClose()}
                bgType={'whited'}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <AdminDialogHead
                        withBack={true}
                        title={'Créez un groupe de véhicules'}
                        handleToggle={() => {
                        }}
                    />
                    <DefaultDialogMainBody>
                        <FormGroup adminForm={true}>
                            <TextField
                                size={'md'}
                                label={'Saisir le nom du groupe'}
                                required={true}
                                register={register('title')}
                                errors={errors}
                            />
                        </FormGroup>
                    </DefaultDialogMainBody>
                    <DialogActions className={`pt-[30px]`}>
                        <BtnBase
                            to={''}
                            color={'blue'}
                            variant={'contained'}
                            shape={'square'}
                            type={'submit'}
                            fullwidth={true}>Suivant</BtnBase>
                    </DialogActions>
                </form>
            </DialogBase>
            <>
                <EntitySelectDialog<Vehicule, typeof DialogCarItem>
                    title={"Ajoutez des véhicules à votre groupe"}
                    emptyMessage={"Aucun vehicule créé pour l’instant"}
                    DisplayItem={DialogCarItem}
                    isSelect={true}
                    getData={() => vehicules}
                    isOpen={selectVehiculeIsOpen}
                    loading={savingGroupe}
                    onClose={() => setSelectVehiculeIsOpen(false)}
                    onValidate={() => {
                        handleCreateGroup()
                    }}
                    handleSelectItems={(items) => {
                        setVehiculesSelected(items)
                    }}
                />
            </>
        </div>
    )
}
