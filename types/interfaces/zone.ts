export interface IZone {
    id: string;
    zoneName: string;
    area: string;
    district: string;
    deliveryCharge: number;
    isActive?: boolean;
    createdAt?: Date | any;
    softDelete?: boolean;
}

export interface ApiResponse {
    statusCode: number;
    message: string;
    count: number;
}

export type RZonelist = Pick<ApiResponse, 'message' | 'statusCode' | 'count'> & {
    data: IZone[];
};

export type RGetZoneById = Pick<ApiResponse, 'message' | 'statusCode'> & {
    data: IZone;
};

export type IAddZone = Pick<IZone, 'zoneName' | 'area' | 'district' | 'deliveryCharge'>;

export type IEditZone = Pick<IZone, 'id' | 'zoneName' | 'area' | 'district' | 'deliveryCharge'>;

export type IEditActiveStatus = Pick<IZone, 'id'>;

export type RZoneDD = Pick<ApiResponse, 'statusCode' | 'message'> & {
    data: { id: string; zoneName: string }[];
};
