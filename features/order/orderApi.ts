import { createApi } from '@reduxjs/toolkit/query/react';
import { createSlice } from '@reduxjs/toolkit';
import { baseQueryWithAuthGuard } from '../utility';
import { IPaginator } from '@/types/types';
import { IOrder, RGetOrderDetailsById, RGetOrderlist } from '@/types/interfaces/order';

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: baseQueryWithAuthGuard,
    tagTypes: ['Order'],
    endpoints: (builder) => ({
        // Queries
        getAllOrderslist: builder.query<RGetOrderlist, IPaginator>({
            query: (params) => {
                const { pageIndex, pageSize, sortBy, sortOrder, filters } = params;
                const replacer = (_key: any, value: any) => {
                    if (value === null) return '';
                    return value;
                };
                const serializedFilters = JSON.stringify(filters, replacer, 2);
                return {
                    url: `/order/admin/list`,
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
            providesTags: ['Order'],
        }),

        getOrderById: builder.query<RGetOrderDetailsById, string>({
            query: (id) => ({
                url: `/order/admin/${id}`,
                method: 'GET',
            }),
            providesTags: ['Order'],
        }),

        updateOrderStatus: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `/order/status/${id}`,
                method: 'PUT',
                body: rest,
            }),
            invalidatesTags: ['Order'],
        }),

        updateOrderDiverStatus: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `/order/assign-driver/${id}`,
                method: 'PUT',
                body: rest,
            }),
            invalidatesTags: ['Order'],
        }),
    }),
});

interface InitialState {
    status?: String | null;
    loading?: Boolean;
    error?: Boolean;
    orderList?: IOrder[];
}
const initialState: InitialState = {
    status: null,
    loading: false,
    error: false,
    orderList: [],
};

export const orderSlice = createSlice({
    name: 'orderSlice',
    initialState,
    reducers: {
        setData: (state, action) => {
            state.orderList = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(orderApi.endpoints.getAllOrderslist.matchFulfilled, (state, action) => {
                state.status = 'Fullfilled';
                state.loading = false;
                state.error = false;
                state.orderList = action.payload.data;
            })
            .addMatcher(orderApi.endpoints.getAllOrderslist.matchRejected, (state) => {
                state.status = 'Rejected';
                state.loading = false;
                state.error = true;
            })
            .addMatcher(orderApi.endpoints.getAllOrderslist.matchPending, (state) => {
                state.status = 'Pending';
                state.loading = true;
                state.error = false;
            });
    },
});

export const { setData } = orderSlice.actions;
export default orderSlice.reducer;
export const {
    useGetAllOrderslistQuery,
    useGetOrderByIdQuery,
    useUpdateOrderStatusMutation,
    useUpdateOrderDiverStatusMutation,
} = orderApi;
