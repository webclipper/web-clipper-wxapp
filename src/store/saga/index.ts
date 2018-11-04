import { fork } from 'redux-saga/effects';

import { switchTab, logout, routerSages } from './router';
import { docSages, fetchDocumentDetailRequestHandler } from './doc';

export default function* rootSaga() {
  console.log('hello saga');
  yield fork(switchTab);
  yield fork(logout);
  yield fork(routerSages);
  yield fork(docSages);
  yield fork(fetchDocumentDetailRequestHandler);
}
