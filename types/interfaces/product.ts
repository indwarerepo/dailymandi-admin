export interface Product {
    id: string;
    categoryId?: string;
    subCategoryId?: string;
    brandId?: string;
    name: string;
    description: string;
    specification: string;
    qrCode: string;
    manufacturer: string;
    productAttributes: string;
    variantCount?: number;
    paymentTerm?: string;
    warrantyPolicy?: string;
    createdBy?: string;
    isActive?: boolean;
    createdAt?: Date | any;
    softDelete?: boolean;
    productCategory?: {
        id: string;
        name: string;
    };
    product_subcategory?: {
        id: string;
        name: string;
    };
    brand?: {
        id?: string;
        name?: string;
    };
    productImage?: string;
    productVariant?: ProductVariant;
    isFeatured?: boolean;
    isNewProduct?: boolean;
    isBestSeller?: boolean;
    metaTitle?: string;
    metaDescription?: string;
}

export interface ProductVariant {
    variantId: string;
    skuNo: string;
    qrCode?: string;
    purchaseCost: number;
    mrp: number;
    sellingPrice: number;
    offerPrice: number;
    taxId: string;
    stock: number;
    isReturnable: boolean;
    returnDaysLimit: number;
    productImage?: string;
    batchNo: string;
    // remarks: string;
    manufacturingDate?: Date | any;
    expiryDate?: Date | any;
    productVariantImage?: string[];
}

export interface ApiResponse {
    message: string;
    statusCode: number;
    count: number;
}

export type RGetProductList = Pick<ApiResponse, 'message' | 'statusCode' | 'count'> & {
    data: Product[];
};
export type RGetProductById = Pick<ApiResponse, 'message' | 'statusCode'> & {
    data: Product;
};

export type IAddProduct = Pick<
    Product,
    | 'name'
    | 'categoryId'
    | 'subCategoryId'
    | 'brandId'
    | 'manufacturer'
    | 'specification'
    | 'description'
    | 'productImage'
    | 'isFeatured'
    | 'isNewProduct'
    | 'isBestSeller'
    | 'paymentTerm'
    | 'warrantyPolicy'
    | 'metaTitle'
    | 'metaDescription'
> & { productVariant: ProductVariant[] };

// export type IAddProductVariant = Pick<ProductVariant, 'id'>
// Pick<
//     ProductVariant,
//     | 'variantId'
//     | 'skuNo'
//     | 'qrCode'
//     | 'purchaseCost'
//     | 'mrp'
//     | 'sellingPrice'
//     | 'offerPrice'
//     | 'taxId'
//     | 'stock'
//     | 'isReturnable'
//     | 'returnDaysLimit'
//     | 'batchNo'
//     | 'manufacturingDate'
//     | 'expiryDate'
//     | 'remarks'
//     | 'productVariantImage'
// >;

export type IAddProductVariant = Pick<
    ProductVariant,
    | 'variantId'
    | 'skuNo'
    | 'qrCode'
    | 'purchaseCost'
    | 'mrp'
    | 'sellingPrice'
    | 'offerPrice'
    | 'taxId'
    | 'stock'
    | 'isReturnable'
    | 'returnDaysLimit'
    | 'batchNo'
    | 'manufacturingDate'
    | 'expiryDate'
    // | 'remarks'
    | 'productVariantImage'
>;
export type IEditProduct = Pick<
    Product,
    | 'id'
    | 'name'
    | 'categoryId'
    | 'subCategoryId'
    | 'brandId'
    | 'manufacturer'
    | 'specification'
    | 'description'
    | 'productImage'
    | 'isFeatured'
    | 'isNewProduct'
    | 'isBestSeller'
    | 'paymentTerm'
    | 'warrantyPolicy'
    | 'metaTitle'
    | 'metaDescription'
>;
export type IEditActiveStatus = Pick<Product, 'id' | 'isActive'>;

export type RProductDD = Pick<ApiResponse, 'message' | 'statusCode'> & {
    data: { id: string; name: string }[];
};

export type EditNewProductStatus = Pick<Product, 'id'>;
export type EditFeaturedStatus = Pick<Product, 'id'>;
export type EditBestsellerStatus = Pick<Product, 'id'>;
