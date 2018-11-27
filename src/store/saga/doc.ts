import Taro from '@tarojs/taro';
import { isType } from 'ts-action';
import {
  takeLatest,
  put,
  take,
  fork,
  select,
  takeEvery
} from 'redux-saga/effects';
import { getUserDocs, getDocDetail, deleteDocument } from '../../services/api';
import {
  createdDocumentPulldownRefreshRequest,
  initCreatedDocListSuccess,
  initCreatedDocListError,
  fetchDocumentDetailSuccess,
  fetchDocumentDetailError,
  fetchDocumentDetailRequest,
  deleteDocumentRequest,
  deleteDocumentSuccess,
  fetchMoreDocRequest,
  fetchMoreDocSuccess,
  fetchMoreDocEnd,
  initCreatedDocListRequest
} from '../actions/doc';
import { detailRouterBack } from '../actions/router';

export function* fetchDocumentDetailRequestHandler() {
  while (true) {
    try {
      const action = yield take(fetchDocumentDetailRequest.type);
      if (isType(action, fetchDocumentDetailRequest)) {
        const { id, repoId } = action.payload;
        const detail = yield getDocDetail(repoId, id);
        yield put(fetchDocumentDetailSuccess({ documentDetail: detail }));
      }
    } catch (error) {
      yield put(fetchDocumentDetailError({ error: error }));
    }
  }
}

function* initCreatedDocListSages() {
  yield takeLatest(initCreatedDocListRequest.type, function* () {
    try {
      const response = yield getUserDocs({ offset: 0 });
      yield put(initCreatedDocListSuccess({ createdDocs: response.data }));
    } catch (error) {
      yield put(initCreatedDocListError({ error }));
    }
  });
}

function* createdDocumentPulldownRefreshRequestSage() {
  yield takeLatest(createdDocumentPulldownRefreshRequest.type, function* () {
    try {
      const response = yield getUserDocs({ offset: 0 });
      yield put(initCreatedDocListSuccess({ createdDocs: response.data }));
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
  yield takeLatest(fetchMoreDocRequest.type, function* () {
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

function* deleteDocumentRequestSaga() {
  yield takeEvery(deleteDocumentRequest.type, function* (action) {
    if (isType(action, deleteDocumentRequest)) {
      try {
        yield deleteDocument(action.payload.repoId, action.payload.id);
        yield put(deleteDocumentSuccess({ id: action.payload.id }));
        yield put(detailRouterBack());
      } catch (error) {
        Taro.showToast({
          icon: 'none',
          title: '删除失败'
        });
      }
    }
  });
}

export default function* () {
  yield fork(deleteDocumentRequestSaga);
  yield fork(initCreatedDocListSages);
  yield fork(fetchMoreDocRequestSaga);
  yield fork(createdDocumentPulldownRefreshRequestSage);
  yield fork(fetchDocumentDetailRequestHandler);
}
