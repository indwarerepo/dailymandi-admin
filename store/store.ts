import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import { persistReducer } from 'redux-persist';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

import { authApi, authSlice } from '@/features/auth/authApi';
import { driverApi, driverSlice } from '@/features/driver/driverAPI';
import { adminApi, adminSlice } from '@/features/admin/adminAPI';
import { customerApi, customerSlice } from '@/features/customer/customerAPI';
import { productCategoryApi, productCategorySlice } from '@/features/productCategory/productCategoryAPI';
import { bannerApi, bannerSlice } from '@/features/banner/bannerAPI';
import { zoneApi, zoneSlice } from '@/features/zone/zoneAPI';
import { pinCodeApi, pinCodeSlice } from '@/features/pinCode/pinCodeAPI';
import { cmsSlice, cmsApi } from '@/features/cms/cmsAPI';
import { taxSlice, taxApi } from '@/features/tax/taxAPI';
import { variantSlice, variantApi } from '@/features/variant/variantAPI';
import { productApi, productSlice } from '@/features/product/productAPI';
import { couponSlice, couponApi } from '@/features/coupon/couponAPI';
import { qrcodeSlice, qrcodeApi } from '@/features/qrcode/qrcodeAPI';
import { orderStatusSlice, orderStatusApi } from '@/features/orderStatus/orderStatusAPI';
import { orderApi } from '@/features/order/orderApi';
import { miscChargesApi } from '@/features/miscCharges/miscChargesAPI';
import { orderDeliveryApi, orderDeliverySlice } from '@/features/order-delivery/order-delivery-api';
import { brandApi, brandSlice } from '@/features/brand/brandAPI';
import { productSubCategoryApi, productSubCategorySlice } from '@/features/productSubcategory/productSubcategoryAPI';

// settings for persistence of storage & selected reducers
const createNoopStorage = () => {
    return {
        getItem(_key: any) {
            return Promise.resolve(null);
        },
        setItem(_key: any, value: any) {
            return Promise.resolve(value);
        },
        removeItem(_key: any) {
            return Promise.resolve();
        },
    };
};
const persistStorage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();
const persistConfig = {
    key: 'root',
    version: 1,
    storage: persistStorage,
};
const authReducer = combineReducers({
    authSlice: authSlice.reducer,
});
const persistedReducers = persistReducer(persistConfig, authReducer);

export const store = () =>
    configureStore({
        reducer: {
            persistedReducers,
            driverSlice: driverSlice.reducer,
            adminSlice: adminSlice.reducer,
            customerSlice: customerSlice.reducer,
            productCategorySlice: productCategorySlice.reducer,
            productSubCategorySlice: productSubCategorySlice.reducer,
            bannerSlice: bannerSlice.reducer,
            zoneSlice: zoneSlice.reducer,
            pinCodeSlice: pinCodeSlice.reducer,
            cmsSlice: cmsSlice.reducer,
            taxSlice: taxSlice.reducer,
            variantSlice: variantSlice.reducer,
            productSlice: productSlice.reducer,
            couponSlice: couponSlice.reducer,
            qrcodeSlice: qrcodeSlice.reducer,
            orderStatusSlice: orderStatusSlice.reducer,
            orderDeliverySlice: orderDeliverySlice.reducer,
            brandSlice: brandSlice.reducer,

            [authApi.reducerPath]: authApi.reducer,
            [driverApi.reducerPath]: driverApi.reducer,
            [adminApi.reducerPath]: adminApi.reducer,
            [customerApi.reducerPath]: customerApi.reducer,
            [productCategoryApi.reducerPath]: productCategoryApi.reducer,
            [productSubCategoryApi.reducerPath]: productSubCategoryApi.reducer,
            [bannerApi.reducerPath]: bannerApi.reducer,
            [zoneApi.reducerPath]: zoneApi.reducer,
            [pinCodeApi.reducerPath]: pinCodeApi.reducer,
            [cmsApi.reducerPath]: cmsApi.reducer,
            [taxApi.reducerPath]: taxApi.reducer,
            [variantApi.reducerPath]: variantApi.reducer,
            [productApi.reducerPath]: productApi.reducer,
            [couponApi.reducerPath]: couponApi.reducer,
            [qrcodeApi.reducerPath]: qrcodeApi.reducer,
            [orderStatusApi.reducerPath]: orderStatusApi.reducer,
            [orderApi.reducerPath]: orderApi.reducer,
            [miscChargesApi.reducerPath]: miscChargesApi.reducer,
            [orderDeliveryApi.reducerPath]: orderDeliveryApi.reducer,
            [brandApi.reducerPath]: brandApi.reducer,
        },
        middleware: (getDefaultMiddleware) => {
            return getDefaultMiddleware({ serializableCheck: false }).concat([
                authApi.middleware,
                driverApi.middleware,
                adminApi.middleware,
                customerApi.middleware,
                productCategoryApi.middleware,
                productSubCategoryApi.middleware,
                bannerApi.middleware,
                zoneApi.middleware,
                pinCodeApi.middleware,
                cmsApi.middleware,
                taxApi.middleware,
                variantApi.middleware,
                productApi.middleware,
                couponApi.middleware,
                orderStatusApi.middleware,
                qrcodeApi.middleware,
                orderApi.middleware,
                miscChargesApi.middleware,
                orderDeliveryApi.middleware,
                brandApi.middleware,
            ]);
        },
    });

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(store, { debug: false });
