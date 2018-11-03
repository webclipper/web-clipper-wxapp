const COUNTER = {
  ADD: 'COUNTER_ADD',
  MINUS: 'COUNTER_MINUS',
  ADD_ASYNC: 'COUNTER_ADD_ASYNC'
};

const ROUTER = {
  /** 退出登录 返回初始页面 */
  LOGOUT: 'ROUTER_LOGOUT',
  /** 切换 Tab */
  SWITCH_TAB: 'ROUTER_SWITCH_TAB',
  /** 登陆请求 */
  LOGIN: 'ROUTER_LOGIN'
};

const USER = {
  /** 请求用户信息 */
  REFRESH_USER_INFO_REQUEST: 'USER_REFRESH_USER_INFO_REQUEST',
  /** 刷新用户信息 */
  REFRESH_USER_INFO: 'USER_REFRESH_USER_INFO'
};

const DOC = {
  /** 获取用户文档列表 */
  FETCH_CREATED_DOC_REQUEST: 'DOC_FETCH_CREATED_DOC_REQUEST',
  /** 刷新用户创建的文档列表 */
  INIT_CREATED_DOC_LIST: 'DOC_INIT_CREATED_DOC_LIST'
};

export default {
  COUNTER,
  ROUTER,
  USER,
  DOC
};
