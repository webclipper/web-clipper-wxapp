import actionTypes from '../actionTypes';
const { ROUTER } = actionTypes;
import Taro from '@tarojs/taro';
import { delay } from 'redux-saga';
import { take } from 'redux-saga/effects';

export function* switchTab() {
  while (true) {
    const { playload } = yield take(ROUTER.SWITCH_TAB) as any;
    while (Taro.getCurrentPages().length === 0) {
      yield delay(100);
    }
    yield Taro.switchTab(playload);
  }
}
