import actionTypes from '../actionTypes';

const { DOC } = actionTypes;

export interface PageStateInterface {
  createdDocumentPageInitStatus: {
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
    case DOC.INIT_CREATED_DOC_LIST_REQUEST: {
      temp = {
        createdDocumentPageInitStatus: {
          loading: true,
          error: null
        }
      };
      break;
    }
    case DOC.INIT_CREATED_DOC_LIST: {
      temp = {
        createdDocumentPageInitStatus: {
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
