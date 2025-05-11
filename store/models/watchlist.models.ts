export enum Period {
    '1d',
    '5d',
    '1mo',
    '3mo',
    '6mo',
    '1y',
    '2y',
    '5y',
    '10y',
    'ytd',
    'max'
}

export interface WatchlistRequest {
    email: string;
    ticker: string;
    period: Period;
    start: Date;
    end: Date;
    attributes: string[]
}

export interface WatchlistResponse {
    watchlist: WatchlistRequest[]
}

export interface CreateWatchlistResponse {
    is_created: boolean;
    watch_entry: WatchlistRequest
}