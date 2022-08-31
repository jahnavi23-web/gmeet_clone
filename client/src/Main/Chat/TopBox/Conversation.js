import { connect } from "react-redux";


export function Conversation(props) {
  let conv = props.conversation;

  

  // let conv = [
  //   { from: "You", time: "11:42 PM", text: "hello" },
  //   { from: "Nani Y", time: "11:43 PM", text: "hi buddy" },
  // ];
  return (
    <div className="side-body-conversation-box">
      {conv.map((msg) => {
        return Message({ msg: msg });
      })}
    </div>
  );

  function Message(props) {
    var msg = props.msg;
    // var msg = { from: "You", time: "11:42 PM", text: "hello" };
    return (
      <div className="conversation-message-box" key={msg.id}>
        <div className="message-info-box">
          <div className="message-info-sender">{msg.from}</div>
          <div className="message-info-time">{msg.time}</div>
        </div>
        <div className="message-text-box">
          <div className="message-text-text">{msg.text}</div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    conversation: state.button.conversation,
  };
};
export default connect(mapStateToProps, null)(Conversation);
