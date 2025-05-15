import { isRejectedWithValue } from '@reduxjs/toolkit'
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { authApi, endpoints } from '../authentication/auth.api';
import { logout, setToken } from '../authentication/auth.slice';

let isRefreshing = false;
const failedRequestsQueue: any[] = [];

export const rtkRefreshTokenMiddleware: Middleware =
  (api: MiddlewareAPI) => (next) => async (action) => {
    const result = next(action);

    if (isRejectedWithValue(action) && (action.payload as FetchBaseQueryError).status === 401) {
        const rootState = api.getState() as any;
        const refreshToken = rootState.auth.refresh_token;
        if(!refreshToken) {
            api.dispatch(logout())
            return result;
        }

        if(isRefreshing) {
            failedRequestsQueue.push(action)
            return result
        }

        isRefreshing = true;

        try {
            const refreshResult = await (api.dispatch(endpoints.refresh.initiate() as any) as any).unwrap()
            api.dispatch(setToken(refreshResult['access_token']))

            failedRequestsQueue.forEach(queuedAction => {
                const queuedArgs = (queuedAction.meta as any).arg;
                api.dispatch(
                    queuedAction
                );
           });
           failedRequestsQueue.length = 0; 
        }
        catch (refError) {
            api.dispatch(logout())
        }
        finally {
            isRefreshing = false;
        }
    }

    return result
  }