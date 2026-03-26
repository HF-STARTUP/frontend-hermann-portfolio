import Model from "@/model/Model";
import { Permission, ModulePermissionGroup, MappedAccess, RootAccessType } from "@/types/admin/role-access.type";

/**
 * Modèle pour une permission individuelle
 */
class PermissionModel extends Model {
    private _instance: Permission;

    constructor(data: Permission) {
        super();
        this._instance = data;
    }

    static toArrays(datas: Permission[] | undefined): PermissionModel[] {
        if (!datas) return [];
        return datas.map((data) => new PermissionModel(data));
    }

    get key(): string {
        return this._instance.key;
    }

    get label(): string {
        return this._instance.label;
    }

    get moduleName(): string {
        return this._instance.module;
    }

    get type(): RootAccessType {
        return this._instance.type;
    }

    get isSupported(): boolean {
        return this._instance.supported_now;
    }

    get mappedAccesses(): MappedAccess[] {
        return this._instance.mapped_accesses;
    }
}

/**
 * Modèle pour le groupe de permissions par module
 */
class ModulePermissionGroupModel extends Model {
    private _instance: ModulePermissionGroup;

    constructor(data: ModulePermissionGroup) {
        super();
        this._instance = data;
    }

    static toArrays(datas: ModulePermissionGroup[] | undefined): ModulePermissionGroupModel[] {
        if (!datas) return [];
        return datas.map((data) => new ModulePermissionGroupModel(data));
    }

    get moduleName(): string {
        return this._instance.module;
    }

    get permissions(): PermissionModel[] {
        return PermissionModel.toArrays(this._instance.permissions);
    }

    get displayModuleName(): string {
        return this.moduleName
            .replace(/_/g, ' ')
            .replace(/\b\w/g, (l) => l.toUpperCase());
    }
}

export { PermissionModel, ModulePermissionGroupModel };
export default ModulePermissionGroupModel;