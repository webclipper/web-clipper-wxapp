import { DocSerializer } from './../../interface/interface';

export interface DocStateInterface {
  createdDocs: DocSerializer[];
}

const defaultState: DocStateInterface = {
  createdDocs: []
};

export default function doc(state = defaultState, action) {
  switch (action.type) {
    default: {
      return state;
    }
  }
}
