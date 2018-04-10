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

  addItem = (item,box) => {
    console.log("added " + item + "to box " + box);
  }

  componentDidMount() {
    this.socket.onopen = (event) => {
      console.log("connected!");
    }

    this.socket.onmessage = (event) => {
      const payload = JSON.parse(event.data);
      if (payload.type === 'connected') {
        console.log(payload.boxes);
        this.setState({usersOnline: payload.usersOnline, items: payload.items, boxes: payload.boxes});
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
          <BoxList boxes={this.state.boxes} addItemFunction={this.addItem}/>
        </div>
      </div>
    );
  }
}

export default App;
