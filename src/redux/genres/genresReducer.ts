
import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { Genre } from "../../models/genres.interface";
import { genresActionTypes } from "./genrs.types";

const initialState: Genre[] = [];

export const genresReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(genresActionTypes.FETCH_ALL_GENRES, (state: Genre[], action: PayloadAction<Genre[]>) => {
            return action.payload
        })

})
export default genresReducer;