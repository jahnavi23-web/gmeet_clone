import { useState } from "react";
import { Icon } from "../../../res/svg/Svg";
import { useNavigate } from "react-router-dom";
import { endCall_Control } from "../../../meet/meet";
import { ControlButton } from "./ControlButton";

import { connect } from "react-redux";
import { muteMic } from "../../../redux/button/buttonActions";

function EndCallButton(props) {
  const [call, setCall] = useState(true);
  const navigate = useNavigate();

  const handleClick = (props) => {
    if (call) {
      if (endCall_Control()) {
        setCall(!call);
        console.log("EndCall");
        return navigate("/");
      }
    }
  };

  return (
    <>
      {ControlButton({
        handleClick: handleClick,
        icon: Icon.CallEnd,
        class: "button-red button-stretch ",
        display: "",
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

export default connect(mapStateToProps, mapDispatchToProps)(EndCallButton);