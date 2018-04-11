import React, { Component } from 'react';
import './styles/App.css';
import Users from './components/Users';
import ItemList from './components/ItemList';
import BoxList from './components/BoxList';
import { Button, Modal, ModalBody, ModalFooter, Input, InputGroup, InputGroupAddon } from 'reactstrap';

class App extends Component {
  constructor(props) {
    super(props);
    this.state= {
      userId: '',
      user: '',
      usersOnline: [],
      items: [],
      boxes: [],
      modalOpen: false,
      tempItemName: '',
      tempItemWeight: 0,
      modalSubmitButton: true
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

  newItemModal = () => {
    this.setState({modalOpen: !this.state.modalOpen});
  }

  handleModalNameChange =(event) => {
    let disabledState;
    if (event.target.value.length > 0) {
      disabledState = false;
    }
    else {
      disabledState = true;
    }
    this.setState({tempItemName: event.target.value, modalSubmitButton: disabledState});
  }

  handleModalWeightChange = (event) =>{
    let disabledState;
    if (event.target.value > 0) {
      disabledState = false;
    }
    else {
      disabledState = true;
    }
    this.setState({tempItemWeight: event.target.value, modalSubmitButton: disabledState});
  }

  createNewItem = () => {
    let payload = {
      type: 'addNewItemToList',
      itemName: this.state.tempItemName,
      itemWeight: this.state.tempItemWeight,
    }
    this.setState({tempItemName: '', tempItemWeight: '', modalSubmitButton: false, modalOpen: false});
    this.socket.send(JSON.stringify(payload));
  }

  componentDidMount() {

    this.socket.onmessage = (event) => {
      const payload = JSON.parse(event.data);
      if (payload.type === 'connected') {
        this.setState({user: payload.currentUser.name, userId: payload.currentUser.id, usersOnline: payload.usersOnline, items: payload.items, boxes: payload.boxes});
      }

      if (payload.type === 'addItemToBox' || payload.type === 'removeItemFromBox') {
        this.setState({boxes: payload.boxes, items: payload.items});
      }

      if (payload.type === 'addNewItemToList') {
        this.setState({items: payload.items});
      }

      if (payload.type === 'disconnected_user') {
        this.setState({usersOnline: payload.usersOnline});
      }
    }
  }

  render() {
    return (
      <div className="App">
        <Modal isOpen={this.state.modalOpen} toggle={this.newItemModal} className={this.props.className}>
          <ModalBody>
            <InputGroup>
              <InputGroupAddon addonType="prepend">Item Name:</InputGroupAddon>
              <Input
                placeholder="i.e: carrots"
                value={this.state.tempItemName}
                onChange={this.handleModalNameChange}
              />
            </InputGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">Item Weight</InputGroupAddon>
              <Input
                placeholder="i.e: 2"
                value={this.state.tempItemWeight}
                onChange={this.handleModalWeightChange}
                type="number" step="1"
              />
            </InputGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" disabled={this.state.modalSubmitButton} onClick={this.createNewItem}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.newItemModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
        <Users users={this.state.usersOnline}/>
        <div className="lists">
          <ItemList items={this.state.items} addItemToListFunction={this.newItemModal}/>
          <BoxList boxes={this.state.boxes} addItemFunction={this.addItemToBox} removeItemFunction={this.removeItemFromBox}/>
        </div>
      </div>
    );
  }
}

export default App;
