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
ChatRoom.connServer = {};
ChatRoom.connClients = {};
ChatRoom.connClientNames = {};
ChatRoom.clientsOnCall = [];
ChatRoom.myPeerID = "";
ChatRoom.myPeerName = "Me";
ChatRoom.myVideoStream = {};
ChatRoom.MSG_TYPE = {
  CHAT: "chat",
  NEW_MEMBER: "new",
  DEPARTURE: "leave",
  BROADCAST: "send",
  PING: "ping",
  ACK: "ack",
  MEMBERS_REQ: "req",
  MEMBERS_REP: "resp",
};

// 'Connect' - When the Peer ID is submitted
idForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get message text
  var id_remote = e.target.elements.id.value;
  var name_remote = ChatRoom.myPeerName;
  console.log(
    "Trying for a Connection with Remote Peer Client : " +
      name_remote +
      " " +
      id_remote
  );

  // Initiate PeerJS connection with remote
  const connClient = ChatRoom.peer.connect(id_remote);
  ChatRoom.connClients[id_remote] = connClient; // Save the Connection for future uses

  connClient.on("open", () => {
    var payload = {
      type: ChatRoom.MSG_TYPE.NEW_MEMBER,
      peerid: ChatRoom.myPeerID,
      name: ChatRoom.myPeerName,
      data: "",
    };
    connClient.send(payload);
  });

  // On recieving data from fellow Peer
  connClient.on("data", (data) => {
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
      default:
        break;
    }
  });

  connClient.on("close", () => {
    conn.close();
  });

  connClient.on("error", (err) => {
    console.log(err);
  });

  ChatRoom.peer.on("call", (call) => {
    replyToCall(call);
  });
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

  setUpMyVideo();

  // Get message text
  var name = e.target.elements.name.value;
  ChatRoom.myPeerName = name;

  // // Create a new Peer Object
  // // Local Peer Broker Server
  // ChatRoom.peer = new Peer(undefined, {
  //   host: IP_ADDR,
  //   port: "3001",
  // });
  // Cloud Peer Broker Server
  ChatRoom.peer = new Peer();

  // On connection with Peer Broker
  ChatRoom.peer.on("open", (myPeerID) => {
    console.info(
      "Success - Connected to Peer Broker with assigned myPeerID: " + myPeerID
    );
    ChatRoom.myPeerID = myPeerID;
    myId.innerHTML = myPeerID;
  });

  // On connection with fellow Peer Client
  ChatRoom.peer.on("connection", (conn) => {
    console.info(
      "Recieved a Connection from Remote Peer Client - " + conn.peer
    );
    conn.peerName = ChatRoom.myPeerName;
    ChatRoom.connServer[conn.peer] = conn;

    // On connection is Ready to communicate
    conn.on("open", () => {
      var payload = {
        type: ChatRoom.MSG_TYPE.NEW_MEMBER,
        peerid: ChatRoom.myPeerID,
        name: ChatRoom.myPeerName,
        data: "",
      };
      conn.send(payload);

      console.log("Connected to Peer Client: " + conn.peer);

      // Add connection to list
      ChatRoom.connClients[conn.peer] = conn;

      // Update UI - users
    });

    // On recieving data from fellow Peer
    conn.on("data", (data) => {
      console.log("Recieved data from peer: " + data.name);
      switch (data.type) {
        case ChatRoom.MSG_TYPE.NEW_MEMBER:
          console.info("New member");
          console.log("new userName : " + data.name);
          // Update Connection with name
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
        default:
          break;
      }
    });

    conn.on("close", () => {
      conn.close();
    });

    conn.on("error", (err) => {
      console.log(err);
    });
  });

  ChatRoom.peer.on("call", (call) => {
    replyToCall(call);
  });
});

// Update Users List - On new User or User left
function updateUiUsers(data) {
  // var data = {peerid: 12323123, name: 'ivana'};

  const userForm_ = document.createElement("form");
  const userBox_ = document.createElement("div");
  const userID_ = document.createElement("div");
  const userUpperBox_ = document.createElement("div");
  const userName_ = document.createElement("div");
  const btnCall_ = document.createElement("button");
  userBox_.classList.add("message-they");
  userID_.classList.add("message-text");
  userUpperBox_.classList.add("user-upper-box-flex");
  userName_.classList.add("message-username");
  btnCall_.classList.add("btn-call");
  btnCall_.setAttribute("id", "btn-call");
  btnCall_.setAttribute("peerid", data.peerid);
  userForm_.setAttribute("peerid", data.peerid);
  userID_.setAttribute("peerid", data.peerid);
  btnCall_.innerHTML = "Call";

  userID_.innerHTML = data.peerid;
  userName_.innerHTML = data.name;
  userUpperBox_.append(userName_);
  userUpperBox_.append(btnCall_);
  userBox_.append(userUpperBox_);
  userBox_.append(userID_);
  userForm_.append(userBox_);
  userGrid.append(userForm_);

  userForm_.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Call button clicked");
    // console.log(e);
    var peerid = e.target.attributes.peerid.value;
    console.log("call peerid : " + peerid);

    var call = ChatRoom.peer.call(peerid, ChatRoom.myVideoStream);

    placeCall(call);
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
        addVideoStream(myVideo, ChatRoom.myPeerName, stream);
        ChatRoom.myVideoStream = stream;
      })
      .catch(function (err0r) {
        console.log("Something went wrong!");
      });
  }
}

// Add a new Video to Grid - On each new Call from a User
function addVideoStream(video, name, stream) {
  video.srcObject = stream;
  const videoGridItem = document.createElement("div");
  videoGridItem.classList.add("video-grid-item");
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
  console.log("Recieving a call");

  if (ChatRoom.clientsOnCall.includes(call.peer)) {
    console.log("Call already in process");
    return;
  }
  ChatRoom.clientsOnCall.push(call.peer);
  console.log("Call accepted");

  console.log(call);
  call.answer(ChatRoom.myVideoStream);

  const name = document.createElement("div");
  var peerName = ChatRoom.connClientNames[call.peer];
  name.innerHTML = peerName;
  const video = document.createElement("video");
  video.append(name);
  call.on("stream", (remoteUserVideoStream) => {
    console.log("Called > Recieved Stream");

    addVideoStream(
      video,
      ChatRoom.connClientNames[call.peer],
      remoteUserVideoStream
    );
  });
}

// Request a Call - When You want to call a Peer
function placeCall(call) {
  const video = document.createElement("video");
  call.on("stream", (remoteUserVideoStream) => {
    console.log("Called > Recieved Stream");

    if (ChatRoom.clientsOnCall.includes(call.peer)) {
      console.log("Call already in progress");
      return;
    }
    ChatRoom.clientsOnCall.push(call.peer);
    console.log("Call accepted");

    addVideoStream(
      video,
      ChatRoom.connClientNames[call.peer],
      remoteUserVideoStream
    );
  });
}

// ----------------------------------------------------------

// 'Leave' - Wrap up & Leave the Chat
button_leave.onclick = () => {
  console.log("Clicked Send Peer Button");

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
button_id.onclick = () => {
  copyToClipboard("my-id");
};

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
