"use client";

import React, {MouseEventHandler} from "react";
import DialogBase, {AdminDialogHead, DefaultDialogMainBody, DialogActions} from "@/components/dialog/Dialog";
import FormGroup from "@/components/box/FormGroup";
import {SelectField} from "@/components/form/TextField";
import BtnBase from "@/components/elements/BtnBase";
import {Stack} from "@/components/box/Grid";
import {useCountries, useFleetCity} from "@/hooks/location/useCountry/useCountry";
import {useCity} from "@/hooks/location/useCity/useCity";
import UserProfile from "@/model/user/User";
import Country from "@/model/location/Country";
import City from "@/model/location/City";
import {useAddAdminOnCity} from "@/hooks/admin/useSettingsHook";
import {UserAccess} from "@/schema/ADMIN/settings.schema";
import notify from "@/utils/func/notification";

export const SetCityToAdminDialog: React.FC<React.HTMLAttributes<HTMLDivElement> & {
    isOpen: boolean,
    setIsOpen: (status: boolean) => void,
    profile: UserProfile
}> = ({
          children,
          isOpen,
          setIsOpen,
          profile,
          ...props
      }) => {

    const [selectedCountry, setSelectedCountry] = React.useState('AF')
    const [selectedCity, setSelectedCity] = React.useState('1')

    const {onAddAdminOnCity, loading, data, isSuccess} = useAddAdminOnCity()
    const {data: fleetCities, error: fleetCitiesError, isLoading: fetchingFleetCities} = useFleetCity()

    const AccessPermissions = [
        {access_id: 1, type: "write"},
        {access_id: 2, type: "write"},
        {access_id: 3, type: "write"},
        {access_id: 4, type: "write"},
        {access_id: 5, type: "write"},
        {access_id: 6, type: "write"},
        {access_id: 8, type: "write"},
        {access_id: 10, type: "write"},
        {access_id: 11, type: "write"},
        {access_id: 14, type: "write"},
        {access_id: 13, type: "write"},
        {access_id: 7, type: "write"},
        {access_id: 9, type: "write"}
    ] as UserAccess[];

    const handleAddAdminOnCity = () => {

        if (!selectedCity) {
            notify("Selectionnez la ville à attribuer", "warning")
            return
        }

        onAddAdminOnCity(
            {
                user_id: profile.profileUserID,
                city_id: selectedCity,
                access: AccessPermissions,
            }
        )
    }


    React.useEffect(() => {
        if (data && isSuccess) {
            setIsOpen(false)
        }
    }, [data, isSuccess])

    return (
        <div {...props}>

            <DialogBase isSubDialog={false} variant={'sm'} isOpenned={isOpen} onClose={() => setIsOpen(false)}
                        bgType={'whited'}>
                <AdminDialogHead
                    withBack={true}
                    title={`Attribuer une ville à ${profile.getUsername}`}
                    handleToggle={() => setIsOpen(false) as unknown as MouseEventHandler<HTMLDivElement>}/>
                <DefaultDialogMainBody>

                    <FormGroup adminForm={true} groupTitle={''}>
                        <div>
                            <Stack>
                                <SelectField
                                    mode={"search"}
                                    label={'Ville*'}
                                    loading={fetchingFleetCities}
                                    items={City.toVSelect(fleetCities)}
                                    handleSelect={(v) => setSelectedCity('' + v)}
                                />
                            </Stack>
                        </div>
                    </FormGroup>


                </DefaultDialogMainBody>
                <DialogActions className={`pt-[30px]`}>
                    <BtnBase
                        color={'blue'}
                        variant={'contained'}
                        type={'submit'}
                        fullwidth={true}
                        shape={'square'}
                        disabled={loading}
                        loading={loading}
                        onClick={handleAddAdminOnCity}
                    >
                        {loading ? "Confirmation en cour" : "Confirmer"}
                    </BtnBase>
                </DialogActions>
            </DialogBase>
        </div>
    )
}

