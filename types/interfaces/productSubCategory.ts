export interface ProductSubCategory {
    id: string;
    name: string;
    coverImage: string;
    description: string;
    categoryId: string;
    metaTitle: string;
    metaDescription: string;
    product_category?: {
        id: string;
        name: string;
    };
    isActive?: boolean;
    softDelete?: boolean;
    updatedAt?: Date | any;
    createdAt?: Date | any;
    createdBy?: string;
}

export interface ApiResponse {
    statusCode: number;
    message: string;
    count: number;
}

export type RProductSubCategorylist = Pick<ApiResponse, 'message' | 'statusCode' | 'count'> & {
    data: ProductSubCategory[];
};

export type RGetProductSubCategoryById = Pick<ApiResponse, 'message' | 'statusCode'> & {
    data: ProductSubCategory;
};

export type IAddProductSubCategory = Pick<
    ProductSubCategory,
    'name' | 'coverImage' | 'categoryId' | 'description' | 'metaTitle' | 'metaDescription'
>;

export type IEditProductSubCategory = Pick<
    ProductSubCategory,
    'id' | 'name' | 'coverImage' | 'categoryId' | 'description' | 'metaTitle' | 'metaDescription'
>;

export type IEditActiveStatus = Pick<ProductSubCategory, 'id'>;

export type RProductSubCategoryDD = Pick<ApiResponse, 'statusCode' | 'message'> & {
    data: { id: string; name: string }[];
};
