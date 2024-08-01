import Model from "@/model/Model";
import {PermissionType} from "@/types/__form/profile.type";

class Permission extends Model {
    permission_id: string;

    constructor(permissionData: PermissionType) {
        super();
        this.permission_id = permissionData.permission_id;
    }

    static toPermissions(permissions: PermissionType[]): Permission[] {
        return permissions.map(permission => new Permission(permission));
    }
}

export default Permission;
