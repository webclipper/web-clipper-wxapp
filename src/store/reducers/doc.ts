import actionTypes from '../actionTypes';
import update from 'immutability-helper';
import { isType } from 'ts-action';
import { fetchMoreDocSuccess, initCreatedDocList } from '../actions/doc';

const { DOC, ROUTER } = actionTypes;

const defaultState: DocStateInterface = {
  createdDocs: [],
  docDetailMap: {}
};

export function mergeCreatedDocList(
  list1: DocSerializer[],
  list2: DocSerializer[]
): DocSerializer[] {
  if (!list1 || list1.length === 0) {
    return list2 || [];
  }
  if (!list2 || list2.length === 0) {
    return list1 || [];
  }
  const result: DocSerializer[] = [];
  let index1 = 0;
  let index2 = 0;
  while (index1 < list1.length || index2 < list2.length) {
    const node1 = list1[index1];
    const node2 = list2[index2];
    const id1 = node1 ? node1.id : -Infinity;
    const id2 = node2 ? node2.id : -Infinity;
    if (id1 < id2) {
      result.push(node2);
      index2++;
    } else if (id1 === id2) {
      result.push(node1);
      index1++;
      index2++;
    } else {
      result.push(node1);
      index1++;
    }
  }
  return result;
}

export default function doc(state = defaultState, action) {
  if (isType(action, fetchMoreDocSuccess)) {
    return {
      ...state,
      createdDocs: mergeCreatedDocList(state.createdDocs, action.payload.docs)
    };
  }
  if (isType(action, initCreatedDocList)) {
    return {
      ...state,
      createdDocs: action.payload.createdDocs
    };
  }
  switch (action.type) {
    case ROUTER.LOGOUT: {
      return defaultState;
    }
    case DOC.FETCH_DOCUMENT_DETAIL_SUCCESS: {
      const documentDetail = action.playload.documentDetail;
      const docDetailMap = update(state.docDetailMap, {
        [documentDetail.id]: {
          $set: {
            title: documentDetail.title,
            body: documentDetail.body
          }
        }
      });
      return {
        ...state,
        docDetailMap
      };
    }
    default: {
      return state;
    }
  }
}
