import { action, payload } from 'ts-action';
import actionTypes from '../actionTypes';

const { DOC } = actionTypes;

export const initCreatedDocListRequest = action(
  DOC.INIT_CREATED_DOC_LIST_REQUEST
);
export const initCreatedDocListSuccess = action(
  DOC.INIT_CREATED_DOC_LIST_SUCCESS,
  payload<{ createdDocs: DocSerializer[] }>()
);
export const initCreatedDocListError = action(
  DOC.INIT_CREATED_DOC_LIST_ERROR,
  payload<{ error: Error }>()
);
/** 最新文档页面的下拉刷新 */
export const createdDocumentPulldownRefreshRequest = action(
  DOC.CREATED_DOCUMENT_PULL_DOWN_REFRESH_REQUEST
);

/** 请求更多的文档成功 */
export const fetchMoreDocSuccess = action(
  DOC.FETCH_MORE_DOC_SUCCESS,
  payload<{ docs: DocSerializer[] }>()
);
/** 请求更多的文档 */
export const fetchMoreDocRequest = action(DOC.FETCH_MORE_DOC_REQUEST);

/** 没有更多文档了 */
export const fetchMoreDocEnd = action(DOC.FETCH_MORE_DOC_END);

/** 删除文档请求 */
export const deleteDocumentRequest = action(
  DOC.DELETE_DOCUMENT_REQUEST,
  payload<{ repoId: number; id: number }>()
);

/** 删除文档成功 */
export const deleteDocumentSuccess = action(
  DOC.DELETE_DOCUMENT_SUCCESS,
  payload<{ id: number }>()
);

export const fetchDocumentDetailRequest = action(
  DOC.FETCH_DOCUMENT_DETAIL_REQUEST,
  payload<{ repoId: number; id: number }>()
);

export const fetchDocumentDetailSuccess = action(
  DOC.FETCH_DOCUMENT_DETAIL_SUCCESS,
  payload<{ documentDetail: DocumentDetailSerializer }>()
);

export const fetchDocumentDetailError = action(
  DOC.FETCH_DOCUMENT_DETAIL_ERROR,
  payload<{ error: Error }>()
);
