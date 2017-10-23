import { ADD_COMMENT } from './actions'

function posts (state = [], action) {
  switch(action.type) {
    case ADD_COMMENT :
      const { posts } = [...state]
      const { comment } = action

      console.log(comment, posts)

      return state;

    default :
      return state;
  }
}

export default posts
