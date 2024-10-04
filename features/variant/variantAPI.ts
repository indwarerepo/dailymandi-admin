import { createApi } from '@reduxjs/toolkit/query/react';
import { createSlice } from '@reduxjs/toolkit';
import { baseQueryWithAuthGuard } from '../utility';
import {
    IVariant,
    IAddVariant,
    IEditVariant,
    IEditActiveStatus,
    RGetVariantlist,
    RGetVariantById,
    ApiResponse,
    RGetVariantDD,
} from '@/types/interfaces/variant';
import { IPaginator } from '@/types/types';

export const variantApi = createApi({
    reducerPath: 'variantApi',
    baseQuery: baseQueryWithAuthGuard,
    tagTypes: ['Variant'],
    endpoints: (builder) => ({
        // Queries
        getAllVariantlist: builder.query<RGetVariantlist, IPaginator>({
            query: (params) => {
                const { pageIndex, pageSize, sortBy, sortOrder, filters } = params;
                const replacer = (_key: any, value: any) => {
                    if (value === null) return '';
                    return value;
                };
                const serializedFilters = JSON.stringify(filters, replacer, 2);
                return {
                    url: `/variant-master`,
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
            providesTags: ['Variant'],
        }),
        getVariantById: builder.query<RGetVariantById, string>({
            query: (id) => ({
                url: `/variant-master/${id}`,
                method: 'GET',
            }),
            providesTags: ['Variant'],
        }),
        getVariantDD: builder.query<RGetVariantDD, void>({
            query: () => ({
                url: `/variant-master/drop-down`,
                method: 'GET',
            }),
            providesTags: ['Variant'],
        }),

        // Mutation
        addVariant: builder.mutation<ApiResponse, IAddVariant>({
            query: (body) => ({
                url: `/variant-master`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Variant'],
        }),
        editVariant: builder.mutation<ApiResponse, IEditVariant>({
            query: ({ id, ...rest }) => ({
                url: `/variant-master/${id}`,
                method: 'PUT',
                body: rest,
            }),
            invalidatesTags: ['Variant'],
        }),

        editActiveStatus: builder.mutation<ApiResponse, string>({
            query: (id) => ({
                url: `/variant-master/status/${id}`,
                method: `PUT`,
            }),
            invalidatesTags: ['Variant'],
        }),

        deleteVariant: builder.mutation<RGetVariantlist, string>({
            query: (id) => ({
                url: `/variant-master/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Variant'],
        }),
    }),
});

interface InitialState {
    status?: String | null;
    loading?: Boolean;
    error?: Boolean;
    variantList?: IVariant[];
}
const initialState: InitialState = {
    status: null,
    loading: false,
    error: false,
    variantList: [],
};

export const variantSlice = createSlice({
    name: 'variantSlice',
    initialState,
    reducers: {
        setData: (state, action) => {
            state.variantList = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(variantApi.endpoints.getAllVariantlist.matchFulfilled, (state, action) => {
                state.status = 'Fullfilled';
                state.loading = false;
                state.error = false;
                state.variantList = action.payload.data;
            })
            .addMatcher(variantApi.endpoints.getAllVariantlist.matchRejected, (state) => {
                state.status = 'Rejected';
                state.loading = false;
                state.error = true;
            })
            .addMatcher(variantApi.endpoints.getAllVariantlist.matchPending, (state) => {
                state.status = 'Pending';
                state.loading = true;
                state.error = false;
            });
    },
});

export default variantSlice.reducer;
export const {
    useGetAllVariantlistQuery,
    useGetVariantByIdQuery,
    useGetVariantDDQuery,
    useAddVariantMutation,
    useEditVariantMutation,
    useEditActiveStatusMutation,
    useDeleteVariantMutation,
} = variantApi;
