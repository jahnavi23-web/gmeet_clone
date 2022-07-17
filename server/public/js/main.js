// UI Element Objects
const connectPeerForm = document.getElementById("peer-id-form");
const msgForm = document.getElementById("msg-form");
const startPeerForm = document.getElementById("peer-form");
const inputMyName = document.getElementById("peer-name");

const enterRoomForm = document.getElementById("room-id-form");
const startRoomForm = document.getElementById("room-form");
const inputRoomName = document.getElementById("room-name");

const myId = document.getElementById("my-id");

const connecInfo = document.getElementById("connec-info");

const btnLeave = document.getElementById("btn-leave");
const btnId = document.getElementById("btn-id");
const btnStartPeer = document.getElementById("btn-start-peer");
const btnStopPeer = document.getElementById("btn-stop-peer");
const btnStartRoom = document.getElementById("btn-start-room");
const btnStopRoom = document.getElementById("btn-end-room");
const btnOpen = document.getElementById("btn-open-connection");
const btnClose = document.getElementById("btn-close-connection");
btnStartPeer.style.display  = "inline";
btnStopPeer.style.display = "none";
btnStartRoom.style.display  = "none";
btnStopRoom.style.display  = "none";

const userGrid = document.getElementById("user-grid");
const userBox = document.createElement("span");
const userID = document.createElement("div");
const userName = document.createElement("h4");

const chatGrid = document.getElementById("chat-grid");
const chatBox = document.createElement("span");
const chatText = document.createElement("div");
const chatName = document.createElement("h4");

const msgInput = document.getElementById("msg");

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

// A place to store all the necessary variables - globally
// Use this object to communicate across functions and events
var ChatRoom = {};
// ChatRoom.peer = {};
ChatRoom.peer = null;
ChatRoom.PEER_CLOUD = true;
ChatRoom.connClients = {};
ChatRoom.connClientNames = {};
ChatRoom.clientsOnCall = [];
ChatRoom.myPeerID = "";
ChatRoom.myPeerName = "Me";
ChatRoom.myVideoStream = {};
ChatRoom.mySdpTransform = () => {
  return;
}; // Advanced MediaStream Settings
ChatRoom.MSG_TYPE = {
  CHAT: "chat",
  CALL: "call",
  END_CALL: "end_call",
  NEW_MEMBER: "new",
  DISCONNECT: "disconnect",
  DEPARTUTE: "leave",
  BROADCAST_MSG: "send to all",
  BROADCAST_CALL: "send to all",
  SEND: "send to one",
  PING: "ping",
  ACK: "ack",
  MEMBERS_REQ: "req",
  MEMBERS_REP: "resp",

  ROOM: "room info",
  START_ROOM: "start a room",
  END_ROOM: "end the room",
  REQUEST_JOIN: "request to join room",
  ACCEPT_JOIN: "accept join request",
  REJECT_JOIN: "reject join request",
  INVITE_CLIENT: "invite a client to room",
  MUTE_CLIENT_AUDIO: "mute client's audio",
  MUTE_CLIENT_VIDEO: "mute client's video",
  ADD_CLIENT: "add a client to room",
  REMOVE_CLIENT: "remove a client from room",
  ASSIGN_HOST: "assign the host role",
  ADD_ROLE: "add new role",
  RECORD_REQ: "request to record the session",
};

ChatRoom.callsList = null;

ChatRoom.myRoomName = "RoomX";
ChatRoom.myRoomID = null;
ChatRoom.myRoom = null;
ChatRoom.myRoomAdmins = null;
ChatRoom.myRoomMembers = null;
ChatRoom.myRoomHost = null;

ChatRoom.room = {
  id: null,
  name: "roomName",
  host: {
    peerid: "hostID",
    name: "hostName",
  },
  admin: {},
  members: [
    {
      peerid: "member_peerID",
      name: "member_name",
      role: "role_in_group",
      audio: true,
      video: true,
      record: false,
      stick: false,
    },
  ],
};

ChatRoom.ROLE = {
  HOST: "host",
  ADMIN: "admin",
  CLIENT: "client",
};

// 'Connect' - When the Peer ID is submitted
connectPeerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  var peer_id_remote = e.target.elements.peerId.value;

  connectPeer(peer_id_remote);
});

// 'Connect' - When the Peer ID is submitted
enterRoomForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get ID
  var room_id_remote = e.target.elements.roomId.value;
  var room_name = ChatRoom.myRoomName;

  if (ChatRoom.members !== null && room_id_remote in ChatRoom.members) {
    connecInfo.innerText = "Connection already exists";
    console.info("Connection already exists.");
    return;
  }

  // Initiate PeerJS connection with remote
  // With Options
  var options = {
    label: "some_unique_label",
    metadata: {},
    serialization: "binary",
    // binary-utf8, json, none
    reliable: false,
  };
  // const connClient = ChatRoom.peer.connect(id_remote, optionsConn);

  // Initiate PeerJS connection with remote Peer Client
  const connRoom = ChatRoom.peer.connect(room_id_remote);
  console.log(
    "Initiating a Connection with Room : " + room_name + " " + room_id_remote
  );

  // Populate calling functions for each event on Connection
  addEventsToRoomConnection(connRoom);
  // addEventsToConnection(connRoom);
});

// 'Send' - When the Message is sent
msgForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get message text
  var msg = e.target.elements.msg.value;
  console.log("Trying to broadcast your message...");

  // Set Payload
  var payload = {
    type: ChatRoom.MSG_TYPE.BROADCAST_MSG,
    peerid: ChatRoom.myPeerID,
    name: ChatRoom.myPeerName,
    room: ChatRoom.myRoom,
    data: msg,
  };

  // Update UI - Self Message
  updateUiChat(payload);

  // Broadcast message to Remote clients
  for (var id in ChatRoom.connClients) {
    var connClient = ChatRoom.connClients[id];
    connClient.send(payload);
  }
});

// 'Start' Connection - When a name is submitted
startPeerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  onClickStartPeerButton();
});

// 'Start' Room - When a Room name is submitted
startRoomForm.addEventListener("submit", (e) => {
  e.preventDefault();
  onClickStartRoomButton();
});

function connectPeer(peer_id_remote) {
  if (peer_id_remote in ChatRoom.connClients) {
    connecInfo.innerText = "Connection already exists";
    console.info("Connection already exists.");
    return;
  }

  var name_remote = ChatRoom.myPeerName;

  console.log(
    "Initiating a Connection with Remote Peer Client : " +
      name_remote +
      " " +
      peer_id_remote
  );

  // Initiate PeerJS connection with remote Peer Client
  const connClient = ChatRoom.peer.connect(peer_id_remote);
  console.info(
    "Initiating a Connection with Remote Peer Client - " + peer_id_remote
  );

  // Populate calling functions for each event on Connection
  addEventsToConnection(connClient);
}

function connectPeer_OLD(peer_id_remote) {
  // Get ID
  var name_remote = ChatRoom.myPeerName;

  if (peer_id_remote in ChatRoom.connClients) {
    connecInfo.innerText = "Connection already exists";
    console.info("Connection already exists.");
    return;
  }

  console.log(
    "Initiating a Connection with Remote Peer Client : " +
      name_remote +
      " " +
      peer_id_remote
  );

  // Initiate PeerJS connection with remote
  // With Options
  var options = {
    label: "some_unique_label",
    metadata: {},
    serialization: "binary",
    // binary-utf8, json, none
    reliable: false,
  };
  // const connClient = ChatRoom.peer.connect(id_remote, optionsConn);

  // Initiate PeerJS connection with remote Peer Client
  const connClient = ChatRoom.peer.connect(peer_id_remote);
  console.info(
    "Initiating a Connection with Remote Peer Client - " + peer_id_remote
  );

  // Populate calling functions for each event on Connection
  addEventsToConnection(connClient);
}

// 'Start' Connection - When a name is submitted
function onClickStartPeerButton() {
  console.log("Start Peer button clicked");

  if (ChatRoom.peer !== null) {
    if (ChatRoom.peer.destroyed === true) {
      console.log("Peer already Exists & But Destroyed. Starting New Peer.");
    } else {
      console.log("Peer already Exists & Active. Cannot Start New Peer.");
      return;
    }
  } else {
    console.log("Starting New Peer.");
  }
  btnStartPeer.style.display  = "none";
  btnStopPeer.style.display  = "inline";
  btnStartRoom.style.display  = "inline";
  btnStopRoom.style.display  = "none";

  // Get My Name
  var name = inputMyName.value;
  ChatRoom.myPeerName = name;

  // Create a new Peer Object
  // Options for Local Peer Object
  var options_peer = {
    key: undefined,
    host: IP_ADDR,
    port: "3001",
    pingInterval: 5000,
    path: "/",
    secure: false,
    config: {},
    debug: 1,
  };

  if (ChatRoom.PEER_CLOUD) {
    // Cloud Peer Broker Server
    ChatRoom.peer = new Peer();
  } else {
    // Local Peer Broker Server
    ChatRoom.peer = new Peer(undefined, options_peer);
  }

  // Populate Peer Object with On-Events
  addEventsToPeerObject(ChatRoom.peer);
}
// );

// 'Start' Room - When a name is submitted
function onClickStartRoomButton() {
  console.log("Start Room button clicked");

  // Create a Room on Existing Peer
  if (ChatRoom.peer === null) {
    console.log("Cannot Create Room. Peer Doesn't exist.");
    return;
  }

  if (ChatRoom.peer.destroyed === true) {
    console.log("Cannot Creat Room. Peer Exists But Destroyed.");
    return;
  }

  if (ChatRoom.myRoomID === ChatRoom.peer.id) {
    console.log("Your Room already exists.");
  }

  // Create the room
  console.log("Creating your room");
  updateMyRoom();
  console.log("Room Creation Successful");

  // Update UI
  myId.innerHTML = ChatRoom.myPeerID;

  btnStartRoom.disabled = true;
  btnStopRoom.disabled = false;
}

function updateMyRoom() {
  // Get My Name
  console.log("Updating Your Room settings");

  var roomName = inputRoomName.value;
  ChatRoom.myRoomName = roomName;
  var myPeerName = inputMyName.value;
  ChatRoom.myPeerName = myPeerName;

  ChatRoom.myPeerID = ChatRoom.peer.id;
  ChatRoom.myRoomID = ChatRoom.peer.id;

  ChatRoom.myRoomHost = {
    peerid: ChatRoom.myPeerID,
    name: ChatRoom.myPeerName,
    role: ChatRoom.ROLE.HOST,
    audio: true,
    video: true,
    record: false,
    stick: true,
  };

  ChatRoom.myRoom = {};
  ChatRoom.myRoom = {
    id: ChatRoom.myRoomID,
    name: ChatRoom.myRoomName,
    host: {
      peerid: ChatRoom.myPeerID,
      name: ChatRoom.myPeerName,
    },
    admin: ChatRoom.myRoomAdmins,
    members: [ChatRoom.myRoomHost],
  };

  console.log("Room settings Update sucessfull");
  console.log(ChatRoom);
}

btnStopPeer.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("Stop button clicked");

  if (ChatRoom.peer === null) {
    console.log("No Peer Exists to Stop.");
    return;
  }

  if (ChatRoom.peer.destroyed) {
    console.log("Peer already Exists & Destroyed. Nothing to Stop.");
    return;
  }

  btnStartPeer.style.display  = "inline";
  btnStopPeer.style.display  = "none";
  btnStartRoom.style.display  = "none";
  btnStopRoom.style.display  = "none";

  ChatRoom.peer.destroy();

  var peerid = ChatRoom.myPeerID;
  removeVideoStream(peerid);
});

btnStopRoom.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("Stop button clicked");

  if (ChatRoom.peer === null) {
    console.log("No Peer Exists to Stop.");
    return;
  }

  if (ChatRoom.peer.destroyed) {
    console.log("Peer already Exists & Destroyed. Nothing to Stop.");
    return;
  }

  btnStartRoom.disabled = false;
  btnStopRoom.disabled = true;

  ChatRoom.peer.destroy();

  var peerid = ChatRoom.myPeerID;
  removeVideoStream(peerid);
});

var room_test = {
  id: "null",
  name: "roomName",
  host: {
    peerid: "hostID",
    name: "hostName",
  },
  admin: {},
  members: [
    {
      peerid: "member_peerID",
      name: "member_name",
      role: "role_in_group",
      audio: true,
      video: true,
      record: false,
      stick: false,
    },
  ],
};
var data_test = {
  peerid: 12323123,
  name: "ivana",
  room: room_test,
};
// updateUiUsers(data_test);

// Update Users List - On new User or User left
function updateUiUsers(data) {
  console.info("Updating UI Users");
  // if(data.peerid in ChatRoom.connClients) {
  //   return;
  // }

  const userForm_ = document.createElement("form");
  const userBox_ = document.createElement("div");
  const userID_ = document.createElement("div");
  const userUpperBox_ = document.createElement("div");
  const userName_ = document.createElement("div");
  userBox_.classList.add("message-they");
  userID_.classList.add("message-text");
  userUpperBox_.classList.add("user-upper-box-flex");
  userName_.classList.add("message-username");
  userForm_.setAttribute("peerid", data.peerid);
  userID_.setAttribute("peerid", data.peerid);

  userForm_.setAttribute("id", `user-grid-item-${data.peerid}`);

  const btnCall_ = document.createElement("button");
  const btnEndCall_ = document.createElement("button");
  const btnDisconnect_ = document.createElement("button");
  const btnReconnect_ = document.createElement("button");
  const btnJoinRoom_ = document.createElement("button");
  const btnLeaveRoom_ = document.createElement("button");
  const btnCloseConn_ = document.createElement("button");

  btnCall_.classList.add("btn-call", "green");
  btnEndCall_.classList.add("btn-call", "red");
  btnDisconnect_.classList.add("btn-call", "red");
  btnReconnect_.classList.add("btn-call", "green");
  btnJoinRoom_.classList.add("btn-call", "green");
  btnLeaveRoom_.classList.add("btn-call", "red");
  btnCloseConn_.classList.add("btn-call", "red");

  btnCall_.setAttribute("id", `btn-call-${data.peerid}`);
  btnEndCall_.setAttribute("id", `btn-end-call-${data.peerid}`);
  btnDisconnect_.setAttribute("id", `btn-disconnect-${data.peerid}`);
  btnReconnect_.setAttribute("id", `btn-reconnect-${data.peerid}`);
  btnJoinRoom_.setAttribute("id", `btn-join-${data.peerid}`);
  btnLeaveRoom_.setAttribute("id", `btn-leave-${data.peerid}`);
  btnCloseConn_.setAttribute("id", `btn-close-${data.peerid}`);

  btnCall_.setAttribute("peerid", data.peerid);
  btnEndCall_.setAttribute("peerid", data.peerid);
  btnDisconnect_.setAttribute("peerid", data.peerid);
  btnReconnect_.setAttribute("peerid", data.peerid);
  btnJoinRoom_.setAttribute("peerid", data.peerid);
  btnLeaveRoom_.setAttribute("peerid", data.peerid);
  btnCloseConn_.setAttribute("peerid", data.peerid);

  const svgCall =
    // btnCall_.innerHTML = "Call";
    (btnCall_.innerHTML = "📞");
  // btnEndCall_.innerHTML = "End_Call";☎️
  btnEndCall_.innerHTML = "📞";
  // btnDisconnect_.innerHTML = "Disconnect";
  btnDisconnect_.innerHTML = "↔️";
  btnReconnect_.innerHTML = "↔️";
  // btnDisconnect_.innerHTML = "Join";
  btnJoinRoom_.innerHTML = "👪";
  btnLeaveRoom_.innerHTML = "👪";
  btnCloseConn_.innerHTML = "✖️";

  btnCall_.style.display = "block";
  btnEndCall_.style.display = "none";
  btnReconnect_.style.display = "none";
  btnDisconnect_.style.display = "block";
  btnCloseConn_.style.display = "block";

  if (data.room === null) {
    btnJoinRoom_.style.display = "none";
    btnLeaveRoom_.style.display = "none";
    console.log("hidden");
  } else {
    btnJoinRoom_.style.display = "block";
    btnLeaveRoom_.style.display = "none";
    console.log("visible");
  }
  // btnJoinRoom_.disabled = true;
  // btnLeaveRoom_.disabled = true;

  userID_.innerHTML = data.peerid;
  userName_.innerHTML = data.name;
  userUpperBox_.append(userName_);
  userUpperBox_.append(btnCall_);
  userUpperBox_.append(btnEndCall_);
  userUpperBox_.append(btnJoinRoom_);
  userUpperBox_.append(btnLeaveRoom_);
  userUpperBox_.append(btnReconnect_);
  userUpperBox_.append(btnDisconnect_);
  userUpperBox_.append(btnCloseConn_);
  userBox_.append(userUpperBox_);
  userBox_.append(userID_);
  userForm_.append(userBox_);
  userGrid.append(userForm_);

  btnCall_.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Call button clicked");
    // console.log(e);
    var peerid = e.target.attributes.peerid.value;
    console.log("call peerid : " + peerid);

    btnCall_.style.display = "none";
    btnEndCall_.style.display = "block";

    var options = {
      metadata: {},
      sdpTransform: ChatRoom.mySdpTransform,
    };
    var call = ChatRoom.peer.call(peerid, ChatRoom.myVideoStream, options); // MediaConnection

    if (ChatRoom.callsList === null) ChatRoom.callsList = {};
    if (call.peer in ChatRoom.callsList === true) return;

    ChatRoom.callsList[peerid] = call;
    // console.log(ChatRoom.callsList);

    placeCall(call);
  });

  btnEndCall_.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("End Call button clicked");
    // console.log(e);

    var peerid = e.target.attributes.peerid.value;
    console.log("Ending Call of : " + peerid);

    btnCall_.style.display = "block";
    btnEndCall_.style.display = "none";

    endCall(peerid);
    // ChatRoom.callsList[peerid].close();
    // console.log(ChatRoom.callsList);

    var payload = {
      type: ChatRoom.MSG_TYPE.END_CALL,
      peerid: ChatRoom.myPeerID,
      name: ChatRoom.myPeerName,
      room: ChatRoom.myRoom,
    };
    ChatRoom.connClients[peerid].send(payload);
  });

  btnDisconnect_.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Disconnect button clicked");
    // console.log(e);
    var peerid = e.target.attributes.peerid.value;
    console.log("Disconnecting dataConnection with : " + peerid);

    btnDisconnect_.style.display = "none";
    btnReconnect_.style.display = "block";

    disconnectClient(peerid);
  });

  btnReconnect_.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Reconnect button clicked");
    // console.log(e);
    var peerid = e.target.attributes.peerid.value;
    console.log("Reconnecting dataConnection with : " + peerid);

    btnDisconnect_.style.display = "block";
    btnReconnect_.style.display = "none";

    reconnectClient(peerid);
  });

  btnJoinRoom_.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Join Room button clicked");
    // console.log(e);
    var peerid = e.target.attributes.peerid.value;
    console.log("Joining Room : " + peerid);

    btnJoinRoom_.style.display = "none";
    btnLeaveRoom_.style.display = "block";

    joinRoom(peerid);
  });

  btnLeaveRoom_.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Leave Room button clicked");
    // console.log(e);
    var peerid = e.target.attributes.peerid.value;
    console.log("Leaving Room : " + peerid);

    btnJoinRoom_.style.display = "block";
    btnLeaveRoom_.style.display = "none";

    leaveRoom(peerid);
  });

  btnCloseConn_.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Close connection button clicked");
    // console.log(e);
    var peerid = e.target.attributes.peerid.value;
    console.log("Closing connection : " + peerid);

    closeClientConn(peerid) (peerid);
  });
}

function joinRoom(peerid) {}
function leaveRoom(peerid) {}

function closeClientConn(peerid) {
  var payload = {
    type: ChatRoom.MSG_TYPE.DISCONNECT,
    peerid: ChatRoom.myPeerID,
    name: ChatRoom.myPeerName,
    room: ChatRoom.myRoom,
  };

  if (ChatRoom.connClients === null) return;
  if (peerid in ChatRoom.connClients === false) return;

  if (ChatRoom.connClients[peerid].open) {
    // If Connection Open
    ChatRoom.connClients[peerid].send(payload);
    ChatRoom.connClients[peerid].close();
    return;
  }
  delete ChatRoom.connClients[peerid];

  endCall(peerid);

  // var btnCall_ = document.getElementById(`btn-call-${peerid}`);
  // var btnEndCall_ = document.getElementById(`btn-end-call-${peerid}`);
  // var btnDisconnect_ = document.getElementById(`btn-disconnect-${peerid}`);
  // var btnReconnect_ = document.getElementById(`btn-reconnect-${peerid}`);

  // btnCall_.style.display = true;
  // btnEndCall_.style.display = true;
  // btnReconnect_.style.display = false;
  // btnDisconnect_.style.display = true;

  const userGridItem = document.getElementById(`user-grid-item-${peerid}`);
  userGridItem.remove();
}

function disconnectClient(peerid) {
  if (ChatRoom.connClients === null) return;
  if (peerid in ChatRoom.connClients === false) return;

  var payload = {
    type: ChatRoom.MSG_TYPE.DISCONNECT,
    peerid: ChatRoom.myPeerID,
    name: ChatRoom.myPeerName,
    room: ChatRoom.myRoom,
  };

  if (ChatRoom.connClients[peerid].open) {
    // If Connection Open
    ChatRoom.connClients[peerid].send(payload);
    ChatRoom.connClients[peerid].close();
    return;
  }
  delete ChatRoom.connClients[peerid];
  console.log("Client connections");
  console.log(ChatRoom.connClients);

  endCall(peerid);

  var btnCall_ = document.getElementById(`btn-call-${peerid}`);
  var btnEndCall_ = document.getElementById(`btn-end-call-${peerid}`);
  var btnDisconnect_ = document.getElementById(`btn-disconnect-${peerid}`);
  var btnReconnect_ = document.getElementById(`btn-reconnect-${peerid}`);

  btnCall_.style.display = true;
  btnEndCall_.style.display = true;
  btnReconnect_.style.display = false;
  btnDisconnect_.style.display = true;

  // const userGridItem = document.getElementById(`user-grid-item-${peerid}`);
  // userGridItem.remove();
}

function reconnectClient(peerid) {
  connectPeer(peerid);
}

// Update Conversation - On new message
function updateUiChat(data) {
  // data = {data: 'hello', name: 'ivana'};

  var message_from = "";
  if (data.name === ChatRoom.myPeerName) {
    message_from = "message-me";
  } else {
    message_from = "message-they";
  }

  const chatBox_ = document.createElement("div");
  const chatText_ = document.createElement("div");
  const chatName_ = document.createElement("div");
  chatBox_.classList.add(message_from);
  chatText_.classList.add("message-text");
  chatName_.classList.add("message-username");

  chatName_.innerHTML = data.name;
  chatText_.innerHTML = data.data;
  chatBox_.append(chatName_);
  chatBox_.append(chatText_);
  chatGrid.append(chatBox_);

  msgInput.value = "";
}

function addNewMember(data) {
  console.info("New member/user : " + data.name);
  console.info(data);
  // Update Connection Names
  ChatRoom.connClientNames[data.peerid] = data.name;
  // Update UI - users
  updateUiUsers(data);
}

// On recieving data from fellow Peer
function dispatchConnData(data) {
  console.log("Recieved data from peer: " + data.name);
  switch (data.type) {
    case ChatRoom.MSG_TYPE.NEW_MEMBER:
      addNewMember(data);
      break;
    case ChatRoom.MSG_TYPE.BROADCAST_MSG:
      console.info("Message recieved from : " + data.name);
      // Update UI - messages
      updateUiChat(data);
      break;
    case ChatRoom.MSG_TYPE.END_CALL:
      console.info("Request Recieved to End Call");
      endCall(data.peerid);
      break;
    case ChatRoom.MSG_TYPE.DISCONNECT:
      console.info("Request Recieved to Disconnect Client");

      disconnectClient(data.peerid);
      break;
    case ChatRoom.MSG_TYPE.REQUEST_JOIN:
      addNewMember(data);
      break;
    case ChatRoom.MSG_TYPE.ROOM:
      console.info("Room info recieved");
      dispatchRoomData(data);
      break;
    default:
      console.info("Unknown DataType. What to do with the recieved data?");
      break;
  }
}

function dispatchRoomData(data) {
  console.log("Recieved data from peer: " + data.name);
  switch (data.type) {
    case ChatRoom.MSG_TYPE.NEW_MEMBER:
      addNewMember(data);
      break;
    case ChatRoom.MSG_TYPE.BROADCAST_MSG:
      console.info("Message recieved from : " + data.name);
      // Update UI - messages
      updateUiChat(data);
      break;
    case ChatRoom.MSG_TYPE.END_CALL:
      console.info("Request Recieved to End Call");
      endCall(data.peerid);
      break;
    case ChatRoom.MSG_TYPE.DISCONNECT:
      console.info("Request Recieved to Disconnect Client");

      disconnectClient(data.peerid);
      break;
    case ChatRoom.MSG_TYPE.REQUEST_JOIN:
      addNewMember(data);
      break;
    case ChatRoom.MSG_TYPE.ROOM:
      console.info("Room info recieved");
      dispatchRoomData(data);
      break;
    default:
      console.info("Unknown DataType. What to do with the recieved data?");
      break;
  }
}

function muteAudio() {}
function unmuteAudio() {}
function muteVideo() {}
function unmuteVideo() {}

// Handling all Peer Errors at a place
function dispatchPeerError(err) {
  console.info("Trouble with PeerJS Object");
  switch (err.type) {
    case "browser-incompatible":
      console.error(
        "This browser does not support some or all WebRTC features that you are trying to use."
      );
      break;
    case "disconnected":
      console.error(
        "You've already disconnected this peer from the server and can no longer make any new connections on it."
      );
      break;
    case "invalid-id":
      console.error(
        "FATAL: The ID passed into the Peer constructor contains illegal characters."
      );
      break;
    case "invalid-key":
      console.error(
        "The API key passed into the Peer constructor contains illegal characters or is not in the system (cloud server only)."
      );
      break;
    case "network":
      console.error(
        "Lost or cannot establish a connection to the signalling server."
      );
      break;
    case "peer-unavailable":
      console.error("The peer you're trying to connect to does not exist.");
      break;
    case "ssl-unavailable":
      console.error(
        "FATAL: PeerJS is being used securely, but the cloud server does not support SSL. Use a custom PeerServer."
      );
      break;
    case "server-error":
      console.error("FATAL: Unable to reach the server.");
      break;
    case "socket-error":
      console.error("FATAL: An error from the underlying socket.");
      break;
    case "socket-closed":
      console.error("FATAL: The underlying socket closed unexpectedly.");
      break;
    case "unavailable-id":
      console.error(
        "NOT_SO_FATAL: The ID passed into the Peer constructor is already taken. This error is not fatal if your peer has open peer-to-peer connections. This can happen if you attempt to reconnect a peer that has been disconnected from the server, but its old ID has now been taken."
      );
      break;
    case "webrtc":
      console.error("Native WebRTC error.");
      break;
    default:
      console.error("Unknown PeerJS error. Needs further investigation");
  }
}

function endCall(peerid) {
  if (
    ChatRoom.callsList === null ||
    Object.keys(ChatRoom.callsList).length === 0
  ) {
    console.log("Call list is empty. No calls to end.");
    return;
  }

  if (peerid in ChatRoom.callsList === false) {
    console.log("No such call in active calls list.");
    return;
  }

  var btnCall_ = document.getElementById(`btn-call-${peerid}`);
  var btnEndCall_ = document.getElementById(`btn-end-call-${peerid}`);

  btnCall_.disabled = false;
  btnEndCall_.disabled = true;

  console.log("Enging call peerid : " + peerid);
  // delete ChatRoom.callsList[peerid];
  ChatRoom.callsList[peerid].close();
  delete ChatRoom.callsList[peerid];
  console.log(ChatRoom.callsList);
  removeVideoStream(peerid);
}

// Remove a Video from Grid - On Call End
function removeVideoStream(peerid) {
  const videoGridItem = document.getElementById(`video-grid-item-${peerid}`);
  // document.getElementById("video-grid").removeChild(videoGridItem);
  console.log("removing video from video grid");
  videoGridItem.remove();
}

// --------------------------------------------------------

// VIDEO - WEB CAMERA

const videoGrid = document.getElementById("video-grid");
const myVideo = document.createElement("video");
// const newVideo = document.getElementById("video");
myVideo.muted = true;

// Show Self Video first - On Peer Connection Successful
function setUpMyVideo() {
  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function (stream) {
        // Show our video on our Screen
        addVideoStream(myVideo, stream, ChatRoom.myPeerName, ChatRoom.myPeerID);
        ChatRoom.myVideoStream = stream;
      })
      .catch(function (error) {
        console.log("Something went wrong!");
      });
  }
}

// Remove Self Video - On Peer Connection Closed / Destroyed
function removeMyVideo() {
  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function (stream) {
        // Show our video on our Screen
        addVideoStream(myVideo, stream, ChatRoom.myPeerName, ChatRoom.myPeerID);
        ChatRoom.myVideoStream = stream;
      })
      .catch(function (err0r) {
        console.log("Something went wrong!");
      });
  }
}

// Add a new Video to Grid - On each new Call from a User
function addVideoStream(video, stream, name, peerid) {
  video.srcObject = stream;
  const videoGridItem = document.createElement("div");
  videoGridItem.classList.add("video-grid-item");
  console.log("add video stream with peerid: " + peerid);
  videoGridItem.setAttribute("id", `video-grid-item-${peerid}`);

  const myname = document.createElement("div");
  myname.classList.add("video-overlay");
  myname.innerHTML = name;
  videoGridItem.append(video);
  videoGridItem.append(myname);
  video.addEventListener("loadedmetadata", () => {
    video.play();
  });
  videoGrid.append(videoGridItem);
}

// Reply to a Call - On recieved a new Call
function replyToCall(call) {
  console.log("Recieving a call from " + call.peer);

  call.answer(ChatRoom.myVideoStream, {
    SdpTransform: ChatRoom.mySdpTransform,
  });

  addEventsToCall(call);
}

// Request a Call - When You want to call a Peer
function placeCall(call) {
  console.log("Sending a call request to " + call.peer);

  addEventsToCall(call);
}

function addEventsToCall(call) {
  call.on("stream", (remoteUserVideoStream) => {
    console.log("Call > Recieved Stream");

    // if (ChatRoom.clientsOnCall.includes(call.peer)) {
    //   console.log("Call already in progress");
    //   return;
    // }
    // ChatRoom.clientsOnCall.push(call.peer);
    console.log("Call accepted");

    const video = document.createElement("video");

    addVideoStream(
      video,
      remoteUserVideoStream,
      ChatRoom.connClientNames[call.peer],
      call.peer
    );
  });

  call.on("close", () => {
    console.info("Closed the Call.");
  });

  call.on("error", (err) => {
    console.info("Trouble Placing a Call");
    console.err("Error while placing a Call: " + err);
  });
}

// Populate calling functions for each event on Connection
function addEventsToConnection(connClient) {
  // On connection is Ready to communicate
  connClient.on("open", () => {
    // Send your name to Client
    var payload = {
      type: ChatRoom.MSG_TYPE.NEW_MEMBER,
      peerid: ChatRoom.myPeerID,
      name: ChatRoom.myPeerName,
      room: ChatRoom.myRoom,
      data: "",
    };
    connClient.send(payload);

    console.log("Connected to Peer Client: " + connClient.peer);

    // Save the Connection for future uses
    ChatRoom.connClients[connClient.peer] = connClient;
  });

  // On recieving data from fellow Peer
  connClient.on("data", (data) => {
    dispatchConnData(data);
  });

  // On 'close' of either MyPeer or Client connection
  connClient.on("close", () => {
    console.info("Closing connection: " + connClient.peer);
    // if (!connClient.open) {
    //   // Already closed
    //   console.log("Already closed.");
    //   return;
    // }
    disconnectClient(connClient.peer);
    // connClient.close();
  });

  // On Any Error with Connection
  connClient.on("error", (conn_err) => {
    console.info("Trouble with a connection");
    console.error(conn_err);
  });
}

// Populate calling functions for each event on Connection
function addEventsToRoomConnection(connRoom) {
  // On connection is Ready to communicate
  connRoom.on("open", () => {
    // Send your Name and Room State to Client

    ChatRoom.room = {
      id: connRoom.peer,
      host: connRoom.peer,
      admin: "",
      members: [],
    };
    var member = {
      peerid: ChatRoom.myPeerID,
      name: ChatRoom.myPeerName,
      role: "host",
      audio: true,
      video: true,
      record: false,
      stick: true,
    };

    ChatRoom.room.members.push(member);

    var payload = {
      type: ChatRoom.MSG_TYPE.REQUEST_JOIN,
      peerid: ChatRoom.myPeerID,
      name: ChatRoom.myPeerName,
      room: ChatRoom.myRoom,
      data: "",
    };
    connRoom.send(payload);

    console.log("Connected to Room: " + connRoom.peer);

    // Save the Connection for future uses
    ChatRoom.connClients[connRoom.peer] = connRoom;
  });

  // On recieving data from fellow Peer
  connRoom.on("data", (data) => {
    console.log(data);
    dispatchRoomData(data);
    // dispatchConnData(data);
  });

  // On 'close' of either MyPeer or Client connection
  connRoom.on("close", () => {
    console.info("Closing connection: " + connRoom.peer);
    // if (!connClient.open) {
    //   // Already closed
    //   console.log("Already closed.");
    //   return;
    // }
    disconnectClient(connRoom.peer);
    // connClient.close();
  });

  // On Any Error with Connection
  connRoom.on("error", (conn_err) => {
    console.info("Trouble with a connection");
    console.error(conn_err);
  });
}

// Add function to populate Peer events
function addEventsToPeerObject(peer) {
  // On connection with Peer Broker
  peer.on("open", (myPeerID) => {
    console.info(
      "Success - Connected to Peer Broker with assigned myPeerID: " + myPeerID
    );

    // Get My Peer ID
    ChatRoom.myPeerID = myPeerID;
    myId.innerHTML = myPeerID;

    setUpMyVideo();
  });

  // On Connection request from remote Peer Client
  peer.on("connection", (connClient) => {
    console.info(
      "Recieved a Connection Request from Remote Peer Client - " +
        connClient.peer
    );

    // Populate calling functions for each event on Connection
    addEventsToConnection(connClient);
  });

  // TODO: CORRECT THE CONDITIONAL EXPRESSION
  peer.on("call", (call) => {
    if (ChatRoom.callsList === null) ChatRoom.callsList = {};
    if (call.peer in ChatRoom.callsList === true) return;

    ChatRoom.callsList[call.peer] = call;

    replyToCall(call);

    var btnCall_ = document.getElementById(`btn-call-${call.peer}`);
    var btnEndCall_ = document.getElementById(`btn-end-call-${call.peer}`);

    btnCall_.disabled = true;
    btnEndCall_.disabled = false;
  });

  peer.on("close", () => {
    console.info(
      "Peer Object is destroyed and it's related data is lost, memory is released. peer object can no longer operate connection. User 'new Peer();"
    );
  });

  peer.on("disconnected", () => {
    console.info(
      "Connection link is lost temporarily.. please wait or try again later with 'peer.reconnect();"
    );
    // peer.reconnect();
  });

  peer.on("error", (peer_error) => {
    dispatchPeerError(peer_error);
  });
}

// Add function to populate Peer events
function addEventsToPeerRoomObject(peer) {
  // On connection with Peer Broker
  peer.on("open", (myPeerID) => {
    console.info(
      "Success - Connected to Peer Broker with assigned myPeerID: " + myPeerID
    );

    // Get My Peer ID
    ChatRoom.myPeerID = myPeerID;
    ChatRoom.myRoomID = myPeerID;

    myId.innerHTML = myPeerID;

    setUpMyVideo();
  });

  // On Connection request from remote Peer Client
  peer.on("connection", (connClient) => {
    console.info(
      "Recieved a Connection Request from Remote Peer Client - " +
        connClient.peer
    );

    // Populate calling functions for each event on Connection
    addEventsToConnection(connClient);
  });

  // TODO: CORRECT THE CONDITIONAL EXPRESSION
  peer.on("call", (call) => {
    if (ChatRoom.callsList === null) ChatRoom.callsList = {};
    if (call.peer in ChatRoom.callsList === true) return;

    ChatRoom.callsList[call.peer] = call;

    replyToCall(call);

    var btnCall_ = document.getElementById(`btn-call-${call.peer}`);
    var btnEndCall_ = document.getElementById(`btn-end-call-${call.peer}`);

    btnCall_.disabled = true;
    btnEndCall_.disabled = false;
  });

  peer.on("close", () => {
    console.info(
      "Peer Object is destroyed and it's related data is lost, memory is released. peer object can no longer operate connection. User 'new Peer();"
    );
  });

  peer.on("disconnected", () => {
    console.info(
      "Connection link is lost temporarily.. please wait or try again later with 'peer.reconnect();"
    );
    // peer.reconnect();
  });

  peer.on("error", (peer_error) => {
    dispatchPeerError(peer_error);
  });
}

// ----------------------------------------------------------

// 'Leave' - Wrap up & Leave the Chat
btnLeave.onclick = () => {
  console.log("Clicked Send Peer Button");

  for (var peer in ChatRoom.connClients) {
    console.log("peer id: " + peer);
    ChatRoom.connClients[peer].close();
  }

  // testBrowserSupport();

  // // Send out Destroy Object Signals
  // for (var id in ChatRoom.connClients) {
  //   var payload = {
  //     type: ChatRoom.MSG_TYPE.DEPARTURE,
  //     peerid: ChatRoom.myPeerID,
  //     name: ChatRoom.myPeerName,
  //     data: "",
  //   };
  //   var connClient = ChatRoom.connClients[id];
  //   connClient.send(payload);
  // }

  // Test Experimental UI Features here - Without Connecting
  // var data = { peerid: 12323123, name: "ivana" };
  // updateUiUsers(data);
  // data = { data: "hello", name: "ivana" };
  // updateUiChat(data);
  // ChatRoom.myPeerName = "shiv";
  // data = { data: "hi", name: "shiv" };
  // updateUiChat(data);
};

// Copy the ID text to clipboard - to be send to Peer
// button_id.onclick = () => {
//   copyToClipboard("my-id");
// };

// Copy ID to clipboard
// TODO: Make it compatible with Android
function copyToClipboard(containerId) {
  /* Get the text field */
  var copyText = document.getElementById(containerId);
  var text = copyText.textContent;

  /* Copy the text inside the text field */
  navigator.clipboard.writeText(text);

  /* Alert the copied text */
  alert("Copied the text: " + text);
}

// -----------------------------------------

// // On Page Start
function testBrowserSupport() {
  var browser = window.peerjs.util.browser;
  if (browser === "Unsupported") {
    console.log("Your Browser is " + browser);
    return;
  }
  console.log("Your Browser is " + browser + " & works with PeerJS/WebRTC");

  let reliability = window.peerjs.util.supports.reliable
    ? "Reliable"
    : "Unreliable";
  console.log("It supports " + reliability + ": ");
  window.peerjs.util.supports.audioVideo
    ? console.log("  Audio Video Streams")
    : null;
  window.peerjs.util.supports.data ? console.log("  Data Channels") : null;
  window.peerjs.util.supports.binary
    ? console.log("  Binary Data Channels")
    : null;
}

document.addEventListener("load", (e) => {
  e.preventDefault();

  testBrowserSupport();
});

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