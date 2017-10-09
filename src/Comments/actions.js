export const GET_COMMENTS = 'GET_COMMENTS'

export function getComments ( comments ) {
  return {
    type: GET_COMMENTS,
    comments
  }
}
