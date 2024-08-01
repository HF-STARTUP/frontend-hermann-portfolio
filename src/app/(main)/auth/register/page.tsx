'use client'

import React, {useEffect, useState} from "react";
import FormGroup, {AuthFormContainer} from "@/components/box/FormGroup";
import TextField, {ImageUploadFieldGroup} from "@/components/form/TextField";
import BtnBase from "@/components/elements/BtnBase";
import AuthHead from "@/app/(main)/auth/_components/AuthHead";
import {useCountries} from "@/hooks/location/useCountry/useCountry";
import Loading from "@/components/ui/Loader";
import Country from "@/model/location/Country";
import {useCity} from "@/hooks/location/useCity/useCity";
import City from "@/model/location/City";
import {SubmitHandler, useForm} from "react-hook-form"
import {joiResolver} from '@hookform/resolvers/joi'
import {RegisterInputs, registerSchema} from "@/schema/auth.schema";
import {useRegister} from "@/hooks/__form/auth/useRegister";
import notify from "@/utils/func/notification";
import {useRouter, useSearchParams} from "next/navigation";
import AuthManagerGuard from "@/guard/AuthManagerGuard";
import Curency from "@/model/vehicule/Curency";
import {useGetCurencies} from "@/hooks/vehicule/useVehicule";
import {Input} from "@/components/ui/input";


export default function RegisterPage() {
    const [selectedCountry, setSelectedCountry] = useState('AF')
    const [selectedCity, setSelectedCity] = useState('1')
    const [currency_id, setCurencyID] = useState('1')

    const $router = useRouter()
    const $q = useSearchParams()

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: {errors},
    } = useForm<RegisterInputs>({
        resolver: joiResolver(registerSchema)
    })

    const [logo, setLogo] = React.useState<File>()
    const {data: countriesData, error: fetchCountriesError, isLoading: fetchingCountries} = useCountries()
    const {data: citiesData, error: fetchCitiesError, isLoading: fetchingCities} = useCity(selectedCountry)

    const $email = $q.get('email')
    const $phone = $q.get('phone')
    const $uuid = $q.get("uuid_code")

    const {
        data: curenciesData,
        isLoading: loadingCurencies,
    } = useGetCurencies()

    const $register = useRegister()

    useEffect(() => {
        if ($register.isError && $register.error) {
            notify($register.error.message, 'error');
        }
    }, [$register.isError, $register.error]);

    useEffect(() => {
        if (!$phone || !$email) {
            $router.push("/auth/register/startup")
        } else {
            setValue("phone", `+${$phone.trim()}`)
            setValue("email", $email)
        }
    }, []);

    useEffect(() => {
        if (!$register.isError && $register.isSuccess) {
            notify('Inscription reusis !', 'success');
            AuthManagerGuard.loginToApp(`${$register.data?.token}`, `${$register.data?.refresh_token}`, undefined)
            $router.replace("/dashboard/resume")
        }
    }, [$register.isSuccess]);

    const handleSelectCountry = (countryID: string | number) => {
        console.log(countryID)
        setSelectedCountry(countryID.toString())
    }

    const handleSelectCity = (cityID: string | number) => {
        setSelectedCity(cityID.toString())
    }

    const onSubmit: SubmitHandler<RegisterInputs> = (registerData) => {
        if (!logo) {
            notify(`Veuillez telecharger le logo de l'entreprise`, 'error')
            return
        }
        $register.submitForm({
            ...registerData,
            city_id: selectedCity,
            currency_id,
            logo: logo,
            uuid_code: $uuid ?? ""
        })
    }


    if (fetchCountriesError) {
        return (
            <div>:( Oups une Erreur s'est produite lors du chargement des pays;</div>
        )
    }

    const handleFileChange = (files: File[]) => {
        if (!files[0]) {
            setLogo(undefined)
            return
        }
        setLogo(files[0])
    }

    return (
        <React.Suspense fallback={<Loading/>}>
            <form className={`w-full`} onSubmit={handleSubmit(onSubmit)}>
                <AuthHead
                    title={'Vous y êtes presques'}
                    subtitle={'Completer mon compte'}
                />
                <div>
                    <AuthFormContainer>
                        <FormGroup auth={true}>

                            <ImageUploadFieldGroup
                                label={`Logo de l'entreprise`}
                                multiple={false}
                                handleChange={handleFileChange}
                            />

                            <TextField
                                register={register("name")}
                                errors={errors}
                                label={'Nom de l’entreprise*'}
                                placeholder={'MAKADI SARL'}
                            />

                            <TextField
                                errors={errors}
                                label={'Nom de l’utilisateur*'}
                                placeholder={'Elon musk'}
                                register={register("first_name")}
                            />

                            <Input
                                as={"select"}
                                label={'Pays*'}
                                options={Country.toVSelect(countriesData)}
                                onChange={(e) => handleSelectCountry(e.currentTarget.value)}
                            />

                            <Input
                                as={"select"}
                                label={'Ville*'}
                                options={City.toVSelect(citiesData)}
                                onChange={(e) => handleSelectCity(e.currentTarget.value)}
                            />

                            <Input
                                as={"select"}
                                className={`w-full`}
                                label={'Devise'}
                                options={Curency.toVSelect(curenciesData)}
                                onChange={(v) => setCurencyID(v.currentTarget.value)}
                            />

                            <TextField
                                label="Email*"
                                errors={errors}
                                placeholder="mail@example.com"
                                register={register("email")}
                                disabled={true}
                            />
                            <TextField
                                label="Numéro de téléphone*"
                                placeholder="+237678452147"
                                errors={errors}
                                register={register("phone")}
                                disabled={true}
                            />

                            <TextField
                                inputType={'password'}
                                label="Mot de passe"
                                placeholder="************"
                                errors={errors}
                                register={register("password")}
                            />

                        </FormGroup>
                    </AuthFormContainer>
                    <div className={`mt-[24px] lg:mt-[36.2px]`}>
                        <BtnBase
                            responsiveW={true} fullwidth={true}
                            to={''}
                            color={'blue'}
                            disabled={$register.isLoading}
                            loading={$register.isLoading}
                            variant={'contained'}>S'inscrire</BtnBase>
                    </div>
                </div>
            </form>
        </React.Suspense>
    )
}

