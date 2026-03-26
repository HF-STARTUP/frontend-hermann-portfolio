export type RootAccessType =
  | "read"
  | "write"
  | "READ"
  | "WRITE"
  | "SENSITIVE"
  | "CRITICAL";

export interface RootAccess {
  access_id: number;
  type: RootAccessType;
  name?: string;
}

export interface RootRoleAccess {
  root_role_id: number;
  root_access_id: number;
  access_type: RootAccessType;
  created_at: string;
  root_access: RootAccess;
}

export interface RootRoleData {
  id: number;
  name: string;
  description: string;
  active: boolean;
  is_modifiable: boolean;
  created_at: string;
  updated_at: string;
  rootRoleAccesses: RootRoleAccess[];
  users_count: number
}

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export interface MappedAccess {
  access_id: number;
  type: RootAccessType;
}

export interface Permission {
  key: string;
  label: string;
  module: string;
  type: RootAccessType;
  mapped_accesses: MappedAccess[];
  supported_now: boolean;
}

export interface ModulePermissionGroup {
  module: string;
  permissions: Permission[];
}

// /////////////////////////////////////////////////////////////////////////////////////////////////////////

export interface CreateRolePayload {
  name: string;
  description: string;
  permission_keys: string[];
  access?: RootAccess[];
}
