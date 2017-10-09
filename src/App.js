import React, { Component } from 'react';
import { connect } from 'react-redux'
//import logo from './logo.svg';
import './App.css';

import CategoryMenu from './Categories/CategoryMenu'
import { getCategories } from './Categories/actions'

import PostList from './Posts/PostList'
import { getPosts, getComments } from './Posts/actions'

import { fetchCatgories, fetchPosts, fetchComments } from './utils/api'
import AppBar from 'material-ui/AppBar';

class App extends Component {
  state = {
  }

  componentDidMount() {
    const { gotCategories, gotPosts, gotComments, } = this.props

    fetchPosts()
    .then(posts => {
      gotPosts(posts)

      posts.forEach(post => {
        fetchComments(post.id)
        .then(comments => {
          gotComments(posts, comments)
        })
      })
    })

    fetchCatgories()
    .then(categories => {
      gotCategories(categories)
    })
  }

  render() {
    const categories = this.props.categories
    const posts = this.props.posts

    return (
      <div className="App">
        <AppBar
          title="Readables"
          iconElementLeft={<CategoryMenu categories={categories}/>}
        />
        <PostList posts={posts}></PostList>
      </div>
    );
  }
}

function mapStateToProps ({ posts, categories }) {
  return {
    posts,
    categories
  }
}

function mapDispatchToProps (dispatch) {
  return {
    gotCategories: (categories) => dispatch(getCategories(categories)),
    gotPosts: (posts) => dispatch(getPosts(posts)),
    gotComments: (posts, comments) => dispatch(getComments(posts, comments))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
