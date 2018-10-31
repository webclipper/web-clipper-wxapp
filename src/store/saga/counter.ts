import actionTypes from '../actionTypes';

const { COUNTER } = actionTypes;
import { takeEvery, put } from 'redux-saga/effects';
import { delay } from 'redux-saga';

export function* incrementAsync() {
  yield delay(1000);
  yield put({ type: COUNTER.ADD });
}

export function* addAsync() {
  yield takeEvery(COUNTER.ADD_ASYNC, incrementAsync);
}
