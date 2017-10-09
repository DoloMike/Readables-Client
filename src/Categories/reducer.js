import { GET_CATEGORIES } from './actions'
import keyIndex from 'react-key-index'

function categories (state = [], action) {
  let { categories } = action

  switch(action.type) {
      case GET_CATEGORIES :
        categories = keyIndex(categories, 1)
        return categories;
      default :
        return state;
    }
}

export default categories
