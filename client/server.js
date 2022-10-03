const express = require("express");
const path = require("path");
require("dotenv").config();
// console.log(process.env);

const app = express();
const PORT = process.env.PORT_APP || 3000;

// app.get('/', (req, res) => {
//   res.send('/build/index.html');
// });

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/build/index.html");
});

app.use(express.static(path.join(__dirname, "build")));

// app.listen(PORT, ()=> {
//   console.log(`Example app listening on port ${PORT}`);
// });

app.use(express.static("./public/"));

// Import SLL security KEY and CERTIFICATE into objects for HTTPS
const fs = require("fs");
const KEY_SSL = fs.readFileSync("./security/key.pem");
const CERT_SSL = fs.readFileSync("./security/cert.pem");
const SSL_credentials = { key: KEY_SSL, cert: CERT_SSL };

// Create HTTPS server    &    configure it with Express
const Https = require("https");
const httpsServer = Https.createServer(SSL_credentials, app);
// Run the server
httpsServer.listen(PORT, () => console.log(`Server listening to Port ${PORT}`));

// // Create a Web Socket Sever over HTTPS
// const socketServer = require('socket.io');
// const io = socketServer(httpsServer);

// // Configure Web Socket
// io.on('connection', (socket)=> {
//   console.log('Created Web Socket connection');
//   socket.on('event', (payload)=> {
//     console.log(`socket connection: on -event- >> ${payload}`);
//   })
// });
