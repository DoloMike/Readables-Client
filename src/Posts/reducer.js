import { GET_POSTS, GET_COMMENTS, ADD_POST } from './actions'

function posts (state = [], action) {
  let posts = []

  switch(action.type) {
    case GET_POSTS :
      posts = action.posts
      posts = posts.map(post => {
        const commentNum = post.comments ? post.comments.length : 0
        post.commentNumText = commentNum + ' comments'
        return post
      })
      return posts
    case GET_COMMENTS :
      const { comments } = action
      posts = [...state]

      posts = posts.map(post => {
        const postComments = comments.filter(
          comment => comment.parentId === post.id
        )

        if(postComments.length > 0) {
          post.comments = postComments
        }

        return post
      })

      posts = posts.map(post => {
        const commentNum = post.comments ? post.comments.length : 0
        post.commentNumText = commentNum + ' comments'
        return post
      })

      return posts
    case ADD_POST :
      posts = [...state, action.newPost]
      posts = posts.map(post => {
        const commentNum = post.comments ? post.comments.length : 0
        post.commentNumText = commentNum + ' comments'
        return post
      })
      return posts
    default :
      return state;
  }
}

export default posts
