import Model from "@/model/Model";
import { RootRoleData, RootRoleAccess } from "@/types/admin/role-access.type";

class RootRoleAccessModel extends Model {
    private _instance: RootRoleAccess;

    constructor(data: RootRoleAccess) {
        super();
        this._instance = data;
    }

    static toArrays(datas: RootRoleAccess[] | undefined): RootRoleAccessModel[] {
        if (!datas) return [];
        return datas.map((data) => new RootRoleAccessModel(data));
    }

    get roleId(): number {
        return this._instance.root_role_id;
    }

    get accessId(): number {
        return this._instance.root_access_id;
    }

    get type() {
        return this._instance.access_type;
    }

    get moduleName(): string {
        return this._instance.root_access.name??"";
    }


    get createdAt(): string {
        return this.formatDateTime(this._instance.created_at);
    }
}

class RootRoleModel extends Model {
    private _instance: RootRoleData;

    constructor(data: RootRoleData) {
        super();
        this._instance = data;
    }

    static toArrays(datas: RootRoleData[] | undefined): RootRoleModel[] {
        if (!datas) return [];
        return datas.map((data) => new RootRoleModel(data));
    }
    

    get id(): number {
        return this._instance.id;
    }

    get permissionsList(){
        return this._instance.permission_keys
    }

    get userCount(){
        return this._instance.users_count??0
    }

    get displayName(): string {
        return this._instance.name
            .replace(/_/g, ' ')
            .replace(/\b\w/g, (l) => l.toUpperCase());
    }

    get description(): string {
        return this._instance.description;
    }

    get isActive(): boolean {
        return this._instance.active;
    }

    get isModifiable(): boolean {
        return this._instance.is_modifiable;
    }

    get accesses(): RootRoleAccessModel[] {
        return RootRoleAccessModel.toArrays(this._instance.rootRoleAccesses)
    }

    get groupedAccesses(): Record<string, string[]> {
        const groups: Record<string, string[]> = {};
        this.accesses.forEach((access) => {
            const moduleName = access.moduleName;
            if (!groups[moduleName]) {
                groups[moduleName] = [];
            }
            groups[moduleName].push(access.type);
        });
        return groups;
    }

  

    get permissionsSummary(): string {
        const modules = Object.keys(this.groupedAccesses);
        if (modules.length === 0) return "Aucun accès";
        if (modules.length > 3) return `${modules.slice(0, 3).join(", ")} + ${modules.length - 3} autres`;
        return modules.join(", ");
    }

    get createdAt(): string {
        return this.formatDateTime(this._instance.created_at);
    }

    get updatedAt(): string {
        return this.formatDateTime(this._instance.updated_at);
    }
}

export default RootRoleModel;