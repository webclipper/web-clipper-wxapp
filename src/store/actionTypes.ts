const COUNTER = actionTypeReset('COUNTER', {
  ADD: 'ADD',
  MINUS: 'MINUS',
  ADD_ASYNC: 'ADD_ASYNC'
}) as {
  ADD;
  MINUS;
  ADD_ASYNC;
};

const ROUTER = actionTypeReset('ROUTER', {
  NAVIGATE_TO: '',
  LOGOUT: '',
  SWITCH_TAB: '',
  LOGIN: ''
}) as {
  /** 页面跳转 */
  NAVIGATE_TO;
  /** 退出登录*/
  LOGOUT;
  /** Tab 切换*/
  SWITCH_TAB;
  /** 登陆 */
  LOGIN;
};

const USER = actionTypeReset('USER', {
  REFRESH_USER_INFO_REQUEST: '',
  REFRESH_USER_INFO: ''
}) as {
  /** 请求用户信息 */
  REFRESH_USER_INFO_REQUEST;
  /** 刷新用户信息 */
  REFRESH_USER_INFO;
};

const DOC = actionTypeReset('DOC', {
  FETCH_CREATED_DOC_REQUEST: '',
  INIT_CREATED_DOC_LIST: '',
  FETCH_DOCUMENT_DETAIL_REQUEST: '',
  FETCH_DOCUMENT_DETAIL_SUCCESS: '',
  FETCH_DOCUMENT_DETAIL_ERROR: '',
  INIT_CREATED_DOC_LIST_REQUEST: ''
} as {
  FETCH_CREATED_DOC_REQUEST;
  /** 初始化用户创建的文档的列表 */
  INIT_CREATED_DOC_LIST;
  /** 获取文档详情 */
  FETCH_DOCUMENT_DETAIL_REQUEST;
  /** 获取文档详情成功 */
  FETCH_DOCUMENT_DETAIL_SUCCESS;
  /** 获取文档详情失败 */
  FETCH_DOCUMENT_DETAIL_ERROR;
  INIT_CREATED_DOC_LIST_REQUEST;
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
