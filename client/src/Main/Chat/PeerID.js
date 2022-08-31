import { connect } from "react-redux";

function PeerID(props) {
  var myPeerID = props.myPeerID;

  return (
    <div className="id-box">
      <div className="id-area">
        <div className="id-flex">
          <span className="id-span">
            <div className="id-text">{myPeerID}</div>
          </span>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    myPeerID: state.meet.myPeerID,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     sendMessage: (msg) => {
//       return dispatch(sendMessage(msg));
//     },
//   };
// };

export default connect(mapStateToProps, null)(PeerID);
