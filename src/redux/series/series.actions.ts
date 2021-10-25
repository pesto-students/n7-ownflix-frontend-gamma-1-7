import { AppThunk } from "../store";
import { seriesActionTypes } from './series.types';
import axios from '../../utils/axiosInstance';
import { Series } from "../../models/series.interface";


export const fetchPopularSeriesRequest = () => ({
    type: seriesActionTypes.FETCH_POPULAR_SERIES_REQUEST,
});

export const fetchPopularSeriesSuccess = (popularSeries: Series[], isPage?: number) => ({
    type: isPage
        ? seriesActionTypes.FETCH_POPULAR_SERIES_SUCCESS
        : seriesActionTypes.LOAD_MORE_POPULAR_SERIES_SUCCESS,
    payload: popularSeries,
});

export const fetchPopularSeriesFailure = (error: any) => ({
    type: seriesActionTypes.FETCH_POPULAR_SERIES_FAILURE,
    payload: error,
});

export const fetchPopularSeriesAsync = (fetchUrl: string, isPage: number): AppThunk => {
    return (dispatch: any) => {
        dispatch(fetchPopularSeriesRequest());
        axios
            .get(fetchUrl)
            .then(res => {
                const popularSeries = res.data.docs;
                if (isPage) {
                    dispatch(fetchPopularSeriesSuccess(popularSeries, isPage));
                } else dispatch(fetchPopularSeriesSuccess(popularSeries));
            })
            .catch(error => {
                const errorMessage = error.message;
                dispatch(fetchPopularSeriesFailure(errorMessage));
            });
    };
};


export const fetchActionSeriesRequest = () => ({
    type: seriesActionTypes.FETCH_ACTION_SERIES_REQUEST,
});

export const fetchActionSeriesSuccess = (actionSeries: Series[], isPage?: number) => ({
    type: isPage
        ? seriesActionTypes.FETCH_ACTION_SERIES_SUCCESS
        : seriesActionTypes.LOAD_MORE_ACTION_SERIES_SUCCESS,
    payload: actionSeries,
});

export const fetchActionSeriesFailure = (error: any) => ({
    type: seriesActionTypes.FETCH_ACTION_SERIES_FAILURE,
    payload: error,
});

export const fetchActionSeriesAsync = (fetchUrl: string, isPage: number): AppThunk => {
    return (dispatch: any) => {
        dispatch(fetchActionSeriesRequest());
        axios
            .get(fetchUrl)
            .then(res => {
                const actionSeries = res.data.docs;
                if (isPage) {
                    dispatch(fetchActionSeriesSuccess(actionSeries, isPage));
                } else dispatch(fetchActionSeriesSuccess(actionSeries));
            })
            .catch(error => {
                const errorMessage = error.message;
                dispatch(fetchActionSeriesFailure(errorMessage));
            });
    };
};

export const fetchComedySeriesRequest = () => ({
    type: seriesActionTypes.FETCH_COMEDY_SERIES_REQUEST,
});

export const fetchComedySeriesSuccess = (comedySeries: Series[], isPage?: number) => ({
    type: isPage
        ? seriesActionTypes.FETCH_COMEDY_SERIES_SUCCESS
        : seriesActionTypes.LOAD_MORE_COMEDY_SERIES_SUCCESS,
    payload: comedySeries,
});

export const fetchComedySeriesFailure = (error: any) => ({
    type: seriesActionTypes.FETCH_COMEDY_SERIES_FAILURE,
    payload: error,
});

export const fetchComedySeriesAsync = (fetchUrl: string, isPage: number): AppThunk => {
    return (dispatch: any) => {
        dispatch(fetchComedySeriesRequest());
        axios
            .get(fetchUrl)
            .then(res => {
                const comedySeries = res.data.docs;
                if (isPage) {
                    dispatch(fetchComedySeriesSuccess(comedySeries, isPage));
                } else dispatch(fetchComedySeriesSuccess(comedySeries));
            })
            .catch(error => {
                const errorMessage = error.message;
                dispatch(fetchComedySeriesFailure(errorMessage));
            });
    };
};

export const fetchDramaSeriesRequest = () => ({
    type: seriesActionTypes.FETCH_DRAMA_SERIES_REQUEST,
});

export const fetchDramaSeriesSuccess = (dramaSeries: Series[], isPage?: number) => ({
    type: isPage
        ? seriesActionTypes.FETCH_DRAMA_SERIES_SUCCESS
        : seriesActionTypes.LOAD_MORE_DRAMA_SERIES_SUCCESS,
    payload: dramaSeries,
});

export const fetchDramaSeriesFailure = (error: any) => ({
    type: seriesActionTypes.FETCH_DRAMA_SERIES_FAILURE,
    payload: error,
});

export const fetchDramaSeriesAsync = (fetchUrl: string, isPage: number): AppThunk => {
    return (dispatch: any) => {
        dispatch(fetchDramaSeriesRequest());
        axios
            .get(fetchUrl)
            .then(res => {
                const dramaSeries = res.data.docs;
                if (isPage) {
                    dispatch(fetchDramaSeriesSuccess(dramaSeries, isPage));
                } else dispatch(fetchDramaSeriesSuccess(dramaSeries));
            })
            .catch(error => {
                const errorMessage = error.message;
                dispatch(fetchDramaSeriesFailure(errorMessage));
            });
    };
};


export const fetchHorrorSeriesRequest = () => ({
    type: seriesActionTypes.FETCH_HORROR_SERIES_REQUEST,
});

export const fetchHorrorSeriesSuccess = (horrorSeries: Series[], isPage?: number) => ({
    type: isPage
        ? seriesActionTypes.FETCH_HORROR_SERIES_SUCCESS
        : seriesActionTypes.LOAD_MORE_HORROR_SERIES_SUCCESS,
    payload: horrorSeries,
});

export const fetchHorrorSeriesFailure = (error: any) => ({
    type: seriesActionTypes.FETCH_HORROR_SERIES_FAILURE,
    payload: error,
});

export const fetchHorrorSeriesAsync = (fetchUrl: string, isPage: number): AppThunk => {
    return (dispatch: any) => {
        dispatch(fetchHorrorSeriesRequest());
        axios
            .get(fetchUrl)
            .then(res => {
                const horrorSeries = res.data.docs;
                if (isPage) {
                    dispatch(fetchHorrorSeriesSuccess(horrorSeries, isPage));
                } else dispatch(fetchHorrorSeriesSuccess(horrorSeries));
            })
            .catch(error => {
                const errorMessage = error.message;
                dispatch(fetchHorrorSeriesFailure(errorMessage));
            });
    };
};

export const fetchLatestSeriesRequest = () => ({
    type: seriesActionTypes.FETCH_LATEST_SERIES_REQUEST,
});

export const fetchLatestSeriesSuccess = (latestSeries: Series[], isPage?: number) => ({
    type: isPage
        ? seriesActionTypes.FETCH_LATEST_SERIES_SUCCESS
        : seriesActionTypes.LOAD_MORE_LATEST_SERIES_SUCCESS,
    payload: latestSeries,
});

export const fetchLatestSeriesFailure = (error: any) => ({
    type: seriesActionTypes.FETCH_LATEST_SERIES_FAILURE,
    payload: error,
});

export const fetchLatestSeriesAsync = (fetchUrl: string, isPage: number): AppThunk => {
    return (dispatch: any) => {
        dispatch(fetchLatestSeriesRequest());
        axios
            .get(fetchUrl)
            .then(res => {
                const latestSeries = res.data.docs;
                if (isPage) {
                    dispatch(fetchLatestSeriesSuccess(latestSeries, isPage));
                } else dispatch(fetchLatestSeriesSuccess(latestSeries));
            })
            .catch(error => {
                const errorMessage = error.message;
                dispatch(fetchLatestSeriesFailure(errorMessage));
            });
    };
};

export const fetchThrillerSeriesRequest = () => ({
    type: seriesActionTypes.FETCH_THRILLER_SERIES_REQUEST,
});

export const fetchThrillerSeriesSuccess = (thrillerSeries: Series[], isPage?: number) => ({
    type: isPage
        ? seriesActionTypes.FETCH_THRILLER_SERIES_SUCCESS
        : seriesActionTypes.LOAD_MORE_THRILLER_SERIES_SUCCESS,
    payload: thrillerSeries,
});

export const fetchThrillerSeriesFailure = (error: any) => ({
    type: seriesActionTypes.FETCH_THRILLER_SERIES_FAILURE,
    payload: error,
});

export const fetchThrillerSeriesAsync = (fetchUrl: string, isPage: number): AppThunk => {
    return (dispatch: any) => {
        dispatch(fetchThrillerSeriesRequest());
        axios
            .get(fetchUrl)
            .then(res => {
                const thrillerSeries = res.data.docs;
                if (isPage) {
                    dispatch(fetchThrillerSeriesSuccess(thrillerSeries, isPage));
                } else dispatch(fetchThrillerSeriesSuccess(thrillerSeries));
            })
            .catch(error => {
                const errorMessage = error.message;
                dispatch(fetchThrillerSeriesFailure(errorMessage));
            });
    };
};


export const fetchRecommendedSeriesRequest = () => ({
    type: seriesActionTypes.FETCH_RECOMMENDED_SERIES_REQUEST,
});

export const fetchRecommendedSeriesSuccess = (recommendedSeries: Series[], isPage?: number) => ({
    type: isPage
        ? seriesActionTypes.FETCH_RECOMMENDED_SERIES_SUCCESS
        : seriesActionTypes.LOAD_MORE_RECOMMENDED_SERIES_SUCCESS,
    payload: recommendedSeries,
});

export const fetchRecommendedSeriesFailure = (error: any) => ({
    type: seriesActionTypes.FETCH_RECOMMENDED_SERIES_FAILURE,
    payload: error,
});

export const fetchRecommendedSeriesAsync = (fetchUrl: string, isPage: number): AppThunk => {
    return (dispatch: any) => {
        dispatch(fetchRecommendedSeriesRequest());
        axios
            .get(fetchUrl)
            .then(res => {
                const recommendedSeries = res.data.docs;
                if (isPage) {
                    dispatch(fetchRecommendedSeriesSuccess(recommendedSeries, isPage));
                } else dispatch(fetchRecommendedSeriesSuccess(recommendedSeries));
            })
            .catch(error => {
                const errorMessage = error.message;
                dispatch(fetchRecommendedSeriesFailure(errorMessage));
            });
    };
};