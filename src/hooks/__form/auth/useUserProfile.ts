import LoginService from "@/services/__form/auth/LoginService";
import React from "react";
import useAppStore from "@/stores/global/useAppStore";
import AuthManagerGuard from "@/guard/AuthManagerGuard";
import {useQuery} from "@tanstack/react-query";
import { useQueryProvider } from "@/hooks/hooksProvider";

export function useUserProfile() {
    const {isSuccess, data, isLoading} = useQueryProvider({
        queryKey: ["userprofile"],
        queryFn: () => LoginService.getProfileInfo()
    })
    const {setUser} = useAppStore()

    React.useEffect(() => {
        if (data) {
            setUser(data)
            if (!AuthManagerGuard.getEnabledCity) AuthManagerGuard.setEnabledCityID(data.defaultPark.id)
            if(!AuthManagerGuard.getEnabledFleetType) AuthManagerGuard.setEnabledFleetType("particulier")
        }
    }, [data, isLoading])

    return {
        isLoading,
        data,
        isSuccess
    }
}
