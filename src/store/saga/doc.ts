import { takeLatest, put, take } from 'redux-saga/effects';
import actionTypes from '../actionTypes';
import { getUserDocs, getDocDetail } from '../../services/api';
import {
  initCreatedDocList,
  fetchDocumentDetailSuccess,
  fetchDocumentDetailError
} from './../actions/doc';
import Taro from '@tarojs/taro';

const { DOC } = actionTypes;

function* initCreatedDocListSaga() {
  try {
    const response = yield getUserDocs();
    yield put(initCreatedDocList(response.data));
  } catch (error) {
    if (error.message.indexOf('401') !== -1) {
      Taro.showToast({
        title: 'token错误',
        icon: 'none'
      });
    } else {
      Taro.showToast({
        title: '网络错误',
        icon: 'none'
      });
    }
  }
}

export function* fetchDocumentDetailRequestHandler() {
  while (true) {
    const response = yield take(DOC.FETCH_DOCUMENT_DETAIL_REQUEST) as any;
    try {
      const {
        playload: { id, repoId }
      } = response;
      const detail = yield getDocDetail(repoId, id);
      yield put(fetchDocumentDetailSuccess(detail.data));
    } catch (error) {
      yield put(fetchDocumentDetailError());
    }
  }
}

export function* docSages() {
  yield takeLatest(DOC.INIT_CREATED_DOC_LIST_REQUEST, initCreatedDocListSaga);
}
