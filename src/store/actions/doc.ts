import { DocStateInterface } from 'src/store/reducers/doc';
import actionTypes from '../actionTypes';

const { DOC } = actionTypes;

export const initCreatedDocListRequest = () => {
  return {
    type: DOC.INIT_CREATED_DOC_LIST_REQUEST
  };
};

export const initCreatedDocList = (docs: DocStateInterface) => {
  return {
    type: DOC.INIT_CREATED_DOC_LIST,
    playload: {
      createdDocs: docs
    }
  };
};
