import SendBox from "./SendBox";

import  Conversation from "./Conversation";

export default function ChatBody() {
  // let conv = props.conversation;
  // let conv = [
  //   { from: "You", time: "11:42 PM", text: "hello", id: 1 },
  //   { from: "Nani Y", time: "11:43 PM", text: "hi buddy", id: 2 },
  //   { from: "Nani Y", time: "11:43 PM", text: props.sendMessage, id: 2 },
  // ];

  return (
    <div className="side-body-flex">
      <div className="side-body-contents">
        {/* <Conversation conversation={conv} /> */}
        <Conversation />
        <SendBox />
      </div>
    </div>
  );
}


