import { fork } from 'redux-saga/effects';
import routerSagas from './router';
import docSagas from './doc';
import userSagas from './user';

export default function* rootSaga() {
  console.log('hello saga');
  yield fork(routerSagas);
  yield fork(docSagas);
  yield fork(userSagas);
}
