"use client";

import React, {MouseEventHandler} from "react";
import DialogBase, {AdminDialogHead, DefaultDialogMainBody} from "@/components/dialog/Dialog";
import BtnBase from "@/components/elements/BtnBase";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {useUserProfile} from "@/hooks/__form/auth/useUserProfile";
import {SubmitHandler, useForm} from "react-hook-form";
import {UpdatePasswordInput, updatePasswordInputSchema} from "@/schema/ADMIN/settings.schema";
import {joiResolver} from "@hookform/resolvers/joi";
import {useUpdatePassword} from "@/hooks/admin/useSettingsHook";
import FormGroup from "@/components/box/FormGroup";
import TextField from "@/components/form/TextField";

export const AdminOptionsDialog: React.FC<{
    isOpen: boolean,
    onClose: (value: boolean) => void,
} & React.HTMLAttributes<HTMLDivElement>> = ({
                                                 isOpen,
                                                 onClose,
                                                 children,
                                                 ...props
                                             }) => {
    return (
        <div {...props}>
            <DialogBase variant={'sm'} isOpenned={isOpen} onClose={onClose} bgType={'whited'}>
                <AdminDialogHead
                    withBack={false}
                    title={`Parametre de l'utilisateur`}
                    handleToggle={onClose as unknown as MouseEventHandler<HTMLDivElement>}
                />

                <DefaultDialogMainBody>
                    <Tabs defaultValue="account">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="account">Modifier le Mot de passe</TabsTrigger>
                            <TabsTrigger value="password">Options avancé</TabsTrigger>
                        </TabsList>
                        <TabsContent value="account" className={""}>
                            <UpdatePasswordForm/>
                        </TabsContent>
                        <TabsContent value="password">
                            <AdvancedSettingsForm/>
                        </TabsContent>
                    </Tabs>
                </DefaultDialogMainBody>
            </DialogBase>
        </div>
    )
}

export const AdvancedSettingsForm = () => {
    return (
        <div className={"py-[20px]"}>
            <div className={"mb-4 text-vaTextPrimary leading-snug text-lg font-medium"}>
                <p className={"max-w-[400px]"}>
                    Attention : La suppression d'un administrateur de la flotte entraînera la perte de ses accès et de ses
                    droits de gestion. Assurez-vous que cette action est nécessaire, car elle est irréversible et
                    l'administrateur supprimé ne pourra plus intervenir sur la flotte. Veuillez confirmer pour procéder.
                </p>
            </div>
            <BtnBase
                w={"270px"}
                to={''}
                color={'red'}
                variant={'contained'}
                shape={'square'}
                type={"submit"}
                size={"sm"}
            >Suprimer l'administrateur</BtnBase>
        </div>
    )
}

const UpdatePasswordForm = () => {

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

    }

    React.useEffect(() => {
        if (!loading && isSuccess) {
            resetForm()
        }
    }, [loading, isSuccess])

    return (
        <form
            className={`h-full`}
            onSubmit={handleSubmit(onSubmit)}
        >
            <FormGroup adminForm={true} className={`mb-[30px] py-4`}>
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
