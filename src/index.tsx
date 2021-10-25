import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

function render() {
  const App = require('./App').default
  ReactDOM.render(
    // <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>

    // </React.StrictMode>
    ,
    document.getElementById('root')
  );
}

render()
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./App', render)
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
