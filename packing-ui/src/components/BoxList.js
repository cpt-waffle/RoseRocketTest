import React, { Component } from 'react';
import Box from './Box';
import '../styles/Boxes.css';

class BoxList extends Component {

  render() {
    let array = [];
    for (let i in this.props.boxes) {
      let box = (<Box
        key={i}
        className="box"
        addItemFunction={this.props.addItemFunction}
        removeItemFunction={this.props.removeItemFunction}
        boxId={this.props.boxes[i].id}
        boxName={this.props.boxes[i].name}
        currentWeight={this.props.boxes[i].current_weight}
        boxWeight={this.props.boxes[i].total_allowed_weight}
        items={this.props.boxes[i].items}
        />);
      array.push(box);
    }
    return (
      <div className='box-list'>
        BoxList
        {array}
      </div>
    );
  }
}

export default BoxList;