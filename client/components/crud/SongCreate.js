import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { fetchSongList } from '../../queries';
import { addSong } from '../../mutations';

class SongCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      error: null
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();

    this.props
      .AddSong({
        variables: {
          title: this.state.title
        },
        refetchQueries: [{ query: fetchSongList }]
      })
      .then(() => {
        this.setState({
          title: ''
        });

        this.props.history.push('/');
      })
      .catch(err => {
        this.setState({
          error: err
        });
      });
  }

  render() {
    return (
      <div>
        <h3>Create a New Song</h3>
        {this.state.error ? (
          <div style={{ color: 'red' }}>{this.state.error}</div>
        ) : null}
        <form onSubmit={this.onSubmit}>
          <label>Song Title:</label>
          <input
            onChange={event => this.setState({ title: event.target.value })}
            value={this.state.title}
            type="text"
          />
        </form>
      </div>
    );
  }
}

export default graphql(addSong, {
  name: 'AddSong'
})(SongCreate);
