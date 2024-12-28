import LoginService from "@/services/__form/auth/LoginService";
import React from "react";
import useAppStore from "@/stores/global/useAppStore";
import AuthManagerGuard from "@/guard/AuthManagerGuard";
import {useQuery} from "@tanstack/react-query";

export function useUserProfile() {
    const {isError, isSuccess, data, error, isLoading} = useQuery(
        {
            queryKey: ["userprofile"],
            queryFn: () => LoginService.getProfileInfo()
        }
    );
    const {setUser} = useAppStore()

    React.useEffect(() => {
        if (data && !error) {
            setUser(data)
            if (!AuthManagerGuard.getEnabledCity) AuthManagerGuard.setEnabledCityID(data.defaultPark.id)
            if(!AuthManagerGuard.getEnabledFleetType) AuthManagerGuard.setEnabledFleetType("particulier")
        }
    }, [data, isLoading])

    return {
        isLoading,
        data,
        isError,
        error,
        isSuccess
    }
}
