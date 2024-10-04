import { createApi } from '@reduxjs/toolkit/query/react';
import { createSlice } from '@reduxjs/toolkit';
import { baseQueryWithAuthGuard } from '../utility';
import { User, AddUser, ApiResponse, RUser } from '@/types/interfaces/user';
import { IPaginator } from '@/types/types';

export const adminApi = createApi({
    reducerPath: 'adminApi',
    baseQuery: baseQueryWithAuthGuard,
    tagTypes: ['Admin'],
    endpoints: (builder) => ({
        // Queries
        getAllAdminslist: builder.query<RUser, IPaginator>({
            query: (params) => {
                const { pageIndex, pageSize, sortBy, sortOrder, filters } = params;
                const replacer = (_key: any, value: any) => {
                    if (value === null) return '';
                    return value;
                };
                const serializedFilters = JSON.stringify(filters, replacer, 2);
                return {
                    url: `/user/list`,
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
            providesTags: ['Admin'],
        }),

        // getAllCustomerslist: builder.query<RUser, IPaginator>({
        //     query: (params) => {
        //         const { pageIndex, pageSize, sortBy, sortOrder, filters } = params;
        //         const replacer = (_key: any, value: any) => {
        //             if (value === null) return '';
        //             return value;
        //         };
        //         const serializedFilters = JSON.stringify(filters, replacer, 2);
        //         return {
        //             url: `/user/customer-list`,
        //             method: 'GET',
        //             params: {
        //                 pageNo: pageIndex,
        //                 pageLimit: pageSize,
        //                 sortBy,
        //                 sortOrder,
        //                 filters: serializedFilters,
        //             },
        //         };
        //     },
        //     providesTags: ['User'],
        // }),

        // Mutation
        addUser: builder.mutation<RUser, AddUser>({
            query: (body) => ({
                url: `/user/register/`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Admin'],
        }),
    }),
});

interface InitialState {
    status?: String | null;
    loading?: Boolean;
    error?: Boolean;
    adminList?: User[];
}
const initialState: InitialState = {
    status: null,
    loading: false,
    error: false,
    adminList: [],
};

export const adminSlice = createSlice({
    name: 'adminSlice',
    initialState,
    reducers: {
        setData: (state, action) => {
            state.adminList = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(adminApi.endpoints.getAllAdminslist.matchFulfilled, (state, action) => {
                state.status = 'Fullfilled';
                state.loading = false;
                state.error = false;
                state.adminList = action.payload.data;
            })
            .addMatcher(adminApi.endpoints.getAllAdminslist.matchRejected, (state) => {
                state.status = 'Rejected';
                state.loading = false;
                state.error = true;
            })
            .addMatcher(adminApi.endpoints.getAllAdminslist.matchPending, (state) => {
                state.status = 'Pending';
                state.loading = true;
                state.error = false;
            });
    },
});

export const { setData } = adminSlice.actions;
export default adminSlice.reducer;
export const { useGetAllAdminslistQuery, useAddUserMutation } = adminApi;
