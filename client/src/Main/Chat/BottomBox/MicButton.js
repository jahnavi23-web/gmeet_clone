import { useState } from "react";
import { Svg } from "../../../res/svg/Svg";
import { micTurnOff_Control, micTurnOn_Control } from "../../../meet/meet";
import { ControlButton } from "./ControlButton";

import { connect } from "react-redux";
import { muteMic } from "../../../redux/button/buttonActions";

function MicButton(props) {
  // const [mic, setMic] = useState(false);
  const mic = props.isMuteMic;

  const handleClick = (e) => {
    if (!mic) {
      if (micTurnOn_Control()) {
        // setMic(!mic);
        props.muteMic(true);
      }
    } else {
      if (micTurnOff_Control()) {
        // setMic(!mic);
        props.muteMic(false);
      }
    }
  };

  return (
    <>
      {ControlButton({
        handleClick: handleClick,
        icon: Svg.MicMute,
        class: "button-red ",
        display: mic ? " none " : "",
      })}
      {ControlButton({
        handleClick: handleClick,
        icon: Svg.Mic,
        class: " ",
        display: mic ? "" : " none ",
      })}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isMuteMic: state.button.isMuteMic,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    muteMic: (isDisplay) => {
      return dispatch(muteMic(isDisplay));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MicButton);