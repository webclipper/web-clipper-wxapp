import actionTypes from '../actionTypes';
import { isType } from 'ts-action';
import {
  initCreatedDocListError,
  initCreatedDocListSuccess,
  initCreatedDocListRequest,
  fetchDocumentDetailRequest,
  fetchDocumentDetailSuccess,
  fetchDocumentDetailError
} from '../actions/doc';
import { fetchUserBooks, fetchUserBooksRequest } from '../actions/book';

const { DOC, ROUTER } = actionTypes;

const defaultState: Optional<PageStateInterface> = {
  createdDocumentPageInitStatus: {
    startInit: false,
    loading: false,
    error: null
  },
  documentDetailInit: {
    loading: false,
    error: null
  },
  createdDocumentLoadingMore: {
    end: false,
    loading: false,
    error: null
  },
  userBooksPageStatus: {
    loading: false,
    error: null
  }
};

export default function page(
  state = defaultState,
  action
): Optional<PageStateInterface> {
  if (isType(action, fetchUserBooks)) {
    if (action.error && action.payload instanceof Error) {
      return {
        ...state,
        userBooksPageStatus: {
          loading: false,
          error: action.payload
        }
      };
    }
    return {
      ...state,
      userBooksPageStatus: {
        loading: false,
        error: null
      }
    };
  }
  if (isType(action, fetchUserBooksRequest)) {
    return {
      ...state,
      userBooksPageStatus: {
        loading: true,
        error: null
      }
    };
  }
  if (isType(action, initCreatedDocListRequest)) {
    return {
      ...state,
      createdDocumentPageInitStatus: {
        startInit: true,
        loading: true,
        error: null
      }
    };
  }
  if (isType(action, initCreatedDocListSuccess)) {
    return {
      ...state,
      createdDocumentPageInitStatus: {
        startInit: true,
        loading: false,
        error: null
      }
    };
  }
  if (isType(action, initCreatedDocListError)) {
    return {
      ...state,
      createdDocumentPageInitStatus: {
        startInit: true,
        loading: false,
        error: action.payload.error
      }
    };
  }
  if (isType(action, fetchDocumentDetailRequest)) {
    return {
      ...state,
      documentDetailInit: {
        loading: true,
        error: null
      }
    };
  }
  if (isType(action, fetchDocumentDetailSuccess)) {
    return {
      ...state,
      documentDetailInit: {
        loading: false,
        error: null
      }
    };
  }
  if (isType(action, fetchDocumentDetailError)) {
    return {
      ...state,
      documentDetailInit: {
        loading: false,
        error: action.payload.error
      }
    };
  }
  let temp: Optional<PageStateInterface> = {};
  switch (action.type) {
    case ROUTER.LOGOUT: {
      return defaultState;
    }
    case DOC.FETCH_MORE_DOC_REQUEST: {
      temp = {
        createdDocumentLoadingMore: {
          end: false,
          loading: true,
          error: null
        }
      };
      break;
    }
    case DOC.FETCH_MORE_DOC_SUCCESS: {
      temp = {
        createdDocumentLoadingMore: {
          end: false,
          loading: false,
          error: null
        }
      };
      break;
    }
    case DOC.FETCH_MORE_DOC_END: {
      temp = {
        createdDocumentLoadingMore: {
          end: true,
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
