import counter from '../counter';
import actionTypes from '../../actionTypes';

const { COUNTER } = actionTypes;

describe('测试 counter reducer', () => {

  test('测试 reduce COUNTER.ADD 结果', async () => {
    const defaultState = {
      count: 0
    };
    expect(counter(defaultState, { type: COUNTER.ADD })).toEqual({
      count: 1
    });
  });

  test('测试 reduce COUNTER.MINUS 结果', async () => {
    const defaultState = {
      count: 0
    };
    expect(counter(defaultState, { type: COUNTER.MINUS })).toEqual({
      count: -1
    });
  });

  test('测试默认 reduce 结果', async () => {
    const defaultState = {
      count: 0
    };
    expect(counter(defaultState, { type: COUNTER.ADD_ASYNC })).toEqual({
      count: 0
    });
  });

});