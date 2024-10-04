import { createApi } from '@reduxjs/toolkit/query/react';
import { createSlice } from '@reduxjs/toolkit';
import { baseQueryWithAuthGuard } from '../utility';
import { IBanner, IAddBanner, RBannerlist, ApiResponse, RGetBannerById, IEditBanner } from '@/types/interfaces/banner';
import { IPaginator } from '@/types/types';

export const bannerApi = createApi({
    reducerPath: 'bannerApi',
    baseQuery: baseQueryWithAuthGuard,
    tagTypes: ['Banner'],
    endpoints: (builder) => ({
        // Queries
        getAllBannerslist: builder.query<RBannerlist, IPaginator>({
            query: (params) => {
                const { pageIndex, pageSize, sortBy, sortOrder, filters } = params;
                const replacer = (_key: any, value: any) => {
                    if (value === null) return '';
                    return value;
                };
                const serializedFilters = JSON.stringify(filters, replacer, 2);
                return {
                    url: `/banner`,
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
            providesTags: ['Banner'],
        }),

        getBannerById: builder.query<RGetBannerById, string>({
            query: (id) => ({
                url: `/banner/${id}`,
                method: 'GET',
            }),
            providesTags: ['Banner'],
        }),

        // Mutation
        addBanner: builder.mutation<ApiResponse, IAddBanner>({
            query: (body) => ({
                url: `/banner`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Banner'],
        }),
        editBanner: builder.mutation<ApiResponse, IEditBanner>({
            query: ({ id, ...rest }) => ({
                url: `/banner/${id}`,
                method: 'PUT',
                body: rest,
            }),
            invalidatesTags: ['Banner'],
        }),
        deleteBanner: builder.mutation<RBannerlist, string>({
            query: (id) => ({
                url: `/banner/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Banner'],
        }),
    }),
});

interface InitialState {
    status?: String | null;
    loading?: Boolean;
    error?: Boolean;
    bannerList?: IBanner[];
}
const initialState: InitialState = {
    status: null,
    loading: false,
    error: false,
    bannerList: [],
};

export const bannerSlice = createSlice({
    name: 'bannerSlice',
    initialState,
    reducers: {
        setData: (state, action) => {
            state.bannerList = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(bannerApi.endpoints.getAllBannerslist.matchFulfilled, (state, action) => {
                state.status = 'Fullfilled';
                state.loading = false;
                state.error = false;
                state.bannerList = action.payload.data;
            })
            .addMatcher(bannerApi.endpoints.getAllBannerslist.matchRejected, (state) => {
                state.status = 'Rejected';
                state.loading = false;
                state.error = true;
            })
            .addMatcher(bannerApi.endpoints.getAllBannerslist.matchPending, (state) => {
                state.status = 'Pending';
                state.loading = true;
                state.error = false;
            });
    },
});

export const { setData } = bannerSlice.actions;
export default bannerSlice.reducer;
export const {
    useGetAllBannerslistQuery,
    useGetBannerByIdQuery,
    useEditBannerMutation,
    useAddBannerMutation,
    useDeleteBannerMutation,
} = bannerApi;
