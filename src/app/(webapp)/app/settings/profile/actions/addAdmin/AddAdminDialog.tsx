import React, {MouseEventHandler} from "react";
import DialogBase, {AdminDialogHead, DefaultDialogMainBody, DialogActions} from "@/components/dialog/Dialog";
import FormGroup from "@/components/box/FormGroup";
import TextField, {SelectField} from "@/components/form/TextField";
import BtnBase from "@/components/elements/BtnBase";
import useClientStore from "@/app/(protected)/dashboard/clients/store/useAddClientStore";
import {Stack} from "@/components/box/Grid";
import {SubmitHandler, useForm} from "react-hook-form";
import {AddAdminInput, AddAdminInputSchema, AdminAccessType} from "@/schema/ADMIN/settings.schema";
import {joiResolver} from "@hookform/resolvers/joi";
import {useCreateAdmin, useGetAdminAccess, useUpdateProfile} from "@/hooks/admin/useSettingsHook";
import {ACCESS_TYPE, RoleType} from "@/services/admin/settings/settingsService";
import {useGetCurrency} from "@/hooks/__globlal/useGlobalHook";
import {CheckStatusIcon, UncheckStatusIcon} from "@/components/ui/__icons";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import Loading from "@/components/ui/Loader";
import Country from "@/model/location/Country";
import City from "@/model/location/City";
import {useCountries} from "@/hooks/location/useCountry/useCountry";
import {useCity} from "@/hooks/location/useCity/useCity";
import UserProfile from "@/model/user/User";

export const AddAdminDialog: React.FC<React.HTMLAttributes<HTMLDivElement> & {
    isOpen: boolean,
    setIsOpen: (status: boolean) => void,
    profile?: UserProfile
}> = ({
          children,
          isOpen,
          setIsOpen,
          profile,
          ...props
      }) => {

    // const [isOpen, setIsOpen] = React.useState(false)
    const [access, setAccess] = React.useState<AdminAccessType[]>([])
    const {setAddress: setNewAddress} = useClientStore()
    const {onCreateAdmin, loading, data, isSuccess} = useCreateAdmin()
    const {data: roles, isLoading} = useGetAdminAccess()

    const [selectedCountry, setSelectedCountry] = React.useState('AF')
    const [selectedCity, setSelectedCity] = React.useState('1')

    const {data: countriesData, error: fetchCountriesError, isLoading: fetchingCountries} = useCountries()
    const {data: citiesData, error: fetchCitiesError, isLoading: fetchingCities} = useCity(selectedCountry)
    const {onUpdateProfile, loading: loadingProfile} = useUpdateProfile()


    const isEdit = !!profile

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset: resetForm,
        formState: {errors},
    } = useForm<AddAdminInput>({
        resolver: joiResolver(AddAdminInputSchema)
    })

    React.useEffect(() => {
        if (profile) {
            setValue("first_name", profile._instance.first_name)
            setValue("last_name", profile._instance.last_name)
            setValue("phone", profile._instance.user.phone)
            setValue("email", profile._instance.user.email)
        }
    }, [profile])

    const onSubmit: SubmitHandler<AddAdminInput> = (adminInfos, event) => {

        console.log("Submit")

        if (isEdit) {
            onUpdateProfile({...adminInfos, id: profile?.getID})
        } else {
            onCreateAdmin({...adminInfos, access: JSON.stringify(access) as unknown as AdminAccessType[]})
        }

    }

    const handleAddAccess = ({id}: { id: number }) => {

        if (access.find(a => a.access_id === id)) {
            setAccess(access.filter(a => a.access_id !== id))
            return
        }

        setAccess([...access, {access_id: id, type: ACCESS_TYPE.READ}])
    }

    React.useEffect(() => {
        if (data && isSuccess) {
            resetForm()
            setIsOpen(false)
        }
    }, [data, isSuccess])

    const handleChangeAccessRole = ({id, atype}: { id: number, atype: ACCESS_TYPE }) => {
        if (access.find(a => a.access_id === id)) {
            setAccess(access.map(a => {
                if (a.access_id === id) {
                    return {...a, type: atype}
                } else return a
            }))
            return
        }
    }


    return (
        <div {...props}>
            <form onSubmit={() => {
                console.log("Submit form")
                handleSubmit(onSubmit)
            }}>
                <DialogBase isSubDialog={false} variant={'sm'} isOpenned={isOpen} onClose={() => setIsOpen(false)}
                            bgType={'whited'}>
                    <AdminDialogHead
                        withBack={true}
                        title={isEdit ? "Modifier l'administrateur" : "Ajouter un administrateur"}
                        handleToggle={() => setIsOpen(false) as unknown as MouseEventHandler<HTMLDivElement>}/>
                    <DefaultDialogMainBody>

                        <FormGroup adminForm={true} groupTitle={''}>

                            <div
                                className="text-[#506D82] text-sm font-bold font-['DM Sans'] leading-normal mb-[5px] mt-[20px]">
                                Infos personnelles
                            </div>

                            <Stack>
                                <TextField
                                    size={'md'}
                                    label={'Nom de famille'}
                                    required={true}
                                    inputType={"text"}
                                    placeholder={""}
                                    register={register("last_name")}
                                    errors={errors}
                                />
                                <TextField
                                    size={'md'}
                                    label={'Prénom'}
                                    required={true}
                                    inputType={"text"}
                                    placeholder={""}
                                    register={register("first_name")}
                                    errors={errors}
                                />
                            </Stack>

                            <TextField
                                size={'md'}
                                label={'Numéro de téléphone'}
                                required={true}
                                inputType={"text"}
                                placeholder={""}
                                register={register("phone")}
                                errors={errors}
                            />

                            <TextField
                                size={'md'}
                                label={'Adresse email'}
                                required={true}
                                inputType={"text"}
                                placeholder={""}
                                register={register("email")}
                                errors={errors}
                            />

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
                                    register={register("city_id")}
                                    errors={errors}
                                />
                            </Stack>

                            {!isEdit && <div
                                className="text-[#506D82] text-sm font-bold font-['DM Sans'] leading-normal mb-[5px] mt-[20px]">
                                Autoriser l’accès aux onglets
                            </div>}
                            {!isEdit && <div>
                                {roles && <FormGroup adminForm={true} groupTitle={''}>
                                    {roles.map(r => {

                                        // const usersRoles = profile?.roles
                                        // const checked = roles.find()

                                        return (
                                            <RoleElement
                                                key={r.id}
                                                RoleType={r}
                                                onIdChange={(id) => {
                                                    console.log("id" + id)
                                                    handleAddAccess({id: id})
                                                }}
                                                onValueChange={(id, atype) => {
                                                    handleChangeAccessRole({id, atype})
                                                }}
                                            />
                                        )
                                    })
                                    }
                                </FormGroup>}
                                {isLoading && <Loading/>}
                            </div>}
                        </FormGroup>


                    </DefaultDialogMainBody>
                    <DialogActions className={`pt-[30px]`}>
                        <BtnBase
                            color={'blue'}
                            variant={'contained'}
                            type={'submit'}
                            fullwidth={true}
                            shape={'square'}
                            loading={loading}
                            onClick={handleSubmit(onSubmit)}
                        >
                            {(loading || loadingProfile) ? (isEdit ? "Mettre à jour" : "Ajout en cour...") : "Confirmer"}
                        </BtnBase>
                    </DialogActions>
                </DialogBase>
            </form>
        </div>
    )
}

const RoleElement: React.FC<React.HTMLAttributes<HTMLDivElement> & {
    RoleType: RoleType,
    onIdChange: (id: number) => void,
    alreadyChecked?: boolean,
    onValueChange: (v: number, atype: ACCESS_TYPE) => void
}> = ({
          children,
          RoleType,
          onValueChange,
          onIdChange,
          alreadyChecked = false,
          ...props
      }) => {

    const [checked, setCChecked] = React.useState(alreadyChecked)
    const {currency} = useGetCurrency()

    return (
        <div className={"flex justify-between items-center overflow-hidden"}>
            <div className={"flex items-center gap-[11.22px]"}>
                <button type={"button"} onClick={() => {
                    onIdChange(RoleType.id)
                    setCChecked(!checked)
                }}
                        className={"cursor-pointer opacity-85 hover:opacity-100 transition ease-in"}>
                    {checked && <CheckStatusIcon/>}
                    {!checked && <UncheckStatusIcon/>}
                </button>
                <div className="text-slate-500 text-[16.82px] font-medium leading-7">{RoleType.name}</div>
            </div>
            {checked && <div className={"flex items-center gap-[5.6px]"}>
                <Select defaultValue={"read"} onValueChange={v => {
                    onValueChange(RoleType.id, v as ACCESS_TYPE)
                }}>
                    <SelectTrigger className="w-fit border-0 outline-0 focus:outline-none text-[#7f878c]">
                        <SelectValue placeholder="Type d'access"/>
                    </SelectTrigger>
                    <SelectContent className={"text-[#7f878c]"}>
                        <SelectGroup>
                            <SelectItem value="read">Lecture</SelectItem>
                            <SelectItem value="write">Lecture + Ecriture</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>}
        </div>
    )
}