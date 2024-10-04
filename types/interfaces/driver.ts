export interface IDriver {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    landmark: string;
    panNo: string;
    aadharNo: string;
    licenseNo: string;
    password: string;
    zoneId: string[];
    driverStatus?: boolean;
    isActive?: boolean;
    createdAt?: Date | any;
    zones?: any;
}

export interface ApiResponse {
    message: string;
    statusCode: number;
    count: number;
}

export type RGetDriverlist = Pick<ApiResponse, 'message' | 'statusCode' | 'count'> & {
    data: IDriver[];
};

export type RGetDriverById = Pick<ApiResponse, 'message' | 'statusCode'> & {
    data: IDriver;
};

export type IAddDriver = Pick<
    IDriver,
    'name' | 'aadharNo' | 'address' | 'email' | 'password' | 'landmark' | 'licenseNo' | 'panNo' | 'phone' | 'zoneId'
>;

export type IEditDriver = Pick<
    IDriver,
    'id' | 'name' | 'aadharNo' | 'address' | 'email' | 'landmark' | 'licenseNo' | 'panNo' | 'phone' | 'zoneId'
>;

export type IEditActiveStatus = Pick<IDriver, 'id'>;
