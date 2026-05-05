"use client"

import React, { useId, useRef, useState } from "react"
import FormGroup from "@/components/box/FormGroup"
import { SubmitHandler, useForm } from "react-hook-form"
import { joiResolver } from "@hookform/resolvers/joi"
import { UpdateProfileInput, updateProfileInputSchema } from "@/schema/ADMIN/settings.schema"
import AuthManagerGuard from "@/guard/AuthManagerGuard"
import { useUserProfile } from "@/hooks/__form/auth/useUserProfile"
import Loading from "@/components/ui/Loader"
import { PageSubTitle } from "@/components/ui/custom/PageTitle"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Edit2 } from "lucide-react"
import { UpdatePasswordForm } from "@/app/(protected)/dashboard/settings/password/_components/updatePasswordForm"
import { useUpdateProfile } from "@/hooks/admin/useSettingsHook"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const ProfilePage: React.FC = () => {
    const [currentTab, setCurrentTab] = useState("profile")
    return (
        <div className="flex flex-col items-center gap-12 w-full">
            <Tabs value={currentTab} defaultValue={"profile"} onValueChange={(v) => setCurrentTab(v)}>
                <TabsList className="w-full grid grid-cols-2 mb-8">
                    <TabsTrigger value="profile">
                        Profil
                    </TabsTrigger>
                    <TabsTrigger value="password">
                        Mot de passe
                    </TabsTrigger>

                </TabsList>
                <TabsContent value="profile">
                    <PersonalInfosForm />
                </TabsContent>
                <TabsContent value="password">
                    <UpdatePasswordForm />
                </TabsContent>
            </Tabs>
        </div>
    )
}

const PersonalInfosForm = () => {
    const [imgUri, setImgUri] = React.useState("")
    const [file, setFile] = React.useState<File | undefined>()
    const { onUpdateProfile, loading } = useUpdateProfile()
    const chooseAvatarInputID = useId()

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<UpdateProfileInput>({
        resolver: joiResolver(updateProfileInputSchema)
    })

    const { data: profile, isLoading } = useUserProfile()



    React.useEffect(() => {
        if (profile && !isLoading && profile._instance) {
            setValue("last_name", profile._instance.last_name || "")
            setValue("first_name", profile._instance.first_name || "")
            setValue("email", profile._instance.user?.email || "")
            setImgUri(profile.image || "/assets/admin-default-cover.png")
        }
    }, [profile, isLoading, setValue])

    const onSelectAvatar = (files: FileList | null) => {
        if (files && files[0]) {
            setFile(files[0]);
            const uri = URL.createObjectURL(files[0]);
            setImgUri(uri);
        }
    }

    const onSubmit: SubmitHandler<UpdateProfileInput> = (profileInfos) => {
        const profileId = AuthManagerGuard.getProfileID as string
        if (!profileId) return

        onUpdateProfile({
            ...profileInfos,
            id: profileId,
            image: file
        })
    }



    if (isLoading) {
        return <Loading />
    }

    return (
        <form
            className="space-y-6 flex flex-col items-center"
            onSubmit={handleSubmit(onSubmit)}
        >
            <PageSubTitle subtitle="Mon profil" />

            {/* Section avatar */}
            <div className="mb-6 relative size-32 rounded-full overflow-hidden">
                <input
                    id={chooseAvatarInputID}
                    type="file"
                    accept="image/*"
                    onChange={(e) => onSelectAvatar(e.target.files)}
                    className="hidden"
                />
                <label htmlFor={chooseAvatarInputID} className="cursor-pointer">

                    {imgUri && (
                        <Image
                            src={imgUri}
                            alt="Avatar"
                            className="size-full rounded-full mt-3 object-cover bg-gray-200"
                            width={200}
                            height={200}
                        />
                    )}
                    <Button
                        type="button"
                        variant={"secondary"}
                        size={"icon"}
                        className="rounded-full size-6 "
                    >
                        <Edit2 className="text-vaTextPrimary size-3" />
                    </Button>
                </label>
            </div>

            <FormGroup adminForm={true}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <Input
                        label="Nom complet"
                        {...register("last_name")}
                        error={errors.last_name}
                    />

                    <Input
                        label="Adresse email"
                        {...register("email")}
                        error={errors.email}
                        type="email"
                    />
                </div>
            </FormGroup>

            <Button
                color="blue"
                loading={loading}
                variant="mainBlue"
                type="submit"
                fullWidth={true}
            >
                {loading ? "Mise à jour en cours..." : "Enregistrer les modifications"}
            </Button>
        </form>
    )
}

export default ProfilePage