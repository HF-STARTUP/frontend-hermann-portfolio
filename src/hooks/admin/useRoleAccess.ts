import RoleService, { RoleApiPath } from "@/services/admin/RoleAccessService"
import { useMutationProvider, useQueryProvider } from "../hooksProvider"
import { CreateRolePayload } from "@/types/admin/role-access.type"
import React from "react"
import notify from "@/utils/func/notification"

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
 * Hook pour récupérer un rôle
 */
export const useGetRole = (id?: string) => {
    const { isLoading, data } = useQueryProvider({
        queryKey: [RoleApiPath.GetRoles, id],
        queryFn: () => RoleService.getRoleData(id??""),
        enabled: !!id
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





export const useUpdateRole = (id?: string) => {

    const {
        data,
        loading,
        isSuccess,
        isError,
        error,
        handleMutation,
    } = useMutationProvider({
        mutationFn: (data: CreateRolePayload) => RoleService.updateRole(id!, data),
        successMessage: "Role mis à jour avec succès.",
    });

    const onUpdateRole = (data: CreateRolePayload) => {
        if (!id) {
            console.error("Impossible de mettre à jour : l'ID est manquant");
            notify("Impossible de mettre à jour : l'ID est manquant", "error");
            return;
        }
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
        onUpdateRole,        
    }
}


export const useDeleteRole = (id: string) => {
    const {
        data,
        loading,
        isSuccess,
        isError,
        error,
        handleMutation,
    } = useMutationProvider({
        mutationFn: () => RoleService.deleteRole(id!),
        successMessage: "Role supprimer avec succès.",
    });

    const onDeleteRole = () => {
        if (!id) {
            console.error("Impossible de supprimer : l'ID est manquant");
            notify("Impossible de supprimer : l'ID est manquant", "error");
            return;
        }
        handleMutation(id);
    };

    React.useEffect(() => {
        if (isSuccess && data) {
            void RoleService.invalidRolesList();
        }
    }, [isSuccess, data]);

    return {
        data,
        loading,
        isSuccess,
        isError,
        error,
        onDeleteRole,        
    };
};