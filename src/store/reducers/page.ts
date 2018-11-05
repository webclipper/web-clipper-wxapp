import actionTypes from '../actionTypes';

const { DOC } = actionTypes;

export enum pageStataus {
  NONE = 'NONE',
  LOADING = 'LOADING',
  ERROR = 'ERROR'
}

export interface PageStateInterface {
  createdDocumentList: pageStataus;
  documentDetail: pageStataus;
}

const defaultState = {
  createdDocumentList: pageStataus.NONE,
  documentDetail: pageStataus.NONE
};

export default function page(state = defaultState, action) {
  switch (action.type) {
    case DOC.CREATED_DOCUMENT_PULL_DOWN_REFRESH_REQUEST: {
      return {
        ...state,
        createdDocumentList: pageStataus.LOADING
      };
    }
    case DOC.INIT_CREATED_DOC_LIST_REQUEST: {
      return {
        ...state,
        createdDocumentList: pageStataus.LOADING
      };
    }
    case DOC.INIT_CREATED_DOC_LIST: {
      return {
        ...state,
        createdDocumentList: pageStataus.NONE
      };
    }
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
