import { Svg } from "../../../res/svg/Svg.js";
// client/src/Main/ChatPage/TopBox/NameBox.js

export function NameBox() {
  return (
    <div className="name-flex">
      <div className="name-box-flex">
        <div className="name-area-flex">
          <div className="name-text">You</div>
        </div>
      </div>
    </div>
  );
}

export function NameBoxClient() {
  return (
    // <div className="video-name-overlay">
    <div className="name-flex">
      <div className="name-box-flex">
        <div className="name-area-flex">
          <div className="name-text">You</div>&nbsp;
          {Svg.MicMute}
        </div>
      </div>
    </div>
  );
}

export function NameBoxVideo(props) {
  return (
    <div>
      <div className="name-text-overlay">
        <>
          {props.name}&nbsp;&nbsp;{props.isMic ? <></> : Svg.MicMute}
        </>
      </div>
    </div>
  );
}

export function NameBoxVideoX() {
  return (
    <div>
      <div className="name-text-overlay">You</div>&nbsp;
      {/* <div className="name-icon-overlay">{Svg.MicMute}</div> */}
    </div>
  );
}
