
import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { watchlistActionTypes } from "./watchlist.types";

const initialState: any = {
    movies: [],
    series: []
};

export const watchlistReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(watchlistActionTypes.FETCH_WATCHLIST, (state: any, action: PayloadAction<any>) => {
            return action.payload
        })
        .addCase(watchlistActionTypes.ADD_TO_WATCHLIST, (state: any, action: PayloadAction<any>) => {
            if (action.payload.type === 'movies')
                state.movies.push({ watchlistId: action.payload.watchlist._id, movie: action.payload.data })
            else
                state.series.push({ watchlistId: action.payload.watchlist._id, series: action.payload.data })
        })
        .addCase(watchlistActionTypes.REMOVE_FROM_WATCHLIST, (state: any, action: PayloadAction<any>) => {
            if (action.payload.type === 'movies') {
                const movies = state.movies.filter((watchlist: any) => watchlist.watchlistId !== action.payload.id)
                state.movies = movies
            }
            else {
                const series = state.series.filter((watchlist: any) => watchlist.watchlistId !== action.payload.id)
                state.series = series
            }
        })

})
export default watchlistReducer;