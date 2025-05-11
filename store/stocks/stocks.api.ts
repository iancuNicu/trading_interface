import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { StockRequest, StockResponse } from '../models/stocks.model';

const tags: any = ['Stocks'];

export const stocksApi = createApi({
    reducerPath: 'stocks',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://127.0.0.1:8000/stocks/',
        prepareHeaders: (headers, { getState }) => {
            const state: any = getState();
            const token = state.auth.access_token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }        
            return headers;
          },
    }),
    tagTypes: ['Stocks'],
    endpoints: (builder) => ({
        getStocks: builder.query<StockResponse, StockRequest>({
          query: (params) => ({
            url: '',
            method: 'GET',
            params: params
          }),
          invalidatesTags: tags
        })
      })
})

export const { useGetStocksQuery, useLazyGetStocksQuery } = stocksApi;