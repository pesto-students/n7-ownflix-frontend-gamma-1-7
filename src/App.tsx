import './App.scss';
import { Route, Switch } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Homepage from './Pages/Homepage/Homepage';
import Playerpage from './Pages/Playerpage/Playerpage';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import theme from './theme';
import Searchpage from './Pages/Searchpage/Searchpage';
import Signin from './Pages/Signin/Signin';
import Signup from './Pages/Signup/Signup';
import Popular from './Pages/Popular/Popular';
import Verify from './Pages/Verify/Verify';
import PrivateRoute from "./hoc/Routes/PrivateRoute"
import { useDispatch } from 'react-redux';
import React from 'react';
import { fetchAllGenresAsync } from './redux/genres/genres.actions';
import { requests } from './requests';

function App() {

  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(fetchAllGenresAsync(requests.fetchAllGenres))
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

export default App;
