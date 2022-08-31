import { Icon } from "../../../res/svg/Svg";

import { connect } from "react-redux";
import { closeAddMembersBox } from "../../../redux/button/buttonActions";

function CloseAddMembersButton(props) {
  const handleClick = (e) => {
    // console.log('handling click close');
    props.closeAddMembersBox(false);
  };

  return (
    <button className="meet-link-close-button " onClick={handleClick}>
      <div className="mee-link-close-layout"></div>
      <div className="VfPpkd-Bz112c-J1Ukfc-LhBDec"></div>
      {Icon.Close}
    </button>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    closeAddMembersBox: (isDisplay) => {
      return dispatch(closeAddMembersBox(isDisplay));
    },
  };
};

export default connect(null, mapDispatchToProps)(CloseAddMembersButton);
