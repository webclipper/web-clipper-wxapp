import { fork } from 'redux-saga/effects';

import { routerRootSaga } from './router';
import { docRootSaga, fetchDocumentDetailRequestHandler } from './doc';
import { refreshUserInfoRequest } from './user';

export default function* rootSaga() {
  console.log('hello saga');
  yield fork(routerRootSaga);
  yield fork(docRootSaga);
  yield fork(fetchDocumentDetailRequestHandler);
  yield fork(refreshUserInfoRequest);
}
