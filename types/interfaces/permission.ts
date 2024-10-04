import { ApiResponse } from "./user";

export interface PermissionComponents {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  softDelete: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type IPermission = Pick<PermissionComponents, "name" | "description">;
export type PermissionData = Pick<
  PermissionComponents,
  "id" | "name" | "description" | "createdAt"
>;
export type IUpdatePermission = Pick<
  PermissionComponents,
  "name" | "description" | "id"
>;

export type RPermission = Pick<ApiResponse, "message" | "statusCode"> & {
  data: {
    id: "be6a793d-0264-44b0-a8af-6a7619e0cf03";
  };
};
export type RAllPermission = Pick<ApiResponse, "message" | "statusCode"> & {
  data: PermissionData[];
};
export type RGetPermission = Pick<ApiResponse, "message" | "statusCode"> & {
  data: PermissionData;
};
export type RUpdateResponse = Pick<ApiResponse, "message" | "statusCode"> & {
  data: {
    id: "be6a793d-0264-44b0-a8af-6a7619e0cf03";
    name: "Marketing Role";
  };
};
