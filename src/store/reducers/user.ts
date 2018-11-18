import actionTypes from '../actionTypes';

const { USER, ROUTER } = actionTypes;

const defaultState: UserStateInterface = {};

export default function user(state = defaultState, action) {
  switch (action.type) {
    case ROUTER.LOGOUT: {
      return {};
    }
    case USER.REFRESH_USER_INFO: {
      return {
        ...state,
        userInfo: action.playload.userInfo
      };
    }
    default: {
      return state;
    }
  }
}
