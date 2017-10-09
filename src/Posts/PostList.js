import React from 'react'
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import ArrowDown from 'material-ui/svg-icons/navigation/arrow-downward';
import ArrowUp from 'material-ui/svg-icons/navigation/arrow-upward';

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
  }
}

export default function PostList ( { posts } ) {
  return (
    <div className="post-list">
      {posts.map((post) => (
        <div key={post.id}>
          <Card style={styles.cardMargin}>
            <CardTitle title={post.title} subtitle={post.category}/>
            <CardText>
              {post.body}
            </CardText>
            <CardActions>
              <RaisedButton label={post.commentNumText} primary={true} />
              <IconButton style={styles.voteButton}>
                <ArrowUp />
              </IconButton>
              <RaisedButton style={styles.floatRight} label={'Votes ' + post.voteScore} disabled={true}/>
              <IconButton style={styles.voteButton}>
                <ArrowDown />
              </IconButton>
            </CardActions>
          </Card>
        </div>
      ))}
    </div>
  )
}
