import { Svg } from "../../res/svg/Svg";

import { connect } from "react-redux";

import { newMeeting } from "../../redux";

function RightArrowButton() {
  const handleClick = (e) => {
    e.preventDefault();
    console.log("Right Arrow - button clicked");
  };

  return (
    <button className="side-button" onClick={handleClick}>
      <div className="side-button-overlay"></div>
      {Svg.RightArrow}
    </button>
  );
}

const mapStateToProps = (state) => {
  return {
    isNewMeeting: state.button.isNewMeeting,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    newMeeting: (isDisplay) => {
      return dispatch(newMeeting(isDisplay));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RightArrowButton);