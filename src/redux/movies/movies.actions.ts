import { Movie } from "../../models/movie.interface";
import { AppThunk } from "../store";
import { moviesActionTypes } from './movies.types';
import axios from '../../utils/axiosInstance';


export const fetchPopularMoviesRequest = () => ({
    type: moviesActionTypes.FETCH_POPULAR_MOVIES_REQUEST,
});

export const fetchPopularMoviesSuccess = (popularMovies: Movie[], isPage?: number) => ({
    type: isPage
        ? moviesActionTypes.FETCH_POPULAR_MOVIES_SUCCESS
        : moviesActionTypes.LOAD_MORE_POPULAR_MOVIES_SUCCESS,
    payload: popularMovies,
});

export const fetchPopularMoviesFailure = (error: any) => ({
    type: moviesActionTypes.FETCH_POPULAR_MOVIES_FAILURE,
    payload: error,
});

export const fetchPopularMoviesAsync = (fetchUrl: string, isPage: number): AppThunk => {
    return (dispatch: any) => {
        dispatch(fetchPopularMoviesRequest());
        axios
            .get(fetchUrl)
            .then(res => {
                debugger
                const popularMovies = res.data.docs.map((el: any) => ({
                    ...el,
                    isFavourite: false,
                }));
                if (isPage) {
                    dispatch(fetchPopularMoviesSuccess(popularMovies, isPage));
                } else dispatch(fetchPopularMoviesSuccess(popularMovies));
            })
            .catch(error => {
                const errorMessage = error.message;
                dispatch(fetchPopularMoviesFailure(errorMessage));
            });
    };
};