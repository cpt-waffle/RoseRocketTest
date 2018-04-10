import React, { Component } from 'react';
import { Draggable } from 'react-drag-and-drop';
import '../styles/Items.css';
import Item from './Item';

class ItemList extends Component {

  render() {
    let array = [];
    for (let i in this.props.items) {
      array.push( <Draggable type="item" data={this.props.items[i].name}>
                    <Item itemName={this.props.items[i].name} key={i} itemWeight={this.props.items[i].weight}/>
                  </Draggable>);
    }
    return (
      <div className='item-list'>
        <div className='item-list-nav'>
          <span>Items Available</span>
        </div>
        <div className="items">
          {array}
        </div>
      </div>
    );
  }
}

export default ItemList;