import { useState, useRef, useEffect } from "react";
import { Icon } from "../../res/svg/Svg";
import { UiDropdown } from "../../Utils/UI";
import { DropDownNewMeeting } from "./DropDownNewMeeting";
import { useNavigate } from "react-router-dom";

import { connect } from "react-redux";

import { newMeeting, setHost } from "../../redux";

import { uiStartMyPeer } from "../../meet/ui";

function NewMeetingButton(props) {
  const dropDown = new UiDropdown();

  var global = useRef(true);
  var disable_button_class = "";
  const [isEnable, setIsEnable] = useState(true);

  var dropdown_id = "dropdown_meet";
  const showDropDown = () => {
    props.newMeeting(true);
    setIsEnable(false);
  };
  const hideDropDown = () => {
    props.newMeeting(false);
    setIsEnable(true);
  };

  let navigate = useNavigate();

  let i = 0;
  let options = [
    {
      icon: Icon.Link,
      text: "Create a meeting for later",
      id: i++,
      onClick: (e) => {
        if (e) e.preventDefault();
        console.log("Create a meeting for later");
        hideDropDown();
      },
    },
    {
      icon: Icon.Add,
      text: "Start an instant meeting",
      id: i++,
      onClick: (e) => {
        if (e) e.preventDefault();
        console.log("Start Meet button clicked.");
        navigate("/chat");
        var success = uiStartMyPeer();
        if (!success) return;
        props.setHost(true);
        hideDropDown();
      },
    },
    {
      icon: Icon.Calendar,
      text: "Schedule in Goodle Calendar",
      id: i++,
      onClick: (e) => {
        if (e) e.preventDefault();
        console.log("Schedule in Goodle Calendar");
        hideDropDown();
      },
    },
  ];

  const handleClick = (e) => {
    e.preventDefault();
    showDropDown();
    dropDown.setGlobalClick(dropdown_id, hideDropDown, 2);
  };

  const onDestroy = () => {
    dropDown.removeGlobalClick();
    hideDropDown();
  };

  useEffect(() => {
    return onDestroy;
  }, [global]);

  disable_button_class = isEnable ? "" : " button-disable ";

  return (
    <div className="new-meeting-box">
      <div className="new-meeting-container">
        <div className="new-meeting-area">
          <button
            className={disable_button_class + "new-meeting-button-flex"}
            onClick={handleClick}
            type="button"
          >
            <div className="meeting-button-box"></div>
            <div className="meeting-button-overlay"></div>
            {Icon.VideoCall}
            &nbsp;
            <span className="video-button-text">New meeting</span>
          </button>
        </div>
      </div>
      {props.isNewMeeting ? (
        <DropDownNewMeeting id={dropdown_id} options={options} />
      ) : null}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isNewMeeting: state.button.isNewMeeting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    newMeeting: (isDisplay) => {
      return dispatch(newMeeting(isDisplay));
    },
    setHost: (isHost) => {
      return dispatch(setHost(isHost));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewMeetingButton);
