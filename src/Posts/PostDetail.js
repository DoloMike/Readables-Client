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
    const pathArr = this.props.router.location.pathname.split('/')
    const postId = pathArr[pathArr.length-1]

    let currentPost = posts.filter(post => post.id === postId)
    if(currentPost.length===1) {
      currentPost = currentPost[0]
    }

    return (
      <div className="post-list">
        <div key={currentPost.id}>
          <Card style={styles.cardMargin}>
            <CardTitle title={currentPost.title} subtitle={currentPost.category}/>
            <CardText>
              {currentPost.body}
              <br></br>
              <br></br>
              {new Date(currentPost.timestamp).toLocaleString("en-US")}
            </CardText>
            <CardActions>
              <RaisedButton label={`${currentPost.commentNum ? currentPost.commentNum : 0} Comments`}
                primary={true}
                onClick={() => this.goToPostDetail(currentPost.id)}
              />
              <IconButton style={styles.voteButton} onClick={() => this.apiPostVote('upVote', currentPost.id)}>
                <ArrowUp />
              </IconButton>
              <RaisedButton style={styles.floatRight} label={'Votes ' + currentPost.voteScore} disabled={true}/>
              <IconButton style={styles.voteButton} onClick={() => this.apiPostVote('downVote', currentPost.id)}>
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
    votedPost: (voteScore, postId) => dispatch(votePost(voteScore, postId)),
    navToPost: (postId) => dispatch(push(`/post/${postId}`))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList)
