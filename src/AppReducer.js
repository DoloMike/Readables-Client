import categories from './Categories/reducer';
import posts from './Posts/reducer';
//import comments from './Comments/reducer'
import { combineReducers } from 'redux';
import { routerReducer, } from 'react-router-redux'

export default combineReducers({
  categories,
  posts,
  router: routerReducer
})
