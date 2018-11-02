import { logout } from './actions/router';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';
import createSageMiddleWare from 'redux-saga';
import rootSaga from './saga';
import AuthService from '../services/authService';

const sagaMiddleware = createSageMiddleWare();

const middlewares = [createLogger(), sagaMiddleware];

export default function configStore() {
  const store = createStore(rootReducer, applyMiddleware(...middlewares));
  AuthService.init(store, logout);
  sagaMiddleware.run(rootSaga);
  return store;
}
