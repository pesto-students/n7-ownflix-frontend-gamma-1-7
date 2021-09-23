import { combineReducers } from '@reduxjs/toolkit'
import movies from "./movies";
import auth from "./auth/authReducer";

const rootReducer = combineReducers({
    auth,
    movies
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;