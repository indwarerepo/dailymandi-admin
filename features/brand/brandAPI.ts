import { createApi } from '@reduxjs/toolkit/query/react';
import { createSlice } from '@reduxjs/toolkit';
import { baseQueryWithAuthGuard } from '../utility';

import { IPaginator } from '@/types/types';
import {
    ApiResponse,
    IAddBrand,
    IBrand,
    IEditBrand,
    RBrandDD,
    RGetBrandById,
    RGetBrandlist,
} from '@/types/interfaces/brand';

export const brandApi = createApi({
    reducerPath: 'brandApi',
    baseQuery: baseQueryWithAuthGuard,
    tagTypes: ['Brand'],
    endpoints: (builder) => ({
        // Queries
        getAllBrandlist: builder.query<RGetBrandlist, IPaginator>({
            query: (params) => {
                const { pageIndex, pageSize, sortBy, sortOrder, filters } = params;
                const replacer = (_key: any, value: any) => {
                    if (value === null) return '';
                    return value;
                };
                const serializedFilters = JSON.stringify(filters, replacer, 2);
                return {
                    url: `/product-brand`,
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
            providesTags: ['Brand'],
        }),

        getAllBrandDropdownlist: builder.query<RBrandDD, void>({
            query: () => {
                return {
                    url: `/product-brand/drop-down`,
                    method: 'GET',
                };
            },
            providesTags: ['Brand'],
        }),
        getBrandById: builder.query<RGetBrandById, string>({
            query: (id) => ({
                url: `/product-brand/${id}`,
                method: 'GET',
            }),
            providesTags: ['Brand'],
        }),
        // Mutation
        addBrand: builder.mutation<ApiResponse, IAddBrand>({
            query: (body) => ({
                url: `/product-brand`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Brand'],
        }),
        editBrand: builder.mutation<ApiResponse, IEditBrand>({
            query: ({ id, ...rest }) => ({
                url: `/product-brand/${id}`,
                method: 'PUT',
                body: rest,
            }),
            invalidatesTags: ['Brand'],
        }),

        editActiveStatus: builder.mutation<ApiResponse, string>({
            query: (id) => ({
                url: `/product-brand/status/${id}`,
                method: `PUT`,
            }),
            invalidatesTags: ['Brand'],
        }),

        deleteBrand: builder.mutation<RGetBrandlist, string>({
            query: (id) => ({
                url: `/product-brand/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Brand'],
        }),
    }),
});

interface InitialState {
    status?: String | null;
    loading?: Boolean;
    error?: Boolean;
    brandList?: IBrand[];
}
const initialState: InitialState = {
    status: null,
    loading: false,
    error: false,
    brandList: [],
};

export const brandSlice = createSlice({
    name: 'brandSlice',
    initialState,
    reducers: {
        setData: (state, action) => {
            state.brandList = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(brandApi.endpoints.getAllBrandlist.matchFulfilled, (state, action) => {
                state.status = 'Fullfilled';
                state.loading = false;
                state.error = false;
                state.brandList = action.payload.data;
            })
            .addMatcher(brandApi.endpoints.getAllBrandlist.matchRejected, (state) => {
                state.status = 'Rejected';
                state.loading = false;
                state.error = true;
            })
            .addMatcher(brandApi.endpoints.getAllBrandlist.matchPending, (state) => {
                state.status = 'Pending';
                state.loading = true;
                state.error = false;
            });
    },
});

export default brandSlice.reducer;
export const {
    useGetAllBrandlistQuery,
    useGetBrandByIdQuery,
    useGetAllBrandDropdownlistQuery,
    useAddBrandMutation,
    useEditBrandMutation,
    useEditActiveStatusMutation,
    useDeleteBrandMutation,
} = brandApi;
