import { ChatRoom, replyToCall, addEventsToConnection } from "./chat.js";
import { addVideoStream, uiSetMyPeerID } from "./ui.js";

export function addEventsToCall(call) {
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

// Add function to populate Peer events
export function addEventsToPeerObject(peer) {
  // On connection with Peer Broker
  peer.on("open", (myPeerID) => {
    console.info(
      "Success - Connected to Peer Broker with assigned myPeerID: " + myPeerID
    );

    // Get My Peer ID
    ChatRoom.myPeerID = myPeerID;
    uiSetMyPeerID(myPeerID);

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
    uiOnCall(call.peer);

    function uiOnCall(peer) {
      var btnCall_ = document.getElementById(`btn-call-${peer}`);
      var btnEndCall_ = document.getElementById(`btn-end-call-${peer}`);

      btnCall_.style.display = "none";
      btnEndCall_.style.display = "inline";
    }
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

// // On Page Start
export function testBrowserSupport() {
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

// Show Self Video first - On Peer Connection Successful
function setUpMyVideo() {
  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function (stream) {
        // Show our video on our Screen
        addVideoStream(undefined, stream, ChatRoom.myPeerName, ChatRoom.myPeerID);
        ChatRoom.myVideoStream = stream;
      })
      .catch(function (error) {
        console.log("Something went wrong!");
      });
  }
}
