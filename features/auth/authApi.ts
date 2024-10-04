import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createSlice } from '@reduxjs/toolkit';
import apiBaseUrl from '../apiBaseUrl';
import { Login, LoginResponse } from '@/types/interfaces/user';
import { jwtDecode } from 'jwt-decode';
import { deleteCookie, setCookie } from 'cookies-next';

let adminToken = '';
let adminTokenDecoded: any;

//auth api calling-----------
export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: apiBaseUrl,
    }),
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponse, Login>({
            query: (body) => ({
                url: `/user/login`,
                method: 'POST',
                body,
            }),
            transformResponse(baseQueryReturnValue, meta, arg) {
                const token = meta?.response?.headers?.get('authorization');

                if (token) setCookie('aone_token', token.toString());

                const decodedToken = token && typeof token === 'string' ? jwtDecode(token as string) : null;

                adminToken = token!;
                adminTokenDecoded = decodedToken;

                return baseQueryReturnValue as LoginResponse;
            },
        }),
    }),
});

interface InitialState {
    status?: String | null;
    loading?: Boolean;
    error?: Boolean;
    token?: string;
    data?: any;
}
const initialState: InitialState = {
    status: null,
    loading: false,
    error: false,
    token: '',
    data: null,
};
//auth api response handling(saving the token)
export const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setData: (state, action) => {
            state.data = action.payload;
        },
        logout: (state) => {
            state.status = null;
            state.loading = false;
            state.error = false;
            state.token = '';
            state.data = [];
            deleteCookie('aone_token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(authApi.endpoints.login.matchFulfilled, (state) => {
                state.status = 'Fullfilled';
                state.loading = false;
                state.error = false;
                state.token = adminToken;
                state.data = adminTokenDecoded;
            })
            .addMatcher(authApi.endpoints.login.matchRejected, (state) => {
                state.status = 'Rejected';
                state.loading = false;
                state.error = true;
            })
            .addMatcher(authApi.endpoints.login.matchPending, (state) => {
                state.status = 'Pending';
                state.loading = true;
                state.error = false;
            });
    },
});

export const { setData, logout } = authSlice.actions;
export default authSlice.reducer;

export const { useLoginMutation } = authApi;
