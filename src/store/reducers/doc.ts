import { DocSerializer } from './../../interface/interface';
import actionTypes from '../actionTypes';

const { DOC } = actionTypes;

export interface DocStateInterface {
  page: number;
  createdDocs: DocSerializer[];
}

const defaultState: DocStateInterface = {
  page: 1,
  createdDocs: []
};

export default function doc(state = defaultState, action) {
  switch (action.type) {
    case DOC.INIT_CREATED_DOC_LIST: {
      return {
        page: 1,
        createdDocs: action.playload.createdDocs
      };
    }
    default: {
      return state;
    }
  }
}
