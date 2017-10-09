import { GET_POSTS, GET_COMMENTS } from './actions'

function posts (state = [], action) {
  let posts = []

  switch(action.type) {
    case GET_POSTS :
      posts = action.posts
      return posts
    case GET_COMMENTS :
      const { comments } = action
      posts = action.posts

      posts = posts.map(post => {
        const postComments = comments.filter(
          comment => comment.parentId === post.id
        )

        if(postComments.length > 0) {
          post.comments = postComments
        }

        return post
      })

      return posts
    default :
      return state;
  }
}

export default posts
