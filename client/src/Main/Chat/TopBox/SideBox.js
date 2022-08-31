import ChatBody from "./ChatBody";
import ChatHeader from "./ChatHeader";
import "./SideBox.css";

export function SideBox() {
  return <div className="side-box">{ChatBox()}</div>;

  function ChatBox() {
    return (
      <div className="side-box-flex">
        <ChatHeader />
        <ChatBody />
      </div>
    );
  }
}
