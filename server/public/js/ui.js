import {
  connectPeer,
  onEnterRoomForm,
  endCall,
  ChatRoom,
  startMyPeer,
  startMyRoom,
  disconnectClient,
  reconnectClient,
  closeClientConnection,
} from "./chat.js";

import { addEventsToCall } from "./peer.js";

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
// const btnId = document.getElementById("btn-id");
const btnStartPeer = document.getElementById("btn-start-peer");
const btnStopPeer = document.getElementById("btn-stop-peer");
const btnStartRoom = document.getElementById("btn-start-room");
const btnStopRoom = document.getElementById("btn-end-room");
// const btnOpen = document.getElementById("btn-open-connection");
// const btnClose = document.getElementById("btn-close-connection");

btnStartPeer.classList.add("green");
btnStopPeer.classList.add("red");
btnStartRoom.classList.add("green");
btnStopRoom.classList.add("red");

btnStartPeer.style.display = "inline";
btnStopPeer.style.display = "none";
btnStartRoom.style.display = "none";
btnStopRoom.style.display = "none";

const userGrid = document.getElementById("user-grid");
// const userBox = document.createElement("span");
// const userID = document.createElement("div");
// const userName = document.createElement("h4");

const chatGrid = document.getElementById("chat-grid");
// const chatBox = document.createElement("span");
// const chatText = document.createElement("div");
// const chatName = document.createElement("h4");

const msgInput = document.getElementById("msg");

// VIDEO - WEB CAMERA

const videoGrid = document.getElementById("video-grid");
const myVideo = document.createElement("video");
// const newVideo = document.getElementById("video");
myVideo.muted = true;

// ----------------------------------------------------

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

  onEnterRoomForm(room_id_remote);
});

// 'Send' - When the Message is sent
msgForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get message text
  var msg = e.target.elements.msg.value;

  broadcastMessage(msg);
});

function broadcastMessage(msg) {
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
}

// 'Start' Connection - When a name is submitted
startPeerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  startMyPeer();
});

// 'Start' Room - When a Room name is submitted
startRoomForm.addEventListener("submit", (e) => {
  e.preventDefault();
  startMyRoom();
});

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

  btnStartPeer.style.display = "inline";
  btnStopPeer.style.display = "none";
  btnStartRoom.style.display = "none";
  btnStopRoom.style.display = "none";

  ChatRoom.peer.destroy();

  var peerid = ChatRoom.myPeerID;
  uiRemoveVideoStream(peerid);
  for (var conn in ChatRoom.connClients) {
    uiRemoveUser(conn.peerid);
  }
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

  btnStartRoom.style.display = "inline";
  btnStopRoom.style.display = "none";

  ChatRoom.peer.destroy();

  var peerid = ChatRoom.myPeerID;
  uiRemoveVideoStream(peerid);
});

// Update Conversation - On new message
export function updateUiChat(data) {
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

export function uiEndCall(peerid) {
  var btnCall_ = document.getElementById(`btn-call-${peerid}`);
  var btnEndCall_ = document.getElementById(`btn-end-call-${peerid}`);

  if(btnCall_) btnCall_.style.display = "inline";
  if(btnEndCall_) btnEndCall_.style.display = "none";

  uiRemoveVideoStream(peerid);
}

// Remove a Video from Grid - On Call End
function uiRemoveVideoStream(peerid) {
  const videoGridItem = document.getElementById(`video-grid-item-${peerid}`);
  // document.getElementById("video-grid").removeChild(videoGridItem);
  console.log("removing video from video grid");
  if(videoGridItem) videoGridItem.remove();
}

// Add a new Video to Grid - On each new Call from a User
export function addVideoStream(video = myVideo, stream, name, peerid) {
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

// Request a Call - When You want to call a Peer
function placeCall(call) {
  console.log("Sending a call request to " + call.peer);

  addEventsToCall(call);
}

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

document.addEventListener("load", (e) => {
  e.preventDefault();

  testBrowserSupport();
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
export function uiUpdateUsers(data) {
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

    // btnDisconnect_.style.display = "none";
    // btnReconnect_.style.display = "block";

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

    closeClientConnection(peerid);
    uiRemoveUser(peerid);
  });
}

export function uiOnDisconnectClient(peerid) {
  var btnCall_ = document.getElementById(`btn-call-${peerid}`);
  var btnEndCall_ = document.getElementById(`btn-end-call-${peerid}`);
  var btnDisconnect_ = document.getElementById(`btn-disconnect-${peerid}`);
  var btnReconnect_ = document.getElementById(`btn-reconnect-${peerid}`);

  if(btnCall_) btnCall_.style.display = true;
  if(btnEndCall_) btnEndCall_.style.display = true;
  if(btnReconnect_) btnReconnect_.style.display = true;
  if(btnDisconnect_) btnDisconnect_.style.display = false;
}

export function uiRemoveUser(peerid) {
  var userGridItem = document.getElementById(`user-grid-item-${peerid}`);
  if(userGridItem) userGridItem.remove();
}

export function uiGetRoomName() {
  return inputRoomName.value;
}

export function uiGetMyName() {
  return inputMyName.value;
}

export function uiOnClickStartRoomButton() {
  myId.innerHTML = ChatRoom.myPeerID;

  btnStartRoom.style.display = "none";
  btnStopRoom.style.display = "block";
}

export function uiOnclickStartPeerButton() {
  btnStartPeer.style.display = "none";
  btnStopPeer.style.display = "inline";
  btnStartRoom.style.display = "inline";
  btnStopRoom.style.display = "none";
}

export function uiSetConnectionStatus(message) {
  connecInfo.innerText = "Connection already exists";
}

export function uiSetMyPeerID(myPeerID) {
  myId.innerHTML = myPeerID;
}
