import { fork } from 'redux-saga/effects';

import { switchTab, logout, routerSages } from './router';
import { docSages, fetchDocumentDetailRequestHandler } from './doc';
import { refreshUserInfoRequest } from './user';

export default function* rootSaga() {
  console.log('hello saga');
  yield fork(switchTab);
  yield fork(logout);
  yield fork(routerSages);
  yield fork(docSages);
  yield fork(fetchDocumentDetailRequestHandler);
  yield fork(refreshUserInfoRequest);
}
