import { AppThunk } from "../store";
import axios from '../../utils/axiosInstance';
import { AxiosResponse } from "axios";
import { watchlistActionTypes } from "./watchlist.types";
import { Movie } from "../../models/movie.interface";
import { Series } from "../../models/series.interface";
import { toast } from 'react-toastify';

export const fetchWatchlist = (watchlist: any[]) => ({
    type: watchlistActionTypes.FETCH_WATCHLIST,
    payload: watchlist
});

export const addToWatchlist = (watchlist: any, type: string, data: Movie | Series) => ({
    type: watchlistActionTypes.ADD_TO_WATCHLIST,
    payload: { watchlist, type, data }
});

export const removeFromWatchlist = (id: string, type: string) => ({
    type: watchlistActionTypes.REMOVE_FROM_WATCHLIST,
    payload: { id, type }
});

export const fetchWatchlistAsync = (fetchUrl: any): AppThunk => {
    return (dispatch: any) => {
        axios
            .get(fetchUrl)
            .then((res: AxiosResponse<any>) => {
                dispatch(fetchWatchlist(res.data));
            })
    };
};


export const addToWatchlistAsync = (postUrl: string, body: any, type: string, data: Movie | Series): any => {
    return (dispatch: any, getState: any) => {
        if (!getState().auth.isLogin) {
            toast.error("You need to sign in for this feature.")
            return false;
        }
        axios
            .post(postUrl, body)
            .then((res: AxiosResponse<any>) => {
                dispatch(addToWatchlist(res.data.data, type, data));
            })
    };
};

export const removeFromWatchlistAsync = (deleteUrl: string, id: string, type: string): any => {
    return (dispatch: any) => {
        axios
            .delete(deleteUrl)
            .then((res: AxiosResponse<any>) => {
                dispatch(removeFromWatchlist(id, type));
            })
    };
};