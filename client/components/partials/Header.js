import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  render() {
    return (
      <div>
        <Link to="/">Song List</Link>
        <br />
        <Link to="/songs/new">Create Song</Link>
      </div>
    );
  }
}
