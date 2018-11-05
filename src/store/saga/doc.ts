import { isType } from 'ts-action';
import { takeLatest, put, take } from 'redux-saga/effects';
import actionTypes from '../actionTypes';
import { getUserDocs, getDocDetail } from '../../services/api';
import {
  initCreatedDocList,
  fetchDocumentDetailSuccess,
  fetchDocumentDetailError,
  fetchDocumentDetailRequest
} from './../actions/doc';
import Taro from '@tarojs/taro';

const { DOC } = actionTypes;

function* initCreatedDocListSaga() {
  try {
    const response = yield getUserDocs({ offset: 0 });
    yield put(initCreatedDocList(response.data));
  } catch (error) {
    Taro.showToast({
      title: '请求错误',
      icon: 'none'
    });
  }
}

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
      yield put(fetchDocumentDetailError());
    }
  }
}

export function* docSages() {
  yield takeLatest(DOC.INIT_CREATED_DOC_LIST_REQUEST, initCreatedDocListSaga);
}
