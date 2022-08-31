import * as MEET from "./meetTypes";

const initialState = {
  meetingID: null,
  myPeerID: null,
  videosList: [],
  myPeerName: null,
  isHost: false,
  clientsList: {},
};

const meetReducer = (state = initialState, action) => {
  // console.log("meetReducer ", action.type);
  switch (action.type) {
    case MEET.START_PEERJS:
      return {
        ...state,
        myPeerID: action.payload,
      };
    case MEET.START_MEETING:
      return {
        ...state,
        meetingID: action.payload,
      };
    case MEET.JOIN_EXISTING_MEETING:
      return {
        ...state,
        meetingID: action.payload,
      };
    case MEET.ADD_VIDEO_TO_LIST:
      return {
        ...state,
        videosList: [...state.videosList, { ...action.payload }],
      };
    case MEET.SET_MY_PEER_NAME:
      return {
        ...state,
        myPeerName: action.payload,
      };
    case MEET.SET_HOST:
      return {
        ...state,
        host: action.payload,
      };
    case MEET.ADD_CLIENT_TO_LIST:
      return {
        ...state,
        clientsList: {...state.clientsList, ...action.payload},
      };
    case MEET.REMOVE_CLIENT_FROM_LIST:
      return {
        ...state,
        clientsList: action.payload,
      };
    case MEET.SET_MY_PEER_ID:
      return {
        ...state,
        myPeerID: action.payload,
      };
    default:
      return state;
  }
};

export default meetReducer;
