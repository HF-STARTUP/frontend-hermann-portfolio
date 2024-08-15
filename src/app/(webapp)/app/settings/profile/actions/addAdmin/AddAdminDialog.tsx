import React, {MouseEventHandler} from "react";
import DialogBase, {AdminDialogHead, DefaultDialogMainBody, DialogActions} from "@/components/dialog/Dialog";
import FormGroup from "@/components/box/FormGroup";
import TextField, {BtnField} from "@/components/form/TextField";
import BtnBase from "@/components/elements/BtnBase";
import {PlaceFieldInput} from "@/components/form/PlacField";
import {CourseAddress} from "@/schema/course.schema";
import notify from "@/utils/func/notification";
import useClientStore from "@/app/(protected)/dashboard/clients/store/useAddClientStore";
import {
    ConfigAccessDialog
} from "@/app/(webapp)/app/settings/profile/actions/addAdmin/actions/configAccess/configAccessDialog";

export const AddAdminDialog: React.FC<React.HTMLAttributes<HTMLDivElement> & {
    isOpen: boolean,
    setIsOpen: (status: boolean) => void
}> = ({
          children,
          isOpen,
          setIsOpen,
          ...props
      }) => {

    // const [isOpen, setIsOpen] = React.useState(false)
    const [place, setPlace] = React.useState("")
    const [address, setAddress] = React.useState<CourseAddress>()
    const {setAddress: setNewAddress} = useClientStore()


    const onAddAddress = () => {
        if (!place || !address) {
            notify("Veuillez fournir les informations demandées", "error")
            return
        }

        setNewAddress({...address, description: place})
        setAddress(undefined)
        setPlace("")
        setIsOpen(false)
    }

    return (
        <div {...props}>
            <DialogBase isSubDialog={false} variant={'sm'} isOpenned={isOpen} onClose={() => setIsOpen(false)}
                        bgType={'whited'}>
                <AdminDialogHead
                    withBack={true}
                    title={"Ajouter un administrateur"}
                    handleToggle={() => setIsOpen(false) as unknown as MouseEventHandler<HTMLDivElement>}/>
                <DefaultDialogMainBody>

                    <FormGroup adminForm={true} groupTitle={''}>

                        <TextField
                            size={'md'}
                            label={'Nom de l’administrateur'}
                            value={place}
                            onChange={(v) => setPlace(v.currentTarget.value)}
                            required={true}
                            inputType={"text"}
                            placeholder={""}
                        />

                        <TextField
                            size={'md'}
                            label={'Numéro de téléphone'}
                            value={place}
                            onChange={(v) => setPlace(v.currentTarget.value)}
                            required={true}
                            inputType={"text"}
                            placeholder={""}
                        />

                        <TextField
                            size={'md'}
                            label={'Adresse email'}
                            value={place}
                            onChange={(v) => setPlace(v.currentTarget.value)}
                            required={true}
                            inputType={"text"}
                            placeholder={""}
                        />

                        <ConfigAccessDialog>
                            <BtnField label={"Configurer les access"}/>
                        </ConfigAccessDialog>

                        <TextField
                            size={'md'}
                            label={'Attribuer un mot de passe de connexion'}
                            value={place}
                            onChange={(v) => setPlace(v.currentTarget.value)}
                            inputType={"text"}
                            placeholder={""}
                        />

                        <TextField
                            size={'md'}
                            label={'Confirmer le mot de passe de connexion'}
                            value={place}
                            onChange={(v) => setPlace(v.currentTarget.value)}
                            inputType={"text"}
                            placeholder={""}
                        />


                    </FormGroup>

                </DefaultDialogMainBody>
                <DialogActions className={`pt-[30px]`}><BtnBase
                    color={'blue'}
                    variant={'contained'}
                    type={'button'}
                    fullwidth={true}
                    shape={'square'}
                    onClick={onAddAddress}
                    to={''}
                >
                    Confirmer
                </BtnBase>
                </DialogActions>
            </DialogBase>
        </div>
    )
}
