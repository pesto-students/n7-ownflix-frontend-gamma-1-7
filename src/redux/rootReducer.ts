import { combineReducers } from '@reduxjs/toolkit'
import movies from "./movies";
import auth from "./auth/authReducer";
import genres from './genres/genres.reducer';

const rootReducer = combineReducers({
    auth,
    movies,
    genres
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;