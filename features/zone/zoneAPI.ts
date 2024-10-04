import { createApi } from '@reduxjs/toolkit/query/react';
import { createSlice } from '@reduxjs/toolkit';
import { baseQueryWithAuthGuard } from '../utility';
import {
    IZone,
    IAddZone,
    IEditZone,
    IEditActiveStatus,
    RZonelist,
    RGetZoneById,
    ApiResponse,
    RZoneDD,
} from '@/types/interfaces/zone';
import { IPaginator } from '@/types/types';

export const zoneApi = createApi({
    reducerPath: 'zoneApi',
    baseQuery: baseQueryWithAuthGuard,
    tagTypes: ['Zone'],
    endpoints: (builder) => ({
        // Queries
        getAllZonelist: builder.query<RZonelist, IPaginator>({
            query: (params) => {
                const { pageIndex, pageSize, sortBy, sortOrder, filters } = params;
                const replacer = (_key: any, value: any) => {
                    if (value === null) return '';
                    return value;
                };
                const serializedFilters = JSON.stringify(filters, replacer, 2);
                return {
                    url: `/zone`,
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
            providesTags: ['Zone'],
        }),
        getZoneById: builder.query<RGetZoneById, string>({
            query: (id) => ({
                url: `/zone/${id}`,
                method: 'GET',
            }),
            providesTags: ['Zone'],
        }),
        getZoneDD: builder.query<RZoneDD, void>({
            query: () => ({
                url: `/zone/drop-down`,
                method: 'GET',
            }),
            providesTags: ['Zone'],
        }),

        // Mutation
        addZone: builder.mutation<ApiResponse, IAddZone>({
            query: (body) => ({
                url: `/zone`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Zone'],
        }),
        editZone: builder.mutation<ApiResponse, IEditZone>({
            query: ({ id, ...rest }) => ({
                url: `/zone/${id}`,
                method: 'PUT',
                body: rest,
            }),
            invalidatesTags: ['Zone'],
        }),

        editActiveStatus: builder.mutation<ApiResponse, string>({
            query: (id) => ({
                url: `/zone/status/${id}`,
                method: `PUT`,
            }),
            invalidatesTags: ['Zone'],
        }),

        deleteZone: builder.mutation<RZonelist, string>({
            query: (id) => ({
                url: `/zone/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Zone'],
        }),
    }),
});

interface InitialState {
    status?: String | null;
    loading?: Boolean;
    error?: Boolean;
    zoneList?: IZone[];
}
const initialState: InitialState = {
    status: null,
    loading: false,
    error: false,
    zoneList: [],
};

export const zoneSlice = createSlice({
    name: 'zoneSlice',
    initialState,
    reducers: {
        setData: (state, action) => {
            state.zoneList = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(zoneApi.endpoints.getAllZonelist.matchFulfilled, (state, action) => {
                state.status = 'Fullfilled';
                state.loading = false;
                state.error = false;
                state.zoneList = action.payload.data;
            })
            .addMatcher(zoneApi.endpoints.getAllZonelist.matchRejected, (state) => {
                state.status = 'Rejected';
                state.loading = false;
                state.error = true;
            })
            .addMatcher(zoneApi.endpoints.getAllZonelist.matchPending, (state) => {
                state.status = 'Pending';
                state.loading = true;
                state.error = false;
            });
    },
});

export default zoneSlice.reducer;
export const {
    useGetAllZonelistQuery,
    useGetZoneByIdQuery,
    useGetZoneDDQuery,
    useAddZoneMutation,
    useEditZoneMutation,
    useEditActiveStatusMutation,
    useDeleteZoneMutation,
} = zoneApi;
