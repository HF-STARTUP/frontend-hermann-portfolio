"use client";

import {AdminPageTitle} from "@/components/typo/typo";
import FormGroup from "@/components/box/FormGroup";
import TextField from "@/components/form/TextField";
import BtnBase from "@/components/elements/BtnBase";
import React from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {
    UpdatePasswordInput,
    updatePasswordInputSchema,
    UpdateProfileInput,
    updateProfileInputSchema
} from "@/schema/ADMIN/settings.schema";
import AuthManagerGuard from "@/guard/AuthManagerGuard";
import {joiResolver} from "@hookform/resolvers/joi";
import {useUpdatePassword, useUpdateProfile} from "@/hooks/admin/useSettingsHook";
import {useUserProfile} from "@/hooks/__form/auth/useUserProfile";

export const UpdatePasswordForm = () => {

    const {data: profile} = useUserProfile()

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset: resetForm,
        formState: {errors},
    } = useForm<UpdatePasswordInput>({
        resolver: joiResolver(updatePasswordInputSchema)
    })

    const {onUpdatePassword, loading, isSuccess} = useUpdatePassword()

    const onSubmit: SubmitHandler<UpdatePasswordInput> = (profileInfos, event) => {
        if (profile)
            onUpdatePassword({...profileInfos, email: profile._instance.user.email})
    }

    React.useEffect(() => {
        if (!loading && isSuccess) {
            resetForm()
        }
    }, [loading, isSuccess])

    return (
        <form
            className={`px-[24px] py-[34px] h-full`}
            onSubmit={handleSubmit(onSubmit)}
        >
            <AdminPageTitle withMb={true}>Modifier le mot de passe</AdminPageTitle>
            <FormGroup adminForm={true} className={`mb-[30px]`}>

                <TextField
                    inputType={'password'}
                    label={'Ancien mot de passe'}
                    register={register("old_password")}
                    errors={errors}
                />

                <TextField
                    inputType={'password'}
                    label={'Nouveau mot de passe'}
                    register={register("new_password")}
                    errors={errors}
                />

                <TextField
                    inputType={'password'}
                    label={'Confirmer le nouveau mot de passe'}
                    register={register("new_password_confirm")}
                    errors={errors}
                />
            </FormGroup>
            <BtnBase
                w={"270px"}
                to={''}
                color={'blue'}
                variant={'contained'}
                shape={'square'}
                type={"submit"}
                loading={loading}
                disabled={loading}
            >{loading ? "Mise à jour..." : "Valider"}</BtnBase>
        </form>
    )
}
