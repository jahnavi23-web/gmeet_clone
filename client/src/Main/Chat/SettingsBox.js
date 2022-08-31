import { Icon } from "../../res/svg/Svg";
import { SettingsButton } from "./SettingsButton";

import { connect } from "react-redux";
import { closeSidebox } from "../../redux";

function SettingsBox(props) {
  var i = 0;
  var list = [
    {
      id: i++,
      icon: Icon.Details,
      hint: "Details Button",
      handleClick: (e) => {
        console.log("Details Button clicked");
      },
      class: " button-unavailable ",
    },
    {
      id: i++,
      icon: Icon.Members,
      hint: "Members Button",
      handleClick: (e) => {
        console.log("Members Button clicked");
      },
      class: " button-unavailable ",
    },
    {
      id: i++,
      icon: Icon.Chat,
      hint: "Chat Button",
      handleClick: (e) => {
        console.log("Chat Button clicked");
        props.closeSidebox(false);
      },
      class: "  ",
    },
    {
      id: i++,
      icon: Icon.Activities,
      hint: "Activities Button",
      handleClick: (e) => {
        console.log("Activities Button clicked");
      },
      class: " button-unavailable ",
    },
    {
      id: i++,
      icon: Icon.LockPerson,
      hint: "Admin Button",
      handleClick: (e) => {
        console.log("Admin Button clicked");
      },
      class: " button-unavailable ",
    },
  ];

  return (
    <div className="bottom-settings-flex">
      <div className="settings-flex">
        <div className="settings-area-flex">
          <div className="setting-grid-flex">
            {list.map((item) => {
              return <SettingsButton item={item} key={item.id} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isCloseSidebox: state.button.isCloseSidebox,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeSidebox: (isDisplay) => {
      return dispatch(closeSidebox(isDisplay));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingsBox);
