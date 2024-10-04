import { createApi } from '@reduxjs/toolkit/query/react';
import { createSlice } from '@reduxjs/toolkit';
import { baseQueryWithAuthGuard } from '../utility';
import { ICMS, RCMSlist, RGetCMSById, IAddCMS, IEditCMS, IEditActiveStatus, ApiResponse } from '@/types/interfaces/cms';
import { IPaginator } from '@/types/types';

export const cmsApi = createApi({
    reducerPath: 'cmsApi',
    baseQuery: baseQueryWithAuthGuard,
    tagTypes: ['CMS'],
    endpoints: (builder) => ({
        // Queries
        getAllCMSlist: builder.query<RCMSlist, IPaginator>({
            query: (params) => {
                const { pageIndex, pageSize, sortBy, sortOrder, filters } = params;
                const replacer = (_key: any, value: any) => {
                    if (value === null) return '';
                    return value;
                };
                const serializedFilters = JSON.stringify(filters, replacer, 2);
                return {
                    url: `/cms`,
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
            providesTags: ['CMS'],
        }),
        getCMSById: builder.query<RGetCMSById, string>({
            query: (id) => ({
                url: `/cms/${id}`,
                method: 'GET',
            }),
            providesTags: ['CMS'],
        }),

        // Mutation
        addCMS: builder.mutation<ApiResponse, IAddCMS>({
            query: (body) => ({
                url: `/cms`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['CMS'],
        }),
        editCMS: builder.mutation<ApiResponse, IEditCMS>({
            query: ({ id, ...rest }) => ({
                url: `/cms/${id}`,
                method: 'PUT',
                body: rest,
            }),
            invalidatesTags: ['CMS'],
        }),

        editActiveStatus: builder.mutation<ApiResponse, string>({
            query: (id) => ({
                url: `/cms/status/${id}`,
                method: `PUT`,
            }),
            invalidatesTags: ['CMS'],
        }),

        deleteCMS: builder.mutation<RCMSlist, string>({
            query: (id) => ({
                url: `/cms/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['CMS'],
        }),
    }),
});

interface InitialState {
    status?: String | null;
    loading?: Boolean;
    error?: Boolean;
    cmsList?: ICMS[];
}
const initialState: InitialState = {
    status: null,
    loading: false,
    error: false,
    cmsList: [],
};

export const cmsSlice = createSlice({
    name: 'cmsSlice',
    initialState,
    reducers: {
        setData: (state, action) => {
            state.cmsList = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(cmsApi.endpoints.getAllCMSlist.matchFulfilled, (state, action) => {
                state.status = 'Fullfilled';
                state.loading = false;
                state.error = false;
                state.cmsList = action.payload.data;
            })
            .addMatcher(cmsApi.endpoints.getAllCMSlist.matchRejected, (state) => {
                state.status = 'Rejected';
                state.loading = false;
                state.error = true;
            })
            .addMatcher(cmsApi.endpoints.getAllCMSlist.matchPending, (state) => {
                state.status = 'Pending';
                state.loading = true;
                state.error = false;
            });
    },
});

export default cmsSlice.reducer;
export const {
    useGetAllCMSlistQuery,
    useGetCMSByIdQuery,
    useAddCMSMutation,
    useEditCMSMutation,
    useEditActiveStatusMutation,
    useDeleteCMSMutation,
} = cmsApi;
