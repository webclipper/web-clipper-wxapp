import page from '../page';
/*eslint "no-undefined": 0,*/

describe('test page reducer', () => {
  it('期望 state 初始化正确', () => {
    const initState = {
      createdDocumentPageInitStatus: {
        loading: false,
        error: null
      },
      documentDetailInit: {
        loading: false,
        error: null
      }
    };
    expect(page(undefined, {})).toEqual(initState);
  });
});
