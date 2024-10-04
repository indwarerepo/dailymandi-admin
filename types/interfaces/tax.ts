export interface ITax {
    id: string;
    taxHead: string;
    slab: string;
    percentage: number;
    isActive?: boolean;
    createdAt?: Date | any;
}

export interface ApiResponse {
    message: string;
    statusCode: number;
    count: number;
}

export type RGetTaxlist = Pick<ApiResponse, 'message' | 'statusCode' | 'count'> & {
    data: ITax[];
};

export type RGetTaxById = Pick<ApiResponse, 'message' | 'statusCode'> & {
    data: ITax;
};

export type RGetTaxDD = Pick<ApiResponse, 'message' | 'statusCode'> & {
    data: { id: string; taxHead: string; slab: string; percentage: number }[];
};

export type IAddTax = Pick<ITax, 'slab' | 'percentage' | 'taxHead'>;
export type IEditTax = Pick<ITax, 'id' | 'taxHead' | 'slab' | 'percentage'>;
export type IEditActiveStatus = Pick<ITax, 'id'>;
