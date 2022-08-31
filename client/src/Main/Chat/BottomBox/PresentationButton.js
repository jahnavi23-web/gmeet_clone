import { useState, useRef, useEffect } from "react";
import { Icon } from "../../../res/svg/Svg";
import { ControlButton } from "./ControlButton";
import { UiDropdown } from "../../../Utils/UI";

import { connect } from "react-redux";
import { openOptionsPresentation } from "../../../redux/button/buttonActions";

import { OPEN_OPTIONS_PRESENTATION } from "../../../redux/button/buttonTypes";

function PresentationButton(props) {
  const dropDown = new UiDropdown();
  var global = useRef(true);
  var disable_button_class = "";
  const [isEnable, setIsEnable] = useState(true);

  var dropdown_id = OPEN_OPTIONS_PRESENTATION;
  const showDropDown = () => {
    props.openOptionsPresentation(true);
    setIsEnable(false);
  };
  const hideDropDown = () => {
    props.openOptionsPresentation(false);
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
        icon: Icon.Present,
        class: disable_button_class,
        display: "",
        id: "",
      })}
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    openOptionsPresentation: (isDisplay) => {
      return dispatch(openOptionsPresentation(isDisplay));
    },
  };
};

export default connect(null, mapDispatchToProps)(PresentationButton);
