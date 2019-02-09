import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { App } from './components/App';
import configureStore from './configureStore';
import { Firebase, FirebaseContext } from './components/Firebase';
import { history } from './history';
import 'moment/locale/ru';

export const store = configureStore(history);

const appRootDomElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <FirebaseContext.Provider value={Firebase()}>
        <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>
          <App />
        </SnackbarProvider>
      </FirebaseContext.Provider>
    </Router>
  </Provider>,
  appRootDomElement
);
