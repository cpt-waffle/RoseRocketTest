import React, { Component } from 'react';
import './styles/App.css';
import Users from './components/Users';

class App extends Component {
  constructor(props) {
    super(props);
    this.state= {
      user: "Hello",
      usersOnline: []
    };

    this.socket = new WebSocket('ws://localhost:3001');
  }

  componentDidMount() {
    this.socket.onopen = (event) => {
      console.log("connected!");
    }

    this.socket.onmessage = (event) => {
      const payload = JSON.parse(event.data);
      if (payload.type === 'connected') {
        console.log(payload.usersOnline);
        this.setState({usersOnline: payload.usersOnline});
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
      </div>
    );
  }
}

export default App;
