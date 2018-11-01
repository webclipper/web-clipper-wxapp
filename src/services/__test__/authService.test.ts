import AuthService from '../authService';
import { createStore } from 'redux';

jest.mock('redux-saga');

jest.mock('@tarojs/taro', () => {
  let initData = {};

  const setStorageSyncMock = (key, data) => {
    initData[key] = data;
  };
  const removeStorageSyncMock = () => {
    initData = {};
  };
  const getStorageSyncMock = key => {
    return initData[key];
  };

  return {
    default: {
      setStorageSync: setStorageSyncMock,
      removeStorageSync: removeStorageSyncMock,
      getStorageSync: getStorageSyncMock
    }
  };
});

describe('Test authService', () => {
  test('Test authService', () => {
    function user(state = 0, action) {
      switch (action.type) {
        case 'LOG_OuT':
          return state + 1;
        default:
          return state;
      }
    }
    const store = createStore(user);
    const action = () => {
      return {
        type: 'LOG_OuT'
      };
    };
    store.dispatch = jest.fn();

    AuthService.logout();
    expect(store.dispatch).toBeCalledTimes(0);

    AuthService.init(store, action);
    expect(AuthService.get()).toEqual('');

    const token = 'test_token';

    AuthService.set(token);
    expect(AuthService.get()).toEqual(token);

    AuthService.clear();
    expect(AuthService.get()).toEqual('');

    AuthService.set(token);
    AuthService.logout();
    expect(AuthService.get()).toEqual('');
    expect(store.dispatch).toBeCalledTimes(1);
    expect(store.dispatch).toBeCalledWith(action());
  });
});
