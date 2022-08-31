import * as MEET from "./meetTypes";


export const startPeer = (myPeerID) => {
  return {
    type: MEET.START_PEERJS,
    info: "start a new peerjs object",
    payload: myPeerID,
  };
};
export const startMeeting = (myPeerID) => {
  return {
    type: MEET.START_MEETING,
    info: "start a new meeting",
    payload: myPeerID,
  };
};
export const addVideoToList = (videoStream) => {
  return {
    type: MEET.ADD_VIDEO_TO_LIST,
    info: "add a video to list",
    payload: videoStream,
  };
};
export const joinExistingMeeting = (meetingID) => {
  return {
    type: MEET.JOIN_EXISTING_MEETING,
    info: "join existing meeting",
    payload: meetingID,
  };
};
export const setMyName = (myPeerName) => {
  return {
    type: MEET.SET_MY_PEER_NAME,
    info: "join existing meeting",
    payload: myPeerName,
  };
};
export const setHost = (isHost) => {
  return {
    type: MEET.SET_HOST,
    info: "set my host status",
    payload: isHost,
  };
};


export const addClient = (clientInfo) => {
  return {
    type: MEET.ADD_CLIENT_TO_LIST,
    info: "Add a new client to meeting",
    payload: clientInfo,
  };
};

export const removeClient = (clientInfo) => {
  return {
    type: MEET.REMOVE_CLIENT_FROM_LIST,
    info: "Remove existing client from meeting",
    payload: clientInfo,
  };
};

export const setMyPeerId = (peerid) => {
  return {
    type: MEET.SET_MY_PEER_ID,
    info: "set my own peer id",
    payload: peerid,
  };
};