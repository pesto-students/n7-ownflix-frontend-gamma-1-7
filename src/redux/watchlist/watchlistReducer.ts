
import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { watchlistActionTypes } from "./watchlist.types";

const initialState: any[] = [];

export const watchlistReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(watchlistActionTypes.FETCH_WATCHLIST, (state: any[], action: PayloadAction<any[]>) => {
            return action.payload
        })
        .addCase(watchlistActionTypes.ADD_TO_WATCHLIST, (state: any[], action: PayloadAction<any>) => {
            state.push(action.payload)
        })
        .addCase(watchlistActionTypes.REMOVE_FROM_WATCHLIST, (state: any[], action: PayloadAction<any>) => {
            return state.filter((watchlist) => watchlist._id !== action.payload)
        })

})
export default watchlistReducer;