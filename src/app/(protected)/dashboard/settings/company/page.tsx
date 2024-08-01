"use client"

import React, {useId} from "react";
import FormGroup from "@/components/box/FormGroup";
import {Stack} from "@/components/box/Grid";
import TextField, {SelectField} from "@/components/form/TextField";
import {AdminPageTitle} from "@/components/typo/typo";
import BtnBase from "@/components/elements/BtnBase";
import Avatar from "@/components/box/Avatar";
import {EditIcon} from "@/components/layout/admin/sidebar/_navIcons/NavIcons";
import {useUserProfile} from "@/hooks/__form/auth/useUserProfile";
import {useCountries} from "@/hooks/location/useCountry/useCountry";
import {useCity} from "@/hooks/location/useCity/useCity";
import Country from "@/model/location/Country";
import City from "@/model/location/City";

const CompanyPage: React.FC = () => {
    return (
        <div className={`grid grid-cols-12`}>
            <div className={`col-span-8`}>
                <PersonalInfosForm/>
            </div>
        </div>
    )
}

const PersonalInfosForm = () => {
    const [selectedCountry, setSelectedCountry] = React.useState('AF')
    const [selectedCity, setSelectedCity] = React.useState('1')

    const {data: countriesData, error: fetchCountriesError, isLoading: fetchingCountries} = useCountries()
    const {data: citiesData, error: fetchCitiesError, isLoading: fetchingCities} = useCity(selectedCountry)


    return (
        <div className={`px-[32px] py-[34px] `}>
            <AdminPageTitle withMb={true}>Modifier les informations de l’entreprise</AdminPageTitle>
            <FormGroup adminForm={true} className={`mb-[56px]`}>
                <AvatarUpdate/>
                <Stack>
                    <TextField label={'Nom de l’entreprise'}/>
                    <TextField label={'Nom commercial'}/>
                </Stack>
                <Stack>
                    <TextField label={'Numéro de téléphone'}/>
                    <TextField label={'Adresse email'}/>
                </Stack>
                <TextField label={'Site web'}/>
                <Stack>
                    <SelectField
                        mode={"search"}
                        label={'Pays*'}
                        loading={fetchingCountries}
                        items={Country.toVSelect(countriesData)}
                        handleSelect={(v) => setSelectedCountry('' + v)}
                    />
                    <SelectField
                        mode={"search"}
                        label={'Ville*'}
                        loading={fetchingCities}
                        items={City.toVSelect(citiesData)}
                        handleSelect={(v) => setSelectedCity('' + v)}
                    />
                </Stack>
            </FormGroup>
            <BtnBase w={"270px"} to={''} color={'blue'} variant={'contained'} shape={'square'}>Valider</BtnBase>
        </div>
    )
}


const AvatarUpdate: React.FC = () => {

    const chooseAvatarInputID = useId()
    const {data: user, isLoading} = useUserProfile()


    if (isLoading || !user) {
        return (
            <div>
                loading...
            </div>
        )
    }

    return (
        <div className={`relative w-fit`}>
            <Avatar src={`${user.getOrganisationLogo}`} h={108} w={108} className={`size-[108px]`}/>
            <input id={chooseAvatarInputID} type="file" accept={'image'} className={`hidden`}/>
            <label htmlFor={chooseAvatarInputID}>
                <div
                    className={`size-[38.85px] rounded-full bg-white flex justify-center items-center text-text-body absolute bottom-0 right-[-15px] 
                    transition ease-in duration-200
                    cursor-pointer hover:text-blue-primary`}>
                    <EditIcon/>
                </div>
            </label>
        </div>
    )
}


export default CompanyPage
