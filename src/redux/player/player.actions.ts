import { Movie } from "../../models/movie.interface";
import { AppThunk } from "../store";
import { playerActionTypes } from "./player.types";
import axios from '../../utils/axiosInstance';

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
            .get(fetchUrl)
            .then(res => {
                const movie = res.data;
                dispatch(fetchMovieSuccess(movie));
            })
            .catch(error => {
                const errorMessage = error.message;
                dispatch(fetchMovieFailure(errorMessage));
            });
    };
};