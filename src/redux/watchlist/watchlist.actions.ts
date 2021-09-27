import { AppThunk } from "../store";
import axios from '../../utils/axiosInstance';
import { AxiosResponse } from "axios";
import { watchlistActionTypes } from "./watchlist.types";

export const fetchWatchlist = (watchlist: any[]) => ({
    type: watchlistActionTypes.FETCH_WATCHLIST,
    payload: watchlist
});

export const addToWatchlist = (movie: any) => ({
    type: watchlistActionTypes.ADD_TO_WATCHLIST,
    payload: movie
});

export const removeFromWatchlist = (id: string) => ({
    type: watchlistActionTypes.REMOVE_FROM_WATCHLIST,
    payload: id
});

export const fetchWatchlistAsync = (fetchUrl: any): AppThunk => {
    return (dispatch: any) => {
        axios
            .get(fetchUrl)
            .then((res: AxiosResponse<any>) => {
                dispatch(fetchWatchlist(res.data.docs));
            })
    };
};


export const addToWatchlistAsync = (postUrl: string, body: any): any => {
    return (dispatch: any) => {
        axios
            .post(postUrl, body)
            .then((res: AxiosResponse<any>) => {
                dispatch(addToWatchlist(res.data.data));
            })
    };
};

export const removeFromWatchlistAsync = (deleteUrl: string, id: string): any => {
    return (dispatch: any) => {
        axios
            .delete(deleteUrl)
            .then((res: AxiosResponse<any>) => {
                dispatch(removeFromWatchlist(id));
            })
    };
};