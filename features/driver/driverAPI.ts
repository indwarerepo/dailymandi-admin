import { createApi } from '@reduxjs/toolkit/query/react';
import { createSlice } from '@reduxjs/toolkit';
import { baseQueryWithAuthGuard } from '../utility';
// import { User, AddUser, ApiResponse, RUser } from '@/types/interfaces/user';
import {
    IDriver,
    ApiResponse,
    RGetDriverlist,
    RGetDriverById,
    IAddDriver,
    IEditDriver,
    IEditActiveStatus,
    RDriverDD,
} from '@/types/interfaces/driver';
import { IPaginator } from '@/types/types';

export const driverApi = createApi({
    reducerPath: 'driverApi',
    baseQuery: baseQueryWithAuthGuard,
    tagTypes: ['Driver'],
    endpoints: (builder) => ({
        // Queries

        getAllDriverslist: builder.query<RGetDriverlist, IPaginator>({
            query: (params) => {
                const { pageIndex, pageSize, sortBy, sortOrder, filters } = params;
                const replacer = (_key: any, value: any) => {
                    if (value === null) return '';
                    return value;
                };
                const serializedFilters = JSON.stringify(filters, replacer, 2);
                return {
                    url: `/driver`,
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
            providesTags: ['Driver'],
        }),

        getAllDriversDropdownlist: builder.query<RDriverDD, void>({
            query: () => {
                return {
                    url: `/driver/drop-down`,
                    method: 'GET',
                };
            },
            providesTags: ['Driver'],
        }),

        getDriverById: builder.query<RGetDriverById, string>({
            query: (id) => ({
                url: `/driver/${id}`,
                method: 'GET',
            }),
            providesTags: ['Driver'],
        }),

        // Mutation
        addDriver: builder.mutation<ApiResponse, IAddDriver>({
            query: (body) => ({
                url: `/driver`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Driver'],
        }),
        editDriver: builder.mutation<ApiResponse, IEditDriver>({
            query: ({ id, ...rest }) => ({
                url: `/driver/${id}`,
                method: 'PUT',
                body: rest,
            }),
            invalidatesTags: ['Driver'],
        }),

        editActiveStatus: builder.mutation<ApiResponse, string>({
            query: (id) => ({
                url: `/driver/status/${id}`,
                method: `PUT`,
            }),
            invalidatesTags: ['Driver'],
        }),

        deleteDriver: builder.mutation<RGetDriverlist, string>({
            query: (id) => ({
                url: `/driver/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Driver'],
        }),
    }),
});

interface InitialState {
    status?: String | null;
    loading?: Boolean;
    error?: Boolean;
    driverList?: IDriver[];
}
const initialState: InitialState = {
    status: null,
    loading: false,
    error: false,
    driverList: [],
};

export const driverSlice = createSlice({
    name: 'driverSlice',
    initialState,
    reducers: {
        setData: (state, action) => {
            state.driverList = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(driverApi.endpoints.getAllDriverslist.matchFulfilled, (state, action) => {
                state.status = 'Fullfilled';
                state.loading = false;
                state.error = false;
                state.driverList = action.payload.data;
            })
            .addMatcher(driverApi.endpoints.getAllDriverslist.matchRejected, (state) => {
                state.status = 'Rejected';
                state.loading = false;
                state.error = true;
            })
            .addMatcher(driverApi.endpoints.getAllDriverslist.matchPending, (state) => {
                state.status = 'Pending';
                state.loading = true;
                state.error = false;
            });
    },
});

export const { setData } = driverSlice.actions;
export default driverSlice.reducer;
export const {
    useGetAllDriverslistQuery,
    useGetAllDriversDropdownlistQuery,
    useGetDriverByIdQuery,
    useAddDriverMutation,
    useEditDriverMutation,
    useEditActiveStatusMutation,
    useDeleteDriverMutation,
} = driverApi;
