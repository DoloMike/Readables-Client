import React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import './index.css';
import App from './App';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux'
import appReducer from './AppReducer'
// Create a history of your choosing (we're using a browser history in this case)
import createHistory from 'history/createBrowserHistory'
const history = createHistory()
const middleware = routerMiddleware(history)
// Build the middleware for intercepting and dispatching navigation actions
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  appReducer,
  composeEnhancers(
    applyMiddleware(middleware)
  )
)

ReactDOM.render(
  <Provider store={store}>
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </MuiThemeProvider>
  </Provider>,

  document.getElementById('root')
);
registerServiceWorker();
