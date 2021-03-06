import React, { Component } from 'react';
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import ArrowDown from 'material-ui/svg-icons/navigation/arrow-downward';
import ArrowUp from 'material-ui/svg-icons/navigation/arrow-upward';

import { votePost } from './actions'
import { postVote } from '../utils/api'

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
  cardMargin: {
    marginTop: 5
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

class PostList extends Component {
  apiPostVote = ( vote, postId ) => {
    const { votedPost } = this.props
    vote = {option: vote}

    postVote(vote, postId)
    .then(post => {
      votedPost(post.voteScore, post.id)
    })
  }

  goToPostDetail = (postId) => {
    this.props.navToPost(postId)
  }

  render() {
    const posts = this.props.posts

    return (
      <div className="post-list">
        {posts.map((post) => (
          <div key={post.id}>
            <Card style={styles.cardMargin}>
              <CardTitle title={post.title} subtitle={post.category}/>
              <CardText>
                {post.body}
                <br></br>
                <br></br>
                {/* {new Date(post.timestamp).toLocaleString("en-US")} */}
              </CardText>
              <CardActions>
                <RaisedButton label={`${post.commentNum ? post.commentNum : 0} Comments`}
                  primary={true}
                  onClick={() => this.goToPostDetail(post.id)}
                />
                <IconButton style={styles.voteButton} onClick={() => this.apiPostVote('upVote', post.id)}>
                  <ArrowUp />
                </IconButton>
                <RaisedButton style={styles.floatRight} label={'Votes ' + post.voteScore} disabled={true}/>
                <IconButton style={styles.voteButton} onClick={() => this.apiPostVote('downVote', post.id)}>
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

function mapStateToProps ({ posts, }) {
  return {
    posts,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    votedPost: (voteScore, postId) => dispatch(votePost(voteScore, postId)),
    navToPost: (postId) => dispatch(push(`/post/${postId}`))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList)
