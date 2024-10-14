import { createApi } from '@reduxjs/toolkit/query/react';
import { createSlice } from '@reduxjs/toolkit';
import { baseQueryWithAuthGuard } from '../utility';
import {
    ProductSubCategory,
    IAddProductSubCategory,
    IEditProductSubCategory,
    RProductSubCategorylist,
    ApiResponse,
    RGetProductSubCategoryById,
    RProductSubCategoryDD,
    IEditActiveStatus,
} from '@/types/interfaces/productSubCategory';
import { IPaginator } from '@/types/types';

export const productSubCategoryApi = createApi({
    reducerPath: 'productSubCategoryApi',
    baseQuery: baseQueryWithAuthGuard,
    tagTypes: ['ProductSubCategory'],
    endpoints: (builder) => ({
        // Queries
        getAllProductSubCategorylist: builder.query<RProductSubCategorylist, IPaginator>({
            query: (params) => {
                const { pageIndex, pageSize, sortBy, sortOrder, filters } = params;
                const replacer = (_key: any, value: any) => {
                    if (value === null) return '';
                    return value;
                };
                const serializedFilters = JSON.stringify(filters, replacer, 2);
                return {
                    url: `/product-subcategory`,
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
            providesTags: ['ProductSubCategory'],
        }),
        getProductSubCategoryById: builder.query<RGetProductSubCategoryById, string>({
            query: (id) => ({
                url: `/product-subcategory/${id}`,
                method: 'GET',
            }),
            providesTags: ['ProductSubCategory'],
        }),
        getProductSubCategoryDD: builder.query<RProductSubCategoryDD, void>({
            query: () => ({
                url: `/product-subcategory/drop-down`,
                method: 'GET',
            }),
            providesTags: ['ProductSubCategory'],
        }),

        // Mutation
        addProductSubCategory: builder.mutation<ApiResponse, IAddProductSubCategory>({
            query: (body) => ({
                url: `/product-subcategory`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['ProductSubCategory'],
        }),
        editProductSubCategory: builder.mutation<ApiResponse, IEditProductSubCategory>({
            query: ({ id, ...rest }) => ({
                url: `/product-subcategory/${id}`,
                method: 'PUT',
                body: rest,
            }),
            invalidatesTags: ['ProductSubCategory'],
        }),

        editActiveStatus: builder.mutation<ApiResponse, string>({
            query: (id) => ({
                url: `/product-subcategory/status/${id}`,
                method: `PUT`,
            }),
            invalidatesTags: ['ProductSubCategory'],
        }),

        deleteProductSubCategory: builder.mutation<RProductSubCategorylist, string>({
            query: (id) => ({
                url: `/product-subcategory/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['ProductSubCategory'],
        }),
    }),
});

interface InitialState {
    status?: String | null;
    loading?: Boolean;
    error?: Boolean;
    productSubCategoryList?: ProductSubCategory[];
}
const initialState: InitialState = {
    status: null,
    loading: false,
    error: false,
    productSubCategoryList: [],
};

export const productSubCategorySlice = createSlice({
    name: 'productSubCategorySlice',
    initialState,
    reducers: {
        setData: (state, action) => {
            state.productSubCategoryList = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                productSubCategoryApi.endpoints.getAllProductSubCategorylist.matchFulfilled,
                (state, action) => {
                    state.status = 'Fullfilled';
                    state.loading = false;
                    state.error = false;
                    state.productSubCategoryList = action.payload.data;
                },
            )
            .addMatcher(productSubCategoryApi.endpoints.getAllProductSubCategorylist.matchRejected, (state) => {
                state.status = 'Rejected';
                state.loading = false;
                state.error = true;
            })
            .addMatcher(productSubCategoryApi.endpoints.getAllProductSubCategorylist.matchPending, (state) => {
                state.status = 'Pending';
                state.loading = true;
                state.error = false;
            });
    },
});

export const { setData } = productSubCategorySlice.actions;
export default productSubCategorySlice.reducer;

export const {
    useGetAllProductSubCategorylistQuery,
    useGetProductSubCategoryByIdQuery,
    useAddProductSubCategoryMutation,
    useEditProductSubCategoryMutation,
    useEditActiveStatusMutation,
    useGetProductSubCategoryDDQuery,
    useDeleteProductSubCategoryMutation,
} = productSubCategoryApi;
