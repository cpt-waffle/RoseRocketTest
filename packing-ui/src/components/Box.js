import React, { Component } from 'react';
import '../styles/Boxes.css';
import { Droppable } from 'react-drag-and-drop';
import { Button } from 'reactstrap';

class Box extends Component {

  onDrop = (data) => {
      this.props.addItemFunction(data.item , this.props.boxId);
  }

  onRemoveButtonClick = (itemId) => {
    this.props.removeItemFunction(itemId, this.props.boxId);
  }

  render() {
    let items = [];
    for (let i in this.props.items) {
      items.push(<div key={i} className="box-item">
        <p key={i} className="box-item-left">{this.props.items[i].name}</p>
        <div key={"remove-btn-" + i} className="box-item-right"><Button color="danger" onClick={() => this.onRemoveButtonClick(this.props.items[i].id)}>X</Button></div>
        </div>)
    }
    return (
      <div className="box">
        <p>Name: {this.props.boxName} Weight: {this.props.currentWeight}/{this.props.boxWeight}</p>
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