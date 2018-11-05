import { takeLatest, put } from 'redux-saga/effects';
import actionTypes from '../actionTypes';
import { refreshUserInfo } from './../actions/user';
import { getUser } from '../../services/api';

const { USER } = actionTypes;

export function* refreshUserInfoRequest() {
  yield takeLatest(USER.REFRESH_USER_INFO_REQUEST, function* () {
    try {
      const response = yield getUser();
      yield put(refreshUserInfo(response.data));
    } catch (error) {
      console.log(error);
    }
  });
}
