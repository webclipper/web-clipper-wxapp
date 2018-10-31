import actionTypes from '../actionTypes';

const { COUNTER } = actionTypes;

export const add = () => {
  return {
    type: COUNTER.ADD
  };
};
export const minus = () => {
  return {
    type: COUNTER.MINUS
  };
};

export const addAsync = () => {
  return {
    type: COUNTER.ADD_ASYNC
  };
};