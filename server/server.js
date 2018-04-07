const express = require('express');
const SocketServer = require('ws');
const PORT = 3001;
const server = express();

server.listen(PORT, '0.0.0.0', "localhost", () => console.log(`Listening on port ${PORT}`));

const wss = new SocketServer.Server({ server });
