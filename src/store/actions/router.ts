import actionTypes from '../actionTypes';

const { ROUTER } = actionTypes;

export const switchTab = (url: string) => {
  return {
    type: ROUTER.SWITCH_TAB,
    data: {
      url
    }
  };
};