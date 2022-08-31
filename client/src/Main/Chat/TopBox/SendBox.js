import { Icon } from "../../../res/svg/Svg";
import { SEND_MESSAGE } from "../../../redux/button/buttonTypes";

import { connect } from "react-redux";
import { sendMessage } from "../../../redux";
import { getTime } from "../../../Utils/TimeDate";

import { uiSendOutMessage } from "../../../meet/ui";


function SendBox(props) {
  const handleClick = (e) => {
    e.preventDefault();
    sendMsgText();
    sendOutMessage();
  };

  function sendOutMessage() {
    uiSendOutMessage();
  }

  const sendMsgText = () => {
    const textInput = document.getElementById(SEND_MESSAGE);
    var text = textInput.value;
    var id = props.conversation.length + 1;
    var msg = { from: props.myPeerName, time: getTime(), text: text, id: id };
    props.sendMessage(msg);
    textInput.value = "";
  };

  return (
    <form>
      <div className="side-body-message-input-flex">
        <div className="message-input-flex">
          <label className="input-label-flex">
            <span className="input-label-span-flex">
              <span className="input-initial-gap"></span>
              <span className="input-text-overlay"></span>
            </span>
            <input
              type="text"
              className="input-textarea"
              id={SEND_MESSAGE}
              placeholder="Enter you message here"
            ></input>
          </label>
        </div>
        <span className="message-send-box">
          <button className="message-send-button" type="submit" onClick={handleClick}>
            {Icon.Send}
          </button>
        </span>
      </div>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {
    conversation: state.button.conversation,
    myPeerName: state.meet.myPeerName,
    myPeerID: state.meet.myPeerID,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendMessage: (msg) => {
      return dispatch(sendMessage(msg));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SendBox);
