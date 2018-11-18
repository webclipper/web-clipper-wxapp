import actionTypes from '../actionTypes';
import { action, payload } from 'ts-action';

const { ROUTER } = actionTypes;

export const switchTab = (url: string) => {
  return {
    type: ROUTER.SWITCH_TAB,
    playload: {
      url
    }
  };
};

export const navigateTo = (param: Taro.navigateTo.Param) => {
  return {
    type: ROUTER.NAVIGATE_TO,
    playload: param
  };
};

export const logout = action(ROUTER.LOGOUT);

export const detailRouterBack = action(ROUTER.DETAIL_ROUTER_BACK);

export const scanEnter = action(ROUTER.SCAN_ENTER, payload<{ q: string }>());

export const redirectTo = action(
  ROUTER.REDIRECT_TO,
  payload<{ param: Taro.redirectTo.Param }>()
);

export const login = action(
  ROUTER.LOGIN,
  payload<{ token: string; q: string }>()
);
