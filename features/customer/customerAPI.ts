import { createApi } from '@reduxjs/toolkit/query/react';
import { createSlice } from '@reduxjs/toolkit';
import { baseQueryWithAuthGuard } from '../utility';
import {
    ICustomer,
    ApiResponse,
    RGetCustomerlist,
    RGetAddressByCustomerId,
    RCustomerAddressDetails,
    RGetKYCDetailsById,
    RTransactionDetailsById,
} from '@/types/interfaces/customer';
import { IPaginator } from '@/types/types';

interface QueryParams extends IPaginator {
    id: string;
}

export const customerApi = createApi({
    reducerPath: 'customerApi',
    baseQuery: baseQueryWithAuthGuard,
    tagTypes: ['Customer'],
    endpoints: (builder) => ({
        // Queries
        getAllCustomerslist: builder.query<RGetCustomerlist, IPaginator>({
            query: (params) => {
                const { pageIndex, pageSize, sortBy, sortOrder, filters } = params;
                const replacer = (_key: any, value: any) => {
                    if (value === null) return '';
                    return value;
                };
                const serializedFilters = JSON.stringify(filters, replacer, 2);
                return {
                    url: `/user/customer-list`,
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
            providesTags: ['Customer'],
        }),

        getAddressByCustomerId: builder.query<RGetAddressByCustomerId, string>({
            query: (id) => {
                return {
                    url: `/user-address/bycustomer/${id}`,
                    method: 'GET',
                };
            },
            providesTags: ['Customer'],
        }),
        getKYCAccountByCustomerId: builder.query<RGetKYCDetailsById, string>({
            query: (id) => {
                return {
                    url: `/user/customer/detail/${id}`,
                    method: 'GET',
                };
            },
            providesTags: ['Customer'],
        }),

        getTransactionByCustomerId: builder.query<RTransactionDetailsById, QueryParams>({
            query: (params) => {
                const { id, pageIndex, pageSize, sortBy, sortOrder, filters } = params;
                const replacer = (_key: any, value: any) => {
                    if (value === null) return '';
                    return value;
                };
                const serializedFilters = JSON.stringify(filters, replacer, 2);
                return {
                    url: `/user/customer-transaction/${id}`,
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
            providesTags: ['Customer'],
        }),
    }),
});

interface InitialState {
    status?: String | null;
    loading?: Boolean;
    error?: Boolean;
    customerList?: ICustomer[];
}
const initialState: InitialState = {
    status: null,
    loading: false,
    error: false,
    customerList: [],
};

export const customerSlice = createSlice({
    name: 'customerSlice',
    initialState,
    reducers: {
        setData: (state, action) => {
            state.customerList = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(customerApi.endpoints.getAllCustomerslist.matchFulfilled, (state, action) => {
                state.status = 'Fullfilled';
                state.loading = false;
                state.error = false;
                state.customerList = action.payload.data;
            })
            .addMatcher(customerApi.endpoints.getAllCustomerslist.matchRejected, (state) => {
                state.status = 'Rejected';
                state.loading = false;
                state.error = true;
            })
            .addMatcher(customerApi.endpoints.getAllCustomerslist.matchPending, (state) => {
                state.status = 'Pending';
                state.loading = true;
                state.error = false;
            });
    },
});

export const { setData } = customerSlice.actions;
export default customerSlice.reducer;
export const {
    useGetAllCustomerslistQuery,
    useGetAddressByCustomerIdQuery,
    useGetKYCAccountByCustomerIdQuery,
    useGetTransactionByCustomerIdQuery,
} = customerApi;
