import React, { Component } from 'react';
import '../styles/Items.css';

class Item extends Component {

  render() {
    let cssClass;
    if (this.props.boxId == null)
      cssClass = "item";
    else
      cssClass = "items-used";
    return (
      <div className={cssClass}>
        <p className="left">{this.props.itemName}</p> <p className="right">{this.props.itemWeight}</p>
      </div>
    );
  }
}

export default Item;