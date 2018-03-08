import React, { Component } from 'react';
import { graphql } from 'react-apollo';

import { fetchSong } from '../../queries';
import { LyricCreate } from '../crud';
import { LyricList } from '../containers';

class SongDetail extends Component {
  render() {
    const { song, loading } = this.props.data;
    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h3>{song.title}</h3>
        <LyricList lyrics={song.lyrics} />
        <LyricCreate songId={this.props.match.params.id} />
      </div>
    );
  }
}

export default graphql(fetchSong, {
  options: props => {
    return { variables: { id: props.match.params.id } };
  }
})(SongDetail);
