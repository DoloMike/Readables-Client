export const GET_POSTS = 'GET_POSTS'
export const GET_COMMENTS = 'GET_COMMENTS'

export function getPosts ( posts ) {
  return {
    type: GET_POSTS,
    posts
  }
}

export function getComments ( posts, comments ) {
  return {
    type: GET_COMMENTS,
    posts,
    comments
  }
}
