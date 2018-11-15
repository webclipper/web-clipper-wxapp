import actionTypes from '../actionTypes';

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
    case DOC.INIT_CREATED_DOC_LIST_ERROR: {
      temp = {
        createdDocumentPageInitStatus: {
          startInit: true,
          loading: false,
          error: 'we'
        }
      };
      break;
    }
    case DOC.INIT_CREATED_DOC_LIST: {
      temp = {
        createdDocumentPageInitStatus: {
          startInit: true,
          loading: false,
          error: null
        }
      };
      break;
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
