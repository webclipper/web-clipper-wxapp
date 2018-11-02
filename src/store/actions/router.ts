import actionTypes from '../actionTypes';

const { ROUTER } = actionTypes;

export const switchTab = (url: string) => {
  return {
    type: ROUTER.SWITCH_TAB,
    playload: {
      url
    }
  };
};

export const logout = () => {
  return {
    type: ROUTER.LOGOUT
  };
};
