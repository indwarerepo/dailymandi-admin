import { createApi } from '@reduxjs/toolkit/query/react';
import { createSlice } from '@reduxjs/toolkit';
import { baseQueryWithAuthGuard } from '../utility';
import { IPaginator } from '@/types/types';
import {
    IMiscCharges,
    RGetMiscChargesbyId,
    RGetMiscChargeslist,
    IEditMiscCharges,
    ApiResponse,
    RDeliverySlotList,
    RDeliverySlotById,
    IAddDeliverySlot,
    IEditDeliverySlot,
} from '@/types/interfaces/miscCharges';

export const miscChargesApi = createApi({
    reducerPath: 'miscChargesApi',
    baseQuery: baseQueryWithAuthGuard,
    tagTypes: ['MiscCharges'],
    endpoints: (builder) => ({
        // Queries
        getAllMiscChargeslist: builder.query<RGetMiscChargeslist, IPaginator>({
            query: (params) => {
                const { pageIndex, pageSize, sortBy, sortOrder, filters } = params;
                const replacer = (_key: any, value: any) => {
                    if (value === null) return '';
                    return value;
                };
                const serializedFilters = JSON.stringify(filters, replacer, 2);
                return {
                    url: `/mischagres`,
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
            providesTags: ['MiscCharges'],
        }),
        getMiscChargesById: builder.query<RGetMiscChargesbyId, string>({
            query: (id) => ({
                url: `/mischagres/${id}`,
                method: 'GET',
            }),
            providesTags: ['MiscCharges'],
        }),

        getAllDeliverySlotlist: builder.query<RDeliverySlotList, IPaginator>({
            query: (params) => {
                const { pageIndex, pageSize, sortBy, sortOrder, filters } = params;
                const replacer = (_key: any, value: any) => {
                    if (value === null) return '';
                    return value;
                };
                const serializedFilters = JSON.stringify(filters, replacer, 2);
                return {
                    url: `/delivery-slot/`,
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
            providesTags: ['MiscCharges'],
        }),

        getDeliverySlotById: builder.query<RDeliverySlotById, string>({
            query: (id) => ({
                url: `/delivery-slot/${id}`,
                method: 'GET',
            }),
            providesTags: ['MiscCharges'],
        }),

        // Mutation
        editMiscCharges: builder.mutation<ApiResponse, IEditMiscCharges>({
            query: ({ id, ...rest }) => ({
                url: `/mischagres/${id}`,
                method: 'PUT',
                body: rest,
            }),
            invalidatesTags: ['MiscCharges'],
        }),

        addDeliverySlot: builder.mutation<ApiResponse, IAddDeliverySlot>({
            query: (body) => ({
                url: `/delivery-slot`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['MiscCharges'],
        }),
        editDeliverySlot: builder.mutation<ApiResponse, IEditDeliverySlot>({
            query: ({ id, ...rest }) => ({
                url: `/delivery-slot/${id}`,
                method: 'PUT',
                body: rest,
            }),
            invalidatesTags: ['MiscCharges'],
        }),

        editActiveStatus: builder.mutation<ApiResponse, string>({
            query: (id) => ({
                url: `/delivery-slot/status/${id}`,
                method: `PUT`,
            }),
            invalidatesTags: ['MiscCharges'],
        }),
    }),
});

interface InitialState {
    status?: String | null;
    loading?: Boolean;
    error?: Boolean;
    mischargesList?: IMiscCharges[];
}
const initialState: InitialState = {
    status: null,
    loading: false,
    error: false,
    mischargesList: [],
};

export const misChargesSlice = createSlice({
    name: 'misChargesSlice',
    initialState,
    reducers: {
        setData: (state, action) => {
            state.mischargesList = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(miscChargesApi.endpoints.getAllMiscChargeslist.matchFulfilled, (state, action) => {
                state.status = 'Fullfilled';
                state.loading = false;
                state.error = false;
                state.mischargesList = action.payload.data;
            })
            .addMatcher(miscChargesApi.endpoints.getAllMiscChargeslist.matchRejected, (state) => {
                state.status = 'Rejected';
                state.loading = false;
                state.error = true;
            })
            .addMatcher(miscChargesApi.endpoints.getAllMiscChargeslist.matchPending, (state) => {
                state.status = 'Pending';
                state.loading = true;
                state.error = false;
            });
    },
});

export default misChargesSlice.reducer;

export const {
    useGetAllMiscChargeslistQuery,
    useGetMiscChargesByIdQuery,
    useEditMiscChargesMutation,
    useGetAllDeliverySlotlistQuery,
    useGetDeliverySlotByIdQuery,
    useAddDeliverySlotMutation,
    useEditDeliverySlotMutation,
    useEditActiveStatusMutation,
} = miscChargesApi;
