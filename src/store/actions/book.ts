import { fsa, action, payload } from 'ts-action';
import actionTypes from '../actionTypes';
const { BOOK } = actionTypes;

export const fetchUserBooksRequest = action(
  BOOK.FETCH_USER_BOOKS_REQUEST,
  payload<{ offset: number }>()
);

export const fetchUserBooks = action(
  BOOK.FETCH_USER_BOOKS,
  fsa<{ books: BookSerializer[] }>()
);
