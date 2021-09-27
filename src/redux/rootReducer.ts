import { combineReducers } from '@reduxjs/toolkit'
import movies from "./movies";
import auth from "./auth/authReducer";
import genres from './genres/genresReducer';
import player from './player/playerReducer';
import watchlist from './watchlist/watchlistReducer';

const rootReducer = combineReducers({
    auth,
    movies,
    genres,
    player,
    watchlist
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer;