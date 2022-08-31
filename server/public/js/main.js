// WEB SOCKET - EXAMPLE

// Creating a Web Socket Client
// const socket = io();

// const button_socket = document.getElementById("btn-sckt");

// button_socket.onclick = () => {
//   console.log("button socket clicked");
//   const payload = "tong";
//   socket.emit("event", payload);
// };

// // PEER JS - DATA
const IP_ADDR = "192.168.43.130"; // Redmi Hotspot IP
// const IP_ADDR = "192.168.43.38";  // Samsung Hotspot IP

// ---------------------------------------------

// TODO: Destory Peer Object on Closing Browser Tab & Wrap up the app
// peer.destroy();

// TODO: Check Peer Object Connection link is still alive
// In the event of messages not being delivered and acknowledged
// if(peer.disconnected === true) {peer.reconnect();}

// TODO: Check if Peer Object is instantiated or not, if not Add new
// if(peer.destroyed === true) {ChatRoom.peer = new Peer();}

// TODO: Disconnect a connection link temporarily to save data
// peer.disconnect();
// peer.reconnect();   // when you want to revived the link
// setTimeout(peer.reconnect(), 5000);

// TODO: Close the data connection cleanly - when it is no longer needed to save bandwidth
// connClient.close();
// dataConnection.close();

// TODO: Close and Clean a Call MediaStream - when it is no longer needed to save bandwitdh
// call.close();
// mediaConnection.close();

// // 'Connect' - When the Peer ID is submitted
// connectPeerForm.addEventListener("submit", (e) => {
//   e.preventDefault();

//   var peer_id_remote = e.target.elements.peerId.value;

//   connectPeer(peer_id_remote);

//   // // Get ID
//   // var peer_id_remote = e.target.elements.peerId.value;
//   // var name_remote = ChatRoom.myPeerName;

//   // if (peer_id_remote in ChatRoom.connClients) {
//   //   connecInfo.innerText = "Connection already exists";
//   //   console.info("Connection already exists.");
//   //   return;
//   // }

//   // console.log(
//   //   "Initiating a Connection with Remote Peer Client : " +
//   //     name_remote +
//   //     " " +
//   //     peer_id_remote
//   // );

//   // // Initiate PeerJS connection with remote
//   // // With Options
//   // var options = {
//   //   label: "some_unique_label",
//   //   metadata: {},
//   //   serialization: "binary",
//   //   // binary-utf8, json, none
//   //   reliable: false,
//   // };
//   // // const connClient = ChatRoom.peer.connect(id_remote, optionsConn);

//   // // Initiate PeerJS connection with remote Peer Client
//   // const connClient = ChatRoom.peer.connect(peer_id_remote);
//   // console.info(
//   //   "Initiating a Connection with Remote Peer Client - " + peer_id_remote
//   // );

//   // // Populate calling functions for each event on Connection
//   // addEventsToConnection(connClient);
// });
