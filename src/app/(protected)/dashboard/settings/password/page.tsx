import React from "react";
import FormGroup from "@/components/box/FormGroup";
import TextField from "@/components/form/TextField";
import {AdminPageTitle} from "@/components/typo/typo";
import BtnBase from "@/components/elements/BtnBase";
import {UpdatePasswordForm} from "@/app/(protected)/dashboard/settings/password/_components/updatePasswordForm";

const PasswordPage: React.FC = () => {
    return (
        <div className={`grid grid-cols-12`}>
            <div className={`col-span-4`}>
                <UpdatePasswordForm/>
            </div>
        </div>
    )
}


export default PasswordPage
