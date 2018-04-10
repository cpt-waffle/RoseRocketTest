import React, { Component } from 'react';
import '../styles/Users.css';

class User extends Component {

  render() {
    return (
      <p className="user" key={this.props.key}>{this.props.name}</p>
    );
  }
}

export default User;