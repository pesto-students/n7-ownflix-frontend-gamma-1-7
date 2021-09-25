import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "../../models/movie.interface";
import { moviesActionTypes } from './movies.types';

const initialState: {
    loading: boolean;
    error: string;
    data: Movie[]
} = {
    loading: false,
    error: '',
    data: []
}

export const dramaReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(moviesActionTypes.FETCH_DRAMA_MOVIES_REQUEST, (state) => {
            state.loading = true
        })
        .addCase(moviesActionTypes.FETCH_DRAMA_MOVIES_SUCCESS, (state, action: PayloadAction<Movie[]>) => {
            state.error = ''
            state.data = action.payload;
            state.loading = false;
        })
        .addCase(moviesActionTypes.LOAD_MORE_DRAMA_MOVIES_SUCCESS, (state, action: PayloadAction<Movie[]>) => {
            state.error = ''
            state.data = [...state.data, ...action.payload];
            state.loading = false;
        })
        .addCase(moviesActionTypes.FETCH_DRAMA_MOVIES_FAILURE, (state, action: PayloadAction<string>) => {
            state.error = action.payload
            state.data = []
            state.loading = false;
        })
})