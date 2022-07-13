// UI Element Objects
const idForm = document.getElementById("id-form");
const msgForm = document.getElementById("msg-form");
const peerForm = document.getElementById("peer-form");
const inputID = document.getElementById("id");
const myId = document.getElementById("my-id");
const button_leave = document.getElementById("btn-leave");
const button_id = document.getElementById("btn-id");

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
ChatRoom.peer = {};
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
  DEPARTURE: "leave",
  BROADCAST: "send",
  PING: "ping",
  ACK: "ack",
  MEMBERS_REQ: "req",
  MEMBERS_REP: "resp",
};

ChatRoom.callsList = {};

// 'Connect' - When the Peer ID is submitted
idForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get ID
  var peer_id_remote = e.target.elements.id.value;
  var name_remote = ChatRoom.myPeerName;
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
});

// 'Send' - When the Message is sent
msgForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get message text
  var msg = e.target.elements.msg.value;
  console.log("Trying to broadcast your message...");

  // Set Payload
  var payload = {
    type: ChatRoom.MSG_TYPE.BROADCAST,
    peerid: ChatRoom.myPeerID,
    name: ChatRoom.myPeerName,
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
peerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get My Name
  var name = e.target.elements.name.value;
  ChatRoom.myPeerName = name;

  // // Create a new Peer Object
  // // Local Peer Broker Server
  // var options_peer = {
  //   key: undefined,
  //   host: IP_ADDR,
  //   port: "3001",
  //   pingInterval: 5000,
  //   path: '/',
  //   secure: false,
  //   config: {},
  //   debug: 1,
  // }
  // ChatRoom.peer = new Peer(undefined, options_peer);
  // // Cloud Peer Broker Server
  ChatRoom.peer = new Peer();

  addEventsToPeerObject(ChatRoom.peer);
});

// Update Users List - On new User or User left
function updateUiUsers(data) {
  // var data = {peerid: 12323123, name: 'ivana'};

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

  const btnCall_ = document.createElement("button");
  const btnEndCall_ = document.createElement("button");
  btnCall_.classList.add("btn-call");
  btnEndCall_.classList.add("btn-call");
  btnCall_.setAttribute("id", "btn-call");
  btnEndCall_.setAttribute("id", "btn-end-call");
  btnCall_.setAttribute("peerid", data.peerid);
  btnEndCall_.setAttribute("peerid", data.peerid);
  btnCall_.innerHTML = "Call";
  btnEndCall_.innerHTML = "End_Call";

  userID_.innerHTML = data.peerid;
  userName_.innerHTML = data.name;
  userUpperBox_.append(userName_);
  userUpperBox_.append(btnCall_);
  userUpperBox_.append(btnEndCall_);
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

    var options = {
      metadata: {},
      sdpTransform: ChatRoom.mySdpTransform,
    };
    var call = ChatRoom.peer.call(peerid, ChatRoom.myVideoStream, options); // MediaConnection
    ChatRoom.callsList[peerid] = call;
    console.log(ChatRoom.callsList);

    placeCall(call);
  });

  btnEndCall_.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("End Call button clicked");
    // console.log(e);
    var peerid = e.target.attributes.peerid.value;
    console.log("Peer ID from button: " + peerid);

    endCall(peerid);
    // ChatRoom.callsList[peerid].close();
    // console.log(ChatRoom.callsList);

    var payload = {
      type: ChatRoom.MSG_TYPE.END_CALL,
      peerid: ChatRoom.myPeerID,
      name: ChatRoom.myPeerName,
    }
    ChatRoom.connClients[peerid].send(payload);
  });
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

// On recieving data from fellow Peer
function dispatchConnData(data) {
  console.log("Recieved data from peer: " + data.name);
  switch (data.type) {
    case ChatRoom.MSG_TYPE.NEW_MEMBER:
      console.info("New member");
      console.log("new userName : " + data.name);
      // Update Connection Names
      ChatRoom.connClientNames[data.peerid] = data.name;
      // Update UI - users
      updateUiUsers(data);
      break;
    case ChatRoom.MSG_TYPE.BROADCAST:
      console.info("Message recieved");
      console.log("new userName : " + data.name);
      // Update UI - messages
      updateUiChat(data);
      break;
    case ChatRoom.MSG_TYPE.END_CALL:
      console.info("Request Recieved to End Call");
      endCall(data.peerid);
      break;
    default:
      console.info("Unknown DataType. What to do with the recieved data?");
      break;
  }
}

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
  if (Object.keys(ChatRoom.callsList).length !== 0) {
    console.log("Enging call peerid : " + peerid);
    // delete ChatRoom.callsList[peerid];
    ChatRoom.callsList[peerid].close();
    delete ChatRoom.callsList[peerid];
    console.log(ChatRoom.callsList);
    removeVideoStream(peerid);
  } else {
    console.log("Call list is empty. No calls to end.");
  }
}

// Remove a Video from Grid - On Call End
function removeVideoStream(peerid) {
  const videoGridItem = document.getElementById(`video-grid-item-${peerid}`);
  // document.getElementById("video-grid").removeChild(videoGridItem);
  console.log('removing video from video grid');
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

    if (ChatRoom.clientsOnCall.includes(call.peer)) {
      console.log("Call already in progress");
      return;
    }
    ChatRoom.clientsOnCall.push(call.peer);
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
    // endCall(call.peer);
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
    if (!connClient.open) {
      return;
    } // Already closed
    connClient.close();
  });

  // On Any Error with Connection
  connClient.on("error", (conn_err) => {
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

  peer.on("call", (call) => {
    ChatRoom.callsList[call.peer] = call;
    replyToCall(call);
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
button_leave.onclick = () => {
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
