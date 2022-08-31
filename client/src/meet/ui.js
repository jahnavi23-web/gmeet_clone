import Meet from "./meet";
import {
  startPeer,
  addVideoToList,
  joinExistingMeeting,
  sendMessage,
  startMeeting,
  updateConversation,
  addClient,
  removeClient,
  setMyPeerId,
  setMyName,
} from "../redux";
import store from "../redux/store";
import { VIDEO_ID } from "../Utils/MyCamera";
import { isEmpty } from "../Utils/JS";

export function uiStartMyPeer() {
  console.log("Starting New Peer...");
  // Get My Name
  var myPeerName = uiGetMyName();
  uiSetMyName(myPeerName);
  var success = Meet.startMyPeer(myPeerName);
  console.log("Started " + success);
  // store.dispatch()
  uiSetMyPeerID();
  return success;
}

export function uiJoinExisitingMeetingPeer(meetingID) {
  var success = uiStartMyPeer();

  setTimeout(joinMeeting, 1000);

  return success;

  function joinMeeting() {
    var { meet } = store.getState();
    var { meetingID } = meet;
    if (!meetingID) return;
    console.log("Joining new meeting...");
    var success = Meet.connectPeer(meetingID);
    console.log("Joined " + success);
    // setTimeout(uiSendClientInfo(), 100);
    uiSendClientInfo();

    // return success;
    setTimeout(uiCallClient(meetingID), 1000);
    console.log('Meet.namesList');
    console.log(Meet.namesList);
  }
}

export function uiCallClient(peerid) {
  console.log("uiCallClient(peerid)");
  console.log("calling peerid : " + peerid);

  var options_call = {
    metadata: {
      caller: { name: Meet.myPeerName, peerid: Meet.myPeerID },
      reciever: { name: null, peerid: peerid },
    },
    sdpTransform: Meet.mySdpTransform,
  };
  var call = Meet.peer.call(peerid, Meet.myVideoStream, options_call); // MediaConnection
  if (!call) return false;

  if (Meet.callsList === null) Meet.callsList = {};
  if (call.peer in Meet.callsList === true) return false;
  console.log(call);

  Meet.callsList[peerid] = call;
  Meet.namesList[call.metadata.caller.peerid] = call.metadata.caller.name;
  console.log(Meet.namesList);

  Meet.placeCall(call);

  return true;
}

export function uiOnCall(peer) {
  // var btnCall_ = document.getElementById(`btn-call-${peer}`);
  // var btnEndCall_ = document.getElementById(`btn-end-call-${peer}`);
  // btnCall_.style.display = "none";
  // btnEndCall_.style.display = "inline";
}

export function uiSendOutMessage() {
  console.log("uiSendOutMessage()");
  let { button } = store.getState();
  var { conversation } = button;

  let { meet } = store.getState();
  var { myPeerID, meetingID } = meet;
  var payload = {
    type: Meet.MSG_TYPE.BROADCAST_MSG,
    peerid: Meet.myPeerID,
    name: Meet.myPeerName,
    room: Meet.myRoom,
    data: conversation,
  };
  if (myPeerID !== meetingID) {
    for (var peer in Meet.connectionsList) {
      Meet.connectionsList[peer].send(payload);
    }
  } else {
    // if (isEmpty(Meet.connClients)) return;
    Meet.connectionsList[meetingID].send(payload);
  }
}

export function uiSendClientInfo() {
  console.log("uiSendClientInfo()");
  let { meet } = store.getState();
  var { myPeerID, meetingID } = meet;

  var payload = {
    type: Meet.MSG_TYPE.CLIENT_INFO,
    peerid: Meet.myPeerID,
    name: Meet.myPeerName,
  };
  if (myPeerID !== meetingID) {
    for (var peer in Meet.connectionsList) {
      Meet.connectionsList[peer].send(payload);
    }
  } else {
    // if (isEmpty(Meet.connClients)) return;
    Meet.connectionsList[meetingID].send(payload);
  }
}

const myVideo = document.createElement(VIDEO_ID + "0");
// const newVideo = document.getElementById("video");
myVideo.muted = true;
const chatGrid = document.getElementById("chat-grid");
const msgInput = document.getElementById("msg");
const userGrid = document.getElementById("user-grid");

const videosListGlobal = [];

export function uiEndCall(peerid) {
  var btnCall_ = document.getElementById(`btn-call-${peerid}`);
  var btnEndCall_ = document.getElementById(`btn-end-call-${peerid}`);

  if (btnCall_) btnCall_.style.display = "inline";
  if (btnEndCall_) btnEndCall_.style.display = "none";

  uiRemoveVideoStream(peerid);
}

// Remove a Video from Grid - On Call End
function uiRemoveVideoStream(peerid) {
  const videoGridItem = document.getElementById(`video-grid-item-${peerid}`);
  // document.getElementById("video-grid").removeChild(videoGridItem);
  console.log("removing video from video grid");
  if (videoGridItem) videoGridItem.remove();
}

// Update Conversation - On new message
export function uiUpdateChat(data, myPeerName) {
  // data = {data: 'hello', name: 'ivana'};
  // var { meet } = store.getState();
  store.dispatch(updateConversation(data.data));
  console.log(data.data);

  // var message_from = "";
  // if (data.name === myPeerName) {
  //   message_from = "message-me";
  // } else {
  //   message_from = "message-they";
  // }

  // const chatBox_ = document.createElement("div");
  // const chatText_ = document.createElement("div");
  // const chatName_ = document.createElement("div");
  // chatBox_.classList.add(message_from);
  // chatText_.classList.add("message-text");
  // chatName_.classList.add("message-username");

  // chatName_.innerHTML = data.name;
  // chatText_.innerHTML = data.data;
  // chatBox_.append(chatName_);
  // chatBox_.append(chatText_);
  // chatGrid.append(chatBox_);

  // msgInput.value = "";
}

export function uiRemoveUser(peerid) {
  var userGridItem = document.getElementById(`user-grid-item-${peerid}`);
  if (userGridItem) userGridItem.remove();
}

export function uiOnDisconnectClient(peerid) {
  var btnCall_ = document.getElementById(`btn-call-${peerid}`);
  var btnEndCall_ = document.getElementById(`btn-end-call-${peerid}`);
  var btnDisconnect_ = document.getElementById(`btn-disconnect-${peerid}`);
  var btnReconnect_ = document.getElementById(`btn-reconnect-${peerid}`);

  if (btnCall_) btnCall_.style.display = true;
  if (btnEndCall_) btnEndCall_.style.display = true;
  if (btnReconnect_) btnReconnect_.style.display = true;
  if (btnDisconnect_) btnDisconnect_.style.display = false;
}

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

  btnEndCall_.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("End Call button clicked");
    // console.log(e);

    var peerid = e.target.attributes.peerid.value;
    console.log("Ending Call of : " + peerid);

    btnCall_.style.display = "block";
    btnEndCall_.style.display = "none";

    Meet.endCall(peerid);
    // ChatRoom.callsList[peerid].close();
    // console.log(ChatRoom.callsList);

    var payload = {
      type: Meet.MSG_TYPE.END_CALL,
      peerid: Meet.myPeerID,
      name: Meet.myPeerName,
      room: Meet.myRoom,
    };
    Meet.connectionsList[peerid].send(payload);
  });

  btnDisconnect_.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Disconnect button clicked");
    // console.log(e);
    var peerid = e.target.attributes.peerid.value;
    console.log("Disconnecting dataConnection with : " + peerid);

    // btnDisconnect_.style.display = "none";
    // btnReconnect_.style.display = "block";

    Meet.disconnectClient(peerid);
  });

  btnReconnect_.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Reconnect button clicked");
    // console.log(e);
    var peerid = e.target.attributes.peerid.value;
    console.log("Reconnecting dataConnection with : " + peerid);

    btnDisconnect_.style.display = "block";
    btnReconnect_.style.display = "none";

    Meet.reconnectClient(peerid);
  });

  btnJoinRoom_.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Join Room button clicked");
    // console.log(e);
    var peerid = e.target.attributes.peerid.value;
    console.log("Joining Room : " + peerid);

    btnJoinRoom_.style.display = "none";
    btnLeaveRoom_.style.display = "block";

    Meet.joinRoom(peerid);
  });

  btnLeaveRoom_.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Leave Room button clicked");
    // console.log(e);
    var peerid = e.target.attributes.peerid.value;
    console.log("Leaving Room : " + peerid);

    btnJoinRoom_.style.display = "block";
    btnLeaveRoom_.style.display = "none";

    Meet.leaveRoom(peerid);
  });

  btnCloseConn_.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Close connection button clicked");
    // console.log(e);
    var peerid = e.target.attributes.peerid.value;
    console.log("Closing connection : " + peerid);

    Meet.closeClientConnection(peerid);
    uiRemoveUser(peerid);
  });
}

export function uiGetMyName() {
  var { meet } = store.getState();
  var { myPeerName } = meet;
  return myPeerName;
}

export function uiSetMyName(name) {
  store.dispatch(setMyName(name));

  Meet.setMyPeerName(name);
}

export function uiSetMyPeerID() {
  store.dispatch(startPeer(Meet.myPeerID));
  var { meet } = store.getState();
  var { isHost } = meet;
  if (!isHost) return;
  store.dispatch(startMeeting(Meet.myPeerID));
}

export function UiSetMeetingID(meetingID) {
  store.dispatch(joinExistingMeeting(meetingID));

  Meet.setMeetingID(meetingID);
}

export function uiAddClientToList(clientInfo) {
  store.dispatch(addClient(clientInfo));

  Meet.addClientToList(clientInfo);
}

// Add a new Video to Grid - On each new Call from a User
export function uiAddVideoStream(stream, name, peerid) {
  console.log("uiAddVideoStream");
  console.log(stream);
  console.log(name);
  console.log(peerid);
  var { meet } = store.getState();
  var { videosList } = meet;
  var videoId = VIDEO_ID + videosList.length;
  const video = document.createElement(videoId);
  videosListGlobal.push(video);
  var videoStream = {
    videoId: videoId,
    name: name,
    peerid: peerid,
    isMic: true,
  };
  store.dispatch(addVideoToList(videoStream));

  video.srcObject = stream;
}
