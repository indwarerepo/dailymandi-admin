import { createApi } from '@reduxjs/toolkit/query/react';
import { createSlice } from '@reduxjs/toolkit';
import { baseQueryWithAuthGuard } from '../utility';
import {
    ICoupon,
    RGetCouponlist,
    RGetCouponById,
    IAddCoupon,
    IEditCoupon,
    IEditActiveStatus,
    ApiResponse,
} from '@/types/interfaces/coupon';
import { IPaginator } from '@/types/types';

export const couponApi = createApi({
    reducerPath: 'couponApi',
    baseQuery: baseQueryWithAuthGuard,
    tagTypes: ['Coupon'],
    endpoints: (builder) => ({
        // Queries
        getAllCouponlist: builder.query<RGetCouponlist, IPaginator>({
            query: (params) => {
                const { pageIndex, pageSize, sortBy, sortOrder, filters } = params;
                const replacer = (_key: any, value: any) => {
                    if (value === null) return '';
                    return value;
                };
                const serializedFilters = JSON.stringify(filters, replacer, 2);
                return {
                    url: `/coupon-master`,
                    method: 'GET',
                    params: {
                        pageNo: pageIndex,
                        pageLimit: pageSize,
                        sortBy,
                        sortOrder,
                        filters: serializedFilters,
                    },
                };
            },
            providesTags: ['Coupon'],
        }),
        getCouponById: builder.query<RGetCouponById, string>({
            query: (id) => ({
                url: `/coupon-master/${id}`,
                method: 'GET',
            }),
            providesTags: ['Coupon'],
        }),

        // Mutation
        addCoupon: builder.mutation<ApiResponse, IAddCoupon>({
            query: (body) => ({
                url: `/coupon-master`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Coupon'],
        }),
        editCoupon: builder.mutation<ApiResponse, IEditCoupon>({
            query: ({ id, ...rest }) => ({
                url: `/coupon-master/${id}`,
                method: 'PUT',
                body: rest,
            }),
            invalidatesTags: ['Coupon'],
        }),

        editActiveStatus: builder.mutation<ApiResponse, string>({
            query: (id) => ({
                url: `/coupon-master/status/${id}`,
                method: `PUT`,
            }),
            invalidatesTags: ['Coupon'],
        }),

        deleteCoupon: builder.mutation<RGetCouponlist, string>({
            query: (id) => ({
                url: `/coupon-master/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Coupon'],
        }),
    }),
});

interface InitialState {
    status?: String | null;
    loading?: Boolean;
    error?: Boolean;
    couponList?: ICoupon[];
}
const initialState: InitialState = {
    status: null,
    loading: false,
    error: false,
    couponList: [],
};

export const couponSlice = createSlice({
    name: 'couponSlice',
    initialState,
    reducers: {
        setData: (state, action) => {
            state.couponList = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(couponApi.endpoints.getAllCouponlist.matchFulfilled, (state, action) => {
                state.status = 'Fullfilled';
                state.loading = false;
                state.error = false;
                state.couponList = action.payload.data;
            })
            .addMatcher(couponApi.endpoints.getAllCouponlist.matchRejected, (state) => {
                state.status = 'Rejected';
                state.loading = false;
                state.error = true;
            })
            .addMatcher(couponApi.endpoints.getAllCouponlist.matchPending, (state) => {
                state.status = 'Pending';
                state.loading = true;
                state.error = false;
            });
    },
});

export default couponSlice.reducer;
export const {
    useGetAllCouponlistQuery,
    useGetCouponByIdQuery,
    useAddCouponMutation,
    useEditCouponMutation,
    useEditActiveStatusMutation,
    useDeleteCouponMutation,
} = couponApi;
