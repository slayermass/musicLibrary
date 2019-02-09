import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import sagas from './sagas';

export default function storeConfigure() {
  const sagaMiddleware = createSagaMiddleware();

  /* eslint-disable no-underscore-dangle  */
  const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
  /* eslint-enable */

  const enhancer = composeEnhancers(
    applyMiddleware(
      sagaMiddleware,
    )
  );
  const store = createStore(reducers, enhancer);

  sagaMiddleware.run(sagas);

  return store;
}
