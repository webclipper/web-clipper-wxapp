import page from '../page';
/*eslint "no-undefined": 0,*/

describe('test page reducer', () => {
  /** 期望 state 初始化正确' */
  it('should return the initial state', () => {
    const initState = {
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

    expect(page(undefined, {})).toEqual(initState);
  });
});