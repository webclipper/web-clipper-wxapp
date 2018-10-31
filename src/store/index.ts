import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';
import createSageMiddleWare from 'redux-saga';
import rootSaga from './saga';

const sagaMiddleware = createSageMiddleWare();

const middlewares = [
  createLogger(),
  sagaMiddleware
];

export default function configStore() {
  const store = createStore(rootReducer, applyMiddleware(...middlewares));
  sagaMiddleware.run(rootSaga);
  return store;
}
