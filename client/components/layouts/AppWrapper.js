import React, { Component } from 'react';
import { Header } from '../partials';

export default class AppWrapper extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        {this.props.children}
      </div>
    );
  }
}
