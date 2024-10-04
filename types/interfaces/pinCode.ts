export interface IPINCode {
    id: string;
    pincode: number;
    zoneId: string;
    area: string;
    district: string;
    isActive?: boolean;
    createdAt?: Date | any;
    zone?: {
        id: string;
        zoneName: string;
    };
}

export interface ApiResponse {
    statusCode: number;
    message: string;
    count: number;
}

export type RPINCodelist = Pick<ApiResponse, 'message' | 'statusCode' | 'count'> & {
    data: IPINCode[];
};

export type RGetPINCodeById = Pick<ApiResponse, 'message' | 'statusCode'> & {
    data: IPINCode;
};

export type IAddPINCode = Pick<IPINCode, 'pincode' | 'zoneId' | 'area' | 'district'>;
export type IEditPINCode = Pick<IPINCode, 'id' | 'area' | 'district' | 'pincode' | 'zoneId'>;

export type IEditActiveStatus = Pick<IPINCode, 'id'>;
