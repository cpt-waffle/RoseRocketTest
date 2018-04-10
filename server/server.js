const randomName = require('random-name');
const randomID = require("random-id");
const express = require('express');
const SocketServer = require('ws');
const PORT = 3001;
const server = express().listen(PORT, () => console.log(`Listening on ${ PORT }`));
const wss = new SocketServer.Server({ server });
const users = [];
const currentWebSockets = [];
let items = [
  {
    "id": "06712e75­c148­4fe8­97cd­d90246ac4052",
    "name": "socks",
    "weight": 1,
    "box_id": null
  },
  {
    "id": "5a683688­3970­4596­b476­757443deeafc",
    "name": "doughnuts",
    "weight": 1,
    "box_id": null
  },
  {
    "id": "f61d6425­de4f­4993­bc3c­fdcff41bfd84",
    "name": "laptop",
    "weight": 4,
    "box_id": "17cd977b­db7b­4bb8­ab83­68ad64134967"
  },
  {
    "id": "a4f173aa­db59­46a8­b016­875ca36381c8",
    "name": "watermelon",
    "weight": 7,
    "box_id": "17cd977b­db7b­4bb8­ab83­68ad64134967"
  },
  {
    "id": "430c6e28­b3b2­4720­aedf­174a35275563",
    "name": "raspberry pi",
    "weight": 2,
    "box_id": null
  },
  {
    "id": "c61fa46f­d963­4e63­a753­bd076512a96b",
    "name": "books",
    "weight": 12,
    "box_id": null
  },
];

let boxes = [
  {
  "id": "603f95f2­5f84­427c­b697­1b6318f93311",
  "name": "box A",
  "total_allowed_weight": 10,
  "items": []
  },
  {
  "id": "17cd977b­db7b­4bb8­ab83­68ad64134967",
  "name": "box B",
  "total_allowed_weight": 20,
  "items": []
  },
  {
  "id": "3208c229­9a0a­4e3a­bbfa­4cf2e600d917",
  "name": "box C",
  "total_allowed_weight": 5,
  "items": []
  },
  {
  "id": "176c0a0b­c9e7­4ae7­8be0­c8079bda57a7",
  "name": "box D",
  "total_allowed_weight": 4,
  "items": []
  }
];

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
  let payload = JSON.stringify({ usersOnline: users, currentUser: newUser, items: items, boxes: boxes, type: "connected" });
  wss.broadcast(payload);

  ws.on('close', () => {
    disconnectUser();
    let payload = JSON.stringify({ usersOnline: users, type: "disconnected_user"});
    wss.broadcast(payload)
  });
});