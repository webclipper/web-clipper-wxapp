import { combineReducers } from 'redux';

import doc from './doc';
import user from './user';
import page from './page';

export default combineReducers({
  doc,
  user,
  page
});
