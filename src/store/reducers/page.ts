import actionTypes from '../actionTypes';

const { DOC, ROUTER } = actionTypes;

export interface PageStateInterface {
  createdDocumentPageInitStatus: {
    startInit: boolean;
    loading: boolean;
    error: null | Error;
  };
  documentDetailInit: {
    loading: boolean;
    error: null | Error;
  };
}

const defaultState: Optional<PageStateInterface> = {
  createdDocumentPageInitStatus: {
    startInit: false,
    loading: false,
    error: null
  },
  documentDetailInit: {
    loading: false,
    error: null
  }
};

export default function page(state = defaultState, action) {
  let temp: Optional<PageStateInterface> = {};
  switch (action.type) {
    case ROUTER.LOGOUT: {
      return defaultState;
    }
    case DOC.INIT_CREATED_DOC_LIST_REQUEST: {
      temp = {
        createdDocumentPageInitStatus: {
          startInit: true,
          loading: true,
          error: null
        }
      };
      break;
    }
    case DOC.INIT_CREATED_DOC_LIST: {
      temp = {
        createdDocumentPageInitStatus: {
          ...state.createdDocumentPageInitStatus!,
          loading: false,
          error: null
        }
      };
      break;
    }
    default: {
      break;
    }
  }
  return Object.assign({}, state, temp);
}
