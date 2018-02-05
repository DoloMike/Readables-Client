export const ADD_COMMENT = 'ADD_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'

export function addComment ( comment ) {
  return {
    type: ADD_COMMENT,
    comment
  }
}

export function voteComment ( voteScore, commentId ) {
  return {
    type: VOTE_COMMENT,
    voteScore,
    commentId
  }
}
