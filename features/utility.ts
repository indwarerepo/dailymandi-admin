import Router from 'next/router';
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from '@reduxjs/toolkit/query';
import { RootState } from '@/store/store';
import apiBaseUrl from './apiBaseUrl';
import { logout } from './auth/authApi';

// Auth Guard, to check for valid token
export const baseQuery = fetchBaseQuery({
    baseUrl: apiBaseUrl,
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).persistedReducers.authSlice.token;
        if (token) headers.set('authorization', `Bearer ${token}`);
        return headers;
    },
});

export const baseQueryWithAuthGuard: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
    args,
    api,
    extraOptions,
) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        api.dispatch(logout());

        Router.replace('/');
    }
    return result;
};
