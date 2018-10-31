import { incrementAsync, addAsync } from '../counter';

import { delay } from 'redux-saga';
import { put, takeEvery } from 'redux-saga/effects';
import actionTypes from '../../actionTypes';

const { COUNTER } = actionTypes;

jest.mock('redux-saga');

describe('测试 counter saga', () => {

  test('测试 addAsync 接受 action', async () => {
    const saga = addAsync();
    expect(saga.next().value).toEqual(takeEvery(COUNTER.ADD_ASYNC, incrementAsync));
  });

  test('测试 incrementAsync 延迟 put', async () => {
    const saga = incrementAsync();
    expect(saga.next().value).toEqual(delay(1000));
    expect(saga.next().value).toEqual(put({
      type: COUNTER.ADD
    }));

  });

});