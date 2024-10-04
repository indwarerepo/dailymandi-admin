export interface ICustomer {
    id: string;
    name: string;
    email: string;
    phone: string;
    image: string;
    userType: string;
    referredBy: string;
    referralCode: string;
    company: string;
    firstName: string;
    lastName: string;
    addressOne: string;
    addressTwo: string;
    city: string;
    state: string;
    addressTitle: string;
    country: string;
    pincode?: {
        id: string;
        pincode: number;
    };
    upiId: string;
    walletAmount: number;
    accountNumber: string;
    ifscCode: string;
    panNumber: string;
    bankName: string;
    bankBranch: string;
    transactionType: boolean;
    amount: number;
    remarks: string;
    orderId: string;
    orders?: {
        id: string;
        orderNumber: boolean;
    };
    isActive?: boolean;
    isAdmin?: boolean;
    twoFAOption?: string;
    createdAt?: Date | any;
}

export type RCustomerAddressDetails = {
    id: string;
    phone: string;
    company: string;
    firstName: string;
    lastName: string;
    addressOne: string;
    addressTwo: string;
    city: string;
    state: string;
    addressTitle: string;
    country: string;
    pincode?: {
        id: string;
        pincode: number;
    };
};

export type RKYCDetails = {
    id: string;
    name: string;
    email: string;
    upiId: string;
    walletAmount: number;
    accountNumber: string;
    ifscCode: string;
    panNumber: string;
    bankName: string;
    bankBranch: string;
};

export type RTransactionDetails = {
    id: string;
    transactionType: boolean;
    amount: number;
    remarks: string;
    orderId: string;
    orders?: {
        id: string;
        orderNumber: boolean;
    };
    createdAt?: Date | any;
};

export interface ApiResponse {
    statusCode: number;
    message: string;
    count: number;
}

export type RGetCustomerlist = Pick<ApiResponse, 'message' | 'statusCode' | 'count'> & {
    data: ICustomer[];
};

export type RGetAddressByCustomerId = Pick<ApiResponse, 'message' | 'statusCode'> & {
    data: RCustomerAddressDetails[];
};

export type RGetKYCDetailsById = Pick<ApiResponse, 'message' | 'statusCode'> & {
    data: RKYCDetails;
};

export type RTransactionDetailsById = Pick<ApiResponse, 'message' | 'statusCode' | 'count'> & {
    data: RTransactionDetails[];
};
