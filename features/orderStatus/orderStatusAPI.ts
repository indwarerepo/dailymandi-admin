import { createApi } from '@reduxjs/toolkit/query/react';
import { createSlice } from '@reduxjs/toolkit';
import { baseQueryWithAuthGuard } from '../utility';
import {
    IOrderStatus,
    RGetOrderStatuslist,
    RGetOrderStatusById,
    ROrderStatusDD,
    IAddOrderStatus,
    IEditOrderStatus,
    IEditActiveStatus,
    ApiResponse,
} from '@/types/interfaces/orderStatus';
import { IPaginator } from '@/types/types';

export const orderStatusApi = createApi({
    reducerPath: 'orderStatusApi',
    baseQuery: baseQueryWithAuthGuard,
    tagTypes: ['OrderStatus'],
    endpoints: (builder) => ({
        // Queries
        getAllOrderStatuslist: builder.query<RGetOrderStatuslist, IPaginator>({
            query: (params) => {
                const { pageIndex, pageSize, sortBy, sortOrder, filters } = params;
                const replacer = (_key: any, value: any) => {
                    if (value === null) return '';
                    return value;
                };
                const serializedFilters = JSON.stringify(filters, replacer, 2);
                return {
                    url: `/order-status`,
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
            providesTags: ['OrderStatus'],
        }),

        getDropdownOrderStatuslist: builder.query<any, void>({
            query: () => {
                return {
                    url: `/order-status/dropdown/list`,
                    method: 'GET',
                };
            },
            providesTags: ['OrderStatus'],
        }),

        getOrderStatusById: builder.query<RGetOrderStatusById, string>({
            query: (id) => ({
                url: `/order-status/${id}`,
                method: 'GET',
            }),
            providesTags: ['OrderStatus'],
        }),
        getOrderStatusDD: builder.query<ROrderStatusDD, void>({
            query: () => ({
                url: `/order-status/drop-down/list`,
                method: 'GET',
            }),
            providesTags: ['OrderStatus'],
        }),

        // Mutation
        addOrderStatus: builder.mutation<ApiResponse, IAddOrderStatus>({
            query: (body) => ({
                url: `/order-status`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['OrderStatus'],
        }),
        editOrderStatus: builder.mutation<ApiResponse, IEditOrderStatus>({
            query: ({ id, ...rest }) => ({
                url: `/order-status/${id}`,
                method: 'PUT',
                body: rest,
            }),
            invalidatesTags: ['OrderStatus'],
        }),

        editActiveStatus: builder.mutation<ApiResponse, string>({
            query: (id) => ({
                url: `/order-status/status/${id}`,
                method: `PUT`,
            }),
            invalidatesTags: ['OrderStatus'],
        }),

        deleteOrderStatus: builder.mutation<RGetOrderStatuslist, string>({
            query: (id) => ({
                url: `/order-status/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['OrderStatus'],
        }),
    }),
});

interface InitialState {
    status?: String | null;
    loading?: Boolean;
    error?: Boolean;
    orderStatusList?: IOrderStatus[];
}
const initialState: InitialState = {
    status: null,
    loading: false,
    error: false,
    orderStatusList: [],
};

export const orderStatusSlice = createSlice({
    name: 'orderStatusSlice',
    initialState,
    reducers: {
        setData: (state, action) => {
            state.orderStatusList = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(orderStatusApi.endpoints.getAllOrderStatuslist.matchFulfilled, (state, action) => {
                state.status = 'Fullfilled';
                state.loading = false;
                state.error = false;
                state.orderStatusList = action.payload.data;
            })
            .addMatcher(orderStatusApi.endpoints.getAllOrderStatuslist.matchRejected, (state) => {
                state.status = 'Rejected';
                state.loading = false;
                state.error = true;
            })
            .addMatcher(orderStatusApi.endpoints.getAllOrderStatuslist.matchPending, (state) => {
                state.status = 'Pending';
                state.loading = true;
                state.error = false;
            });
    },
});

export default orderStatusSlice.reducer;
export const {
    useGetAllOrderStatuslistQuery,
    useGetOrderStatusByIdQuery,
    useGetDropdownOrderStatuslistQuery,
    useGetOrderStatusDDQuery,
    useAddOrderStatusMutation,
    useEditOrderStatusMutation,
    useEditActiveStatusMutation,
    useDeleteOrderStatusMutation,
} = orderStatusApi;
