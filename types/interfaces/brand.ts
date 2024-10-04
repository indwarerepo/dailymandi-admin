export interface IBrand {
    id: string;
    name: string;
    description: string;
    metaTitle: string;
    metaDescription: string;
    isActive?: boolean;
    createdAt?: Date | any;
    createdBy?: Date | any;
}

export interface ApiResponse {
    message: string;
    statusCode: number;
    count: number;
}

export type RGetBrandlist = Pick<ApiResponse, 'message' | 'statusCode' | 'count'> & {
    data: IBrand[];
};

export type RGetBrandById = Pick<ApiResponse, 'message' | 'statusCode'> & {
    data: IBrand;
};

export type IAddBrand = Pick<IBrand, 'name' | 'description' | 'metaTitle' | 'metaDescription'>;
export type IEditBrand = Pick<IBrand, 'id' | 'name' | 'description' | 'metaTitle' | 'metaDescription'>;
export type IEditActiveStatus = Pick<IBrand, 'id'>;
