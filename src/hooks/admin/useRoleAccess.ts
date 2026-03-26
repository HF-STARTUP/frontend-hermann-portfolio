import RoleService, { RoleApiPath } from "@/services/admin/RoleAccessService"
import { useMutationProvider, useQueryProvider } from "../hooksProvider"
import { CreateRolePayload } from "@/types/admin/role-access.type"
import React from "react"

/**
 * Hook pour récupérer la liste des rôles
 */
export const useGetRoles = () => {
    const { isLoading, data } = useQueryProvider({
        queryKey: [RoleApiPath.GetRoles],
        queryFn: () => RoleService.getRolesList(),
    })
    return { isLoading, data }
}

/**
 * Hook pour récupérer le catalogue des permissions groupées par module
 */
export const useGetGroupedPermissions = () => {
    const { isLoading, data } = useQueryProvider({
        queryKey: [RoleApiPath.GetGroupedPermissions],
        queryFn: () => RoleService.getGroupedPermissions(),
    })

    return { 
        isLoading, 
        data 
    }
}

export const useCreateRole = () => {

    const {
        data,
        loading,
        isSuccess,
        isError,
        error,
        handleMutation,
    } = useMutationProvider({
        mutationFn: RoleService.createNewRole,
        successMessage: "Role ajouté avec succès.",
    });

    const onCreateRole = (data: CreateRolePayload) => {
        handleMutation(data)
    }

    React.useEffect(() => {
        if (isSuccess && data) {
            void RoleService.invalidRolesList()
        }
    }, [isSuccess, data])

    return {
        data,
        loading,
        isSuccess,
        isError,
        error,
        onCreateRole,        
    }
}