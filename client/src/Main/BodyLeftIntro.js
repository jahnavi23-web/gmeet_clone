import NewMeetingButton from "./Intro/NewMeetingButton";
import JoinMeetingInput from "./Intro/JoinMeetingInput";
import JoinButton from "./Intro/JoinButton";
import AccountDetailsBox from "./AccountDetailsBox";

import { connect } from "react-redux";

function BodyLeftIntro(props) {
  return (
    <div className="body-left-flex">
      <div className="left-heading">
        Premium video meetings. Now free for everyone.
      </div>
      <div className="left-text">
        We re-engineered the service we built for secure business meetings,
        Google Meet, to make it free and available for all.
      </div>
      <div className="left-meeting-box">
        {props.myPeerName ? (
          <form>
            <div className="left-meeting-box-flex">
              <NewMeetingButton />
              <JoinMeetingInput />
              <JoinButton />
            </div>
          </form>
        ) : (
          <AccountDetailsBox />
        )}
      </div>
      <div className="left-gap-line"></div>
      <div className="left-bottom-more">
        <span
          className="left-bottom-more-span"
          jscontroller="flbTs"
          jsaction="click:ndJ4N"
          data-url="https://meet.google.com/about/redirect/landing-learn-more/?hl=en"
          data-impression="6565"
        >
          <a
            href="https://meet.google.com/about/redirect/landing-learn-more/?hl=en"
            target="_blank"
            rel="noreferrer"
            className="left-bottom-link"
          >
            Learn more
          </a>{" "}
          about Google Meet
        </span>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    myPeerName: state.meet.myPeerName,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     setMyName: (name) => {
//       return dispatch(setMyName(name));
//     },
//   };
// };

export default connect(mapStateToProps, null)(BodyLeftIntro);
