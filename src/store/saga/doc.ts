import { takeLatest, put } from 'redux-saga/effects';
import actionTypes from '../actionTypes';
import { getUserDocs } from '../../services/api';
import { initCreatedDocList } from './../actions/doc';
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

export function* docSages() {
  yield takeLatest(DOC.INIT_CREATED_DOC_LIST_REQUEST, initCreatedDocListSaga);
}
