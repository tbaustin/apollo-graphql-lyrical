import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { Link } from 'react-router-dom';

import { fetchSongList } from '../../queries';
import { deleteSong } from '../../mutations';

class SongList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      err: null
    };

    this.onSongDelete = this.onSongDelete.bind(this);
  }

  onSongDelete(id) {
    this.props
      .deleteSong({
        variables: {
          id
        },
        refetchQueries: [{ query: fetchSongList }]
      })
      .then(() => {})
      .catch(err => {
        this.setState({
          err
        });
      });
  }

  renderSongs() {
    const { songs } = this.props.data;
    return songs.map(({ id, title }) => (
      <li key={id} className="collection-item">
        <Link to={`/songs/${id}`}>{title}</Link>
        <i className="material-icons" onClick={() => this.onSongDelete(id)}>
          delete
        </i>
      </li>
    ));
  }

  render() {
    const { loading, songs } = this.props.data;
    return (
      <div>
        <h3>Song List</h3>
        {this.state.error ? (
          <div style={{ color: 'red' }}>{this.state.error}</div>
        ) : null}
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

export default compose(
  graphql(fetchSongList),
  graphql(deleteSong, {
    name: 'deleteSong'
  })
)(SongList);
