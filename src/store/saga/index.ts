import { fork } from 'redux-saga/effects';

import { addAsync } from './counter';
import { switchTab, logout, routerSages } from './router';
import { docSages, fetchDocumentDetailRequestHandler } from './doc';

export default function* rootSaga() {
  console.log('hello saga');
  yield fork(addAsync);
  yield fork(switchTab);
  yield fork(logout);
  yield fork(routerSages);
  yield fork(docSages);
  yield fork(fetchDocumentDetailRequestHandler);
}
