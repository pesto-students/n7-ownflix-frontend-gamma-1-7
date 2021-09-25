import { combineReducers } from "redux";
import { actionReducer } from "./actionReducer";
import { comedyReducer } from "./comedyReducer";
import { dramaReducer } from "./dramaReducer";
import { horrorReducer } from "./horrorReducer";
import { latestReducer } from "./latestReducer";
import { popularReducer } from "./popularReducer";
import { thrillerReducer } from "./thrillerReducer";


export default combineReducers({
    popularMovies: popularReducer,
    latestMovies: latestReducer,
    actionMovies: actionReducer,
    comedyMovies: comedyReducer,
    dramaMovies: dramaReducer,
    horrorMovies: horrorReducer,
    thrillerMovies: thrillerReducer
})