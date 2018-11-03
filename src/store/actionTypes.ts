const COUNTER = {
  ADD: 'ADD',
  MINUS: 'MINUS',
  ADD_ASYNC: 'ADD_ASYNC'
};

const ROUTER = {
  /** 退出登录 返回初始页面 */
  LOGOUT: 'LOGOUT',
  /** 切换 Tab */
  SWITCH_TAB: 'SWITCH_TAB',
  /** 登陆请求 */
  LOGIN: 'LOGIN'
};

const USER = {
  /** 请求用户信息 */
  REFRESH_USER_INFO_REQUEST: 'REFRESH_USER_INFO_REQUEST',
  /** 刷新用户信息 */
  REFRESH_USER_INFO: 'REFRESH_USER_INFO'
};

const DOC = {
  /** 获取用户文档列表 */
  FETCH_CREATED_DOC_REQUEST: 'FETCH_CREATED_DOC_REQUEST',
  /** 重置最新的文档列表 */
  INIT_CREATED_DOC_LIST: 'INIT_CREATED_DOC_LIST',
  /** 请求重置最新的文档列表 */
  INIT_CREATED_DOC_LIST_REQUEST: 'INIT_CREATED_DOC_LIST_REQUEST'
};

export default {
  COUNTER,
  ROUTER,
  USER,
  DOC
};
