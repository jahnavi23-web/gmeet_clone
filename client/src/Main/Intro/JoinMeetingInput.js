import { Icon } from "../../res/svg/Svg";

import { connect } from "react-redux";

import { newMeeting } from "../../redux";
import { JOIN_MEETING } from "../../redux/button/buttonTypes";
import { useState } from "react";

export default function JoinMeetingInput() {
  const inputId = JOIN_MEETING;
  const [isEmpty, setIsEmpty] = useState(true); 
  const handleChange = (e) => {
    if (e.target.value === "") setIsEmpty(true);
    else setIsEmpty(false);
  };

  var classHover = isEmpty ? " hoverable " : "";

  return (
    <div className={"join-meeting-flex " + classHover}>
      <div className="join-meeting-box-flex">
        <label className="join-meeting-label-flex">
          <span className="join-meeting-label-span-flex">
            <span className="label-span-first-margin"></span>
            <span className="label-span-second-margin"></span>
          </span>
          {Icon.Keyboard}
          <input
            id={inputId}
            type="text"
            className="join-input-text-flex"
            placeholder="Enter meet code or link"
            autoComplete="off"
            onChange={handleChange}
          ></input>
        </label>
        <div className="join-meeting-padding-bottom">
          <p className="join-meeting-padding-bottom-dummy"></p>
        </div>
      </div>
    </div>
  );
}
