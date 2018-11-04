import { action } from 'ts-action';
import { DocStateInterface } from 'src/store/reducers/doc';
import actionTypes from '../actionTypes';

const { DOC } = actionTypes;

export const initCreatedDocListRequest = action(
  DOC.INIT_CREATED_DOC_LIST_REQUEST
);

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

export const fetchDocumentDetailError = action(DOC.FETCH_DOCUMENT_DETAIL_ERROR);

export const initCreatedDocList = (docs: DocStateInterface) => {
  return {
    type: DOC.INIT_CREATED_DOC_LIST,
    playload: {
      createdDocs: docs
    }
  };
};
