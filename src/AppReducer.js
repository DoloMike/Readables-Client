import categories from './Categories/reducer';
import posts from './Posts/reducer';
//import comments from './Comments/reducer'
import { combineReducers } from 'redux';

export default combineReducers({
  categories,
  posts,
  //comments,
})
