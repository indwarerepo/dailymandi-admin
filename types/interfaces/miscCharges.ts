import { NonUndefined } from 'react-hook-form';

export interface IMiscCharges {
    id: string;
    defaultDiscountRate: number;
    specialDiscountRate: number;
    defaultTaxRate: number;
    specialTaxRate: number;
    defaultDeliveryCharge: number;
    specialDeliveryRate: number;
    welcomeWalletAmt: number;
    walletDeductionRateOnOrder: number;
    orderReturnCommRateOA: number;
    orderReturnCommRateNOA: number;
    refByAddCommRate: number;
    displayContent?: string;
    timeFrom?: Date | any;
    timeTo?: Date | any;
    isActive?: boolean;
    softDelete?: boolean;
    createdAt?: Date | any;
    updatedAt?: Date | any;
    createdBy?: string;
    updatedBy?: string;
}

export type RDeliverySlot = {
    id: string;
    displayContent: string;
    timeFrom?: Date | undefined | any;
    timeTo?: Date | undefined | any;
    isActive?: boolean;
    createdAt?: Date | any;
    createdBy?: string;
};

export interface ApiResponse {
    message: string;
    statusCode: number;
    count: number;
}

export type RGetMiscChargeslist = Pick<ApiResponse, 'message' | 'statusCode' | 'count'> & {
    data: IMiscCharges[];
};

export type RGetMiscChargesbyId = Pick<ApiResponse, 'message' | 'statusCode'> & {
    data: IMiscCharges;
};

export type IEditMiscCharges = Pick<
    IMiscCharges,
    | 'id'
    | 'defaultDiscountRate'
    | 'specialDiscountRate'
    | 'defaultTaxRate'
    | 'specialTaxRate'
    | 'defaultDeliveryCharge'
    | 'specialDeliveryRate'
    | 'welcomeWalletAmt'
    | 'walletDeductionRateOnOrder'
    | 'orderReturnCommRateOA'
    | 'orderReturnCommRateNOA'
    | 'refByAddCommRate'
>;

export type RDeliverySlotList = Pick<ApiResponse, 'message' | 'statusCode' | 'count'> & {
    data: RDeliverySlot[];
};

export type RDeliverySlotById = Pick<ApiResponse, 'message' | 'statusCode'> & {
    data: RDeliverySlot;
};

export type IAddDeliverySlot = Pick<RDeliverySlot, 'displayContent' | 'timeFrom' | 'timeTo'>;
export type IEditDeliverySlot = Pick<RDeliverySlot, 'id' | 'displayContent' | 'timeFrom' | 'timeTo'>;
export type IEditActiveStatus = Pick<RDeliverySlot, 'id'>;
