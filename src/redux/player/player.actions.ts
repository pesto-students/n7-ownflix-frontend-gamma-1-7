import { Movie } from "../../models/movie.interface";
import { AppThunk } from "../store";
import { playerActionTypes } from "./player.types";
import axios from '../../utils/axiosInstance';
import { fetchRecommendedMoviesAsync } from "../movies/movies.actions";

export const fetchMovieRequest = () => ({
    type: playerActionTypes.FETCH_MOVIE,
});

export const fetchMovieSuccess = (movie: Movie) => ({
    type: playerActionTypes.FETCH_MOVIE_SUCCESS,
    payload: movie,
});

export const fetchMovieFailure = (error: any) => ({
    type: playerActionTypes.FETCH_MOVIE_FAILURE,
    payload: error,
});

export const fetchMovieAsync = (fetchUrl: string): AppThunk => {
    return (dispatch: any) => {
        dispatch(fetchMovieRequest());
        axios
            .get(fetchUrl,{timeout:-1})
            .then(res => {
                const movie = res.data;
                dispatch(fetchMovieSuccess(movie));
                dispatch(fetchRecommendedMoviesAsync(`/movies/recommended?genreSlug=${movie.genres[0].slug}`, 1));
            })
            .catch(error => {
                const errorMessage = error.message;
                dispatch(fetchMovieFailure(errorMessage));
            });
    };
};


export const fetchSeriesRequest = () => ({
    type: playerActionTypes.FETCH_SERIES,
});

export const fetchSeriesSuccess = (series: any) => ({
    type: playerActionTypes.FETCH_SERIES_SUCCESS,
    payload: series,
});

export const fetchSeriesFailure = (error: any) => ({
    type: playerActionTypes.FETCH_SERIES_FAILURE,
    payload: error,
});

export const fetchSeriesAsync = (fetchUrl: string): AppThunk => {
    return (dispatch: any) => {
        dispatch(fetchSeriesRequest());
        axios
            .get(fetchUrl)
            .then(res => {
                const series = res.data;
                dispatch(fetchSeriesSuccess(series));
            })
            .catch(error => {
                const errorMessage = error.message;
                dispatch(fetchSeriesFailure(errorMessage));
            });
    };
};