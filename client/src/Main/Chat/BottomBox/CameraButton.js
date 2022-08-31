import { useState } from "react";
import { Svg } from "../../../res/svg/Svg";
import {
  cameraTurnOff_Control,
  cameraTurnOn_Control,
} from "../../../meet/meet";
import { ControlButton } from "./ControlButton";

import { connect } from "react-redux";
import { muteVideo } from "../../../redux/button/buttonActions";

function CameraButton(props) {
  // const [camera, setCamera] = useState(true);
  const camera = props.isMuteVideo;

  const handleClick = (e) => {
    if (!camera) {
      if (cameraTurnOn_Control()) {
        // setCamera(!camera);
        props.muteVideo(true);
      }
    } else {
      if (cameraTurnOff_Control()) {
        // setCamera(!camera);
        props.muteVideo(false);
      }
    }
  };

  return (
    <>
      {ControlButton({
        handleClick: handleClick,
        icon: Svg.CameraMute,
        class: "button-red ",
        display: camera ? " none " : "",
      })}
      {ControlButton({
        handleClick: handleClick,
        icon: Svg.Camera,
        class: "",
        display: camera ? "  " : " none ",
      })}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isMuteVideo: state.button.isMuteVideo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    muteVideo: (isDisplay) => {
      return dispatch(muteVideo(isDisplay));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CameraButton);
