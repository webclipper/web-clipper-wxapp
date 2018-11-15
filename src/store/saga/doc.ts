import { isType } from 'ts-action';
import { takeLatest, put, take, fork, select } from 'redux-saga/effects';
import actionTypes from '../actionTypes';
import { getUserDocs, getDocDetail } from '../../services/api';
import {
  initCreatedDocList,
  fetchDocumentDetailSuccess,
  fetchDocumentDetailError,
  fetchDocumentDetailRequest,
  initCreatedDocListError,
  fetchMoreDocSuccess,
  fetchMoreDocEnd
} from './../actions/doc';
import Taro from '@tarojs/taro';

const { DOC } = actionTypes;

export function* fetchDocumentDetailRequestHandler() {
  while (true) {
    try {
      const action = yield take(DOC.FETCH_DOCUMENT_DETAIL_REQUEST);
      if (isType(action, fetchDocumentDetailRequest)) {
        const { id, repoId } = action.playload;
        const detail = yield getDocDetail(repoId, id);
        yield put(fetchDocumentDetailSuccess(detail.data));
      }
    } catch (error) {
      yield put(fetchDocumentDetailError({ error: error }));
    }
  }
}

function* initCreatedDocListSages() {
  yield takeLatest(DOC.INIT_CREATED_DOC_LIST_REQUEST, function* () {
    try {
      const response = yield getUserDocs({ offset: 0 });
      yield put(initCreatedDocList({ createdDocs: response.data }));
    } catch (error) {
      yield put(initCreatedDocListError());
    }
  });
}

function* createdDocumentPulldownRefreshRequestSage() {
  yield takeLatest(DOC.CREATED_DOCUMENT_PULL_DOWN_REFRESH_REQUEST, function* () {
    try {
      const response = yield getUserDocs({ offset: 0 });
      yield put(initCreatedDocList({ createdDocs: response.data }));
      Taro.vibrateShort();
    } catch (error) {
      Taro.showToast({
        title: '请求失败',
        icon: 'none'
      });
    }
    Taro.stopPullDownRefresh();
  });
}

function* fetchMoreDocRequestSaga() {
  yield takeLatest(DOC.FETCH_MORE_DOC_REQUEST, function* () {
    const store: GlobalStateInterface = yield select();
    const docCount = store.doc.createdDocs.length;
    const response = yield getUserDocs({ offset: docCount });
    if (response.data.length > 0) {
      yield put(fetchMoreDocSuccess({ docs: response.data }));
    } else {
      yield put(fetchMoreDocEnd());
    }
  });
}

export function* docRootSaga() {
  yield fork(initCreatedDocListSages);
  yield fork(fetchMoreDocRequestSaga);
  yield fork(createdDocumentPulldownRefreshRequestSage);
}
