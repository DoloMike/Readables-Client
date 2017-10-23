import React, { Component } from 'react';
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { Route } from 'react-router'
import './App.css';

import { getCategories } from './Categories/actions'
import FeedContol from './Posts/FeedControl'
import PostList from './Posts/PostList'
import PostForm from './Posts/PostForm'
import PostDetail from './Posts/PostDetail'
import { getPosts, getComments } from './Posts/actions'

import { fetchCatgories, fetchPosts, fetchComments } from './utils/api'
import AppBar from 'material-ui/AppBar';

class App extends Component {
  componentDidMount() {
    const { gotCategories, gotPosts, gotComments, } = this.props

    fetchPosts()
    .then(posts => {
      gotPosts(posts)

      posts.forEach(post => {
        fetchComments(post.id)
        .then(comments => {
          gotComments( comments )
        })
      })
    })

    fetchCatgories()
    .then(categories => {
      gotCategories(categories)
    })
  }

  handleHomeClick = () => {
    this.props.navToHome()
  }

  render() {
    const {categories, posts} = this.props

    return (
      <div className="App">
        <AppBar
          title="Readables"
          iconElementLeft={<div></div>}
          onClick={() => this.handleHomeClick()}
          id="appBar"
        />

        <Route exact path="/" render={() => (
          <div>
            <FeedContol categories={categories}></FeedContol>
            <PostList posts={posts}></PostList>
            <PostForm />
          </div>
        )}/>

        <Route path='/post/:id' render={() => (
          <PostDetail posts={posts}></PostDetail>
        )}/>
      </div>
    )
  }
}

function mapStateToProps ({ posts, categories, router }) {
  return {
    posts,
    categories,
    router
  }
}

function mapDispatchToProps (dispatch) {
  return {
    gotCategories: (categories) => dispatch(getCategories(categories)),
    gotPosts: (posts) => dispatch(getPosts(posts)),
    gotComments: (comments) => dispatch(getComments( comments )),
    navToHome: () =>  dispatch(push('/'))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
