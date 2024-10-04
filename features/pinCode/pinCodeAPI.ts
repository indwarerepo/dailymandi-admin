import { createApi } from '@reduxjs/toolkit/query/react';
import { createSlice } from '@reduxjs/toolkit';
import { baseQueryWithAuthGuard } from '../utility';
import {
    IPINCode,
    IAddPINCode,
    IEditPINCode,
    IEditActiveStatus,
    RGetPINCodeById,
    RPINCodelist,
    ApiResponse,
} from '@/types/interfaces/pinCode';

import { IPaginator } from '@/types/types';

export const pinCodeApi = createApi({
    reducerPath: 'pinCodeApi',
    baseQuery: baseQueryWithAuthGuard,
    tagTypes: ['PINCode'],
    endpoints: (builder) => ({
        // Queries
        getAllPINCodelist: builder.query<RPINCodelist, IPaginator>({
            query: (params) => {
                const { pageIndex, pageSize, sortBy, sortOrder, filters } = params;
                const replacer = (_key: any, value: any) => {
                    if (value === null) return '';
                    return value;
                };
                const serializedFilters = JSON.stringify(filters, replacer, 2);
                return {
                    url: `/pincode/`,
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
            providesTags: ['PINCode'],
        }),
        getPINCodeById: builder.query<RGetPINCodeById, string>({
            query: (id) => ({
                url: `/pincode/${id}`,
                method: 'GET',
            }),
            providesTags: ['PINCode'],
        }),
        // getProductCategoryDD: builder.query<RProductCategoryDD, void>({
        //     query: () => ({
        //         url: `/product-category/drop-down`,
        //         method: 'GET',
        //     }),
        //     providesTags: ['ProductCategory'],
        // }),

        // Mutation
        addPINCode: builder.mutation<ApiResponse, IAddPINCode>({
            query: (body) => ({
                url: `/pincode/`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['PINCode'],
        }),
        editPINCode: builder.mutation<ApiResponse, IEditPINCode>({
            query: ({ id, ...rest }) => ({
                url: `/pincode/${id}`,
                method: 'PUT',
                body: rest,
            }),
            invalidatesTags: ['PINCode'],
        }),

        editActiveStatus: builder.mutation<ApiResponse, string>({
            query: (id) => ({
                url: `/pincode/status/${id}`,
                method: `PUT`,
            }),
            invalidatesTags: ['PINCode'],
        }),

        deletePINCode: builder.mutation<RPINCodelist, string>({
            query: (id) => ({
                url: `/pincode/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['PINCode'],
        }),
    }),
});

interface InitialState {
    status?: String | null;
    loading?: Boolean;
    error?: Boolean;
    pinCodeList?: IPINCode[];
}
const initialState: InitialState = {
    status: null,
    loading: false,
    error: false,
    pinCodeList: [],
};

export const pinCodeSlice = createSlice({
    name: 'pinCodeSlice',
    initialState,
    reducers: {
        setData: (state, action) => {
            state.pinCodeList = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(pinCodeApi.endpoints.getAllPINCodelist.matchFulfilled, (state, action) => {
                state.status = 'Fullfilled';
                state.loading = false;
                state.error = false;
                state.pinCodeList = action.payload.data;
            })
            .addMatcher(pinCodeApi.endpoints.getAllPINCodelist.matchRejected, (state) => {
                state.status = 'Rejected';
                state.loading = false;
                state.error = true;
            })
            .addMatcher(pinCodeApi.endpoints.getAllPINCodelist.matchPending, (state) => {
                state.status = 'Pending';
                state.loading = true;
                state.error = false;
            });
    },
});

export default pinCodeSlice.reducer;
export const {
    useGetAllPINCodelistQuery,
    useGetPINCodeByIdQuery,
    useAddPINCodeMutation,
    useDeletePINCodeMutation,
    useEditPINCodeMutation,
    useEditActiveStatusMutation,
} = pinCodeApi;
