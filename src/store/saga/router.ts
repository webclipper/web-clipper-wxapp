import { getUser } from '../../services/api';
import authService from '../..//services/authService';
import * as routerAction from './../actions/router';
import { refreshUserInfo } from './../actions/user';
import actionTypes from '../actionTypes';
const { ROUTER } = actionTypes;
import Taro from '@tarojs/taro';
import { delay } from 'redux-saga';
import { take, takeLatest, put, fork } from 'redux-saga/effects';

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

function* login(action: routerAction.LoginAction) {
  let { playload } = action;
  if (!playload || !playload.token) {
    Taro.showToast({
      title: 'Token 不允许空',
      icon: 'none'
    });
    return;
  }
  try {
    authService.set(playload.token);
    const response = yield getUser();
    yield put(refreshUserInfo(response.data));
    yield put(routerAction.switchTab('/pages/recent/index'));
  } catch (error) {
    if (error.message.indexOf('401') !== -1) {
      Taro.showToast({
        title: '无效的 Token',
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

export function* routerSages() {
  yield fork(navigateTo);
  yield takeLatest<{ type: string; playload: { token: string } }>(
    ROUTER.LOGIN,
    login
  );
}
