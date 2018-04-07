import React, { Component } from 'react';
import '../styles/Users.css';

class Users extends Component {

  render() {
    let array = [];
    for (let i in this.props.users) {
      array.push(<p className="user" key={i}>{this.props.users[i].name} </p>);
    }
    return (
      <div className='users-navbar'>
        {array}
      </div>
    );
  }
}

export default Users;