export interface IBanner {
    id?: string;
    categoryId: string;
    name: string;
    remarks: string;
    bannerDisplay: string;
    bannerType: string | number;
    image: string;
    isActive?: true;
    createdAt?: Date | any;
    productCategory?: {
        id: string;
        name: string;
    };
}

export interface ApiResponse {
    statusCode: number;
    message: string;
    count: number;
}

export type IAddBanner = Pick<IBanner, 'name' | 'bannerType' | 'image' | 'remarks' | 'categoryId' | 'bannerDisplay'>;

export type RBannerlist = Pick<ApiResponse, 'message' | 'statusCode' | 'count'> & {
    data: IBanner[];
};

export type RGetBannerById = Pick<ApiResponse, 'message' | 'statusCode'> & {
    data: IBanner;
};

export type IEditBanner = Pick<
    IBanner,
    'id' | 'name' | 'bannerType' | 'bannerDisplay' | 'categoryId' | 'image' | 'remarks'
>;
