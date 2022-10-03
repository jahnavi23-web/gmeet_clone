import Meet from "./meet";
import {
  setMyPeerID,
  addVideoToList,
  joinExistingMeeting,
  sendMessage,
  setMeetingID,
  updateConversation,
  addClient,
  removeClient,
  setMyPeerId,
  setMyName,
} from "../redux";
import store from "../redux/store";
import { VIDEO_ID } from "../Utils/MyCamera";
import { isEmpty, waitNowFor } from "../Utils/JS";

export function uiStartMyPeer() {
  console.log("Starting New Peer...");

  var name = uiGetMyName();
  Meet.setMyPeerName(name);
  console.log(name);

  var success = Meet.startMyPeer();
  console.log("Started " + success);
  uiSetMyPeerID();
  return success;
}

export function uiStartMeeting() {
  console.log("Starting New Meeting...");
  var peerid = Meet.getMyPeerID();
  console.log(peerid);
  UiSetMeetingID(peerid);
  // UiSetMeetingID(Meet.getMyPeerID());
}

export function uiJoinMeeting(meetingID) {
  // var success = uiStartMyPeer();  waitNowFor(2000);

  joinMeeting();

  // return success;

  function joinMeeting() {
    console.log("joinMeeting()");
    var { meet } = store.getState();
    var { meetingID } = meet;
    if (!meetingID) return;
    console.log("Joining new meeting with ID... " + meetingID);

    var success = Meet.connectPeer(meetingID);

    console.log("Joined " + success);
    // uiSendClientInfo();
    setTimeout(uiSendClientInfo, 1000);


    // return success;
    // uiCallClient(meetingID);
    setTimeout(uiCallClient, 2000, meetingID);

    console.log("Meet.namesList");
    console.log(Meet.namesList);
  }
}

export function uiCallClient(peerid) {
  console.log("uiCallClient()");
  console.log("calling peerid : " + peerid);

  Meet.placeCall(peerid);
  waitNowFor(2000);

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
  if (myPeerID === meetingID) {
    console.log("Sending to Client");
    for (var peer in Meet.connectionsList) {
      Meet.connectionsList[peer].send(payload);
    }
  } else {
    // if (isEmpty(Meet.connClients)) return;
    console.log("Sending to Host");
    Meet.connectionsList[meetingID].send(payload);
  }
}

export function uiSendClientInfo() {
  console.log("uiSendClientInfo()");
  let { meet } = store.getState();
  console.log(meet);
  var { myPeerID, meetingID } = meet;
  console.log(myPeerID);
  console.log(meetingID);

  var payload = {
    type: Meet.MSG_TYPE.CLIENT_INFO,
    peerid: Meet.myPeerID,
    name: Meet.myPeerName,
  };
  console.log("Meet.connectionsList");
  console.log(Meet.connectionsList);
  if (myPeerID === meetingID) {
    console.log("Sending to Clients");
    for (var peer in Meet.connectionsList) {
      Meet.connectionsList[peer].send(payload);
    }
  } else {
    // if (isEmpty(Meet.connClients)) return;
    console.log("Sending to Host");
    Meet.connectionsList[meetingID].send(payload);
  }
}

const myVideo = document.createElement(VIDEO_ID + "0");
// const newVideo = document.getElementById("video");
myVideo.muted = true;

export const videosListGlobal = [];
export const videoStreamsListGlobal = {};

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
  return true;
}

export function uiRemoveUser(peerid) {
  return true;
}

export function uiOnDisconnectClient(peerid) {
  return true;
}

// Update Users List - On new User or User left
export function uiUpdateUsers(data) {
  console.info("Updating UI Users");
  // if(data.peerid in ChatRoom.connClients) {
  //   return;
  // }
}

export function uiGetMyName() {
  var { meet } = store.getState();
  var { myPeerName } = meet;
  return myPeerName;
}

export function uiSetMyName(name) {
  store.dispatch(setMyName(name));
  Meet.setMyPeerName(name);
  console.log(`myPeerName: ${name}`);
}

export function uiSetMyPeerID() {
  store.dispatch(setMyPeerID(Meet.myPeerID));
  var { meet } = store.getState();
  var { isHost } = meet;
  if (!isHost) return;
}

export function UiSetMeetingID(meetingID) {
  store.dispatch(setMeetingID(meetingID));

  Meet.setMeetingID(meetingID);
}

export function uiAddClientToList(clientInfo) {
  store.dispatch(addClient(clientInfo));

  Meet.addClientToList(clientInfo);
}

// Add a new Video to Grid - On each new Call from a User
export function uiAddVideoStream(stream, name, peerid) {
  console.log("uiAddVideoStream()");
  console.log(name);
  console.log(peerid);
  var { meet } = store.getState();
  var { videosList } = meet;
  var videoId = VIDEO_ID + videosList.length;
  const video = document.createElement(videoId);
  video.srcObject = stream;

  video.onloadedmetadata = function (e) {
    video.play();
  };

  var videoStreamInfo = {
    videoId: videoId,
    name: name,
    peerid: peerid,
    isMic: true,
  };
  store.dispatch(addVideoToList(videoStreamInfo));
}
