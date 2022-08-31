import { useState, useRef, useEffect } from "react";
import { Icon } from "../../../res/svg/Svg";
import {
  cameraTurnOff_Control,
  cameraTurnOn_Control,
} from "../../../meet/meet";
import { ControlButton } from "./ControlButton";

import { connect } from "react-redux";
import { muteMic } from "../../../redux/button/buttonActions";
import { UiDropdown } from "../../../Utils/UI";

import { openOptionsMore } from "../../../redux";
import { OPEN_OPTIONS_MORE } from "../../../redux/button/buttonTypes";

function MoreOptionsButton(props) {
  const dropDown = new UiDropdown();
  var global = useRef(true);
  var disable_button_class = "";
  const [isEnable, setIsEnable] = useState(true);

  var dropdown_id = OPEN_OPTIONS_MORE;
  const showDropDown = () => {
    props.openOptionsMore(true);
    setIsEnable(false);
  };
  const hideDropDown = () => {
    props.openOptionsMore(false);
    setIsEnable(true);
  };

  // const handleClick = (e) => {
  //   e.preventDefault();
  //   if (display.current) {
  //     showDropDown();
  //   } else {
  //     hideDropDown();
  //   }
  //   display.current = !display.current;
  // };
  const handleClick = (e) => {
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
    <>
      {ControlButton({
        handleClick: handleClick,
        icon: Icon.More,
        class: disable_button_class,
        display: "",
      })}
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    openOptionsMore: (isDisplay) => {
      return dispatch(openOptionsMore(isDisplay));
    },
  };
};

export default connect(null, mapDispatchToProps)(MoreOptionsButton);
