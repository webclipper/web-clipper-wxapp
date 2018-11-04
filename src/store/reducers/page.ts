import actionTypes from '../actionTypes';

const { DOC } = actionTypes;

export enum pageStataus {
  NONE = 'NONE',
  LOADING = 'LOADING',
  ERROR = 'ERROR'
}

export interface DocStateInterface {
  documentDetail: pageStataus;
}

const defaultState = {
  documentDetail: pageStataus.NONE
};

export default function page(state = defaultState, action) {
  switch (action.type) {
    case DOC.FETCH_DOCUMENT_DETAIL_REQUEST: {
      return {
        ...state,
        documentDetail: pageStataus.LOADING
      };
    }
    case DOC.FETCH_DOCUMENT_DETAIL_SUCCESS: {
      return {
        ...state,
        documentDetail: pageStataus.NONE
      };
    }
    case DOC.FETCH_DOCUMENT_DETAIL_ERROR: {
      return {
        ...state,
        documentDetail: pageStataus.ERROR
      };
    }
    default: {
      return state;
    }
  }
}
