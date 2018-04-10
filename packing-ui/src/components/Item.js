import React, { Component } from 'react';
import '../styles/Items.css';

class Item extends Component {

  render() {

    return (
      <div className="item">
        <p>{this.props.itemName} {this.props.itemWeight}</p>
      </div>
    );
  }
}

export default Item;