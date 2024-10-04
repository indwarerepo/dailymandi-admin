export interface ICoupon {
    id: string;
    name: string;
    couponCode: string;
    policy: string;
    description: string;
    minOrderAmount: number;
    offerPercentage: number;
    couponValidity: number;
    useLimit: number;
    startDate?: Date | any;
    expiredDate?: Date | any;
    createdAt?: Date | any;
    createdBy?: string;
    updatedAt?: Date | any;
    updatedBy?: string;
    isActive?: boolean;
    softDelete?: boolean;
}

export interface ApiResponse {
    message: string;
    statusCode: number;
    count: number;
}

export type RGetCouponlist = Pick<ApiResponse, 'message' | 'statusCode' | 'count'> & {
    data: ICoupon[];
};

export type RGetCouponById = Pick<ApiResponse, 'message' | 'statusCode'> & {
    data: ICoupon;
};

export type IAddCoupon = Pick<
    ICoupon,
    | 'name'
    | 'couponCode'
    | 'description'
    | 'minOrderAmount'
    | 'offerPercentage'
    | 'policy'
    | 'useLimit'
    | 'startDate'
    | 'expiredDate'
    | 'couponValidity'
>;

export type IEditCoupon = Pick<
    ICoupon,
    | 'id'
    | 'name'
    | 'couponCode'
    | 'description'
    | 'minOrderAmount'
    | 'offerPercentage'
    | 'policy'
    | 'useLimit'
    | 'startDate'
    | 'expiredDate'
    | 'couponValidity'
>;

export type IEditActiveStatus = Pick<ICoupon, 'id'>;
