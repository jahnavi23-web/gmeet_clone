import * as BUTTON from "./buttonTypes";

const initialState = {
  isNewMeeting: false,
  joinMeetingID: null,
  rejoinMeetingID: null,
  isOpenHelpIntro: true,
  isOpenFeedbackIntro: true,
  isOpenSettingsIntro: true,
  isOpenAppsIntro: true,
  isOpenAccountIntro: true,
  isLeftArrowIntro: true,
  isRightArrowIntro: true,
  isLearnMoreIntro: true,
  isCloseSidebox: true,
  conversation: [],
  isMuteMic: false,
  isUnmuteMic: true,
  isMuteVideo: false,
  isUnmuteVideo: true,
  isOnCC: true,
  isOffCC: true,
  isOptionsPresentation: false,
  isOptionsMore: false,
  isEndCall: true,
  isAddMembers: false,
  isCopyLink: true,
  isCloseAddMembersBox: true,
  isMeetingDetails: true,
  isOpenMembersBox: true,
  isOpenChatBox: true,
  isOpenActivitiesBox: true,
  isSecurityBox: true,
  isGotoHomePage: true,
};

const buttonReducer = (state = initialState, action) => {
  // console.log("buttonReducer ", action.type);
  switch (action.type) {
    case BUTTON.NEW_MEETING:
      return {
        ...state,
        isNewMeeting: action.payload,
      };
    case BUTTON.CLOSE_ADD_MEMBERS_BOX:
      return {
        ...state,
        isCloseAddMembersBox: action.payload,
      };

    case BUTTON.JOIN_MEETING:
      return {
        ...state,
        joinMeetingID: action.payload,
      };
    case BUTTON.REJOIN_MEETING:
      return {
        ...state,
        rejoinMeetingID: action.payload,
      };
    case BUTTON.OPEN_HELP_INTRO:
      return {
        ...state,
        isOpenHelpIntro: action.payload,
      };
    case BUTTON.OPEN_FEEDBACK_INTRO:
      return {
        ...state,
        isOpenFeedbackIntro: action.payload,
      };
    case BUTTON.OPEN_SETTINGS_INTRO:
      return {
        ...state,
        isOpenSettingsIntro: action.payload,
      };
    case BUTTON.OPEN_APPS_INTRO:
      return {
        ...state,
        isOpenAppsIntro: action.payload,
      };
    case BUTTON.OPEN_ACCOUNT_INTRO:
      return {
        ...state,
        isOpenAccountIntro: action.payload,
      };
    case BUTTON.LEFT_ARROW_INTRO:
      return {
        ...state,
        isLeftArrowIntro: action.payload,
      };
    case BUTTON.RIGHT_ARROW_INTRO:
      return {
        ...state,
        isRightArrowIntro: action.payload,
      };
    case BUTTON.LEARN_MORE_INTRO:
      return {
        ...state,
        isLearnMoreIntro: action.payload,
      };

    case BUTTON.CLOSE_SIDEBOX:
      return {
        ...state,
        isCloseSidebox: action.payload,
      };
    case BUTTON.SEND_MESSAGE:
      return {
        ...state,
        conversation: [...state.conversation, { ...action.payload }],
      };
    case BUTTON.UPDATE_CONVERSATION:
      return {
        ...state,
        conversation: [...action.payload],
      };

    case BUTTON.MUTE_MIC:
      return {
        ...state,
        isMuteMic: action.payload,
      };
    case BUTTON.UNMUTE_MIC:
      return {
        ...state,
        isUnmuteMic: action.payload,
      };
    case BUTTON.MUTE_VIDEO:
      return {
        ...state,
        isMuteVideo: action.payload,
      };
    case BUTTON.UNMUTE_VIDEO:
      return {
        ...state,
        isUnmuteVideo: action.payload,
      };
    case BUTTON.CC_TURNOFF:
      return {
        ...state,
        isOffCC: action.payload,
      };
    case BUTTON.CC_TURNON:
      return {
        ...state,
        isOnCC: action.payload,
      };
    case BUTTON.OPEN_OPTIONS_PRESENTATION:
      return {
        ...state,
        isOptionsPresentation: action.payload,
      };
    case BUTTON.OPEN_OPTIONS_MORE:
      return {
        ...state,
        isOptionsMore: action.payload,
      };
    case BUTTON.END_CALL:
      return {
        ...state,
        isEndCall: action.payload,
      };
    case BUTTON.ADD_MEMBERS:
      return {
        ...state,
        isAddMembers: action.payload,
      };
    case BUTTON.COPY_LINK:
      return {
        ...state,
        isCopyLink: action.payload,
      };

    case BUTTON.MEETING_DETAILS:
      return {
        ...state,
        isMeetingDetails: action.payload,
      };
    case BUTTON.OPEN_MEMBERS_BOX:
      return {
        ...state,
        isOpenMembersBox: action.payload,
      };
    case BUTTON.OPEN_CHAT_BOX:
      return {
        ...state,
        isOpenChatBox: action.payload,
      };
    case BUTTON.OPEN_ACTIVITIES_BOX:
      return {
        ...state,
        isOpenActivitiesBox: action.payload,
      };
    case BUTTON.OPEN_SECURITY_BOX:
      return {
        ...state,
        isSecurityBox: action.payload,
      };
    case BUTTON.GOTO_HOME_PAGE:
      return {
        ...state,
        isGotoHomePage: action.payload,
      };

    default:
      return state;
  }
};

export default buttonReducer;
