// Create Express Server
const express = require('express');
const serverExpress = express();
// Routing
serverExpress.use(express.static('./public/'))

// Import SLL security KEY and CERTIFICATE into objects for HTTPS
const fs = require('fs');
const KEY_SSL = fs.readFileSync('./security/key.pem');
const CERT_SSL = fs.readFileSync('./security/cert.pem');
const SSL_credentials = {key: KEY_SSL, cert: CERT_SSL};

// Create HTTPS server    &    configure it with Express
const createServerHTTPS = require('https');
const httpServer = createServerHTTPS.createServer(SSL_credentials, serverExpress);
const PORT = 3000;
// Run the server
httpServer.listen(PORT, ()=> console.log(`Server listening to Port ${PORT}`));

// Create a Web Socket Sever over HTTPS
const socketServer = require('socket.io');
const io = socketServer(httpServer);

// Configure Web Socket
io.on('connection', (socket)=> {
  console.log('Created Web Socket connection');
  socket.on('event', (payload)=> {
    console.log(`socket connection: on -event- >> ${payload}`);
  })
});
