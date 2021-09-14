import './App.scss';
import { Route, Switch } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Homepage from './Pages/Homepage/Homepage';
import Playerpage from './Pages/Playerpage/Playerpage';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import theme from './theme';
import Searchpage from './Pages/Searchpage/Searchpage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <div className="App">
        <Layout>
          <Switch>
            <Route path="/player" exact component={Playerpage}></Route>
            <Route path="/search" exact component={Searchpage}></Route>
            <Route path="/" exact component={Homepage}></Route>
          </Switch>
        </Layout>
      </div>
    </ThemeProvider>
  );
}

export default App;
