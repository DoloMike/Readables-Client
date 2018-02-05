import React, { Component } from 'react';
import { connect } from 'react-redux'

import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import ArrowDown from 'material-ui/svg-icons/navigation/arrow-downward';
import ArrowUp from 'material-ui/svg-icons/navigation/arrow-upward';

import { getComments } from '../Posts/actions'

import { postCommentVote, fetchComments } from '../utils/api'

const styles = {
  smallIcon: {
    width: 36,
    height: 36,
  },
  small: {
    width: 72,
    height: 72,
    padding: 16,
  },
  cardStyle: {
    marginTop: 5,
    paddingBottom: 35,
    backgroundColor: 'gray'
  },
  floatRight: {
    float: 'right'
  },
  voteButton: {
    float: 'right',
    top: -5
  },
  footerGap: {
    height: '5em'
  }
}

class Comments extends Component {
  apiPostVote = ( vote, commentId ) => {
    const { gotComments } = this.props
    vote = {option: vote}

    postCommentVote(vote, commentId)
    .then(comment => {
      fetchComments(comment.parentId)
      .then(comments => {
        gotComments( comments )
      })
    })
  }

  goToPostDetail = (postId) => {
    this.props.navToPost(postId)
  }

  render() {
    const currentPost = this.props.currentPost
    const comments = currentPost.comments ? currentPost.comments : []

    return (
      <div className="post-list">
        {comments.map((comment) => (
          <div key={comment.id}>
            <Card style={styles.cardStyle}>
              <CardTitle title={comment.title} subtitle={`${comment.author} | ${new Date(comment.timestamp).toLocaleString("en-US")}`}/>
              <CardText>
                {comment.body}
              </CardText>
              <CardActions>

                <IconButton style={styles.voteButton} onClick={() => this.apiPostVote('upVote', comment.id)}>
                  <ArrowUp />
                </IconButton>
                <RaisedButton style={styles.floatRight} label={'Votes ' + comment.voteScore} disabled={true}/>
                <IconButton style={styles.voteButton} onClick={() => this.apiPostVote('downVote', comment.id)}>
                  <ArrowDown />
                </IconButton>
              </CardActions>
            </Card>
          </div>
        ))}
        <div style={styles.footerGap}></div>
      </div>
    )
  }
}

function mapStateToProps ({ posts, router }) {
  return {
    posts,
    router
  }
}

function mapDispatchToProps (dispatch) {
  return {
    gotComments: (comments) => dispatch(getComments( comments )),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comments)
