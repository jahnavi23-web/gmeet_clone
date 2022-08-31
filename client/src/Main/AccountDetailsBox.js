import { Icon } from "../res/svg/Svg";
import { SET_MY_NAME } from "../redux/button/buttonTypes";

import { connect } from "react-redux";
import { setMyName } from "../redux";
import { getTime } from "../Utils/TimeDate";

function AccountDetailsBox(props) {
  const handleClick = (e) => {
    e.preventDefault();
    sendNameText();
  };

  const sendNameText = () => {
    const textInput = document.getElementById(SET_MY_NAME);
    var text = textInput.value;
    props.setMyName(text);
    textInput.value = "";
  };

  return (
    <form >
      <div
        className="side-body-message-input-flex"
        style={{
          position: "relative",
          left: "0px",
          width: "350px",
          border: " solid 3px orange",
        }}
      >
        <div className="message-input-flex">
          <label className="input-label-flex">
            <span className="input-label-span-flex">
              <span className="input-initial-gap"></span>
              <span className="input-text-overlay"></span>
            </span>
            <input
              type="text"
              className="input-textarea"
              id={SET_MY_NAME}
              placeholder="Enter you name here"
              required
              autoComplete="on"
            ></input>
          </label>
        </div>
        <span className="message-send-box">
          {/* <button className="message-send-button" > */}
          <button
            className="message-send-button"
            type="submit"
            onClick={handleClick}
          >
            {Icon.Send}
          </button>
        </span>
      </div>
    </form>
  );
}

// const mapStateToProps = (state) => {
//   return {
//     isCloseSidebox: state.button.isCloseSidebox,
//   };
// };

const mapDispatchToProps = (dispatch) => {
  return {
    setMyName: (name) => {
      return dispatch(setMyName(name));
    },
  };
};

export default connect(null, mapDispatchToProps)(AccountDetailsBox);
