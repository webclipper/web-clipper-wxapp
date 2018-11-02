import { fork } from 'redux-saga/effects';

import { addAsync } from './counter';
import { switchTab, logout } from './router';

export default function* rootSaga() {
  console.log('hello saga');
  yield fork(addAsync);
  yield fork(switchTab);
  yield fork(logout);
}
