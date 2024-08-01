"use client"

import React from "react";
import FormGroup, {AuthFormContainer} from "@/components/box/FormGroup";
import BtnBase from "@/components/elements/BtnBase";
import AuthHead from "@/app/(main)/auth/_components/AuthHead";
import {SubmitHandler, useForm} from "react-hook-form";
import {VerifyAccountInputs, verifyAccountSchema} from "@/schema/auth.schema";
import {joiResolver} from "@hookform/resolvers/joi";
import {useVerifyUser} from "@/hooks/__form/auth/useLogin";
import Loading from "@/components/ui/Loader";
import {Input} from "@/components/ui/input";

export default function StartupPage() {

    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm<VerifyAccountInputs>({
        resolver: joiResolver(verifyAccountSchema)
    })
    const {
        onVerifyUser,
        isLoading
    } = useVerifyUser()

    const [phoneCode, setPhoneCode] = React.useState(237)

    const onSubmit: SubmitHandler<VerifyAccountInputs> = (loginInfo) => {
        onVerifyUser({...loginInfo, phone: phoneCode + loginInfo.phone})
    }


    return (
        <React.Suspense fallback={<Loading/>}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <AuthHead
                    title={'Inscription'}
                    subtitle={'Entrez votre e-mail et votre numéro de téléphone'}
                />
                <AuthFormContainer>
                    <FormGroup auth={true}>
                        <Input
                            label={'Adresse email'}
                            placeholder={'mail@simmmple.com'}
                            error={errors.email}
                            {...register("email")}
                            type={"email"}
                        />

                        <Input
                            label={'Numéro de téléphone'}
                            placeholder={'691911074'}
                            error={errors.phone}
                            type={"tel"}
                            {...register("phone")}
                            onPhoneCodeChange={setPhoneCode}
                        />

                    </FormGroup>
                </AuthFormContainer>
                <div className={`mt-[24px] lg:mt-[36.2px]`}>
                    <BtnBase
                        responsiveW={true}
                        fit={false}
                        fullwidth={true}
                        to={''}
                        disabled={isLoading}
                        loading={isLoading}
                        color={'blue'} variant={'contained'}>
                        Suivant
                    </BtnBase>
                </div>
            </form>
        </React.Suspense>
    )
}
