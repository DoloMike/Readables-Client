import React, { Component } from 'react';
import { connect } from 'react-redux'

import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import uuid from 'uuid';
import { addComment } from './actions'
import { getComments } from '../Posts/actions'
import { postComment, fetchComments } from '../utils/api'

const style = {
  buttonAddStyle: {
    position: 'fixed',
    bottom: 20,
    right: 20
  },
  floatLeft: {
    float: 'left'
  },
  fullWidth: {
    width: '100%'
  },
  marginRight: {
    marginRight: 20
  }
};

class PostForm extends Component {

  state = {
    commentFormOpen: false,

    comment: {
      id:'',
      parentId:'',
      timestamp: '',
      body: '',
      author: '',
      voteScore: '',
      deleted: '',
      parentDeleted: ''
    }
  }

  openPostForm = () => this.setState(() => ({ commentFormOpen: true }))
  closePostForm = () => this.setState(() => ({ commentFormOpen: false }))

  apiPostComment = () => {
    const comment = this.state.comment
    comment.timestamp = Date.now()
    comment.id = uuid.v4()
    comment.parentId = this.props.currentPost.id

    const { postedComment, gotComments } = this.props

    postComment(comment)
    .then(newComment => {
      postedComment(newComment)
      fetchComments(comment.parentId)
      .then(comments => {
        gotComments( comments )
      })
    })

    this.closePostForm()
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    let comment = this.state.comment;
    comment[name] = value;

    this.setState({
      comment
    })
  };

  render() {
    const actions = [
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.apiPostComment}
      />,
      <FlatButton
        label="Cancel"
        onClick={this.closePostForm}
        style={style.floatLeft}
      />,
    ];

    const comment = this.state.comment

    return (
      <div>
        <FloatingActionButton style={style.buttonAddStyle}>
          <ContentAdd onClick={this.openPostForm}/>
        </FloatingActionButton>

        <Dialog
          title="Post a comment"
          actions={actions}
          modal={false}
          open={this.state.commentFormOpen}
          onRequestClose={this.closePostForm}
          >
            <TextField
              name="author"
              hintText="Author"
              floatingLabelText="Author"
              value={comment.author}
              onChange={this.handleChange}
            />
            <br />
            <TextField
              name="body"
              hintText="Body"
              floatingLabelText="Body"
              multiLine={true}
              rows={3}
              value={comment.body}
              onChange={this.handleChange}
              style={style.fullWidth}
            />
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps ( ) {
  return {

  }
}

function mapDispatchToProps (dispatch) {
  return {
    postedComment: (newComment) => dispatch(addComment(newComment)),
    gotComments: (comments) => dispatch(getComments( comments )),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostForm)
