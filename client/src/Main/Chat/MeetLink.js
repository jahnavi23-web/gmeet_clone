import { Icon, Img } from "../../res/svg/Svg";
import CloseAddMembersButton from "./BottomBox/CloseAddMembersButton";

import { connect } from "react-redux";
// import { closeSidebox } from "../../../redux";


function MeetLink(props) {
  const copyMeetingID = ()=> {
    navigator.clipboard.writeText(props.myPeerID);
    console.log('Copied to clipboard');
  }
  return (
    <div className="meet-link-box">
      {HeaderMeetLinkBox()}
      <div className="meet-link-body-box">
        <div className="meet-link-add-others-box">
          <div className="meet-link-add-others-area">{AddPersonButton()}</div>
        </div>
        <div className="add-others-alternative-text">
          Or share this meeting link with others you want in the meeting
        </div>
        <div className="link-box-flex">
          <div className="link-text">{props.myPeerID}</div>
          <div>{CopyTextButton({copyMeetingID})}</div>
        </div>
        <div className="security-note-box">
          <div className="security-note-flex">
            <div style={{ display: "none" }}></div>

            {Img.SecurityShield}
            <div className="security-note-text">
              People who use this meeting link must get your permission before
              they can join.
            </div>
          </div>
        </div>

        <div className="joined-as-text">Joined as ditml.llp@gmail.com</div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    myPeerID: state.meet.myPeerID,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     closeSidebox: (isDisplay) => {
//       return dispatch(closeSidebox(isDisplay));
//     },
//   };
// };

export default connect(mapStateToProps, null)(MeetLink);

function HeaderMeetLinkBox() {
  return (
    <div className="meet-link-header-flex">
      <h2 className="meet-link-header-text" id="c25">
        Your meeting's ready
      </h2>
      <CloseAddMembersButton />
    </div>
  );
}

function AddPersonButton() {
  return (
    <button className="meet-link-add-others-button">
      <div className="add-others-button-sub"></div>
      <div className="add-others-button-overlay"></div>
      {Icon.AddPerson}
      <span className="add-others-text">Add others</span>
    </button>
  );
}

function CopyTextButton(props) {
  const handleClick = (e)=>{
    console.log('Copy button clicked');
    props.copyMeetingID();
  }
  return (
    <button className="copy-link-button" onClick={handleClick}>
      <div className="copy-link-before-after"></div>
      <div className="copy-link-do-nothing"></div>
      {Icon.CopyText}
    </button>
  );
}
