import React, { Component } from 'react';
import { connect } from 'react-redux'

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import { fetchPosts, fetchComments } from '../utils/api'
import { getPosts, getComments, sortPosts } from './actions'

const style = {
  marginRight: {
    marginRight: 20
  }
}

class FeedControl extends Component {

  state = {
    categoryValue: 'All',
    sortByValue: 'Votes'
  }

  handleCategoryChange = (event, index, categoryValue) => {
    this.setState({categoryValue});
    this.setState({sortByValue: 'Votes'})
    this.apiFetchPosts(categoryValue)
  }
  handleSortByChange = (event, index, sortByValue) => {
    this.setState({sortByValue});
    this.props.sortedPosts(sortByValue);
  }

  apiFetchPosts = ( categoryValue ) => {
    categoryValue = categoryValue === 'All' ? '' : categoryValue
    const { gotPosts, gotComments, } = this.props

    fetchPosts(categoryValue)
    .then(posts => {
      gotPosts(posts)

      posts.forEach(post => {
        fetchComments(post.id)
        .then(comments => {
          gotComments( comments )
        })
      })
    })
  }

  render() {
    const categories = this.props.categories

    return (
      <div className='center'>
        <SelectField
          floatingLabelText="Category"
          name="category"
          value={this.state.categoryValue}
          onChange={this.handleCategoryChange}
          style={style.marginRight}
          >
            {categories.map(cat => (
              <MenuItem value={cat.name} primaryText={cat.name} key={cat._nameId} />
            ))}
        </SelectField>
        <SelectField
          floatingLabelText="Sort By"
          name="sort"
          value={this.state.sortByValue}
          onChange={this.handleSortByChange}
          >
            <MenuItem value={'Votes'} primaryText={'Votes'} key={'Votes'} />
            <MenuItem value={'Most Recent'} primaryText={'Most Recent'} key={'Most Recent'} />
        </SelectField>
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
    gotPosts: (posts) => dispatch(getPosts(posts)),
    gotComments: (comments) => dispatch(getComments( comments )),
    sortedPosts: (sortByValue) => dispatch(sortPosts( sortByValue ))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedControl)
