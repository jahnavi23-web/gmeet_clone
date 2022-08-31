import * as BUTTON from "./buttonTypes";
import { Meet } from "../../meet/meet";

export const newMeeting = (isDisplay) => {
  // Meet.startMyPeer();
  return {
    type: BUTTON.NEW_MEETING,
    info: "start a new meeting",
    payload: isDisplay,
  };
};

export const joinMeeting = (meetingID) => {
  return {
    type: BUTTON.JOIN_MEETING,
    info: "join existing meeting",
    payload: meetingID,
  };
};

export const openHelpIntro = (isDisplay) => {
  return {
    type: BUTTON.OPEN_HELP_INTRO,
    info: "show help box in intro page",
    payload: isDisplay,
  };
};

export const openFeedbackIntro = (isDisplay) => {
  return {
    type: BUTTON.OPEN_FEEDBACK_INTRO,
    info: "show feedback box in intro page",
    payload: isDisplay,
  };
};

export const openSettingsIntro = (isDisplay) => {
  return {
    type: BUTTON.OPEN_SETTINGS_INTRO,
    info: "show settings box in intro page",
    payload: isDisplay,
  };
};

export const openAppsIntro = (isDisplay) => {
  return {
    type: BUTTON.OPEN_APPS_INTRO,
    info: "show apps box in intro page",
    payload: isDisplay,
  };
};

export const openAccountIntro = (isDisplay) => {
  return {
    type: BUTTON.OPEN_ACCOUNT_INTRO,
    info: "show account box in intro page",
    payload: isDisplay,
  };
};

export const leftArrowIntro = (isDisplay) => {
  return {
    type: BUTTON.LEFT_ARROW_INTRO,
    info: "show previous image",
    payload: isDisplay,
  };
};

export const rightArrowIntro = (isDisplay) => {
  return {
    type: BUTTON.RIGHT_ARROW_INTRO,
    info: "show next image",
    payload: isDisplay,
  };
};

export const learnMoreLink = (isDisplay) => {
  return {
    type: BUTTON.LEARN_MORE_INTRO,
    info: "goto learn more page",
    payload: isDisplay,
  };
};

export const closeSidebox = (isDisplay) => {
  return {
    type: BUTTON.CLOSE_SIDEBOX,
    info: "close side box in meeting page",
    payload: isDisplay,
  };
};

export const sendMessage = (msg) => {
  return {
    type: BUTTON.SEND_MESSAGE,
    info: "send message to group",
    payload: msg,
  };
};

export const updateConversation = (conv) => {
  return {
    type: BUTTON.UPDATE_CONVERSATION,
    info: "send message to group",
    payload: conv,
  };
};

export const muteMic = (isDisplay) => {
  return {
    type: BUTTON.MUTE_MIC,
    info: "mute my mic",
    payload: isDisplay,
  };
};

export const unmuteMic = (isDisplay) => {
  return {
    type: BUTTON.UNMUTE_MIC,
    info: "unmute my mic",
    payload: isDisplay,
  };
};

export const muteVideo = (isDisplay) => {
  console.log("muteVideo action");
  return {
    type: BUTTON.MUTE_VIDEO,
    info: "mute my video",
    payload: isDisplay,
  };
};

export const unmuteVideo = (isDisplay) => {
  return {
    type: BUTTON.UNMUTE_VIDEO,
    info: "unmute my video",
    payload: isDisplay,
  };
};

export const turnOffCC = (isDisplay) => {
  return {
    type: BUTTON.CC_TURNOFF,
    info: "turn of subtitles",
    payload: isDisplay,
  };
};

export const turnOnCC = (isDisplay) => {
  console.log("turnOnCC action")
  return {
    type: BUTTON.CC_TURNON,
    info: "turn on subtitles",
    payload: isDisplay,
  };
};

export const openOptionsPresentation = (isDisplay) => {
  return {
    type: BUTTON.OPEN_OPTIONS_PRESENTATION,
    info: "show presentation options",
    payload: isDisplay,
  };
};

export const openOptionsMore = (isDisplay) => {
  return {
    type: BUTTON.OPEN_OPTIONS_MORE,
    info: "show more options about meeting",
    payload: isDisplay,
  };
};

export const endCall = (isDisplay) => {
  return {
    type: BUTTON.END_CALL,
    info: "end current call",
    payload: isDisplay,
  };
};

export const addMembers = (isDisplay) => {
  return {
    type: BUTTON.ADD_MEMBERS,
    info: "add new members to the meeting",
    payload: isDisplay,
  };
};

export const copyLink = (isDisplay) => {
  return {
    type: BUTTON.COPY_LINK,
    info: "copy meeting link to clipboard",
    payload: isDisplay,
  };
};

export const closeAddMembersBox = (isDisplay) => {
  // console.log('closeMemberBox isDisplay ', );
  return {
    type: BUTTON.CLOSE_ADD_MEMBERS_BOX,
    info: "close meeting add members box",
    payload: isDisplay,
  };
};

export const meetingDetails = (isDisplay) => {
  return {
    type: BUTTON.MEETING_DETAILS,
    info: "show meeting details",
    payload: isDisplay,
  };
};

export const openMembersBox = (isDisplay) => {
  return {
    type: BUTTON.OPEN_MEMBERS_BOX,
    info: "show meeting members box",
    payload: isDisplay,
  };
};

export const openChatBox = (isDisplay) => {
  return {
    type: BUTTON.OPEN_CHAT_BOX,
    info: "show chat box",
    payload: isDisplay,
  };
};

export const openActivitiesBox = (isDisplay) => {
  return {
    type: BUTTON.OPEN_ACTIVITIES_BOX,
    info: "show activities box",
    payload: isDisplay,
  };
};

export const openSecurityBox = (isDisplay) => {
  return {
    type: BUTTON.OPEN_SECURITY_BOX,
    info: "show security settings box",
    payload: isDisplay,
  };
};

export const rejoinMeeting = (meetingID) => {
  return {
    type: BUTTON.REJOIN_MEETING,
    info: "rejoin the previous meeting",
    payload: meetingID,
  };
};

export const gotoHomePage = (isDisplay) => {
  return {
    type: BUTTON.GOTO_HOME_PAGE,
    info: "go to home page",
    payload: isDisplay,
  };
};