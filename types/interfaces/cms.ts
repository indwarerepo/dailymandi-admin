export interface ICMS {
    id: string;
    name: string;
    cmsKey: string;
    description: string;
    url: string;
    icon: string;
    metaTitle: string;
    metaDescription: string;
    isActive?: boolean;
    createdAt?: Date | any;
}

export interface ApiResponse {
    message: string;
    statusCode: number;
    count: number;
}

export type RCMSlist = Pick<ApiResponse, 'message' | 'statusCode' | 'count'> & {
    data: ICMS[];
};

export type RGetCMSById = Pick<ApiResponse, 'message' | 'statusCode'> & {
    data: ICMS;
};

export type IAddCMS = Pick<ICMS, 'name' | 'cmsKey' | 'icon' | 'description' | 'metaDescription' | 'metaTitle' | 'url'>;
export type IEditCMS = Pick<
    ICMS,
    'id' | 'name' | 'cmsKey' | 'description' | 'icon' | 'metaDescription' | 'metaTitle' | 'url'
>;

export type IEditActiveStatus = Pick<ICMS, 'id'>;
