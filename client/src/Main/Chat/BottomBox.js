import { connect } from "react-redux";
import { openOptionsPresentation, openOptionsMore } from "../../redux";
import { ControlsBox } from "./BottomBox/ControlsBox";
import SettingsBox from "./SettingsBox";
import { InfoBox } from "./InfoBox";
import { MoreOptions } from "./MoreOptions";
import { PresentOptions } from "./PresentOptions";
import MeetLink from "./MeetLink";

function BottomBox(props) {
  return (
    <div className="chat-bottom-flex">
      {InfoBox()}
      {ControlsBox()}
      <SettingsBox />
      {props.isCloseAddMembersBox ? <MeetLink /> : null}
      {props.isOptionsPresentation ? (
        <PresentOptions show={props.openOptionsPresentation} />
      ) : null}
      {props.isOptionsMore ? (
        <MoreOptions show={props.openOptionsMore} />
      ) : null}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isCloseAddMembersBox: state.button.isCloseAddMembersBox,
    isOptionsPresentation: state.button.isOptionsPresentation,
    isOptionsMore: state.button.isOptionsMore,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // closeAddMembersBox: (isDisplay) => {
    //   return dispatch(closeAddMembersBox(isDisplay));
    // },
    openOptionsPresentation: (isDisplay) => {
      return dispatch(openOptionsPresentation(isDisplay));
    },
    openOptionsMore: (isDisplay) => {
      return dispatch(openOptionsMore(isDisplay));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BottomBox);
