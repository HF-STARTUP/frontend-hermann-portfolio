import React from "react";
import FormGroup from "@/components/box/FormGroup";
import TextField from "@/components/form/TextField";
import {AdminPageTitle} from "@/components/typo/typo";
import BtnBase from "@/components/elements/BtnBase";

const PasswordPage: React.FC = () => {
    return (
        <div className={`grid grid-cols-12`}>
            <div className={`col-span-4`}>
                <UpdatePasswordForm/>
            </div>
        </div>
    )
}


const UpdatePasswordForm = () => {
    return (
        <div className={`px-[24px] py-[34px] h-full`}>
            <AdminPageTitle withMb={true}>Modifier le mot de passe</AdminPageTitle>
            <FormGroup adminForm={true} className={`mb-[30px]`}>
                <TextField label={'Ancien mot de passe'}/>
                <TextField label={'Nouveau mot de passe'}/>
                <TextField label={'Confirmer le nouveau mot de passe'}/>
            </FormGroup>
            <BtnBase w={"270px"} to={''} color={'blue'} variant={'contained'} shape={'square'}>Valider</BtnBase>
        </div>
    )
}


export default PasswordPage
