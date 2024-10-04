export interface IOrderStatus {
    id: string;
    statusTitle: string;
    remarks: string;
    createdBy?: string;
    updatedBy?: string;
    createdAt?: Date | any;
    updatedAt?: Date | any;
    isActive?: boolean;
    softDelete?: boolean;
}

export interface ApiResponse {
    message: string;
    statusCode: number;
    count: number;
}

export type RGetOrderStatuslist = Pick<ApiResponse, 'message' | 'statusCode' | 'count'> & {
    data: IOrderStatus[];
};

export type RGetOrderStatusById = Pick<ApiResponse, 'message' | 'statusCode'> & {
    data: IOrderStatus;
};

export type ROrderStatusDD = Pick<ApiResponse, 'message' | 'statusCode'> & {
    data: { id: string; statusTitle: string; remarks: string }[];
};

export type IAddOrderStatus = Pick<IOrderStatus, 'statusTitle' | 'remarks'>;
export type IEditOrderStatus = Pick<IOrderStatus, 'id' | 'remarks' | 'statusTitle'>;
export type IEditActiveStatus = Pick<IOrderStatus, 'id'>;
