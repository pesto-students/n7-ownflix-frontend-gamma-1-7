import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "../../models/movie.interface";
import { playerActionTypes } from "./player.types";

const initialState: {
    loading: boolean;
    error: string;
    data: Movie | null
} = {
    loading: false,
    error: '',
    data: null
}

export const playerReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(playerActionTypes.FETCH_MOVIE, (state) => {
            state.loading = true
        })
        .addCase(playerActionTypes.FETCH_MOVIE_SUCCESS, (state, action: PayloadAction<Movie>) => {
            state.error = ''
            state.data = action.payload;
            state.loading = false;
        })

        .addCase(playerActionTypes.FETCH_MOVIE_FAILURE, (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.data = null
            state.loading = false;
        })
})

export default playerReducer;