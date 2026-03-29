import Service from "@/services/Service";
import { toQueriesString } from "@/lib/utils";
import { RootRoleData, ModulePermissionGroup, CreateRolePayload } from "@/types/admin/role-access.type";
import RootRoleModel from "@/model/ADMIN/RoleAccessModel";
import ModulePermissionGroupModel from "@/model/ADMIN/PermissionsModel";

export enum RoleApiPath {
    GetRoles = '/root/roles',
    GetRole = '/root/roles/{id}',
    GetGroupedPermissions = '/root/permission-catalog', 
    EditRole = "/root/roles/{id}/update"
}

class RoleService extends Service {
    private static instance: RoleService = new RoleService();

    private constructor() {
        super();
    }

    public static getInstance(): RoleService {
        return RoleService.instance;
    }

    /**
     * Récupère la liste des rôles
     */
    public static async getRolesList() {
        const uri = toQueriesString(RoleApiPath.GetRoles, {});

        const response = await RoleService.getInstance().execHttpRequest<RootRoleData[]>({
            url: uri,
            method: RoleService.getInstance().httpMethods.get,
        });

        return RootRoleModel.toArrays(response);
    }


    /**
     * Récupère les donnees d'un rôle
     */
    public static async getRoleData(roleId: string) {
        const uri = toQueriesString(RoleApiPath.GetRole.replace("{id}", roleId), {});

        const response = await RoleService.getInstance().execHttpRequest<RootRoleData>({
            url: uri,
            method: RoleService.getInstance().httpMethods.get,
        });

        return new RootRoleModel(response);
    }

     /**
     * Invalide le cache des rôles
     */
     static invalidRolesList() {
        return RoleService.getInstance().queryClient.invalidateQueries({ 
            queryKey: [RoleApiPath.GetRoles] 
        });
    }

    /**
     * Récupère le catalogue des permissions groupées par module
     */
    public static async getGroupedPermissions(): Promise<ModulePermissionGroupModel[]> {
        const uri = toQueriesString(RoleApiPath.GetGroupedPermissions, {});

        const response = await RoleService.getInstance().execHttpRequest<ModulePermissionGroup[]>({
            url: uri,
            method: RoleService.getInstance().httpMethods.get,
        });

        
        return ModulePermissionGroupModel.toArrays(response);
    }

   

    /**
     * Invalide le cache du catalogue de permissions
     */
    static invalidPermissionsCatalog() {
        return RoleService.getInstance().queryClient.invalidateQueries({ 
            queryKey: [RoleApiPath.GetGroupedPermissions] 
        });
    }

     public static async createNewRole(formData: CreateRolePayload) {
        return await RoleService.getInstance().execHttpRequest({
            url: RoleApiPath.GetRoles,
            method: RoleService.getInstance().httpMethods.post,
            body: formData,
        });
    }

    public static async updateRole(roleId: string, formData: CreateRolePayload) {
        return await RoleService.getInstance().execHttpRequest({
            url: RoleApiPath.EditRole.replace("{id}", roleId),
            method: RoleService.getInstance().httpMethods.post,
            body: formData,
        });
    }
    
}

export default RoleService;