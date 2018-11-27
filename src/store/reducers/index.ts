import { combineReducers } from 'redux';

import doc from './doc';
import user from './user';
import page from './page';
import book from './book';

export default combineReducers({
  book,
  doc,
  user,
  page
});
