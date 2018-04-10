import React, { Component } from 'react';
import '../styles/Boxes.css';
import { Droppable } from 'react-drag-and-drop';

class Box extends Component {

  onDrop = (data) => {
      console.log(data);
      this.props.addItemFunction(data.item , this.props.boxId);
  }

  render() {
    let items = [];
    for (let i in this.props.items) {
      items.push(<p key={i}>{this.props.items[i].name}</p>)
    }
    return (
      <div className="box">
        <p>Name: {this.props.boxName} Weight: {this.props.boxWeight}</p>
        <div>
          Items
          <Droppable types={'item'} onDrop={this.onDrop}>
            <div className="box-items">
              {items}
            </div>
          </Droppable>
        </div>
      </div>
    );
  }
}

export default Box;