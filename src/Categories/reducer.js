import { GET_CATEGORIES } from './actions'
import keyIndex from '../utils/keyIndex'

function categories (state = [], action) {
  let { categories } = action

  switch(action.type) {
      case GET_CATEGORIES :
        categories.push({name: 'All', path:'All'})
        categories = keyIndex(categories, 1)
        return categories.sort((a, b) => a.name > b.name)
      default :
        return state;
    }
}

export default categories
