import { CssBaseline, ThemeProvider } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import Layout from './hoc/Layout/Layout';
import PrivateRoute from "./hoc/Routes/PrivateRoute";
import Homepage from './Pages/Homepage/Homepage';
import Playerpage from './Pages/Playerpage/Playerpage';
import Popular from './Pages/Popular/Popular';
import Searchpage from './Pages/Searchpage/Searchpage';
import Signin from './Pages/Signin/Signin';
import Signup from './Pages/Signup/Signup';
import Verify from './Pages/Verify/Verify';
import { fetchAllGenresAsync } from './redux/genres/genres.actions';
import { fetchWatchlistAsync } from './redux/watchlist/watchlist.actions';
import { requests } from './requests';
import theme from './theme';
import axios from './utils/axiosInstance';

function App() {

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchAllGenresAsync(requests.fetchAllGenres))
    dispatch(fetchWatchlistAsync(`/watch-list/user/${localStorage.getItem('user')}`))
  }, [dispatch])
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
            <PrivateRoute path="/movie/:id" exact component={Playerpage}></PrivateRoute>
            <Route path="/popular" exact component={Popular}></Route>
            <Route path="/search" exact component={Searchpage}></Route>
            <Route path="/" exact component={Homepage}></Route>
            <Route path="/home" exact component={Homepage}></Route>

          </Layout>
        </Switch>
      </div>
    </ThemeProvider>
  );
}

if (localStorage.getItem('accessToken')) {
  axios
    .get('/auth/check')
    .then(async res => {
      if (res.data.msg === 'Expired') {
        localStorage.clear();
      }
    })
    .catch(e => {
      localStorage.clear();
    });
}


export default App;
