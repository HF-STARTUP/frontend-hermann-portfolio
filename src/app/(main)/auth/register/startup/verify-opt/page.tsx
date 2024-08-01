"use client"

import React from "react";
import FormGroup, {AuthFormContainer} from "@/components/box/FormGroup";
import TextField from "@/components/form/TextField";
import BtnBase from "@/components/elements/BtnBase";
import AuthHead from "@/app/(main)/auth/_components/AuthHead";
import {SubmitHandler, useForm} from "react-hook-form";
import {VerifyOtpInputs, verifyOtpSchema} from "@/schema/auth.schema";
import {joiResolver} from "@hookform/resolvers/joi";
import {useVerifyOtp} from "@/hooks/__form/auth/useLogin";
import Loading from "@/components/ui/Loader";

export default function VerifyOtpPage() {

    const {
        register,
        handleSubmit,
        watch,
        formState: {errors},
    } = useForm<VerifyOtpInputs>({
        resolver: joiResolver(verifyOtpSchema)
    })
    const {
        onVerifyOtp,
        isLoading
    } = useVerifyOtp()

    const onSubmit: SubmitHandler<VerifyOtpInputs> = (loginInfo) => {
        onVerifyOtp(loginInfo)
    }

    return (
        <React.Suspense fallback={<Loading/>}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <AuthHead
                    title={'Verification de compte'}
                    subtitle={'Entrez le code qui vous a été envoyé par numéro de téléphone'}
                />
                <AuthFormContainer>
                    <FormGroup auth={true}>
                        <TextField
                            label={'Code'}
                            placeholder={''}
                            errors={errors}
                            register={register("code")}
                            inputType={"text"}
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
