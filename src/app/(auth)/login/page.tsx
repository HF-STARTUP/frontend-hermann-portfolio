"use client"

import React, { useEffect } from "react";
import { cn, ConnexionMode } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useLogin } from "@/hooks/__form/auth/useLogin";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginInputs, loginSchema } from "@/schema/auth.schema";
import { joiResolver } from "@hookform/resolvers/joi";
import AuthManagerGuard from "@/guard/AuthManagerGuard";
import notify from "@/utils/func/notification";
import AppLogo from "@/components/app/AppLogo";
import { AdminAccountStatus } from "@/types/__form/profile.type";
import { useGetCurrenciesList } from "@/hooks/admin/useFleetHook";
import { Button } from "@/components/ui/button";


export default function LoginPage() {

    const [identifier, setIdentifier] = React.useState("")
    const $router = useRouter()
    const [isPhone, setIsPhone] = React.useState(false)
    const [phoneCode, setPhoneCode] = React.useState<number>(237)
    const { data: currencies, isLoading: loadingCurrency } = useGetCurrenciesList()


    const $login = useLogin()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
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
            const isDeactivated = loginData.status === "deactivated"

            if (isDeactivated) {
                $router.push(`/redirect/unauthorized`)
                return
            }

            notify('Bienvenus sur VTC ADMIN!', 'success');
            console.log($login.data)
            if ($login.data.admin_on_city) {
                const firstCity = $login.data.admin_on_city[0]
                const defaultCity = $login.data.admin_on_city.find(c => c.name.toLowerCase().includes("abidjan")) ?? firstCity;

                AuthManagerGuard.setEnabledCityID(defaultCity.id)

                if (currencies && currencies.length) {
                    const foundCurrency = currencies.find(cur => cur.name.toLowerCase() == defaultCity.currency.toLowerCase())
                    if (foundCurrency) {
                        AuthManagerGuard.setCurrency(String(foundCurrency.id))
                    }
                }
            }
            AuthManagerGuard.loginToApp(loginData.token, loginData.refresh_token, loginData.id)
            $router.push(`/app/dashboard`)
            console.log("Redirect to Admin !")
        }
    }, [$login.isSuccess]);


    const onSubmit: SubmitHandler<LoginInputs> = (loginInfo) => {
        $login.submitForm({ ...loginInfo })
    }

    const handleTestNotify = () => {
        notify('Nouvelle notification')
    }

    return (
        <React.Suspense fallback={<LoadingLoader />}>
            <div className="relative w-screen h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-10 bg-[url('/assets/login-bg.png')] bg-cover bg-center opacity-50"></div>

                <div className="absolute inset-0 z-0 bg-vaPrimary/90"></div>

                <form className="sm:w-[500px] bg-white p-4 rounded-2xl relative z-20" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4 m-auto w-full flex items-center justify-center">
                        <AppLogo />
                    </div>
                    <AuthHead
                        title={'Connexion Admin'}
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
                                onChange={(e) => {
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
                        </FormGroup>
                    </AuthFormContainer>
                    <div className={`mt-[24px] lg:mt-[36.2px]`}>
                        <Button
                            size={"lg"}
                            disabled={$login.isLoading || $login.isSuccess}
                            loading={$login.isLoading || $login.isSuccess}
                            variant={'orange'}
                            fullWidth
                        >
                            Se connecter
                        </Button>
                        {/* <div className={"text-[10px] opacity-25 mt-[20px] text-center"}>VTC ADMIN V1.0.2 (19/8/2024, 4:51PM)</div> */}
                    </div>
                </form>
            </div>

        </React.Suspense>
    )
}

export function LoadingLoader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn(
            `w-full font-bold text-admin-primary h-[300px] flex justify-center items-center`,
            className
        )} {...props}>
            <b>Chargement...</b>
        </div>
    )
}

const AuthHead: React.FC<{ title: string, subtitle: string }> = ({ title, subtitle }) => {
    return (
        <div className="relative mb-[21px] lg:mb-[40px] text-center">
            <h1 className="text-black text-2xl lg:text-[40.39px] font-bold leading-[62.83px]">{title}</h1>
            <div className="text-gray-500 text-lg font-normal leading-[17.95px] mb-[30px]">{subtitle}</div>
            <div className="w-full h-[0px] lg:border lg:border-slate-200"></div>
        </div>
    )
}

const AuthFormContainer: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children }) => {

    return (
        <div className={`bg-white py-[18px] px-[15px] rounded-md
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
} & React.HTMLAttributes<HTMLDivElement>> = ({ children, auth, groupTitle, adminForm, ...props }) => {
    return (
        <div {...props}>
            {groupTitle && <h4 className={`text-admin-primary mb-[20px] font-bold`}>{groupTitle}</h4>}
            <div className={`flex flex-col ${auth ? 'gap-[26px]' : (adminForm ? 'gap-[22px]' : 'gap-[10px]')}`}>
                {children}
            </div>
        </div>
    )
}