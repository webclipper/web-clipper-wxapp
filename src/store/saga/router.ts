import { getUser } from '../../services/api';
import { isType } from 'ts-action';
import authService from '../..//services/authService';
import * as routerAction from './../actions/router';
import { refreshUserInfo } from './../actions/user';
import actionTypes from '../actionTypes';
const { ROUTER } = actionTypes;
import Taro from '@tarojs/taro';
import { delay } from 'redux-saga';
import * as qs from 'qs';
import { take, takeLatest, put, fork, takeEvery } from 'redux-saga/effects';

function toastMessage(message: string) {
  Taro.showToast({
    title: message,
    icon: 'none'
  });
}

export function* detailRouterBackSaga() {
  yield takeEvery(ROUTER.DETAIL_ROUTER_BACK, function() {
    const pages = Taro.getCurrentPages();
    if (pages.length === 1) {
      Taro.switchTab({ url: '/pages/recent/index' });
    } else {
      Taro.navigateBack();
    }
  });
}

export function* switchTab() {
  while (true) {
    const { playload } = yield take(ROUTER.SWITCH_TAB) as any;
    while (Taro.getCurrentPages().length === 0) {
      yield delay(100);
    }
    yield Taro.switchTab(playload);
  }
}

export function* navigateTo() {
  while (true) {
    const { playload } = yield take(ROUTER.NAVIGATE_TO) as any;
    yield Taro.navigateTo(playload);
  }
}

export function* redirectToSaga() {
  yield takeEvery(ROUTER.REDIRECT_TO, function* (action) {
    if (isType(action, routerAction.redirectTo)) {
      yield Taro.redirectTo(action.payload.param);
    }
  });
}

export function* logout() {
  while (true) {
    yield take(ROUTER.LOGOUT) as any;
    const pages = Taro.getCurrentPages();
    if (pages && pages.length > 0) {
      const currentPage = pages[pages.length - 1];
      const homePath = '/pages/index/index';
      authService.clear();
      if (`/${currentPage.route}` !== homePath) {
        yield Taro.reLaunch({
          url: homePath
        });
      }
    }
  }
}

export function* loginSaga() {
  yield takeLatest(ROUTER.LOGIN, function* (action) {
    if (isType(action, routerAction.login)) {
      Taro.showLoading({
        title: 'Loading',
        mask: true
      });
      let { q, token } = action.payload;
      if (!token) {
        toastMessage('Token 不允许为空');
        return;
      }
      if (token.match(/^[a-zA-Z\d]+$/) === null) {
        toastMessage('Token 的格式错误');
        return;
      }
      try {
        authService.set(token);
        const response = yield getUser();
        yield put(refreshUserInfo(response.data));
        if (q) {
          const queryStartIndex = q.lastIndexOf('?') + 1;
          if (queryStartIndex > 0) {
            const query = qs.parse(q.substring(queryStartIndex, q.length));
            let { id, repo_id } = query;
            yield put(
              routerAction.redirectTo({
                param: {
                  url: `/pages/recent/detail?${qs.stringify({ id, repo_id })}`
                }
              })
            );
            return;
          }
        }
        yield put(routerAction.switchTab('/pages/recent/index'));
      } catch (error) {
        if (error.statusCode === 401) {
          toastMessage('无效的 Token');
        } else {
          toastMessage('网络错误');
        }
      }
    }
  });
}

export function* scanEnterSaga() {
  yield takeLatest(ROUTER.SCAN_ENTER, function* (action) {
    Taro.showLoading({
      title: 'Loading',
      mask: true
    });
    if (isType(action, routerAction.scanEnter)) {
      //扫描二维码带的参数
      const q = action.payload.q;
      const queryStartIndex = q.lastIndexOf('?') + 1;
      if (queryStartIndex === 0) {
        return;
      }
      const query = qs.parse(q.substring(queryStartIndex, q.length));
      if (!query) {
        return;
      }
      let { id, repo_id, token } = query;
      if (token) {
        authService.set(token);
      }
      if (!authService.get()) {
        toastMessage('需要先登陆才可以查看');
        return;
      }
      try {
        const response = yield getUser();
        yield put(refreshUserInfo(response.data));
        yield put(
          routerAction.redirectTo({
            param: {
              url: `/pages/recent/detail?${qs.stringify({ id, repo_id })}`
            }
          })
        );
        yield Taro.hideLoading();
      } catch (error) {
        toastMessage('Token 已经失效');
      }
    }
  });
}

export default function* () {
  yield fork(switchTab);
  yield fork(logout);
  yield fork(scanEnterSaga);
  yield fork(redirectToSaga);
  yield fork(loginSaga);
  yield fork(navigateTo);
  yield fork(detailRouterBackSaga);
}
