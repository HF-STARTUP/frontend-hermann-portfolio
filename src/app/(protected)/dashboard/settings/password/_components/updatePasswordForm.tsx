"use client"

import React from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import {
    UpdatePasswordInput,
    updatePasswordInputSchema,
} from "@/schema/ADMIN/settings.schema"
import { joiResolver } from "@hookform/resolvers/joi"
import { useUpdatePassword } from "@/hooks/admin/useSettingsHook"
import { useUserProfile } from "@/hooks/__form/auth/useUserProfile"
import { PageSubTitle } from "@/components/ui/custom/PageTitle"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import FormGroup from "@/components/box/FormGroup"

export const UpdatePasswordForm = () => {
    const { data: profile } = useUserProfile()

    const {
        register,
        handleSubmit,
        reset: resetForm,
        formState: { errors },
    } = useForm<UpdatePasswordInput>({
        resolver: joiResolver(updatePasswordInputSchema)
    })

    const { onUpdatePassword, loading, isSuccess } = useUpdatePassword()

    const onSubmit: SubmitHandler<UpdatePasswordInput> = (passwordData, event) => {
        if (profile) {
            onUpdatePassword({ 
                ...passwordData, 
                email: profile._instance.user.email 
            })
        }
    }

    React.useEffect(() => {
        if (!loading && isSuccess) {
            resetForm()
        }
    }, [loading, isSuccess])

    return (
        <form
            className={`space-y-6 mt-12 flex flex-col items-center`}
            onSubmit={handleSubmit(onSubmit)}
        >
            <PageSubTitle subtitle="Modifier mon mot de passe" />
            <FormGroup adminForm={true}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Input
                        type="password"
                        label="Ancien mot de passe"
                        {...register("old_password")}
                        error={errors.old_password}
                    />

                    <Input
                        type="password"
                        label="Nouveau mot de passe"
                        {...register("new_password")}
                        error={errors.new_password}
                    />

                    <Input
                        type="password"
                        label="Confirmer le nouveau mot de passe"
                        {...register("new_password_confirm")}
                        error={errors.new_password_confirm}
                    />
                </div>
            </FormGroup>
            <Button
                color="blue"
                variant="mainBlue"
                type="submit"
                loading={loading}
            >
                {loading ? "Mise à jour..." : "Enregistrer le nouveau mot de passe"}
            </Button>
        </form>
    )
}