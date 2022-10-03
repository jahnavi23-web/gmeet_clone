import {
  uiEndCall,
  uiOnDisconnectClient,
  uiUpdateUsers,
  uiGetRoomName,
  uiGetMyName,
  uiOnClickStartRoomButton,
  uiOnclickStartPeerButton,
  uiSetConnectionStatus,
  uiRemoveUser,
  updateUiChat,
} from "./ui.js";

import { addEventsToPeerObject, addEventsToCall } from "./peer.js";

// // PEER JS - DATA
const IP_ADDR = "192.168.43.130"; // Redmi Hotspot IP
// const IP_ADDR = "192.168.43.38";  // Samsung Hotspot IP

// A place to store all the necessary variables - globally
// Use this object to communicate across functions and events
export var ChatRoom = {};
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
  NEW_CONN: "new_connection",
  CLOSE: "close_connection",
  DISCONNECT: "disconnect",
  RECONNECT: "reconnect",
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

function addConnToList(connClient) {
  ChatRoom.connClients[connClient.peer] = connClient;
  console.log("Added a Connection to List");
  // console.info(connClient);
  // console.info(ChatRoom.connClients);
}

function removeConnFromList(peerid) {
  delete ChatRoom.connClients[peerid];
  console.log("Removed a Connection to List");
}

function closeConnection(peerid) {
  ChatRoom.connClients[peerid].close();
}

function sendDataTo(peerid, payload) {
  ChatRoom.connClients[peerid].send(payload);
}

function isConnection(peer_id_remote) {
  return peer_id_remote in ChatRoom.connClients;
}

export function connectPeer(peer_id_remote) {
  if (isConnection(peer_id_remote)) return;

  console.log("Initiating a Connection with : " + peer_id_remote);

  // Initiate PeerJS connection with remote Peer Client
  const connClient = ChatRoom.peer.connect(peer_id_remote);
  console.log("Create Connection with : " + peer_id_remote);

  // Populate calling functions for each event on Connection
  addEventsToConnection(connClient);
}

function connectPeer_OLD(peer_id_remote) {
  // Get ID
  var name_remote = ChatRoom.myPeerName;

  if (peer_id_remote in ChatRoom.connClients) {
    uiSetConnectionStatus("Connection already exists");
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
    addConnToList(connClient);
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
    // disconnectClient(connRoom.peer);
    removeClientConnection(connRoom.peer);

    // connClient.close();
  });

  // On Any Error with Connection
  connRoom.on("error", (conn_err) => {
    console.info("Trouble with a connection");
    console.error(conn_err);
  });
}

export function onEnterRoomForm(room_id_remote) {
  var room_name = ChatRoom.myRoomName;

  if (ChatRoom.members !== null && room_id_remote in ChatRoom.members) {
    uiSetConnectionStatus("Connection already exists");
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
}

export function endCall(peerid) {
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

  console.log("Enging call peerid : " + peerid);
  // delete ChatRoom.callsList[peerid];
  ChatRoom.callsList[peerid].close();
  delete ChatRoom.callsList[peerid];
  console.log(ChatRoom.callsList);

  uiEndCall(peerid);
}

function joinRoom(peerid) {}
function leaveRoom(peerid) {}

export function closeClientConnection(peerid) {
  if (isListEmpty()) return;
  if (!isConnection(peerid)) return;
  if (!isConnOpen(peerid)) return;

  var payload = {
    type: ChatRoom.MSG_TYPE.CLOSE,
    peerid: ChatRoom.myPeerID,
    name: ChatRoom.myPeerName,
    room: ChatRoom.myRoom,
  };
  // sendDataTo(peerid, payload);
  console.log("sending data to close client connection");
  ChatRoom.connClients[peerid].send(payload);

  // closeConnection(peerid);
  removeClientConnection(peerid);
}

export function removeClientConnection(peerid) {
  removeConnFromList(peerid);
  console.log("Deleted the connection : " + peerid);

  endCall(peerid);

  // uiRemoveUser(peerid);
}

function isListEmpty() {
  // console.log(ChatRoom);
  return ChatRoom.connClients === null;
}

function isConnOpen(peerid) {
  return ChatRoom.connClients[peerid].open;
}

export function disconnectClient(peerid) {
  console.info("disconnectClient");
  if (isListEmpty()) return;
  console.info("list not empty");
  if (!isConnection(peerid)) return;
  console.info("is a connection");

  var payload = {
    type: ChatRoom.MSG_TYPE.DISCONNECT,
    peerid: ChatRoom.myPeerID,
    name: ChatRoom.myPeerName,
    room: ChatRoom.myRoom,
  };

  if (isConnOpen(peerid)) {
    console.log("Connection is open");
    // sendDataTo(peerid, payload);
    ChatRoom.connClients[peerid].send(payload);
    setTimeout(closeConnection(peerid), 10);
    // return;
  }

  uiOnDisconnectClient(peerid);
}

// On recieving data from fellow Peer
function dispatchConnData(data) {
  console.log("Recieved data from peer: " + data.name);
  switch (data.type) {
    case ChatRoom.MSG_TYPE.NEW_CONN:
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
    case ChatRoom.MSG_TYPE.CLOSE:
      console.info("Request Recieved to Close Client");
      closeClientConnection(data.peerid);
      // removeClientConnection(data.peerid);
      uiRemoveUser(data.peerid);
      break;
    case ChatRoom.MSG_TYPE.DISCONNECT:
      console.info("Request Recieved to Disconnect Client");
      closeClientConnection(data.peerid);
      // removeClientConnection(data.peerid);
      // uiRemoveUser(data.peerid);
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
    case ChatRoom.MSG_TYPE.NEW_CONN:
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

export function reconnectClient(peerid) {
  connectPeer(peerid);
}

function updateMyRoom() {
  // Get My Name
  console.log("Updating Your Room settings");

  ChatRoom.myRoomName = uiGetRoomName();
  ChatRoom.myPeerName = uiGetMyName();

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

// 'Start' Room - When a name is submitted
export function startMyRoom() {
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
    return; // ??
  }

  // Create the room
  console.log("Creating your room");
  updateMyRoom();
  console.log("Room Creation Successful");

  // Update UI
  uiOnClickStartRoomButton();
}

// 'Start' Connection - When a name is submitted
export function startMyPeer() {
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

  uiOnclickStartPeerButton();

  // Get My Name
  ChatRoom.myPeerName = uiGetMyName();

  // Create a new Peer Object
  // Options for Local Peer Object
  var options_peer = {
    key: undefined,
    host: IP_ADDR,
    port: "3001",
    pingInterval: 5000,
    path: "/",
    secure: true,
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

// Populate calling functions for each event on Connection
export function addEventsToConnection(connClient) {
  // On connection is Ready to communicate
  connClient.on("open", () => {
    // Send your name to Client
    var payload = {
      type: ChatRoom.MSG_TYPE.NEW_CONN,
      peerid: ChatRoom.myPeerID,
      name: ChatRoom.myPeerName,
      data: "",
    };
    connClient.send(payload);

    console.log("Connected to Peer Client: " + connClient.peer);

    // Save the Connection for future uses
    addConnToList(connClient);
  });

  // On recieving data from fellow Peer
  connClient.on("data", (data) => {
    console.info("Dispatching data");
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
    // disconnectClient(connClient.peer);
    // closeClientConnection(connClient.peer);

    // removeClientConnection(connClient.peer);
    // uiRemoveUser(connClient.peer);

    // connClient.close();
  });

  // On Any Error with Connection
  connClient.on("error", (conn_err) => {
    console.info("Trouble with a connection");
    console.error(conn_err);
  });
}

// Reply to a Call - On recieved a new Call
export function replyToCall(call) {
  console.log("Recieving a call from " + call.peer);

  call.answer(ChatRoom.myVideoStream, {
    SdpTransform: ChatRoom.mySdpTransform,
  });

  addEventsToCall(call);
}

function addNewMember(data) {
  console.info("New member/user : " + data.name);
  console.info(data);
  // Update Connection Names
  ChatRoom.connClientNames[data.peerid] = data.name;
  // Update UI - users
  uiUpdateUsers(data);
}

function muteAudio() {}
function unmuteAudio() {}
function muteVideo() {}
function unmuteVideo() {}
// Remove Self Video - On Peer Connection Closed / Destroyed
function removeMyVideo() {}
