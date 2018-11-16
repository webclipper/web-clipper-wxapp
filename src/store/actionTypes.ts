const COUNTER = actionTypeReset('COUNTER', {
  ADD: '',
  MINUS: '',
  ADD_ASYNC: ''
});

const ROUTER = actionTypeReset('ROUTER', {
  NAVIGATE_TO: '',
  LOGOUT: '',
  SWITCH_TAB: '',
  LOGIN: ''
});

const USER = actionTypeReset('USER', {
  /** 请求刷新用户信息 */
  REFRESH_USER_INFO_REQUEST: '',
  REFRESH_USER_INFO: ''
});

const DOC = actionTypeReset('DOC', {
  /** 请求更多的文档 */
  FETCH_MORE_DOC_REQUEST: '',
  /** 请求更多的文档成功 */
  FETCH_MORE_DOC_SUCCESS: '',
  /** 没有更多文档了 */
  FETCH_MORE_DOC_END: '',
  FETCH_CREATED_DOC_REQUEST: '',
  INIT_CREATED_DOC_LIST: '',
  FETCH_DOCUMENT_DETAIL_REQUEST: '',
  FETCH_DOCUMENT_DETAIL_SUCCESS: '',
  FETCH_DOCUMENT_DETAIL_ERROR: '',
  INIT_CREATED_DOC_LIST_REQUEST: '',
  INIT_CREATED_DOC_LIST_ERROR: '',
  CREATED_DOCUMENT_FETCH_ERROR: '',
  DELETE_DOCUMENT_REQUEST: '',
  /** 删除文档成功 */
  DELETE_DOCUMENT_SUCCESS: '',
  /** 最新文档页面的下拉刷新 */
  CREATED_DOCUMENT_PULL_DOWN_REFRESH_REQUEST: ''
});

function actionTypeReset<T>(nameSpace, object: T): T {
  Object.keys(object).forEach(key => {
    object[key] = `${nameSpace}/${key}`;
  });
  return object;
}

export default {
  COUNTER,
  ROUTER,
  USER,
  DOC
};
