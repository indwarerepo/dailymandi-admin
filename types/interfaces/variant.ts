export interface IVariant {
    id: string;
    variantName: string;
    description: string;
    isActive?: boolean;
    createdAt?: Date | any;
}

export interface ApiResponse {
    message: string;
    statusCode: number;
    count: number;
}

export type RGetVariantlist = Pick<ApiResponse, 'message' | 'statusCode' | 'count'> & {
    data: IVariant[];
};

export type RGetVariantById = Pick<ApiResponse, 'message' | 'statusCode'> & {
    data: IVariant;
};

export type RGetVariantDD = Pick<ApiResponse, 'message' | 'statusCode'> & {
    data: { id: string; variantName: string }[];
};

export type IAddVariant = Pick<IVariant, 'variantName' | 'description'>;
export type IEditVariant = Pick<IVariant, 'id' | 'variantName' | 'description'>;
export type IEditActiveStatus = Pick<IVariant, 'id'>;
