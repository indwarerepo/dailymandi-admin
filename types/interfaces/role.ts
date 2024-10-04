import { ApiResponse } from "./user";

export type PermissionType = {
  componentId: string;
  componentName: string;
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
  upload: boolean;
  description?: string;
};
export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: PermissionType[];
  isActive: boolean;
  softDelete: boolean;
  createdAt: Date;
  updatedAt: Date;
  workspaceId: string | null;
}

export type IRole = Pick<Role, "name" | "description"> & {
  permissions: PermissionType[];
  workspaceId?: string | null;
};
export type IUpdateRole = Pick<Role, "name" | "description"> & {
  id: string;
  permissions: PermissionType[];
};

export type RRole = Pick<ApiResponse, "message" | "statusCode"> & {
  id: string;
};
export type RAllRole = Pick<ApiResponse, "message" | "statusCode"> & {
  data: Pick<Role, "id" | "name" | "description" | "workspaceId">[];
};
export type GetRoleData = {
  role: Pick<Role, "id" | "name" | "description"> & {
    workspaceId: string | null;
    permissions: PermissionType[];
  };
};
export type RGetRole = Pick<ApiResponse, "message" | "statusCode"> & {
  data: GetRoleData;
};
