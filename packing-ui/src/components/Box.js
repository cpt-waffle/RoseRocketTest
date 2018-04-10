import React, { Component } from 'react';
import '../styles/Boxes.css';
import { Draggable, Droppable } from 'react-drag-and-drop';

class Box extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }



  onDrop = (data) => {
      console.log(data);
      this.props.addItemFunction(data.item , this.props.boxName);
  }



  render() {

    return (
      <div className="box">
        <p>Name: {this.props.boxName} Weight: {this.props.boxWeight}</p>
        <div>
          Items
          <Droppable types={'item'} onDrop={this.onDrop}>
            <ul className="box-items">
            </ul>
          </Droppable>
        </div>
      </div>
    );
  }
}

export default Box;