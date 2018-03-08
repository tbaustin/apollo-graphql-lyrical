import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { likeLyric } from '../../mutations';

class LyricList extends Component {
  constructor(props) {
    super(props);
    this.state = { err: null };
    this.onLike = this.onLike.bind(this);
  }

  onLike(id, likes) {
    this.props
      .likeLyric({
        variables: { id },
        optimisticResponse: {
          __typename: 'Mutation',
          likeLyric: {
            id: id,
            __typename: 'LyricType',
            likes: likes + 1
          }
        }
      })
      .then(() => {})
      .catch(err => {
        this.setState({ err });
      });
  }

  renderLyrics() {
    return this.props.lyrics.map(({ id, content, likes }) => {
      return (
        <li key={id} className="collection-item">
          {content}

          <div className="vote-box">
            <i
              className="material-icons"
              onClick={() => this.onLike(id, likes)}
            >
              thumb_up
            </i>
            {likes}
          </div>
        </li>
      );
    });
  }
  render() {
    return (
      <div>
        {this.state.err ? (
          <div style={{ color: 'red' }}>{this.state.err}</div>
        ) : null}
        <ul className="collection">{this.renderLyrics()}</ul>
      </div>
    );
  }
}

export default graphql(likeLyric, { name: 'likeLyric' })(LyricList);
