import { VideoGrid, VideoSideGrid } from "./TopBox/VideoBox";
import VideoBox from "./TopBox/VideoBox";
import { SideBox } from "./TopBox/SideBox";
import { useState } from "react";

import { connect } from "react-redux";
import { closeSidebox } from "../../redux";

function TopBox(props) {
  const [side, setSide] = useState(true);
  var classWidth = "";

  classWidth = !side ? " video-box-side " : "";

  return (
    <div className="chat-top-flex">
      <div className="top-box">
        <VideoBox classWidth={classWidth} />
        {/* <VideoGrid /> */}
        {props.isCloseSidebox ? null : <SideBox />}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isCloseSidebox: state.button.isCloseSidebox,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeSidebox: (isDisplay) => {
      return dispatch(closeSidebox(isDisplay));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopBox);
