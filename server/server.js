const randomName = require('random-name');
const randomID = require("random-id");
const express = require('express');
const SocketServer = require('ws');
const PORT = 3001;
const server = express().listen(PORT, () => console.log(`Listening on ${ PORT }`));
const wss = new SocketServer.Server({ server });
const users = [];
const currentWebSockets = [];

// Broadcast function that uses sends messages to everyone that is connected (payload being any message could be in there)
wss.broadcast = function broadcast(payload) {
  wss.clients.forEach(function each(client) {
    client.send(payload);
  });
}

// Sets a user for the server with a random id and name. also gives the responsible websocket the user id for disconnection tracking.
const setUser = (ws) => {
  newUser = {
    id: randomID(10,"0"),
    name: `${randomName.first()} ${randomName.last()}`,
  };

  ws.id = newUser.id
  return newUser;
}

// Deletes a given user from the user array.
const deleteUser = (id) => {
  for (let i in users) {
    if (users[i].id == id) {
      console.log(`${users[i].name} has disconnected!`)
      users.splice(i,1);
      return true;
    }
  }
  return false;
}

// Deletes the websocket that was disconnected and uses the delete user method to remove the inactive user.
const disconnectUser = () => {
  for (i in currentWebSockets) {
    // this finds a socket that disconnected
    if (currentWebSockets[i]._closeFrameReceived) {
      deleteUser(currentWebSockets[i].id);
      currentWebSockets.splice(i,1);
      return true;
    }
  }
  return false;
}

wss.on('connection', (ws) => {
  newUser = setUser(ws);
  users.push(newUser);
  currentWebSockets.push(ws);
  console.log(`${newUser.name} connected!`);
  let payload = JSON.stringify({ usersOnline: users, currentUser: newUser, type: "connected" });
  console.log(payload);
  wss.broadcast(payload);

  ws.on('close', () => {
    disconnectUser();
    let payload = JSON.stringify({ usersOnline: users, type: "disconnected_user"});
    wss.broadcast(payload)
  });
});