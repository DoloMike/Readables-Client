import { GET_POSTS, GET_COMMENTS, ADD_POST, SORT_POSTS, VOTE_POST } from './actions'

function posts (state = [], action) {
  switch(action.type) {
    case GET_POSTS :
      // default to most upvoted first
      return action.posts.sort((a, b) => a.voteScore < b.voteScore)

    case GET_COMMENTS :
      const { comments } = action
      const commentsParentId = comments.length ? comments[0].parentId : ''
      let posts = [...state]

      return posts.map(post => {
        // add comments and comments.length as props
        if(post.id === commentsParentId) {
          post.comments = comments
          post.commentNum = post.comments.length
        }

        return post
      })

    case ADD_POST :
      return [...state, action.newPost]

    case SORT_POSTS :
      const { sortByValue } = action
      posts = [...state]

      if (sortByValue==='Votes') {
        posts = posts.sort((a, b) => a.voteScore < b.voteScore)
      } else if (sortByValue==='Most Recent') {
        posts = posts.sort((a, b) => a.timestamp < b.timestamp)
      }
      return posts

    case VOTE_POST :
      const { voteScore, postId } = action
      posts = [...state]

      return posts.map(post => {
        if(post.id === postId) {
          post.voteScore = voteScore
        }
        return post
      })
    default :
      return state;
  }
}

export default posts
