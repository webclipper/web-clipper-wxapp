import { minus, add, addAsync } from '../counter';
import actionTypes from '../../actionTypes';

const { COUNTER } = actionTypes;

describe('测试 actions', () => {

  test('测试 action ', () => {
    expect(add()).toEqual({
      type: COUNTER.ADD
    });
    expect(minus()).toEqual({
      type: COUNTER.MINUS
    });
    expect(addAsync()).toEqual({
      type: COUNTER.ADD_ASYNC
    });

  });
});