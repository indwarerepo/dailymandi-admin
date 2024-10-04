export interface User {
    id: string;
    email: string;
    name: string;
    username: string;
    password?: string;
    userType?: string;
    phone: string;
    zone?: string;
    address?: string;
    landmark?: string;
    panNo?: string;
    aadhaarNo?: string;
    licenseNo?: string;
    isAdmin?: boolean;
    image?: string | null | undefined;
    language?: LanguageOptions;
    dateFormat?: string;
    gmtOffset?: string;
    isOnline?: boolean;
    ipAddress?: string;
    colors?: string;
    isUseTwoFA?: boolean;
    twoFAOption?: TwoFactorOptions;
    otp?: number;
    otpTimeOut?: Date;
    feignId?: string;
    referrerId?: string;
    isActive?: boolean;
    softDelete?: boolean;
    createdAt?: Date | any;
    updatedAt?: Date | any;
}

export interface ApiResponse {
    statusCode: number;
    message: string;
    count: number;
}
export type TwoFactorOptions = 'ph' | 'em';
export type LanguageOptions = 'en' | 'fr' | '';
export type Login = Pick<User, 'email' | 'password'>;
export type LoginResponse = Pick<ApiResponse, 'statusCode' | 'message'> & {
    otp?: string | null;
    isTwoFAuth?: boolean;
    userType: string;
};

export type AddUser = Pick<User, 'name' | 'userType' | 'email' | 'password'>;
export type RUser = Pick<ApiResponse, 'message' | 'statusCode' | 'count'> & {
    data: User[];
};
