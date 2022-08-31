import { useState } from "react";
import { Icon } from "../../../res/svg/Svg";
import { ccTurnOff_Control, ccTurnOn_Control } from "../../../meet/meet";
import { ControlButton } from "./ControlButton";

import { connect } from "react-redux";
import { turnOnCC } from "../../../redux/button/buttonActions";

function CCButton(props) {
  // const [cc, setCC] = useState(false);
  const cc = props.isOnCC;

  const handleClick = (e) => {
    if (!cc) {
      if (ccTurnOn_Control()) {
        // setCC(!cc);
        props.turnOnCC(true);
      }
    } else {
      if (ccTurnOff_Control()) {
        // setCC(!cc);
        props.turnOnCC(false);
      }
    }
  };

  return (
    <>
      {ControlButton({
        handleClick: handleClick,
        icon: Icon.CC_On,
        class: "font-grey button-grey ",
        display: cc ? " none " : "",
      })}
      {ControlButton({
        handleClick: handleClick,
        icon: Icon.CC_Off,
        class: " ",
        display: cc ? "  " : " none ",
      })}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isOnCC: state.button.isOnCC,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    turnOnCC: (isDisplay) => {
      return dispatch(turnOnCC(isDisplay));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CCButton);
