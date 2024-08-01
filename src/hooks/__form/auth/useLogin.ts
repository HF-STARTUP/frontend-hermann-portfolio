import LoginService from "@/services/__form/auth/LoginService";
import RegisterService from "@/services/__form/auth/RegisterService";
import {VerifyAccountInputs, VerifyOtpInputs} from "@/schema/auth.schema";
import React from "react";
import {useRouter, useSearchParams} from "next/navigation";
import notify from "@/utils/func/notification";
import {useMutation} from "@tanstack/react-query";

export const useLogin = () => {
    const {mutate, isError, isSuccess, isIdle, data, error} = useMutation({
        mutationFn: LoginService.login
    });

    const isLoading = !isIdle && !isError && !isSuccess;

    return {
        submitForm: mutate,
        isError,
        isSuccess,
        data,
        isLoading,
        error
    };
};


export const useVerifyUser = () => {
    const {mutate, isError, isSuccess, isIdle, data, error} = RegisterService.useVerifyUserMutation();
    const [email, setEmail] = React.useState("")
    const [phone, setPhone] = React.useState("")

    const $router = useRouter()
    const isLoading = !isIdle && !isError && !isSuccess;

    React.useEffect(() => {

        if (isSuccess && !isError) {
            notify("Un code vous a été envoyé", "success")
            $router.push(`/auth/register/startup/verify-opt?email=${email}&phone=${phone}`)
        }

    }, [isSuccess, isError])

    React.useEffect(() => {

        if (isError && error) {
            notify(`${error.message}`, "error")
        }

    }, [isError, error])


    const onVerifyUser = (inputs: VerifyAccountInputs) => {
        setEmail(inputs.email)
        setPhone(inputs.phone)
        mutate(inputs)
    }

    return {
        onVerifyUser,
        isLoading,
    };
};


export const useVerifyOtp = () => {

    const [uuid, setUuid] = React.useState("")

    const {
        mutate,
        isError,
        isSuccess,
        isIdle,
        data,
        error
    } = RegisterService.useVerifyUserOtpMutation();

    const $q = useSearchParams()

    const email = $q.get("email")
    const phone = $q.get("phone")

    const $router = useRouter()
    const isLoading = !isIdle && !isError && !isSuccess;

    React.useEffect(() => {

        if (isSuccess && !isError && data) {
            console.log(data.code)
            setUuid(data.code)
            $router.push(`/auth/register?email=${email}&phone=${phone}&uuid_code=${data.code}`)
            console.log(data)
        }

    }, [isSuccess, isError, data])

    React.useEffect(() => {

        if (isError && error) {
            notify(`${error.message}`, "error")
        }

    }, [isError, error])


    const onVerifyOtp = (inputs: VerifyOtpInputs) => {
        mutate({
            phone: `+${phone?.trim()}`,
            email: '' + email,
            otp: inputs.code
        })
    }

    return {
        onVerifyOtp,
        isLoading,
    };
};


