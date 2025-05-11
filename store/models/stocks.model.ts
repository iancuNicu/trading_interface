import { Period } from "./watchlist.models";

export interface StockResponse {
    [key: string]: {
        trading_data: Object;
        info: Object
    }
}

export interface StockRequest {
    tickers: string[];
    fundamentals: boolean | undefined;
    period: Period | undefined;
    start: Date | undefined;
    end: Date | undefined;
    attributes: string[] | undefined
}