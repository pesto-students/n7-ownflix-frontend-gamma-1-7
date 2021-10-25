import { combineReducers } from "redux";
import { actionReducer } from "./actionReducer";
import { comedyReducer } from "./comedyReducer";
import { horrorReducer } from "./horrorReducer";
import { latestReducer } from "./latestReducer";
import { popularReducer } from "./popularReducer";
import { recommendedReducer } from "./recommendedReducer";
import { thrillerReducer } from "./thrillerReducer";


export default combineReducers({
    popularSeries: popularReducer,
    latestSeries: latestReducer,
    actionSeries: actionReducer,
    comedySeries: comedyReducer,
    horrorSeries: horrorReducer,
    thrillerSeries: thrillerReducer,
    recommendedSeries: recommendedReducer
})