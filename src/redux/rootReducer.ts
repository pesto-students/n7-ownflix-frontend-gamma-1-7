import { combineReducers } from '@reduxjs/toolkit'
import movies from "./movies";
import auth from "./auth/authReducer";
import genres from './genres/genresReducer';
import player from './player/playerReducer';
import watchlist from './watchlist/watchlistReducer';
import series from './series';
const rootReducer = combineReducers({
    auth,
    movies,
    genres,
    player,
    watchlist,
    series
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;