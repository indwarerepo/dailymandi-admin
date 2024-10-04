export interface ProductCategory {
    id: string;
    name: string;
    coverImage: string;
    coverVideo: string;
    description: string;
    displayOrder: number;
    isTopMenu?: boolean;
    isFeatured?: boolean;
    isActive?: boolean;
    softDelete?: boolean;
    updatedAt?: Date | any;
    createdAt?: Date | any;
}

export interface ApiResponse {
    statusCode: number;
    message: string;
    count: number;
}

export type RProductCategorylist = Pick<ApiResponse, 'message' | 'statusCode' | 'count'> & {
    data: ProductCategory[];
};

export type RGetProductCategoryById = Pick<ApiResponse, 'message' | 'statusCode'> & {
    data: ProductCategory;
};

export type IAddProductCategory = Pick<ProductCategory, 'name' | 'coverImage' | 'coverVideo' | 'description'>;

export type IEditProductCategory = Pick<ProductCategory, 'id' | 'name' | 'coverImage' | 'coverVideo' | 'description'>;
export type IEditActiveStatus = Pick<ProductCategory, 'id'>;

export type RProductCategoryDD = Pick<ApiResponse, 'statusCode' | 'message'> & {
    data: { id: string; name: string }[];
};
