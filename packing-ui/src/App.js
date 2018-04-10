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

  componentDidMount() {
    this.socket.onopen = (event) => {
      console.log("connected!");
    }

    this.socket.onmessage = (event) => {
      const payload = JSON.parse(event.data);
      if (payload.type === 'connected') {
        this.setState({usersOnline: payload.usersOnline, items: payload.items, boxes: payload.boxes});
      }

      if (payload.type === 'addItemToBox') {
        console.log(payload.boxes[0].items);
        this.setState({boxes: payload.boxes});
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
          <BoxList boxes={this.state.boxes} addItemFunction={this.addItemToBox}/>
        </div>
      </div>
    );
  }
}

export default App;
