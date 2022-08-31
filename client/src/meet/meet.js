import { Peer } from "peerjs";
import {
  uiGetMyName,
  uiAddVideoStream,
  uiRemoveUser,
  uiEndCall,
  uiUpdateChat,
  uiOnDisconnectClient,
  uiSendClientInfo,
  uiSetMyPeerID,
} from "./ui";

// // PEER JS - DATA
const IP_ADDR = "192.168.43.131"; // Redmi Hotspot IP
// const IP_ADDR = "192.168.43.38";  // Samsung Hotspot IP

export class MeetClass {
  constructor() {
    this.peer = null;
    this.PEER_CLOUD = false;

    this.myPeerID = null;
    this.myPeerName = null;
    this.myVideoStream = null;
    this.MeetingID = null;
    this.mySdpTransform = () => {
      return null;
    }; // Advanced MediaStream Settings

    this.callsList = null;
    this.connectionsList = null;
    this.namesList = null;

    this.myRoomName = "RoomX";
    this.myRoomID = null;
    this.myRoom = null;
    this.myRoomAdmins = null;
    this.myRoomMembers = null;
    this.myRoomHost = null;

    this.room = {
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
  }
  MSG_TYPE = {
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
    CLIENT_INFO: "name and id of client",
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
  ROLE = {
    HOST: "host",
    ADMIN: "admin",
    CLIENT: "client",
  };
  startMyPeer(myPeerName) {
    if (this.peer !== null) {
      if (this.peer.destroyed === true) {
        console.log("Peer already Exists & But Destroyed. Creating New Peer.");
      } else {
        console.log("Peer already Exists & Active. Cannot Creat New Peer.");
        return;
      }
    } else {
      console.log("Peer doesn't exist. Creating New Peer.");
    }

    // Create a new Peer Object
    // Options for Local Peer Object
    var options_peer = {
      key: "peerjs",
      host: IP_ADDR,
      port: "3001",
      pingInterval: 5000,
      path: "/",
      secure: true,
      config: {},
      debug: 1,
    };

    try {
      if (this.PEER_CLOUD) {
        // Cloud Peer Broker Server
        this.peer = new Peer();
      } else {
        // Local Peer Broker Server
        this.peer = new Peer(undefined, options_peer);
      }

      // Populate Peer Object with On-Events
      this.addEventsToPeerObject(this.peer);

      return true;
    } catch (e) {
      return false;
    }
  }
  addEventsToPeerObject(peer) {
    console.log("addEventsToPeerObject(peer)");
    // On connection with Peer Broker
    peer.on("open", (myPeerID) => {
      console.log('peer.on("open")');
      console.info(
        "Success - Connected to Peer Broker with assigned myPeerID: " + myPeerID
      );

      // Set My Peer ID
      this.setMyPeerID(myPeerID);
      this.setMyPeerName(this.getMyPeerName());
      this.addClientToList({
        name: this.getMyPeerName(),
        peerid: this.getMyPeerID(),
      });

      this.setUpMyVideo();
    });

    // On Connection request from remote Peer Client
    peer.on("connection", (connClient) => {
      console.log('peer.on("connection")');
      console.info(
        "Recieved a Connection Request from Remote Peer Client - " +
          connClient.peer
      );
      console.log(connClient);
      // this.connClientNames[connClient.peer] = connClient.name;

      // Populate calling functions for each event on Connection
      this.addEventsToConnection(connClient);
    });

    // TODO: CORRECT THE CONDITIONAL EXPRESSION
    peer.on("call", (call) => {
      console.log('peer.on("call")');
      console.log(call);
      if (this.callsList === null) this.callsList = {};
      if (call.peer in this.callsList === true) return;

      // this.callsList[call.peer] = call;
      // this.namesList[call.metadata.caller.peerid] = call.metadata.caller.name;

      this.addClientToListByCall(call);

      console.log(this.namesList);
      setTimeout(uiSendClientInfo(), 100);
      this.replyToCall(call);
      // uiOnCall(call.peer);
    });

    peer.on("close", () => {
      console.log('peer.on("close")');
      console.info(
        "Peer Object is destroyed and it's related data is lost, memory is released. peer object can no longer operate connection. User 'new Peer();"
      );
    });

    peer.on("disconnected", () => {
      console.log('peer.on("disconnected")');
      console.info(
        "Connection link is lost temporarily.. please wait or try again later with 'peer.reconnect();"
      );
      // peer.reconnect();
    });

    peer.on("error", (peer_error) => {
      console.log('peer.on("error")');
      this.dispatchPeerError(peer_error);
    });
  }
  // Populate calling functions for each event on Connection
  addEventsToConnection(connClient) {
    console.log("addEventsToConnection(connClient)");
    // On connection is Ready to communicate
    connClient.on("open", () => {
      console.log('connClient.on("open")');
      // Send your name to Client
      var payload = {
        type: this.MSG_TYPE.CLIENT_INFO,
        peerid: this.myPeerID,
        name: this.myPeerName,
        data: "",
      };
      connClient.send(payload);

      console.log("Connected to Peer Client: " + connClient.peer);

      // Save the Connection for future uses
      this.addConnToList(connClient);
    });

    // On recieving data from fellow Peer
    connClient.on("data", (data) => {
      console.log('connClient.on("data")');
      console.info("Dispatching data");
      this.dispatchConnData(data);
    });

    // On 'close' of either MyPeer or Client connection
    connClient.on("close", () => {
      console.log('connClient.on("close")');
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
      console.log('connClient.on("error")');
      console.info("Trouble with a connection");
      console.error(conn_err);
    });
  }
  addEventsToCall(call) {
    console.log("addEventsToCall(call)");
    call.on("stream", (remoteUserVideoStream) => {
      console.log('call.on("stream")');
      console.log("Call > Recieved Stream");
      console.log(call);
      console.log(JSON.stringify(this.namesList));
      var callData = JSON.parse(JSON.stringify(call.metadata));

      console.log("caller name " + callData.caller.name);
      console.log("reciever id " + callData.reciever.name);
      var reciver = callData.reciever;
      console.log(reciver);
      var recieverName = this.namesList[reciver.peerid];
      console.log("reciever name " + recieverName);

      var call_name = null;
      if (call.metadata.caller.peerid === this.myPeerID) {
        console.log("Stream recieved by Caller");
        call_name = this.namesList[call.metadata.reciever.peerid];
      } else {
        console.log("Stream recieved by Reciever");
        call_name = call.metadata.caller.name;
      }

      uiAddVideoStream(remoteUserVideoStream, call_name, call.peer);
    });

    call.on("close", () => {
      console.log('call.on("close")');
      console.info("Closed the Call.");
    });

    call.on("error", (err) => {
      console.log('call.on("error")');
      console.info("Trouble Placing a Call");
      console.err("Error while placing a Call: " + err);
    });
  }
  dispatchPeerError(err) {
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
  // On recieving data from fellow Peer
  dispatchConnData(data) {
    console.log("dispatchConnData(data)");
    console.log("Recieved data from peer: " + data.name);
    switch (data.type) {
      case this.MSG_TYPE.NEW_CONN:
        console.log("MSG_TYPE.NEW_CONN");
        this.addNewMember(data);
        break;
      case this.MSG_TYPE.BROADCAST_MSG:
        console.log("MSG_TYPE.BROADCAST_MSG");
        console.info("Message recieved from : " + data.name);
        // Update UI - messages
        uiUpdateChat(data, this.myPeerName);
        break;
      case this.MSG_TYPE.CLIENT_INFO:
        console.log("MSG_TYPE.CLIENT_INFO");
        console.info("Client info recieved from : " + data.name);
        // Update UI - messages
        this.namesList[data.peerid] = data.name;
        break;
      case this.MSG_TYPE.END_CALL:
        console.log("MSG_TYPE.END_CALL");
        console.info("Request Recieved to End Call");
        this.endCall(data.peerid);
        break;
      case this.MSG_TYPE.CLOSE:
        console.log("MSG_TYPE.CLOSE");
        console.info("Request Recieved to Close Client");
        this.closeClientConnection(data.peerid);
        // removeClientConnection(data.peerid);
        uiRemoveUser(data.peerid);
        break;
      case this.MSG_TYPE.DISCONNECT:
        console.log("MSG_TYPE.DISCONNECT");
        console.info("Request Recieved to Disconnect Client");
        this.closeClientConnection(data.peerid);
        // removeClientConnection(data.peerid);
        // uiRemoveUser(data.peerid);
        break;
      case this.MSG_TYPE.REQUEST_JOIN:
        console.log("MSG_TYPE.REQUEST_JOIN");
        this.addNewMember(data);
        break;
      case this.MSG_TYPE.ROOM:
        console.log("MSG_TYPE.ROOM");
        console.info("Room info recieved");
        this.dispatchRoomData(data);
        break;
      default:
        console.info("Unknown DataType. What to do with the recieved data?");
        break;
    }
  }
  dispatchRoomData(data) {
    console.log("Recieved data from peer: " + data.name);
    switch (data.type) {
      case this.MSG_TYPE.NEW_CONN:
        this.addNewMember(data);
        break;
      case this.MSG_TYPE.BROADCAST_MSG:
        console.info("Message recieved from : " + data.name);
        // Update UI - messages
        uiUpdateChat(data, this.myPeerName);
        break;
      case this.MSG_TYPE.CLIENT_INFO:
        console.info("Client info recieved from : " + data.name);
        // Update UI - messages
        this.namesList[data.peerid] = data.name;
        break;
      case this.MSG_TYPE.END_CALL:
        console.info("Request Recieved to End Call");
        this.endCall(data.peerid);
        break;
      case this.MSG_TYPE.DISCONNECT:
        console.info("Request Recieved to Disconnect Client");

        this.disconnectClient(data.peerid);
        break;
      case this.MSG_TYPE.REQUEST_JOIN:
        this.addNewMember(data);
        break;
      case this.MSG_TYPE.ROOM:
        console.info("Room info recieved");
        this.dispatchRoomData(data);
        break;
      default:
        console.info("Unknown DataType. What to do with the recieved data?");
        break;
    }
  }
  addConnToList(connClient) {
    console.log("addConnToList(connClient)");
    if (this.connectionsList === null) this.connectionsList = {};
    if (connClient.peer in this.connectionsList) return;

    this.connectionsList[connClient.peer] = connClient;
    this.namesList[connClient.metadata.sender.peerid] =
      connClient.metadata.sender.name;
    console.log("Added a Connection to List");
  }
  addNewMember(data) {
    console.info("addNewMember : " + data.name);
    console.info(data);
    // Update Connection Names
    this.namesList[data.peerid] = data.name;
    // Update UI - users
    // uiUpdateUsers(data);
  }
  replyToCall(call) {
    console.log("Recieving a call from " + call.peer);
    console.log("replyToCall(call)");
    // console.log(call);
    console.log(call);

    var options_call = {
      metadata: { name: uiGetMyName(), peerid: this.myPeerID },
      SdpTransform: "this.mySdpTransform",
    };
    // call.metadata.reciever.name = uiGetMyName();
    // call.metadata.reciever.peerid = this.myPeerID;
    call.answer(this.myVideoStream, options_call);

    this.addEventsToCall(call);
  }
  endCall(peerid) {
    console.log("endCall(peerid)");

    if (this.callsList === null || Object.keys(this.callsList).length === 0) {
      console.log("Call list is empty. No calls to end.");
      return;
    }

    if (peerid in this.callsList === false) {
      console.log("No such call in active calls list.");
      return;
    }

    console.log("Enging call peerid : " + peerid);
    // delete this.callsList[peerid];
    this.callsList[peerid].close();
    delete this.callsList[peerid];
    console.log(this.callsList);

    uiEndCall(peerid);
  }
  placeCall(call) {
    console.log("Sending a call request to " + call.peer);

    this.addEventsToCall(call);
  }
  closeClientConnection(peerid) {
    if (this.isListEmpty()) return;
    if (!this.isConnection(peerid)) return;
    if (!this.isConnOpen(peerid)) return;

    var payload = {
      type: this.MSG_TYPE.CLOSE,
      peerid: this.myPeerID,
      name: this.myPeerName,
      room: this.myRoom,
    };
    // sendDataTo(peerid, payload);
    console.log("sending data to close client connection");
    this.connectionsList[peerid].send(payload);

    // closeConnection(peerid);
    this.removeClientConnection(peerid);
  }
  closeConnection(peerid) {
    this.connectionsList[peerid].close();
  }
  disconnectClient(peerid) {
    console.info("disconnectClient");
    if (this.isListEmpty()) return;
    console.info("list not empty");
    if (!this.isConnection(peerid)) return;
    console.info("is a connection");

    var payload = {
      type: this.MSG_TYPE.DISCONNECT,
      peerid: this.myPeerID,
      name: this.myPeerName,
      room: this.myRoom,
    };

    if (this.isConnOpen(peerid)) {
      console.log("Connection is open");
      // sendDataTo(peerid, payload);
      this.connectionsList[peerid].send(payload);
      setTimeout(this.closeConnection(peerid), 10);
      // return;
    }

    uiOnDisconnectClient(peerid);
  }
  connectPeer(peer_id_remote) {
    if (this.isConnection(peer_id_remote)) return;

    console.log("Initiating a Connection with : " + peer_id_remote);

    var options_connection = {
      label: null,
      metadata: {
        sender: { name: this.myPeerName, peerid: this.myPeerID },
        reciever: {name: null, peerid: peer_id_remote}
      },
      // serialization: 'json',
      // reliable: false,
    };
    // Initiate PeerJS connection with remote Peer Client
    const connClient = this.peer.connect(peer_id_remote, options_connection);
    if (!connClient) return false;

    console.log("Create Connection with : " + peer_id_remote);

    // Populate calling functions for each event on Connection
    this.addEventsToConnection(connClient);
    return true;
  }
  reconnectClient(peerid) {
    this.connectPeer(peerid);
  }
  removeClientConnection(peerid) {
    this.removeConnFromList(peerid);
    console.log("Deleted the connection : " + peerid);

    this.endCall(peerid);

    // uiRemoveUser(peerid);
  }
  removeConnFromList(peerid) {
    delete this.connectionsList[peerid];
    console.log("Removed a Connection to List");
  }
  joinRoom(peerid) {}
  leaveRoom(peerid) {}
  isListEmpty() {
    // console.log(ChatRoom);
    return this.connectionsList === null;
  }
  isConnOpen(peerid) {
    return this.connectionsList[peerid].open;
  }
  isConnection(peer_id_remote) {
    console.log("isConnection(peer_id_remote)");
    if (this.connectionsList === null) return false;
    return peer_id_remote in this.connectionsList;
  }
  // On recieving data from fellow Peer

  // Show Self Video first - On Peer Connection Successful
  setUpMyVideo() {
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          // Show our video on our Screen

          this.setMyVideoStream(stream);
          uiAddVideoStream(this.myVideoStream, this.myPeerName, this.myPeerID);
          // console.log(stream);
        })
        .catch(function (error) {
          console.log("Something went wrong!");
          console.error(error);
        });
    }
  }

  getMyPeerName() {
    return this.myPeerName;
  }
  setMyPeerName(peerName) {
    this.myPeerName = peerName;
  }
  getMyPeerID() {
    return this.myPeerID;
  }
  setMyPeerID(myPeerID) {
    this.myPeerID = myPeerID;
    uiSetMyPeerID(myPeerID);
  }
  getMeetingID() {
    return this.MeetingID;
  }
  setMeetingID(MeetingID) {
    this.MeetingID = MeetingID;
  }
  addClientToList({ name, peerid }) {
    console.log("addClientToList");
    if (this.namesList === null) this.namesList = {};
    this.namesList[peerid] = name;
  }
  addClientToListByCall(call) {
    console.log("addClientToListByCall");
    if (this.namesList === null) this.namesList = {};
    if (this.callsList === null) this.callsList = {};

    this.callsList[call.peer] = call;
    this.namesList[call.peerid] = call.name;
  }
  addClientToListByConnection(clientConnection) {
    console.log("addClientToListByConnection");
    if (this.namesList === null) this.namesList = {};
    if (this.connectionsList === null) this.connectionsList = {};
    this.connectionsList[clientConnection.peerid] = clientConnection;
    this.namesList[clientConnection.peerid] = clientConnection.name;
  }
  removeClientFromList(clientInfo) {
    delete this.callsList[clientInfo.peerid];
    delete this.namesList[clientInfo.peerid];
  }
  getClientsList() {
    return this.namesList;
  }
  getClientName(peerid) {
    return this.namesList[peerid];
  }
  setClientName(peerid, name) {
    this.namesList[peerid] = name;
  }
  setMyVideoStream(stream) {
    this.myVideoStream = stream;
  }
}

const Meet = new MeetClass();
export default Meet;

export function helpIntro(props) {
  console.log("Help arriving soon...");
}

export function feedbackIntro(props) {
  console.log("Thank for you feedback...");
}

export function settingsIntro(props) {
  console.log("Meeting's Settings...");
}

export function appsIntro(props) {
  console.log("These are our Apps...");
}

export function accountDetailsIntro(props) {
  console.log("Your Account details are here...");
}

export function micTurnOn_Control(props) {
  console.log("Mic is Turning On...");
  return true;
}

export function micTurnOff_Control(props) {
  console.log("Mic is Turing Off...");
  return true;
}

export function cameraTurnOn_Control(props) {
  console.log("Camera is Turing ON...");
  return true;
}

export function cameraTurnOff_Control(props) {
  console.log("Camera is Turning Off...");
  return true;
}

export function ccTurnOn_Control(props) {
  console.log("Subtitles is Turning On...");
  return true;
}

export function ccTurnOff_Control(props) {
  console.log("Subtitles is Turning Off...");
  return true;
}

export function endCall_Control(props) {
  console.log("Ending Call...");
  return true;
}
