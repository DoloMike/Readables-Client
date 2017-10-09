import React, { Component } from 'react';
import { connect } from 'react-redux'

import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import uuid from 'uuid';
import { addPost } from './actions'
import { postPost } from '../utils/api'

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
    postFormOpen: false,
    post: {
      id:'',
      timestamp: '',
      title: '',
      body: '',
      author: '',
      category: '',
      voteScore: '',
      deleted: '',
    },
    selectFieldValue: ''
  }

  openPostForm = () => this.setState(() => ({ postFormOpen: true }))
  closePostForm = () => this.setState(() => ({ postFormOpen: false }))

  apiPostPost = () => {
    const post = this.state.post
    post.timestamp = Date.now()
    post.id = uuid.v4()

    const { postedPost } = this.props

    postPost(post)
    .then(newPost => postedPost(newPost))

    this.closePostForm()
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    let post = this.state.post;
    post[name] = value;

    this.setState({
      post
    })
  };

  handleSelectChange = (event, index, selectFieldValue) => {
    const categoryText = event.target.innerText
    let post = this.state.post

    post.category = categoryText

    this.setState({selectFieldValue, post});
  }

  render() {
    const actions = [
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.apiPostPost}
      />,
      <FlatButton
        label="Cancel"
        onClick={this.closePostForm}
        style={style.floatLeft}
      />,
    ];

    const post = this.state.post
    const categories = this.props.categories

    return (
      <div>
        <FloatingActionButton style={style.buttonAddStyle}>
          <ContentAdd onClick={this.openPostForm}/>
        </FloatingActionButton>

        <Dialog
          title="Post a readable"
          actions={actions}
          modal={false}
          open={this.state.postFormOpen}
          onRequestClose={this.closePostForm}
          >
            <SelectField
              floatingLabelText="Category"
              name="category"
              value={this.state.selectFieldValue}
              onChange={this.handleSelectChange}
              style={style.fullWidth}
              >
                {categories.map(cat => (
                  <MenuItem value={cat.name} primaryText={cat.name} key={cat._nameId} />
                ))}
            </SelectField>
            <br />
            <TextField
              name="title"
              hintText="Title"
              floatingLabelText="Title"
              value={post.title}
              style={style.marginRight}
              onChange={this.handleChange}
            />
            <TextField
              name="author"
              hintText="Author"
              floatingLabelText="Author"
              value={post.author}
              onChange={this.handleChange}
            />
            <br />
            <TextField
              name="body"
              hintText="Body"
              floatingLabelText="Body"
              multiLine={true}
              rows={3}
              value={post.body}
              onChange={this.handleChange}
              style={style.fullWidth}
            />
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps ({ categories }) {
  return {
    categories
  }
}

function mapDispatchToProps (dispatch) {
  return {
    postedPost: (newPost) => dispatch(addPost(newPost))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostForm)
