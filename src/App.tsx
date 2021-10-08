import { CssBaseline, ThemeProvider } from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import "./App.scss";
import Layout from "./hoc/Layout/Layout";
import PrivateRoute from "./hoc/Routes/PrivateRoute";
import Genre from "./Pages/Genre/Genre";
import Homepage from "./Pages/Homepage/Homepage";
import Movies from "./Pages/Movies/Movies";
import Playerpage from "./Pages/Playerpage/Playerpage";
import Searchpage from "./Pages/Searchpage/Searchpage";
import Series from "./Pages/Series/Series";
import SeriesGenre from "./Pages/SeriesGenre/SeriesGenre";
import Signin from "./Pages/Signin/Signin";
import Signup from "./Pages/Signup/Signup";
import Verify from "./Pages/Verify/Verify";
import Watchlist from "./Pages/Watchlist/Watchlist";
import { fetchAllGenresAsync } from "./redux/genres/genres.actions";
import { fetchWatchlistAsync } from "./redux/watchlist/watchlist.actions";
import { requests } from "./requests";
import theme from "./theme";
import axios from "./utils/axiosInstance";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { RootState } from "./redux/rootReducer";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLogin);
  React.useEffect(() => {
    dispatch(fetchAllGenresAsync(requests.fetchAllGenres));
  }, [dispatch]);
  React.useEffect(() => {
    if (isLoggedIn) {
      dispatch(
        fetchWatchlistAsync(`/watch-list/user/${localStorage.getItem("user")}`)
      );
    }
  }, [dispatch, isLoggedIn]);
  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <div className="App">
        <Switch>
          <Route path="/signin" exact component={Signin}></Route>
          <Route path="/signup" exact component={Signup}></Route>
          <Route path="/verify/:id" exact component={Verify}></Route>

          <Layout>
            <PrivateRoute
              path="/watchlist"
              exact
              component={Watchlist}
            ></PrivateRoute>
            <Route path="/search" exact component={Searchpage}></Route>
            <Route path="/movies/s/:slug" exact component={Playerpage}></Route>
            <Route path="/movies/:genre" exact component={Genre}></Route>
            <Route path="/movies/" exact component={Movies}></Route>
            <Route
              path="/series/s/:slug/:episodeNo"
              exact
              component={Playerpage}
            ></Route>
            <Route path="/series/:genre" exact component={SeriesGenre}></Route>
            <Route path="/series/" exact component={Series}></Route>
            <Route path="/" exact component={Homepage}></Route>
            <Route path="/home" exact component={Homepage}></Route>
          </Layout>
        </Switch>
        <ToastContainer position="top-center" theme="dark" />
      </div>
    </ThemeProvider>
  );
}

if (localStorage.getItem("accessToken")) {
  axios
    .get("/auth/check")
    .then(async (res) => {
      if (res.data.msg === "Expired") {
        localStorage.clear();
      }
    })
    .catch((e) => {
      localStorage.clear();
    });
}

export default App;
