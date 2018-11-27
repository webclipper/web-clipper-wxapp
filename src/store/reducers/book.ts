import { isType } from 'ts-action';
import { fetchUserBooks } from '../actions/book';

const defaultState: BookStateInterface = {
  userBooks: []
};

export default function user(state = defaultState, action): BookStateInterface {
  if (isType(action, fetchUserBooks)) {
    if (action.error || action.payload instanceof Error) {
      return state;
    }
    //todo merge books
    return {
      userBooks: action.payload.books
    };
  }
  return state;
}
