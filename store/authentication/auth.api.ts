import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AuthReq, AuthResponse, RefreshResponse } from '../models/auth.models';

const tags: any = ['Auth'];

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://127.0.0.1:8000/authenticate/',
        prepareHeaders: (headers, { getState }) => {
            return headers;
          },
    }),
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        login: builder.mutation<AuthResponse, AuthReq>({
          query: ({user: {email, password}}) => ({
            url: 'login',
            method: 'POST',
            body: {user:{email, password}},
          }),
          invalidatesTags: tags
          // We don't need `transformResponse` or `onQueryStarted` here
          // to update the *persistent* auth state. We'll use `extraReducers`
          // in the separate auth slice for that, listening to the `fulfilled` action.
        }),
        signup: builder.mutation<AuthResponse, AuthReq>({
            query: ({user: {email, password}}) => ({
                url: 'signup',
                method: 'POST',
                body: {user:{email, password}},
              }),
              invalidatesTags: tags
        }),
        refresh: builder.mutation<RefreshResponse, {access_token: string}>({
          query: ({access_token}) => ({
             url: 'refresh-token', 
             method: 'POST',
             headers: {
              "Authorization": `Bearer ${access_token}`
             }
          })
        })
      })
})

export const { useLoginMutation, useSignupMutation, useRefreshMutation } = authApi;

export const {endpoints, util} = authApi;