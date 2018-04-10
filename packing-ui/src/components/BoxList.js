import React, { Component } from 'react';
import Box from './Box';
import '../styles/Boxes.css';

class BoxList extends Component {

  render() {
    let array = [];
    for (let i in this.props.boxes) {
      array.push(<Box key={i} className="box" addItemFunction={this.props.addItemFunction} boxId={this.props.boxes[i].id} boxName={this.props.boxes[i].name} boxWeight={this.props.boxes[i].total_allowed_weight} items={this.props.boxes[i].items}/>);
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