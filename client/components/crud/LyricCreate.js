import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { addLyric } from '../../mutations';
import { fetchSong } from '../../queries';

class LyricCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: '',
      err: null
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    this.props
      .addLyric({
        variables: {
          content: this.state.content,
          songId: this.props.songId
        }
        // refetchQueries: [
        //   { query: fetchSong, variables: { id: this.props.songId } }
        // ]
      })
      .then(() => {
        this.setState({
          content: ''
        });
      })
      .catch(err => {
        this.setState({
          err
        });
      });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        {this.state.err ? (
          <div style={{ color: 'red' }}>{this.state.err}</div>
        ) : null}
        <label htmlFor="">Add a Lyric</label>
        <input
          onChange={event => this.setState({ content: event.target.value })}
          value={this.state.content}
          type="text"
        />
      </form>
    );
  }
}

export default graphql(addLyric, {
  name: 'addLyric'
})(LyricCreate);
