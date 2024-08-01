"use client"

import React, {useEffect} from "react";
import FormGroup, {AuthFormContainer} from "@/components/box/FormGroup";
import {CheckBox} from "@/components/form/TextField";
import BtnBase from "@/components/elements/BtnBase";
import VLinkProvider from "@/components/helpers/VLinkProvider";
import AuthHead from "@/app/(main)/auth/_components/AuthHead";
import {SubmitHandler, useForm} from "react-hook-form";
import {LoginInputs, loginSchema} from "@/schema/auth.schema";
import {joiResolver} from "@hookform/resolvers/joi";
import {useLogin} from "@/hooks/__form/auth/useLogin";
import notify from "@/utils/func/notification";
import {useRouter} from "next/navigation";
import Loading from "@/components/ui/Loader";
import AuthManagerGuard from "@/guard/AuthManagerGuard";
import {Input} from "@/components/ui/input";

export default function LoginPage() {

    const [identifier, setIdentifier] = React.useState("")
    const $router = useRouter()
    const [isPhone, setIsPhone] = React.useState(false)
    const [phoneCode, setPhoneCode] = React.useState<number>(237)


    const $login = useLogin()
    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm<LoginInputs>({
        resolver: joiResolver(loginSchema)
    })

    React.useEffect(() => {
        AuthManagerGuard.removeProfileID()
        AuthManagerGuard.removeParkID()
    }, [])

    useEffect(() => {
        if ($login.isError && $login.error) {
            notify($login.error.message, 'error');
        }
    }, [$login.isError, $login.error]);

    useEffect(() => {
        if (!$login.isError && $login.isSuccess && $login.data) {
            const loginData = $login.data

            notify('Votre code de connexion à été envoyé !', 'success');
            $router.push(`/auth/login/verify-otp?identifier=${identifier}&code=${loginData.code}`)
        }
    }, [$login.isSuccess]);

    useEffect(() => {
        const identifier = watch("identifier")
        if (!identifier) {
            setIsPhone(false)
            return
        }
        const isNb = +identifier

        setIsPhone(!!isNb)

    }, [watch("identifier")]);

    const onSubmit: SubmitHandler<LoginInputs> = (loginInfo) => {
        const ids = (loginInfo.email ?? loginInfo.identifier)
        const finalIds = isPhone ? ('' + phoneCode) + ids : ids
        setIdentifier(finalIds)
        $login.submitForm({...loginInfo, identifier: finalIds})
    }

    const handleTestNotify = () => {
        notify('Nouvelle notification')
    }

    return (
        <React.Suspense fallback={<Loading/>}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <AuthHead
                    title={'Connexion'}
                    subtitle={'Entrez vos identifiants VTC pour vous connecter'}
                />
                <AuthFormContainer>
                    <FormGroup auth={true}>
                        <Input
                            type={isPhone ? "tel" : "text"}
                            label={`Numéro de téléphone / Adresse e-mail`}
                            placeholder={''}
                            error={errors.identifier}
                            {...register("identifier")}
                            onPhoneCodeChange={setPhoneCode}
                        />
                        <Input
                            type={'password'}
                            label={'Mot de passe'}
                            placeholder={'*************'}
                            error={errors.password}
                            {...register("password")}
                        />
                        <div className={`flex justify-between mt-[34.78px]`}>
                            <CheckBox label={'Se souvenir de moi'}/>
                            <VLinkProvider
                                className={`text-right text-blue-700 
                        font-medium leading-snug hover:underline underline-offset-2 ease-in delay-75 duration-150 text-[12px] lg:text-base`}
                                to={'/auth/register/startup'}

                            >
                                Créer un compte
                            </VLinkProvider>
                        </div>
                    </FormGroup>
                </AuthFormContainer>
                <div className={`mt-[24px] lg:mt-[36.2px]`}>
                    <BtnBase
                        responsiveW={true}
                        fit={false}
                        fullwidth={true}
                        to={''}
                        disabled={$login.isLoading || $login.isSuccess}
                        loading={$login.isLoading || $login.isSuccess}
                        color={'blue'} variant={'contained'}>
                        Se connecter
                    </BtnBase>
                </div>
            </form>
        </React.Suspense>
    )
}
