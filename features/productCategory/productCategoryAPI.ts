import { createApi } from '@reduxjs/toolkit/query/react';
import { createSlice } from '@reduxjs/toolkit';
import { baseQueryWithAuthGuard } from '../utility';
import {
    ProductCategory,
    IAddProductCategory,
    IEditProductCategory,
    RProductCategorylist,
    ApiResponse,
    RGetProductCategoryById,
    RProductCategoryDD,
    IEditActiveStatus,
} from '@/types/interfaces/productCategory';
import { IPaginator } from '@/types/types';

export const productCategoryApi = createApi({
    reducerPath: 'productCategoryApi',
    baseQuery: baseQueryWithAuthGuard,
    tagTypes: ['ProductCategory'],
    endpoints: (builder) => ({
        // Queries
        getAllProductCategorylist: builder.query<RProductCategorylist, IPaginator>({
            query: (params) => {
                const { pageIndex, pageSize, sortBy, sortOrder, filters } = params;
                const replacer = (_key: any, value: any) => {
                    if (value === null) return '';
                    return value;
                };
                const serializedFilters = JSON.stringify(filters, replacer, 2);
                return {
                    url: `/product-category`,
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
            providesTags: ['ProductCategory'],
        }),
        getProductCategoryById: builder.query<RGetProductCategoryById, string>({
            query: (id) => ({
                url: `/product-category/${id}`,
                method: 'GET',
            }),
            providesTags: ['ProductCategory'],
        }),
        getProductCategoryDD: builder.query<RProductCategoryDD, void>({
            query: () => ({
                url: `/product-category/drop-down`,
                method: 'GET',
            }),
            providesTags: ['ProductCategory'],
        }),

        // Mutation
        addProductCategory: builder.mutation<ApiResponse, IAddProductCategory>({
            query: (body) => ({
                url: `/product-category`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['ProductCategory'],
        }),
        editProductCategory: builder.mutation<ApiResponse, IEditProductCategory>({
            query: ({ id, ...rest }) => ({
                url: `/product-category/${id}`,
                method: 'PUT',
                body: rest,
            }),
            invalidatesTags: ['ProductCategory'],
        }),

        editActiveStatus: builder.mutation<ApiResponse, string>({
            query: (id) => ({
                url: `/product-category/status/${id}`,
                method: `PUT`,
            }),
            invalidatesTags: ['ProductCategory'],
        }),

        deleteProductCategory: builder.mutation<RProductCategorylist, string>({
            query: (id) => ({
                url: `/product-category/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['ProductCategory'],
        }),
    }),
});

interface InitialState {
    status?: String | null;
    loading?: Boolean;
    error?: Boolean;
    productCategoryList?: ProductCategory[];
}
const initialState: InitialState = {
    status: null,
    loading: false,
    error: false,
    productCategoryList: [],
};

export const productCategorySlice = createSlice({
    name: 'productCategorySlice',
    initialState,
    reducers: {
        setData: (state, action) => {
            state.productCategoryList = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(productCategoryApi.endpoints.getAllProductCategorylist.matchFulfilled, (state, action) => {
                state.status = 'Fullfilled';
                state.loading = false;
                state.error = false;
                state.productCategoryList = action.payload.data;
            })
            .addMatcher(productCategoryApi.endpoints.getAllProductCategorylist.matchRejected, (state) => {
                state.status = 'Rejected';
                state.loading = false;
                state.error = true;
            })
            .addMatcher(productCategoryApi.endpoints.getAllProductCategorylist.matchPending, (state) => {
                state.status = 'Pending';
                state.loading = true;
                state.error = false;
            });
    },
});

export const { setData } = productCategorySlice.actions;
export default productCategorySlice.reducer;
export const {
    useGetAllProductCategorylistQuery,
    useGetProductCategoryByIdQuery,
    useAddProductCategoryMutation,
    useEditProductCategoryMutation,
    useEditActiveStatusMutation,
    useGetProductCategoryDDQuery,
    useDeleteProductCategoryMutation,
} = productCategoryApi;
