"use client"

import React, {useEffect} from "react";
import {cn} from "@/lib/utils";
import {Input} from "@/components/ui/input";
import {useRouter} from "next/navigation";
import {useLogin} from "@/hooks/__form/auth/useLogin";
import {SubmitHandler, useForm} from "react-hook-form";
import {LoginInputs, loginSchema} from "@/schema/auth.schema";
import {joiResolver} from "@hookform/resolvers/joi";
import AuthManagerGuard from "@/guard/AuthManagerGuard";
import notify from "@/utils/func/notification";
import AppLogo from "@/components/app/AppLogo";
import BtnBase from "@/components/elements/BtnBase";
import {AdminAccountStatus} from "@/types/__form/profile.type";
import {ConnexionMode} from "@/hooks/__globlal/useGlobalHook";


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
            const isDeactivated = loginData.status === AdminAccountStatus.Deactivated

            if (isDeactivated) {
                $router.push(`/redirect/unauthorized`)
                return
            }

            notify('Bienvenus sur VTC ADMIN!', 'success');
            console.log($login.data)
            if ($login.data.admin_on_city) {
                const firstCity = $login.data.admin_on_city[0]
                AuthManagerGuard.setEnabledCityID(firstCity.id)
                AuthManagerGuard.setCurrency(firstCity.currency)
            }
            AuthManagerGuard.loginToApp(loginData.token, loginData.refresh_token, loginData.id)
            $router.push(`/app/dashboard`)
            console.log("Redirect to Admin !")
        }
    }, [$login.isSuccess]);


    const onSubmit: SubmitHandler<LoginInputs> = (loginInfo) => {
        $login.submitForm({...loginInfo})
    }

    const handleTestNotify = () => {
        notify('Nouvelle notification')
    }

    return (
        <React.Suspense fallback={<LoadingLoader/>}>
            <form className="sm:w-[500px] m-auto mt-[100px] px-[20px]" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-[40px]">
                    <AppLogo/>
                </div>
                <AuthHead
                    title={'Admin'}
                    subtitle={'Entrez vos identifiants VTC pour vous connecter'}
                />
                <AuthFormContainer>
                    <FormGroup auth={true}>
                        <Input
                            type={"email"}
                            label={`Adresse e-mail`}
                            placeholder={''}
                            error={errors.email}
                            {...register("email")}
                        />
                        <Input
                            type={'password'}
                            label={'Mot de passe'}
                            placeholder={'*************'}
                            error={errors.password}
                            {...register("password")}
                        />
                        <Input
                            as={"select"}
                            label={'Mode de connexion'}
                            onChange={(e)=>{
                                AuthManagerGuard.setConnexionMode(e.currentTarget.value as ConnexionMode)
                            }}
                            options={[
                                {
                                    label: "Production",
                                    value: ConnexionMode.Production
                                },
                                {
                                    label: "Staging",
                                    value: ConnexionMode.Staging
                                }
                            ]}
                        />

                        {/*<div className={`flex justify-between mt-[34.78px]`}>*/}
                        {/*    <CheckBox label={'Se souvenir de moi'}/>*/}
                        {/*    <VLinkProvider*/}
                        {/*        className={`text-right text-blue-700 */}
                        {/*font-medium leading-snug hover:underline underline-offset-2 ease-in delay-75 duration-150 text-[12px] lg:text-base`}*/}
                        {/*        to={'/auth/register/startup'}*/}

                        {/*    >*/}
                        {/*        Créer un compte*/}
                        {/*    </VLinkProvider>*/}
                        {/*</div>*/}
                    </FormGroup>
                </AuthFormContainer>
                <div className={`mt-[24px] lg:mt-[36.2px]`}>
                    <BtnBase
                        responsiveW={false}
                        fit={false}
                        fullwidth={true}
                        size={"sm"}
                        to={''}
                        disabled={$login.isLoading || $login.isSuccess}
                        loading={$login.isLoading || $login.isSuccess}
                        color={'blue'} variant={'contained'}>
                        Se connecter
                    </BtnBase>
                    <div className={"text-[10px] opacity-25 mt-[20px] text-center"}>VTC ADMIN V1.0.2 (19/8/2024, 4:51PM)</div>
                </div>
            </form>
        </React.Suspense>
    )
}

export function LoadingLoader({className, ...props}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn(
            `w-full font-bold text-admin-primary h-[300px] flex justify-center items-center`,
            className
        )} {...props}>
            <b>Chargement...</b>
        </div>
    )
}

const AuthHead: React.FC<{ title: string, subtitle: string }> = ({title, subtitle}) => {
    return (
        <div className="relative mb-[21px] lg:mb-[40px]">
            <h1 className="text-black text-2xl lg:text-[40.39px] font-bold leading-[62.83px]">{title}</h1>
            <div className="text-gray-500 text-lg font-normal leading-[17.95px] mb-[30px]">{subtitle}</div>
            <div className="w-full h-[0px] lg:border lg:border-slate-200"></div>
        </div>
    )
}

const AuthFormContainer: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({children}) => {

    return (
        <div className={`bg-white py-[18px] px-[15px] rounded-md border border-neutral-400 border-opacity-60
                    lg:bg-transparent lg:py-0 lg:px-0 lg:border-0
                `}>
            {children}
        </div>
    )
}


const FormGroup: React.FC<{
    children: React.ReactNode,
    auth?: boolean,
    adminForm?: boolean,
    groupTitle?: string
} & React.HTMLAttributes<HTMLDivElement>> = ({children, auth, groupTitle, adminForm, ...props}) => {
    return (
        <div {...props}>
            {groupTitle && <h4 className={`text-admin-primary mb-[20px] font-bold`}>{groupTitle}</h4>}
            <div className={`flex flex-col ${auth ? 'gap-[26px]' : (adminForm ? 'gap-[22px]' : 'gap-[10px]')}`}>
                {children}
            </div>
        </div>
    )
}