"use client"

import React, {useId} from "react";
import FormGroup from "@/components/box/FormGroup";
import {Stack} from "@/components/box/Grid";
import TextField, {FieldDate, SelectField} from "@/components/form/TextField";
import {AdminPageTitle} from "@/components/typo/typo";
import BtnBase from "@/components/elements/BtnBase";
import Avatar from "@/components/box/Avatar";
import {EditIcon} from "@/components/layout/admin/sidebar/_navIcons/NavIcons";
import {useCountries} from "@/hooks/location/useCountry/useCountry";
import {useCity} from "@/hooks/location/useCity/useCity";
import Country from "@/model/location/Country";
import City from "@/model/location/City";
import {UpdatePasswordForm} from "@/app/(protected)/dashboard/settings/password/_components/updatePasswordForm";
import {useUpdateProfile} from "@/hooks/admin/useSettingsHook";
import {SubmitHandler, useForm} from "react-hook-form";
import {AddClientInputs, addClientSchema} from "@/schema/supplier.schema";
import {joiResolver} from "@hookform/resolvers/joi";
import {UpdateProfileInput, updateProfileInputSchema} from "@/schema/ADMIN/settings.schema";
import AuthManagerGuard from "@/guard/AuthManagerGuard";
import {useUserProfile} from "@/hooks/__form/auth/useUserProfile";
import Loading from "@/components/ui/Loader";
import {useGetProfileID} from "@/hooks/__globlal/useGlobalHook";

const ProfilePage: React.FC = () => {
    return (
        <div className={`grid grid-cols-12`}>
            <div className={`col-span-12 2xl:col-span-8 border-r border-r-[#89acff]`}>
                <PersonalInfosForm/>
            </div>
            <div className={"col-span-12 2xl:col-span-4"}>
                <UpdatePasswordForm/>
            </div>
        </div>
    )
}

const PersonalInfosForm = () => {

    const [imgUri, setImgUri] = React.useState("")
    const [file, setFile] = React.useState<File | undefined>()
    const {onUpdateProfile, loading} = useUpdateProfile()
    const chooseAvatarInputID = useId()

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset: resetForm,
        formState: {errors},
    } = useForm<UpdateProfileInput>({
        resolver: joiResolver(updateProfileInputSchema)
    })

    const onSubmit: SubmitHandler<UpdateProfileInput> = (profileInfos, event) => {
        onUpdateProfile({...profileInfos, id: AuthManagerGuard.getProfileID as string, image: file})
    }

    const {data: profile, isLoading} = useUserProfile()
    const {profile_id} = useGetProfileID()


    React.useEffect(() => {
        if (profile && !isLoading) {
            setValue("last_name", profile._instance.last_name)
            setValue("first_name", profile._instance.first_name)
            setValue("email", profile._instance.user.email)
            //setValue("birthday", profile._instance.bi)
            setImgUri("/assets/faker/setting/default-avatar-uppdate.png")
        }
    }, [profile, isLoading])

    if (isLoading) {
        return (
            <Loading/>
        )
    }

    const onSelectAvatar = (files: FileList | null) => {
        if (files) {
            setFile(files[0])
            const uri = URL.createObjectURL(files[0])
            setImgUri(uri)
        }
    }

    return (
        <form
            className={`px-[32px] py-[34px] `}
            onSubmit={handleSubmit(onSubmit)}
        >
            <AdminPageTitle withMb={true}>Modifier le profil</AdminPageTitle>
            <FormGroup adminForm={true} className={`mb-[56px]`}>

                {/*<div className={`relative w-fit`}>*/}
                {/*    <Avatar src={imgUri} h={108} w={108}/>*/}
                {/*    <input*/}
                {/*        id={chooseAvatarInputID} type="file"*/}
                {/*        accept={'image'}*/}
                {/*        className={`hidden`}*/}
                {/*        onChange={e => onSelectAvatar(e.target.files)}*/}
                {/*    />*/}
                {/*    <label htmlFor={chooseAvatarInputID}>*/}
                {/*        <div*/}
                {/*            className={`size-[38.85px] rounded-full bg-white flex justify-center items-center text-text-body absolute bottom-0 right-[-15px] */}
                {/*    transition ease-in duration-200*/}
                {/*    cursor-pointer hover:text-blue-primary`}>*/}
                {/*            <EditIcon/>*/}
                {/*        </div>*/}
                {/*    </label>*/}
                {/*</div>*/}

                <Stack>
                    <TextField
                        label={'Nom de famille'}
                        register={register("last_name")}
                        errors={errors}
                    />
                    <TextField
                        label={'Prénom'}
                        register={register("first_name")}
                        errors={errors}
                    />
                </Stack>
                <Stack>
                    <TextField
                        label={'Adresse email'}
                        register={register("email")}
                        errors={errors}
                    />
                    <FieldDate
                        label={'Date de naissance'}
                        register={register("birthday")}
                        errors={errors}
                    />
                </Stack>
            </FormGroup>

            <BtnBase
                w={"270px"}
                to={''}
                color={'blue'}
                loading={loading}
                variant={'contained'}
                shape={'square'}
                type={"submit"}
                disabled={loading}
            >
                {loading ? "Mise à jour en cour..." : "Mettre à jour"}
            </BtnBase>

        </form>
    )
}


const AvatarUpdate: React.FC = () => {

    const chooseAvatarInputID = useId()

    return (
        <div className={`relative w-fit`}>
            <Avatar src={'/assets/faker/setting/default-avatar-uppdate.png'} h={108} w={108}/>
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


export default ProfilePage
