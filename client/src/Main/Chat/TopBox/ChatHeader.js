import { Icon } from "../../../res/svg/Svg";

import { connect } from "react-redux";
import { closeSidebox } from "../../../redux";

function ChatHeader(props) {
  const handleClick = (e) => {
    props.closeSidebox(true);
  };

  return (
    <div className="side-header-flex">
      <div className="side-header-text">In-call messages</div>
      <div className="side-header-close-flex">
        <div>
          <span>
            <button className="side-header-close-button" onClick={handleClick}>
              {Icon.Close}
            </button>
          </span>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatHeader);
