export interface IOrder {
    id: string;
    orderNumber: string;
    discountedPrice: number;
    subtotalPrice: number;
    taxAmt: number;
    deliveryAmt: number;
    orderTotal: number;
    orderTotalInWord: string;
    amountDeductionFromWallet: number;
    payableAmount: number;
    paidAmount: number;
    dueAmount: number;
    paymentStatus: false;
    paymentMethod: string;
    deliveryAddress: string;
    deliveryPincode: string;
    deliveryState: string;
    deliveryCity: string;
    driverAccepted?: boolean;
    createdAt?: Date | any;
    order_status?: {
        id: string;
        statusTitle: string;
    };
    driver?: {
        id: string;
        name: string;
    };
    users?: {
        id: string;
        name: string;
        email: string;
        phone: string;
        image: string;
    };
    orderDetails?: OrderDetails[];
    driverStatus?: string;
    pinCodeDetails?: {
        id: string;
        zoneId: string;
        zone?: {
            id: string;
            zoneName: string;
        };
    };
}

export type OrderDetails = {
    id: string;
    quantity: string;
    orderPrice: number;
    originalPrice: number;
    taxAmt: number;
    varient_name: string;
    product?: {
        id: string;
        name: string;
        productImage: string;
    };
    product_variant?: {
        id: string;
        productVariantImage: [];
    };
    tax_master?: {
        id: string;
        slab: string;
        percentage: number;
    };
};

export interface ApiResponse {
    message: string;
    statusCode: number;
    count: number;
}

export type RGetOrderlist = Pick<ApiResponse, 'message' | 'statusCode' | 'count'> & {
    data: IOrder[];
};

export type RGetOrderDetailsById = Pick<ApiResponse, 'message' | 'statusCode'> & {
    data: IOrder;
};
