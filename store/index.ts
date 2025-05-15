import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authentication/auth.slice'
import { authApi } from "./authentication/auth.api";
import { stocksApi } from "./stocks/stocks.api";
import { watchlistApi } from "./watchlist/watchlist.api";
import { rtkRefreshTokenMiddleware } from "./middleware/tokenRefreshMiddleware";

export const store = configureStore({
    reducer: {
      auth: authReducer,
      [authApi.reducerPath]: authApi.reducer,
      [stocksApi.reducerPath]: stocksApi.reducer,
      [watchlistApi.reducerPath]: watchlistApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(authApi.middleware, stocksApi.middleware, watchlistApi.middleware)
                            .concat(rtkRefreshTokenMiddleware)
  });

export default store