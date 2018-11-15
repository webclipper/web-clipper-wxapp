import { action, payload } from 'ts-action';
import actionTypes from '../actionTypes';

const { DOC } = actionTypes;

export const initCreatedDocListRequest = action(
  DOC.INIT_CREATED_DOC_LIST_REQUEST
);
export const initCreatedDocListError = action(DOC.INIT_CREATED_DOC_LIST_ERROR);

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

export const fetchDocumentDetailRequest = action(
  DOC.FETCH_DOCUMENT_DETAIL_REQUEST,
  (repoId: number, id: number) => ({
    playload: {
      id,
      repoId
    }
  })
);

export const fetchDocumentDetailSuccess = documentDetail => {
  return {
    type: DOC.FETCH_DOCUMENT_DETAIL_SUCCESS,
    playload: {
      documentDetail
    }
  };
};

export const fetchDocumentDetailError = action(
  DOC.FETCH_DOCUMENT_DETAIL_ERROR,
  payload<{ error: Error }>()
);

export const initCreatedDocList = action(
  DOC.INIT_CREATED_DOC_LIST,
  payload<{ createdDocs: DocSerializer[] }>()
);
