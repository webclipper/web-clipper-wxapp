import { takeLatest, put, fork } from 'redux-saga/effects';
import { refreshUserInfo, refreshUserInfoRequest } from './../actions/user';
import { getUser } from '../../services/api';

export function* refreshUserInfoRequestSaga() {
  yield takeLatest(refreshUserInfoRequest.type, function* () {
    try {
      const response = yield getUser();
      yield put(refreshUserInfo(response.data));
    } catch (error) {
      console.log(error);
    }
  });
}

export default function* () {
  yield fork(refreshUserInfoRequestSaga);
}
