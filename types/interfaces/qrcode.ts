export interface IQRCode {
    id: string;
    name: string;
    image: string;
    isActive?: boolean;
    createdAt?: Date | any;
    createdBy?: string;
}

export interface ApiResponse {
    message: string;
    statusCode: number;
    count: number;
}

export type RGetQRCodelist = Pick<ApiResponse, 'message' | 'statusCode' | 'count'> & {
    data: IQRCode[];
};

export type RGetQRCodeById = Pick<ApiResponse, 'message' | 'statusCode'> & {
    data: IQRCode;
};

export type IAddQRCode = Pick<IQRCode, 'name' | 'image'>;
export type IEditQRCode = Pick<IQRCode, 'id' | 'name' | 'image'>;
