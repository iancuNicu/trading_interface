import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CreateWatchlistResponse, WatchlistRequest, WatchlistResponse } from '../models/watchlist.models';

const tags: any = ['Watchlist'];

export const watchlistApi = createApi({
    reducerPath: 'watchlist',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://127.0.0.1:8000/watchlist/',
        prepareHeaders: (headers, { getState }) => {
            const state: any = getState();
            const token = state.access_token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }        
            return headers;
          },
    }),
    tagTypes: ['Watchlist'],
    endpoints: (builder) => ({
        getWatchlist: builder.query<WatchlistResponse, void>({
          query: () => '',
          invalidatesTags: tags
        }),
        createWatchlist: builder.mutation<CreateWatchlistResponse, WatchlistRequest>({
                    query: ({email, ticker, period, start, end, attributes}) => ({
                        url: '',
                        method: 'POST',
                        body: {email, ticker, period, start, end, attributes},
                      })
            })
      })
})

export const { useGetWatchlistQuery, useCreateWatchlistMutation } = watchlistApi;