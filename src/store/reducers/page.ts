export interface PageStateInterface {
  createdDocumentPage: {
    init: {
      loading: boolean;
      error: null | Error;
    };
  };
  documentDetail: {
    init: {
      loading: boolean;
      error: null | Error;
    };
  };
}

const defaultState: Optional<PageStateInterface> = {
  createdDocumentPage: {
    init: {
      loading: false,
      error: null
    }
  },
  documentDetail: {
    init: {
      loading: false,
      error: null
    }
  }
};

export default function page(state = defaultState, action) {
  const temp: Optional<PageStateInterface> = {};

  switch (action.type) {
    default: {
      break;
    }
  }
  return Object.assign({}, state, temp);
}
