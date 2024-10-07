import { createApi } from '@reduxjs/toolkit/query/react';
import { createSlice } from '@reduxjs/toolkit';
import { baseQueryWithAuthGuard } from '../utility';
import { IPaginator } from '@/types/types';
import {
    ApiResponse,
    IEditAcceptOrderStatus,
    IOrderDelivery,
    RGetOrderDeliveryDetailsById,
    RGetOrderDeliverylist,
} from '@/types/interfaces/delivery-order';

export const orderDeliveryApi = createApi({
    reducerPath: 'orderDeliveryApi',
    baseQuery: baseQueryWithAuthGuard,
    tagTypes: ['OrderDelivery'],
    endpoints: (builder) => ({
        // Queries
        getAllOrderDeliverylist: builder.query<RGetOrderDeliverylist, IPaginator>({
            query: (params) => {
                const { pageIndex, pageSize, sortBy, sortOrder, filters } = params;
                const replacer = (_key: any, value: any) => {
                    if (value === null) return '';
                    return value;
                };
                const serializedFilters = JSON.stringify(filters, replacer, 2);
                return {
                    url: `/driver/order-list`,
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
            providesTags: ['OrderDelivery'],
        }),

        getOrderDeliveryDetailsById: builder.query<RGetOrderDeliveryDetailsById, string>({
            query: (id) => ({
                url: `/driver/order-details/${id}`,
                method: 'GET',
            }),
            providesTags: ['OrderDelivery'],
        }),

        updateOrderDeliveryStatus: builder.mutation<ApiResponse, IEditAcceptOrderStatus>({
            query: ({ id, ...rest }) => ({
                url: `/driver/accept-order/${id}`,
                method: 'PUT',
                body: rest,
            }),
            invalidatesTags: ['OrderDelivery'],
        }),
        updateOrderDeliveryReturn: builder.mutation<any, any>({
            query: ({ id, ...rest }) => ({
                url: `/driver/return-order/${id}`,
                method: 'PUT',
                body: rest,
            }),
            invalidatesTags: ['OrderDelivery'],
        }),
        deliveryOTPVerification: builder.mutation<ApiResponse, any>({
            query: ({ id, ...rest }) => ({
                url: `/driver/delivery/${id}`,
                method: 'PUT',
                body: rest,
            }),
        }),
    }),
});

interface InitialState {
    status?: String | null;
    loading?: Boolean;
    error?: Boolean;
    orderDeliveryList?: IOrderDelivery[];
}
const initialState: InitialState = {
    status: null,
    loading: false,
    error: false,
    orderDeliveryList: [],
};

export const orderDeliverySlice = createSlice({
    name: 'orderDeliverySlice',
    initialState,
    reducers: {
        setData: (state, action) => {
            state.orderDeliveryList = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(orderDeliveryApi.endpoints.getAllOrderDeliverylist.matchFulfilled, (state, action) => {
                state.status = 'Fullfilled';
                state.loading = false;
                state.error = false;
                state.orderDeliveryList = action.payload.data;
            })
            .addMatcher(orderDeliveryApi.endpoints.getAllOrderDeliverylist.matchRejected, (state) => {
                state.status = 'Rejected';
                state.loading = false;
                state.error = true;
            })
            .addMatcher(orderDeliveryApi.endpoints.getAllOrderDeliverylist.matchPending, (state) => {
                state.status = 'Pending';
                state.loading = true;
                state.error = false;
            });
    },
});

export default orderDeliverySlice.reducer;
export const {
    useGetAllOrderDeliverylistQuery,
    useGetOrderDeliveryDetailsByIdQuery,
    useUpdateOrderDeliveryStatusMutation,
    useUpdateOrderDeliveryReturnMutation,
    useDeliveryOTPVerificationMutation,
} = orderDeliveryApi;
