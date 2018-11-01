import Taro from '@tarojs/taro';
import { Store, AnyAction } from 'redux';

const authTokenKey = 'authTokenKey';

class AuthService {
  private store?: Store | null;

  private logoutAction: () => AnyAction;

  constructor() {
    this.store = null;
  }

  public init(store, logoutAction) {
    this.store = store;
    this.logoutAction = logoutAction;
  }

  public set(token) {
    Taro.setStorageSync(authTokenKey, token);
  }

  public logout() {
    this.clear();
    if (this.store) {
      this.store.dispatch(this.logoutAction());
    }
  }

  public get() {
    const auth = Taro.getStorageSync(authTokenKey);
    return auth || '';
  }

  public clear() {
    Taro.removeStorageSync(authTokenKey);
  }
}

export default new AuthService();
