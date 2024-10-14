import { createApi } from '@reduxjs/toolkit/query/react';
import { createSlice } from '@reduxjs/toolkit';
import { baseQueryWithAuthGuard } from '../utility';
import {
    Product,
    ApiResponse,
    RGetProductById,
    RProductDD,
    IAddProduct,
    IEditProduct,
    IEditActiveStatus,
    RGetProductList,
    IAddProductVariant,
} from '@/types/interfaces/product';
import { IPaginator } from '@/types/types';

interface QueryParams extends IPaginator {
    id: string;
}
export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: baseQueryWithAuthGuard,
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        // Queries
        getAllProductList: builder.query<RGetProductList, IPaginator>({
            query: (params) => {
                const { pageIndex, pageSize, sortBy, sortOrder, filters } = params;
                const replacer = (_key: any, value: any) => {
                    if (value === null) return '';
                    return value;
                };
                const serializedFilters = JSON.stringify(filters, replacer, 2);
                return {
                    url: `/product`,
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
            providesTags: ['Product'],
        }),

        getVariantListByProductId: builder.query<any, QueryParams>({
            query: (params) => {
                const { id, pageIndex, pageSize, sortBy, sortOrder, filters } = params;
                const replacer = (_key: any, value: any) => {
                    if (value === null) return '';
                    return value;
                };
                const serializedFilters = JSON.stringify(filters, replacer, 2);
                return {
                    url: `/product/product-variant-by-pid/${id}`,
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
            providesTags: ['Product'],
        }),
        getProductById: builder.query<RGetProductById, string>({
            query: (id) => ({
                url: `/product/${id}`,
                method: 'GET',
            }),
            providesTags: ['Product'],
        }),
        getVariantProductById: builder.query<any, string>({
            query: (id) => ({
                url: `/product/product-variant/${id}`,
                method: 'GET',
            }),
            providesTags: ['Product'],
        }),
        getProductDD: builder.query<RProductDD, void>({
            query: () => ({
                url: `/product/drop-down`,
                method: 'GET',
            }),
            providesTags: ['Product'],
        }),
        getSubCategoryByCategoryId: builder.query<any, string>({
            query: (id) => ({
                url: `/product/drop-down-by-catId/${id}`,
                method: 'GET',
            }),
            providesTags: ['Product'],
        }),

        // Mutation
        addProduct: builder.mutation<ApiResponse, IAddProduct>({
            query: (body) => ({
                url: `/product`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Product'],
        }),
        editProduct: builder.mutation<ApiResponse, IEditProduct>({
            query: ({ id, ...rest }) => ({
                url: `/product/${id}`,
                method: 'PUT',
                body: rest,
            }),
            invalidatesTags: ['Product'],
        }),

        addProductVariant: builder.mutation<ApiResponse, any>({
            query: (body) => ({
                url: `/product/create-varinat`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Product'],
        }),
        editProductVariant: builder.mutation<ApiResponse, any>({
            query: ({ id, ...rest }) => ({
                url: `/product/update-variant/${id}`,
                method: 'PUT',
                body: rest,
            }),
            invalidatesTags: ['Product'],
        }),

        editActiveStatus: builder.mutation<ApiResponse, string>({
            query: (id) => ({
                url: `/product/status/${id}`,
                method: `PUT`,
            }),
            invalidatesTags: ['Product'],
        }),

        editFeaturedStatus: builder.mutation<ApiResponse, string>({
            query: (id) => ({
                url: `/product/featured-status/${id}`,
                method: `PUT`,
            }),
            invalidatesTags: ['Product'],
        }),

        editNewProductStatus: builder.mutation<ApiResponse, string>({
            query: (id) => ({
                url: `/product/newproduct-status/${id}`,
                method: `PUT`,
            }),
            invalidatesTags: ['Product'],
        }),

        editBestsellerStatus: builder.mutation<ApiResponse, string>({
            query: (id) => ({
                url: `/product/bestseller-status/${id}`,
                method: `PUT`,
            }),
            invalidatesTags: ['Product'],
        }),

        productBulkUpload: builder.mutation<any, FormData>({
            query: (body) => ({
                url: `/product/bulk-upload`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Product'],
        }),

        deleteProduct: builder.mutation<RGetProductList, string>({
            query: (id) => ({
                url: `/product/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Product'],
        }),
    }),
});

interface InitialState {
    status?: String | null;
    loading?: Boolean;
    error?: Boolean;
    productList?: Product[];
}
const initialState: InitialState = {
    status: null,
    loading: false,
    error: false,
    productList: [],
};

export const productSlice = createSlice({
    name: 'productSlice',
    initialState,
    reducers: {
        setData: (state, action) => {
            state.productList = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(productApi.endpoints.getAllProductList.matchFulfilled, (state, action) => {
                state.status = 'Fullfilled';
                state.loading = false;
                state.error = false;
                state.productList = action.payload.data;
            })
            .addMatcher(productApi.endpoints.getAllProductList.matchRejected, (state) => {
                state.status = 'Rejected';
                state.loading = false;
                state.error = true;
            })
            .addMatcher(productApi.endpoints.getAllProductList.matchPending, (state) => {
                state.status = 'Pending';
                state.loading = true;
                state.error = false;
            });
    },
});

export const { setData } = productSlice.actions;
export default productSlice.reducer;
export const {
    useGetAllProductListQuery,
    useGetProductByIdQuery,
    useGetVariantProductByIdQuery,
    useGetVariantListByProductIdQuery,
    useGetSubCategoryByCategoryIdQuery,
    useAddProductMutation,
    useEditProductMutation,
    useAddProductVariantMutation,
    useEditProductVariantMutation,
    useEditActiveStatusMutation,
    useEditNewProductStatusMutation,
    useEditBestsellerStatusMutation,
    useEditFeaturedStatusMutation,
    useGetProductDDQuery,
    useProductBulkUploadMutation,
    useDeleteProductMutation,
} = productApi;
