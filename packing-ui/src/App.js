import React, { Component } from 'react';
import './styles/App.css';
import Users from './components/Users';
import ItemList from './components/ItemList';
import BoxList from './components/BoxList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state= {
      user: "Hello",
      usersOnline: [],
      items: [],
      boxes: [],
    };

    this.socket = new WebSocket('ws://localhost:3001');
  }

  addItemToBox = (itemId,boxId) => {
    let payload = {
      type: 'addItemToBox',
      boxId: boxId,
      itemId: itemId,
    }
    this.socket.send(JSON.stringify(payload));
  }

  removeItemFromBox = (itemId, boxId) => {
    let payload = {
      type: 'removeItemFromBox',
      boxId: boxId,
      itemId: itemId,
    }
    console.log(payload);
    this.socket.send(JSON.stringify(payload));
  }

  componentDidMount() {
    this.socket.onopen = (event) => {
      console.log("connected!");
    }

    this.socket.onmessage = (event) => {
      const payload = JSON.parse(event.data);
      if (payload.type === 'connected') {
        this.setState({usersOnline: payload.usersOnline, items: payload.items, boxes: payload.boxes});
      }

      if (payload.type === 'addItemToBox' || payload.type === 'removeItemFromBox') {
        this.setState({boxes: payload.boxes, items: payload.items});
      }

      if (payload.type === 'disconnected_user') {
        this.setState({usersOnline: payload.usersOnline});
      }
    }
  }

  render() {
    return (
      <div className="App">
        <Users users={this.state.usersOnline}/>
        <div className="lists">
          <ItemList items={this.state.items}/>
          <BoxList boxes={this.state.boxes} addItemFunction={this.addItemToBox} removeItemFunction={this.removeItemFromBox}/>
        </div>
      </div>
    );
  }
}

export default App;
