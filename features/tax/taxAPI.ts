import { createApi } from '@reduxjs/toolkit/query/react';
import { createSlice } from '@reduxjs/toolkit';
import { baseQueryWithAuthGuard } from '../utility';
import {
    ITax,
    IAddTax,
    IEditTax,
    IEditActiveStatus,
    RGetTaxlist,
    RGetTaxById,
    ApiResponse,
    RGetTaxDD,
} from '@/types/interfaces/tax';
import { IPaginator } from '@/types/types';

export const taxApi = createApi({
    reducerPath: 'taxApi',
    baseQuery: baseQueryWithAuthGuard,
    tagTypes: ['Tax'],
    endpoints: (builder) => ({
        // Queries
        getAllTaxlist: builder.query<RGetTaxlist, IPaginator>({
            query: (params) => {
                const { pageIndex, pageSize, sortBy, sortOrder, filters } = params;
                const replacer = (_key: any, value: any) => {
                    if (value === null) return '';
                    return value;
                };
                const serializedFilters = JSON.stringify(filters, replacer, 2);
                return {
                    url: `/tax-master`,
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
            providesTags: ['Tax'],
        }),
        getTaxById: builder.query<RGetTaxById, string>({
            query: (id) => ({
                url: `/tax-master/${id}`,
                method: 'GET',
            }),
            providesTags: ['Tax'],
        }),
        getTaxDD: builder.query<RGetTaxDD, void>({
            query: () => ({
                url: `/tax-master/drop-down`,
                method: 'GET',
            }),
            providesTags: ['Tax'],
        }),

        // Mutation
        addTax: builder.mutation<ApiResponse, IAddTax>({
            query: (body) => ({
                url: `/tax-master`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Tax'],
        }),
        editTax: builder.mutation<ApiResponse, IEditTax>({
            query: ({ id, ...rest }) => ({
                url: `/tax-master/${id}`,
                method: 'PUT',
                body: rest,
            }),
            invalidatesTags: ['Tax'],
        }),

        editActiveStatus: builder.mutation<ApiResponse, string>({
            query: (id) => ({
                url: `/tax-master/status/${id}`,
                method: `PUT`,
            }),
            invalidatesTags: ['Tax'],
        }),

        deleteTax: builder.mutation<RGetTaxlist, string>({
            query: (id) => ({
                url: `/tax-master/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Tax'],
        }),
    }),
});

interface InitialState {
    status?: String | null;
    loading?: Boolean;
    error?: Boolean;
    taxList?: ITax[];
}
const initialState: InitialState = {
    status: null,
    loading: false,
    error: false,
    taxList: [],
};

export const taxSlice = createSlice({
    name: 'taxSlice',
    initialState,
    reducers: {
        setData: (state, action) => {
            state.taxList = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(taxApi.endpoints.getAllTaxlist.matchFulfilled, (state, action) => {
                state.status = 'Fullfilled';
                state.loading = false;
                state.error = false;
                state.taxList = action.payload.data;
            })
            .addMatcher(taxApi.endpoints.getAllTaxlist.matchRejected, (state) => {
                state.status = 'Rejected';
                state.loading = false;
                state.error = true;
            })
            .addMatcher(taxApi.endpoints.getAllTaxlist.matchPending, (state) => {
                state.status = 'Pending';
                state.loading = true;
                state.error = false;
            });
    },
});

export default taxSlice.reducer;
export const {
    useGetAllTaxlistQuery,
    useGetTaxByIdQuery,
    useGetTaxDDQuery,
    useAddTaxMutation,
    useEditTaxMutation,
    useEditActiveStatusMutation,
    useDeleteTaxMutation,
} = taxApi;
