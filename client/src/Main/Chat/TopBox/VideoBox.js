import {
  // MyCamera,
  // MyCamera2,
  // MyCamera3,
  // MyCamera4,
  // MyCamera5,
  // MyCamera6,
  // MyCamera7,
  // MyCamera8,
  // MyCamera9,
  // MyCamera10,
  // MyCamera11,
  // MyCamera12,
  // MyCamera13,
  MyCameraCustom,
} from "../../../Utils/MyCamera";
import { NameBox } from "./NameBox";
import { InfoIconBox } from "./InfoIconBox";

import { connect } from "react-redux";
import { closeSidebox } from "../../../redux";
import { NameBoxVideo } from "./NameBox";

function VideoBox(props) {
  return props.isCloseSidebox ? (
    <VideoGrid videosList={props.videosList} />
  ) : (
    <VideoSideGrid videosList={props.videosList} />
  );
}

export function VideoGrid(props) {
  var ListOfVideos = props.videosList;
  var style = getStyle(ListOfVideos.length, false);
  var style_grid = style.style_grid;
  var style_vid = style.style_vid;
  return (
    <div className=" video-box ">
      <div className="video-area">
        <div className="video-container">
          <div className="video-grid-box" id="video-grid-box">
            <div id="video-grid" style={style_grid}>
              {ListOfVideos.map((video) => {
                return (
                  <div key={video.videoId}>
                    <MyCameraCustom
                      videoId={video.videoId}
                      name={video.name}
                      isMic={video.isMic}
                      style_vid={style_vid}
                    />
                    <NameBoxVideo name={video.name} isMic={video.isMic} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function VideoSideGrid(props) {
  var ListOfVideos = props.videosList;
  var style = getStyle(ListOfVideos.length, true);
  var style_grid = style.style_grid;
  var style_vid = style.style_vid;

  return (
    <div className=" video-box-side video-box ">
      <div className="video-area">
        <div className="video-container">
          <div className="video-grid-box" id="video-grid-box">
            <div id="video-grid" style={style_grid}>
              {ListOfVideos.map((video) => {
                return (
                  <div key={video.videoId}>
                    <MyCameraCustom                      
                      videoId={video.videoId}
                      name={video.name}
                      isMic={video.isMic}
                      style_vid={style_vid}
                    />
                    <NameBoxVideo name={video.name} isMic={video.isMic} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function getStyle(numbOfVideos, isSide) {
  var style_grid = null;
  var style_vid = null;
  var vid_number = numbOfVideos;
  if (isSide) {
    const no_grid = {
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
    };
    const grid1 = {
      display: "grid",
      padding: "10px 10px",
      gridTemplateColumns: "repeat(auto-fill, 1320px)",
      gridAutoRows: "550px",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      alignSelf: "center",
    };
    const grid2 = {
      gridTemplateColumns: "repeat(auto-fill, 430px)",
      display: "flex",
      flexDirection: "row",
    };
    const grid34 = {
      display: "grid",
      padding: "10px 10px",
      gridAutoRows: "270px",
      gridTemplateColumns: "repeat(auto-fill, 430px)",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
    };
    const grid56 = {
      display: "grid",
      gridAutoRows: "270px",
      gridTemplateColumns: "repeat(auto-fill, 310px)",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
    };
    const grid789 = {
      display: "grid",
      gridAutoRows: "170px",
      gridTemplateColumns: "repeat(auto-fill, 300px)",
      justifyContent: "center",
    };
    const grid_over = {
      display: "grid",
      gridAutoRows: "170px",
      gridTemplateColumns: "repeat(auto-fill, 300px)",
      justifyContent: "center",
      overflowX: "hidden",
      overflowY: "auto",
      pointerEvents: "all",
    };
    const vid_h = {
      objectFit: "cover",
      height: "100%",
      border: "2px solid blue",
    };
    const vid_flex = {
      objectFit: "cover",
      display: "flex",
      border: "2px solid blue",
      height: "100%",
    };

    const vid_w = {
      objectFit: "cover",
      width: "100%",
      border: "2px solid blue",
    };

    vid_number = numbOfVideos;
    switch (vid_number) {
      case 1:
        style_grid = grid1;
        style_vid = vid_h;
        break;
      case 2:
        style_grid = grid2;
        style_vid = vid_w;
        break;
      case 3:
        style_grid = grid34;
        style_vid = vid_h;
        break;
      case 4:
        style_grid = grid34;
        style_vid = vid_h;
        break;
      case 5:
        style_grid = grid56;
        style_vid = vid_w;
        break;
      case 6:
        style_grid = grid56;
        style_vid = vid_w;
        break;
      case 7:
        style_grid = grid789;
        style_vid = vid_h;
        break;
      case 8:
        style_grid = grid789;
        style_vid = vid_h;
        break;
      case 9:
        style_grid = grid789;
        style_vid = vid_h;
        break;
      default:
        style_grid = grid_over;
        style_vid = vid_h;
    }
  } else {
    const no_grid = {
      display: "flex",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
    };
    const grid1 = {
      display: "grid",
      padding: "10px 10px",
      gridTemplateColumns: "repeat(auto-fill, 1320px)",
      gridAutoRows: "550px",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      alignSelf: "center",
    };
    const grid12 = {
      display: "flex",
      flexDirection: "row",
    };
    const grid3 = {
      display: "grid",
      padding: "10px 10px",
      gridTemplateColumns: "repeat(auto-fill, 430px)",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
    };
    const grid4 = {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, 660px)",
      gridAutoRows: "270px",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
    };
    const grid56 = {
      display: "grid",
      gridAutoRows: "270px",
      gridTemplateColumns: "repeat(auto-fill, 430px)",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
    };
    const grid78 = {
      display: "grid",
      gridAutoRows: "270px",
      gridTemplateColumns: "repeat(auto-fill, 330px)",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
    };
    const grid_over = {
      display: "grid",
      gridAutoRows: "270px",
      gridTemplateColumns: "repeat(auto-fill, 330px)",
      justifyContent: "center",
      alignContent: "center",
      alignItems: "center",
      overflowX: "hidden",
      overflowY: "auto",
      pointerEvents: "all",
    };

    const vid_h = {
      objectFit: "cover",
      height: "100%",
      border: "2px solid blue",
    };
    const vid_flex = {
      objectFit: "cover",

      display: "flex",
      border: "2px solid blue",
      height: "100%",
    };
    const vid_w = {
      objectFit: "cover",
      width: "100%",
      border: "2px solid blue",
    };

    vid_number = numbOfVideos;
    switch (vid_number) {
      case 1:
        style_grid = grid1;
        style_vid = vid_h;
        break;
      case 2:
        style_grid = grid12;
        style_vid = vid_flex;
        break;
      case 3:
        style_grid = grid3;
        style_vid = vid_w;
        break;
      case 4:
        style_grid = grid4;
        style_vid = vid_h;
        break;
      case 5:
        style_grid = grid56;
        style_vid = vid_h;
        break;
      case 6:
        style_grid = grid56;
        style_vid = vid_h;
        break;
      case 7:
        style_grid = grid78;
        style_vid = vid_w;
        break;
      case 8:
        style_grid = grid78;
        style_vid = vid_w;
        break;
      default:
        style_grid = grid_over;
        style_vid = vid_w;
    }
  }

  return { style_grid, style_vid };
}

const mapStateToProps = (state) => {
  return {
    isCloseSidebox: state.button.isCloseSidebox,
    videosList: state.meet.videosList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeSidebox: (isDisplay) => {
      return dispatch(closeSidebox(isDisplay));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoBox);

// export function VideoSideGrid() {
// const no_grid = {
//   display: "flex",
//   justifyContent: "center",
//   alignContent: "center",
//   alignItems: "center",
// };
// const grid1 = {
//   display: "grid",
//   padding: "10px 10px",
//   gridTemplateColumns: "repeat(auto-fill, 1320px)",
//   gridAutoRows: "550px",
//   justifyContent: "center",
//   alignContent: "center",
//   alignItems: "center",
//   alignSelf: "center",
// };
// const grid2 = {
//   // display: "grid",
//   // padding: "10px 10px",
//   gridTemplateColumns: "repeat(auto-fill, 430px)",
//   // gridAutoRows: "550px",
//   // justifyContent: "center",
//   // alignContent: "center",
//   // alignItems: "center",
//   display: "flex",
//   flexDirection: "row",
//   // padding: "10px 10px",
//   // justifyContent: "center",
//   // alignContent: "center",
//   // alignItems: "center",
// };
// const grid34 = {
//   display: "grid",
//   padding: "10px 10px",
//   // gridTemplateColumns: "repeat(auto-fill, 660px)",
//   gridAutoRows: "270px",
//   gridTemplateColumns: "repeat(auto-fill, 430px)",
//   // gridAutoRows: "270px",
//   justifyContent: "center",
//   alignContent: "center",
//   alignItems: "center",
// };
// const grid56 = {
//   display: "grid",
//   // padding: "4px 4px",
//   // gridTemplateColumns: "repeat(auto-fill, 660px)",
//   gridAutoRows: "270px",
//   gridTemplateColumns: "repeat(auto-fill, 310px)",
//   // gridAutoRows: "270px",
//   justifyContent: "center",
//   alignContent: "center",
//   alignItems: "center",
// };
// const grid789 = {
//   display: "grid",
//   // padding: "4px 4px",
//   // gridTemplateColumns: "repeat(auto-fill, 660px)",
//   gridAutoRows: "170px",
//   gridTemplateColumns: "repeat(auto-fill, 300px)",
//   // gridAutoRows: "270px",
//   justifyContent: "center",
//   // alignContent: "center",
//   // alignItems: "center",
// };
// const grid_over = {
//   display: "grid",
//   // padding: "4px 4px",
//   // gridTemplateColumns: "repeat(auto-fill, 660px)",
//   gridAutoRows: "170px",
//   gridTemplateColumns: "repeat(auto-fill, 300px)",
//   // gridAutoRows: "270px",
//   justifyContent: "center",
//   overflowX: "hidden",
//   overflowY: "auto",
//   pointerEvents: "all",
//   // alignContent: "center",
//   // alignItems: "center",
// };
//
// const vid_h = {
//   // position: 'absolute',
//   // top: '0',
//   // left: '0',
//   // height: '100%',
//   objectFit: "cover",
//   // width: "100%",
//   height: "100%",
//   border: "2px solid blue",
// };
// const vid_flex = {
//   // position: 'absolute',
//   // top: '0',
//   // left: '0',
//   // height: '100%',
//   objectFit: "cover",
//   // width: "100%",
//   // padding: '2px',
//
//   display: "flex",
//   border: "2px solid blue",
//   // flex: "1",
//   height: "100%",
// };
//
// const vid_w = {
//   // position: 'absolute',
//   // top: '0',
//   // left: '0',
//   // height: '100%',
//   objectFit: "cover",
//   width: "100%",
//   // height: "100%",
//   border: "2px solid blue",
// };
//
// var vid_number = ListOfVideos.length;
// var style_grid = null;
// var style_vid = null;
// switch (vid_number) {
//   case 1:
//     style_grid = grid1;
//     style_vid = vid_h;
//     break;
//   case 2:
//     style_grid = grid2;
//     style_vid = vid_w;
//     break;
//   case 3:
//     style_grid = grid34;
//     style_vid = vid_h;
//     break;
//   case 4:
//     style_grid = grid34;
//     style_vid = vid_h;
//     break;
//   case 5:
//     style_grid = grid56;
//     style_vid = vid_w;
//     break;
//   case 6:
//     style_grid = grid56;
//     style_vid = vid_w;
//     break;
//   case 7:
//     style_grid = grid789;
//     style_vid = vid_h;
//     break;
//   case 8:
//     style_grid = grid789;
//     style_vid = vid_h;
//     break;
//   case 9:
//     style_grid = grid789;
//     style_vid = vid_h;
//     break;
//   default:
//     style_grid = grid_over;
//     style_vid = vid_h;
// }

// export function VideoGrid() {
// const no_grid = {
//   display: "flex",
//   justifyContent: "center",
//   alignContent: "center",
//   alignItems: "center",
// };
// const grid1 = {
//   display: "grid",
//   padding: "10px 10px",
//   gridTemplateColumns: "repeat(auto-fill, 1320px)",
//   gridAutoRows: "550px",
//   justifyContent: "center",
//   alignContent: "center",
//   alignItems: "center",
//   alignSelf: "center",
// };
// const grid12 = {
//   // display: "grid",
//   // padding: "10px 10px",
//   // gridTemplateColumns: "repeat(auto-fill, 660px)",
//   // gridAutoRows: "550px",
//   // justifyContent: "center",
//   // alignContent: "center",
//   // alignItems: "center",
//   display: "flex",
//   flexDirection: "row",
//   // padding: "10px 10px",
//   // justifyContent: "center",
//   // alignContent: "center",
//   // alignItems: "center",
// };
// const grid3 = {
//   display: "grid",
//   padding: "10px 10px",
//   // gridTemplateColumns: "repeat(auto-fill, 660px)",
//   // gridAutoRows: "270px",
//   gridTemplateColumns: "repeat(auto-fill, 430px)",
//   // gridAutoRows: "270px",
//   justifyContent: "center",
//   alignContent: "center",
//   alignItems: "center",
// };
// const grid4 = {
//   display: "grid",
//   // padding: "4px 4px",
//   gridTemplateColumns: "repeat(auto-fill, 660px)",
//   gridAutoRows: "270px",
//   // gridTemplateColumns: "repeat(auto-fill, 430px)",
//   // gridAutoRows: "270px",
//   justifyContent: "center",
//   alignContent: "center",
//   alignItems: "center",
// };
// const grid56 = {
//   display: "grid",
//   // padding: "4px 4px",
//   // gridTemplateColumns: "repeat(auto-fill, 660px)",
//   gridAutoRows: "270px",
//   gridTemplateColumns: "repeat(auto-fill, 430px)",
//   // gridAutoRows: "270px",
//   justifyContent: "center",
//   alignContent: "center",
//   alignItems: "center",
// };
// const grid78 = {
//   display: "grid",
//   // padding: "4px 4px",
//   // gridTemplateColumns: "repeat(auto-fill, 660px)",
//   gridAutoRows: "270px",
//   gridTemplateColumns: "repeat(auto-fill, 330px)",
//   // gridAutoRows: "270px",
//   justifyContent: "center",
//   alignContent: "center",
//   alignItems: "center",
// };
// const grid_over = {
//   display: "grid",
//   // padding: "4px 4px",
//   // gridTemplateColumns: "repeat(auto-fill, 660px)",
//   gridAutoRows: "270px",
//   gridTemplateColumns: "repeat(auto-fill, 330px)",
//   // gridAutoRows: "270px",
//   justifyContent: "center",
//   alignContent: "center",
//   alignItems: "center",
//   overflowX: "hidden",
//   overflowY: "auto",
//   pointerEvents: "all",
// };
// const vid_h = {
//   // position: 'absolute',
//   // top: '0',
//   // left: '0',
//   // height: '100%',
//   objectFit: "cover",
//   // width: "100%",
//   height: "100%",
//   border: "2px solid blue",
// };
// const vid_flex = {
//   // position: 'absolute',
//   // top: '0',
//   // left: '0',
//   // height: '100%',
//   objectFit: "cover",
//   // width: "100%",
//   // padding: '2px',
//
//   display: "flex",
//   border: "2px solid blue",
//   // flex: "1",
//   height: "100%",
// };
// const vid_w = {
//   // position: 'absolute',
//   // top: '0',
//   // left: '0',
//   // height: '100%',
//   objectFit: "cover",
//   width: "100%",
//   // height: "100%",
//   border: "2px solid blue",
// };
// // var vid_number = ListOfVideos.length;
// var vid_number = 2;
// console.log(vid_number);
// var style_grid = null;
// var style_vid = null;
// switch (vid_number) {
//   case 1:
//     style_grid = grid1;
//     style_vid = vid_h;
//     break;
//   case 2:
//     style_grid = grid12;
//     style_vid = vid_flex;
//     break;
//   case 3:
//     style_grid = grid3;
//     style_vid = vid_w;
//     break;
//   case 4:
//     style_grid = grid4;
//     style_vid = vid_h;
//     break;
//   case 5:
//     style_grid = grid56;
//     style_vid = vid_h;
//     break;
//   case 6:
//     style_grid = grid56;
//     style_vid = vid_h;
//     break;
//   case 7:
//     style_grid = grid78;
//     style_vid = vid_w;
//     break;
//   case 8:
//     style_grid = grid78;
//     style_vid = vid_w;
//     break;
//   default:
//     style_grid = grid_over;
//     style_vid = vid_w;
// }
