import { connect } from "react-redux";
import { uiJoinExisitingMeetingPeer } from "../../meet/ui";
import { useNavigate } from "react-router-dom";

import { joinExistingMeeting, setHost } from "../../redux";
import { JOIN_MEETING } from "../../redux/button/buttonTypes";
function JoinButton(props) {
  let navigate = useNavigate();
  const handleClick = (e) => {
    const textInput = document.getElementById(JOIN_MEETING);
    var meetingID = textInput.value;
    if (!meetingID) return;
    props.joinExistingMeeting(meetingID);
    props.setHost(false);
    var success = uiJoinExisitingMeetingPeer();
    if (!success) return;
    textInput.value = "";
    navigate("/chat");
  };

  return (
    <div className="join-button-area show-on-hover">
      <button className="join-button-flex" onClick={handleClick} type="submit">
        <div className="join-button-overlay"></div>
        <div className="join-button-cover"></div>
        <span className="join-button-text">Join</span>
      </button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    meetingID: state.meet.meetingID,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    joinExistingMeeting: (meetingID) => {
      return dispatch(joinExistingMeeting(meetingID));
    },
    setHost: (isHost) => {
      return dispatch(setHost(isHost));
    },
  };
};

export default connect(null, mapDispatchToProps)(JoinButton);
