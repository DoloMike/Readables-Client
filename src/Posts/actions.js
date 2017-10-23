export const GET_POSTS = 'GET_POSTS'
export const GET_COMMENTS = 'GET_COMMENTS'
export const ADD_POST = 'ADD_POST'
export const SORT_POSTS = 'SORT_POSTS'
export const VOTE_POST = 'VOTE_POST'

export function getPosts ( posts ) {
  return {
    type: GET_POSTS,
    posts
  }
}

export function getComments ( comments ) {
  return {
    type: GET_COMMENTS,
    comments
  }
}

export function addPost ( newPost ) {
  return {
    type: ADD_POST,
    newPost
  }
}

export function sortPosts ( sortByValue ) {
  return {
    type: SORT_POSTS,
    sortByValue
  }
}

export function votePost( voteScore, postId ) {
  return {
    type: VOTE_POST,
    voteScore,
    postId
  }
}
