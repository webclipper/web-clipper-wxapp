import { switchTab } from '../router';

import { take } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import Taro from '@tarojs/taro';

import actionTypes from '../../actionTypes';

const { ROUTER } = actionTypes;
jest.mock('redux-saga');

jest.mock('@tarojs/taro', () => {
  const switchTabMock = jest.fn();
  switchTabMock.mockReturnValue({
    errMsg: 'switchTab:ok'
  });
  const getCurrentPagesMock = jest.fn();
  getCurrentPagesMock.mockReturnValueOnce([]);
  getCurrentPagesMock.mockReturnValue([1]);
  return {
    default: {
      switchTab: switchTabMock,
      getCurrentPages: getCurrentPagesMock
    }
  };
});

describe('test', () => {
  test('test', () => {
    const saga = switchTab();
    const data = {
      playload: {
        url: '/pages/recent/index'
      }
    };
    expect(saga.next().value).toEqual(take(ROUTER.SWITCH_TAB));
    expect(saga.next(data).value).toEqual(delay(100));
    expect(saga.next().value).toEqual({
      errMsg: 'switchTab:ok'
    });
    expect(Taro.switchTab).toBeCalledTimes(1);
    expect(Taro.switchTab).toHaveBeenCalledWith(data.playload);
  });
});
