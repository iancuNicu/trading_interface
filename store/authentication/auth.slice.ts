import { createSlice } from '@reduxjs/toolkit';
import { authApi } from './auth.api';
import {UserModel} from '../models/auth.models'

const initialState: {
    user: UserModel | null;
    authError: any;
    access_token: string | null;
    refresh_token: string | null;
} = {
    user: null,
    authError: null,
    access_token: null,
    refresh_token: null
}

export const authSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.access_token = null;
            state.refresh_token = null;
        },
        setError: (state, action) => {
            state.user = null;
            state.access_token = null;
            state.refresh_token = null;
            state.authError = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
            state.user = action.payload.user;
            state.access_token = action.payload.access_token;
            state.refresh_token = action.payload.refresh_token;
            state.authError = null
        }),
        builder.addMatcher(authApi.endpoints.signup.matchFulfilled, (state, action) => {
            state.user = action.payload.user;
            state.access_token = action.payload.access_token;
            state.refresh_token = action.payload.refresh_token;
            state.authError = null
        }),
        builder.addMatcher(authApi.endpoints.login.matchRejected,  (state, action) => {
            state.user = null;
            state.access_token = null;
            state.refresh_token = null;
            state.authError = action.payload
        }),
        builder.addMatcher(authApi.endpoints.signup.matchRejected,  (state, action) => {
            state.user = null;
            state.access_token = null;
            state.refresh_token = null;
            state.authError = action.payload
        })
    }
})

export const { setError } = authSlice.actions;

export const selectUser = (state: any) => state.auth.user;

export default authSlice.reducer;