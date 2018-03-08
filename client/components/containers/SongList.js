import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Link } from 'react-router-dom';

import { fetchSongList } from '../../queries';

class SongList extends Component {
  renderSongs() {
    const { songs } = this.props.data;
    return songs.map(song => (
      <li key={song.id} className="collection-item">
        {song.title}
      </li>
    ));
  }

  render() {
    const { loading, songs } = this.props.data;
    return (
      <div>
        <h3>Song List</h3>
        <ul className="collection">
          {!loading ? this.renderSongs() : <div>Loading...</div>}
        </ul>
        <Link to="/songs/new" className="btn-floating btn-large red right">
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

export default graphql(fetchSongList)(SongList);
