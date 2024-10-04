import { createApi } from '@reduxjs/toolkit/query/react';
import { createSlice } from '@reduxjs/toolkit';
import { baseQueryWithAuthGuard } from '../utility';
import { IPaginator } from '@/types/types';
import {
    IQRCode,
    RGetQRCodelist,
    RGetQRCodeById,
    IAddQRCode,
    IEditQRCode,
    ApiResponse,
} from '@/types/interfaces/qrcode';

export const qrcodeApi = createApi({
    reducerPath: 'qrcodeApi',
    baseQuery: baseQueryWithAuthGuard,
    tagTypes: ['QRCode'],
    endpoints: (builder) => ({
        // Queries
        getAllQRCodelist: builder.query<RGetQRCodelist, IPaginator>({
            query: (params) => {
                const { pageIndex, pageSize, sortBy, sortOrder, filters } = params;
                const replacer = (_key: any, value: any) => {
                    if (value === null) return '';
                    return value;
                };
                const serializedFilters = JSON.stringify(filters, replacer, 2);
                return {
                    url: `/qrcode`,
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
            providesTags: ['QRCode'],
        }),
        getQRCodeById: builder.query<RGetQRCodeById, string>({
            query: (id) => ({
                url: `/qrcode/${id}`,
                method: 'GET',
            }),
            providesTags: ['QRCode'],
        }),

        // Mutation
        addQRCode: builder.mutation<ApiResponse, IAddQRCode>({
            query: (body) => ({
                url: `/qrcode`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['QRCode'],
        }),
        editQRCode: builder.mutation<ApiResponse, IEditQRCode>({
            query: ({ id, ...rest }) => ({
                url: `/qrcode/${id}`,
                method: 'PUT',
                body: rest,
            }),
            invalidatesTags: ['QRCode'],
        }),
    }),
});

interface InitialState {
    status?: String | null;
    loading?: Boolean;
    error?: Boolean;
    qrcodeList?: IQRCode[];
}
const initialState: InitialState = {
    status: null,
    loading: false,
    error: false,
    qrcodeList: [],
};

export const qrcodeSlice = createSlice({
    name: 'qrcodeSlice',
    initialState,
    reducers: {
        setData: (state, action) => {
            state.qrcodeList = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(qrcodeApi.endpoints.getAllQRCodelist.matchFulfilled, (state, action) => {
                state.status = 'Fullfilled';
                state.loading = false;
                state.error = false;
                state.qrcodeList = action.payload.data;
            })
            .addMatcher(qrcodeApi.endpoints.getAllQRCodelist.matchRejected, (state) => {
                state.status = 'Rejected';
                state.loading = false;
                state.error = true;
            })
            .addMatcher(qrcodeApi.endpoints.getAllQRCodelist.matchPending, (state) => {
                state.status = 'Pending';
                state.loading = true;
                state.error = false;
            });
    },
});

export default qrcodeSlice.reducer;
export const { useGetAllQRCodelistQuery, useGetQRCodeByIdQuery, useAddQRCodeMutation, useEditQRCodeMutation } =
    qrcodeApi;
