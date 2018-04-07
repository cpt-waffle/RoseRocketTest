const randomName = require('random-name');
const express = require('express');
const SocketServer = require('ws');
const PORT = 3001;
const server = express().listen(PORT, () => console.log(`Listening on ${ PORT }`));

const wss = new SocketServer.Server({ server });

wss.on('connection', (ws) => {
  name = `${randomName.first()} ${randomName.last()}`;
  console.log(name + ' connected!');





  ws.on('close', () => {
    console.log('Client disconnected!');
  });
});