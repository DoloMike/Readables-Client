import { GET_CATEGORIES } from './actions'

function categories (state = [], action) {
  const { categories } = action
  
  switch(action.type) {
      case GET_CATEGORIES :
        return categories;
      default :
        return state;
    }
}

export default categories
