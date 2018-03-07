import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

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
        }
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
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

const AddSong = gql`
  mutation AddSong($title: String!) {
    addSong(title: $title) {
      title
    }
  }
`;

export default graphql(AddSong, {
  name: 'AddSong'
})(SongCreate);
