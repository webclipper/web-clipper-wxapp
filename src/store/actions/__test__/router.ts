import { switchTab } from '../router';
import actionTypes from '../../actionTypes';

const { ROUTER } = actionTypes;

describe('测试 actions', () => {

  test('测试 action ', () => {
    expect(switchTab('/home')).toEqual({
      type: ROUTER.SWITCH_TAB,
      url: '/home'
    });
  });
});