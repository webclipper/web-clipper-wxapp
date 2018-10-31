import actionTypes from '../actionTypes';

const { COUNTER } = actionTypes;

const defaultState = {
  count: 0
};

export default function counter(state = defaultState, action) {
  switch (action.type) {
    case COUNTER.ADD: {
      return {
        count: state.count + 1
      };
    }
    case COUNTER.MINUS: {
      return {
        count: state.count - 1
      };
    }
    default: {
      return state;
    }
  }
}