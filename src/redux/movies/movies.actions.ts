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
                const popularMovies = res.data.docs;
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


export const fetchActionMoviesRequest = () => ({
    type: moviesActionTypes.FETCH_ACTION_MOVIES_REQUEST,
});

export const fetchActionMoviesSuccess = (actionMovies: Movie[], isPage?: number) => ({
    type: isPage
        ? moviesActionTypes.FETCH_ACTION_MOVIES_SUCCESS
        : moviesActionTypes.LOAD_MORE_ACTION_MOVIES_SUCCESS,
    payload: actionMovies,
});

export const fetchActionMoviesFailure = (error: any) => ({
    type: moviesActionTypes.FETCH_ACTION_MOVIES_FAILURE,
    payload: error,
});

export const fetchActionMoviesAsync = (fetchUrl: string, isPage: number): AppThunk => {
    return (dispatch: any) => {
        dispatch(fetchActionMoviesRequest());
        axios
            .get(fetchUrl)
            .then(res => {
                const actionMovies = res.data.docs;
                if (isPage) {
                    dispatch(fetchActionMoviesSuccess(actionMovies, isPage));
                } else dispatch(fetchActionMoviesSuccess(actionMovies));
            })
            .catch(error => {
                const errorMessage = error.message;
                dispatch(fetchActionMoviesFailure(errorMessage));
            });
    };
};

export const fetchComedyMoviesRequest = () => ({
    type: moviesActionTypes.FETCH_COMEDY_MOVIES_REQUEST,
});

export const fetchComedyMoviesSuccess = (comedyMovies: Movie[], isPage?: number) => ({
    type: isPage
        ? moviesActionTypes.FETCH_COMEDY_MOVIES_SUCCESS
        : moviesActionTypes.LOAD_MORE_COMEDY_MOVIES_SUCCESS,
    payload: comedyMovies,
});

export const fetchComedyMoviesFailure = (error: any) => ({
    type: moviesActionTypes.FETCH_COMEDY_MOVIES_FAILURE,
    payload: error,
});

export const fetchComedyMoviesAsync = (fetchUrl: string, isPage: number): AppThunk => {
    return (dispatch: any) => {
        dispatch(fetchComedyMoviesRequest());
        axios
            .get(fetchUrl)
            .then(res => {
                const comedyMovies = res.data.docs;
                if (isPage) {
                    dispatch(fetchComedyMoviesSuccess(comedyMovies, isPage));
                } else dispatch(fetchComedyMoviesSuccess(comedyMovies));
            })
            .catch(error => {
                const errorMessage = error.message;
                dispatch(fetchComedyMoviesFailure(errorMessage));
            });
    };
};

export const fetchDramaMoviesRequest = () => ({
    type: moviesActionTypes.FETCH_DRAMA_MOVIES_REQUEST,
});

export const fetchDramaMoviesSuccess = (dramaMovies: Movie[], isPage?: number) => ({
    type: isPage
        ? moviesActionTypes.FETCH_DRAMA_MOVIES_SUCCESS
        : moviesActionTypes.LOAD_MORE_DRAMA_MOVIES_SUCCESS,
    payload: dramaMovies,
});

export const fetchDramaMoviesFailure = (error: any) => ({
    type: moviesActionTypes.FETCH_DRAMA_MOVIES_FAILURE,
    payload: error,
});

export const fetchDramaMoviesAsync = (fetchUrl: string, isPage: number): AppThunk => {
    return (dispatch: any) => {
        dispatch(fetchDramaMoviesRequest());
        axios
            .get(fetchUrl)
            .then(res => {
                const dramaMovies = res.data.docs;
                if (isPage) {
                    dispatch(fetchDramaMoviesSuccess(dramaMovies, isPage));
                } else dispatch(fetchDramaMoviesSuccess(dramaMovies));
            })
            .catch(error => {
                const errorMessage = error.message;
                dispatch(fetchDramaMoviesFailure(errorMessage));
            });
    };
};


export const fetchHorrorMoviesRequest = () => ({
    type: moviesActionTypes.FETCH_HORROR_MOVIES_REQUEST,
});

export const fetchHorrorMoviesSuccess = (horrorMovies: Movie[], isPage?: number) => ({
    type: isPage
        ? moviesActionTypes.FETCH_HORROR_MOVIES_SUCCESS
        : moviesActionTypes.LOAD_MORE_HORROR_MOVIES_SUCCESS,
    payload: horrorMovies,
});

export const fetchHorrorMoviesFailure = (error: any) => ({
    type: moviesActionTypes.FETCH_HORROR_MOVIES_FAILURE,
    payload: error,
});

export const fetchHorrorMoviesAsync = (fetchUrl: string, isPage: number): AppThunk => {
    return (dispatch: any) => {
        dispatch(fetchHorrorMoviesRequest());
        axios
            .get(fetchUrl)
            .then(res => {
                const horrorMovies = res.data.docs;
                if (isPage) {
                    dispatch(fetchHorrorMoviesSuccess(horrorMovies, isPage));
                } else dispatch(fetchHorrorMoviesSuccess(horrorMovies));
            })
            .catch(error => {
                const errorMessage = error.message;
                dispatch(fetchHorrorMoviesFailure(errorMessage));
            });
    };
};

export const fetchLatestMoviesRequest = () => ({
    type: moviesActionTypes.FETCH_LATEST_MOVIES_REQUEST,
});

export const fetchLatestMoviesSuccess = (latestMovies: Movie[], isPage?: number) => ({
    type: isPage
        ? moviesActionTypes.FETCH_LATEST_MOVIES_SUCCESS
        : moviesActionTypes.LOAD_MORE_LATEST_MOVIES_SUCCESS,
    payload: latestMovies,
});

export const fetchLatestMoviesFailure = (error: any) => ({
    type: moviesActionTypes.FETCH_LATEST_MOVIES_FAILURE,
    payload: error,
});

export const fetchLatestMoviesAsync = (fetchUrl: string, isPage: number): AppThunk => {
    return (dispatch: any) => {
        dispatch(fetchLatestMoviesRequest());
        axios
            .get(fetchUrl)
            .then(res => {
                const latestMovies = res.data.docs;
                if (isPage) {
                    dispatch(fetchLatestMoviesSuccess(latestMovies, isPage));
                } else dispatch(fetchLatestMoviesSuccess(latestMovies));
            })
            .catch(error => {
                const errorMessage = error.message;
                dispatch(fetchLatestMoviesFailure(errorMessage));
            });
    };
};

export const fetchThrillerMoviesRequest = () => ({
    type: moviesActionTypes.FETCH_THRILLER_MOVIES_REQUEST,
});

export const fetchThrillerMoviesSuccess = (thrillerMovies: Movie[], isPage?: number) => ({
    type: isPage
        ? moviesActionTypes.FETCH_THRILLER_MOVIES_SUCCESS
        : moviesActionTypes.LOAD_MORE_THRILLER_MOVIES_SUCCESS,
    payload: thrillerMovies,
});

export const fetchThrillerMoviesFailure = (error: any) => ({
    type: moviesActionTypes.FETCH_THRILLER_MOVIES_FAILURE,
    payload: error,
});

export const fetchThrillerMoviesAsync = (fetchUrl: string, isPage: number): AppThunk => {
    return (dispatch: any) => {
        dispatch(fetchThrillerMoviesRequest());
        axios
            .get(fetchUrl)
            .then(res => {
                const thrillerMovies = res.data.docs;
                if (isPage) {
                    dispatch(fetchThrillerMoviesSuccess(thrillerMovies, isPage));
                } else dispatch(fetchThrillerMoviesSuccess(thrillerMovies));
            })
            .catch(error => {
                const errorMessage = error.message;
                dispatch(fetchThrillerMoviesFailure(errorMessage));
            });
    };
};


export const fetchRecommendedMoviesRequest = () => ({
    type: moviesActionTypes.FETCH_RECOMMENDED_MOVIES_REQUEST,
});

export const fetchRecommendedMoviesSuccess = (recommendedMovies: Movie[], isPage?: number) => ({
    type: isPage
        ? moviesActionTypes.FETCH_RECOMMENDED_MOVIES_SUCCESS
        : moviesActionTypes.LOAD_MORE_RECOMMENDED_MOVIES_SUCCESS,
    payload: recommendedMovies,
});

export const fetchRecommendedMoviesFailure = (error: any) => ({
    type: moviesActionTypes.FETCH_RECOMMENDED_MOVIES_FAILURE,
    payload: error,
});

export const fetchRecommendedMoviesAsync = (fetchUrl: string, isPage: number): AppThunk => {
    return (dispatch: any) => {
        dispatch(fetchRecommendedMoviesRequest());
        axios
            .get(fetchUrl)
            .then(res => {
                const recommendedMovies = res.data.docs;
                if (isPage) {
                    dispatch(fetchRecommendedMoviesSuccess(recommendedMovies, isPage));
                } else dispatch(fetchRecommendedMoviesSuccess(recommendedMovies));
            })
            .catch(error => {
                const errorMessage = error.message;
                dispatch(fetchRecommendedMoviesFailure(errorMessage));
            });
    };
};

export const fetchHalfwatchedMoviesRequest = () => ({
    type: moviesActionTypes.FETCH_HALFWATCHED_MOVIES_REQUEST,
});

export const fetchHalfwatchedMoviesSuccess = (halfwatchedMovies: Movie[], isPage?: number) => ({
    type: isPage
        ? moviesActionTypes.FETCH_HALFWATCHED_MOVIES_SUCCESS
        : moviesActionTypes.LOAD_MORE_HALFWATCHED_MOVIES_SUCCESS,
    payload: halfwatchedMovies,
});

export const fetchHalfwatchedMoviesFailure = (error: any) => ({
    type: moviesActionTypes.FETCH_HALFWATCHED_MOVIES_FAILURE,
    payload: error,
});

export const fetchHalfwatchedMoviesAsync = (fetchUrl: string, isPage: number): AppThunk => {
    return (dispatch: any) => {
        dispatch(fetchHalfwatchedMoviesRequest());
        axios
            .get(fetchUrl)
            .then(res => {
                const halfwatchedMovies = res.data.movies.map((o: any) => { return { ...o.movie, halfwatchedTime: o.runningTime, resumeWatchId: o.resumeWatchId } });
                if (isPage) {
                    dispatch(fetchHalfwatchedMoviesSuccess(halfwatchedMovies, isPage));
                } else dispatch(fetchHalfwatchedMoviesSuccess(halfwatchedMovies));
            })
            .catch(error => {
                const errorMessage = error.message;
                dispatch(fetchHalfwatchedMoviesFailure(errorMessage));
            });
    };
};