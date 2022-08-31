import { useEffect } from "react";
import { InfoIconBoxClient } from "../Main/Chat/TopBox/InfoIconBox";
import {
  NameBoxClient,
  NameBoxVideoX,
  NameBoxVideo,
} from "../Main/Chat/TopBox/NameBox";

export const VIDEO_ID = 'videoId_';

export function MyCamera(props) {
  const streamCamVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((camera_stream) => {
        var video = document.getElementById("videoElement");
        video.srcObject = camera_stream;
        video.onloadedmetadata = (e) => {
          video.play();
        };
      })
      .catch((err) => {
        console.log("something went wrong");
        console.log(err.name + " " + err.message);
      });
  };

  useEffect(() => {
    streamCamVideo();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        objectFit: "cover",
        height: "100%",
        width: "100%",
        position: "relative",
        left: "0",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        verticalAlign: "center",
      }}
    >
      <video autoPlay={true} id="videoElement" style={props.style_vid}></video>
      {/* <video autoPlay={true} id="videoElement2" style={props.style_vid}></video> */}
      {/* <video autoPlay={true} id="videoElement3" style={props.style_vid}></video> */}
      {/* <NameBoxClient /> */}
    </div>
  );
}

export function MyCameraCustom(props) {
  const streamCamVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((camera_stream) => {
        const video = document.getElementById(props.videoId);
        video.srcObject = camera_stream;
        video.onloadedmetadata = (e) => {
          video.play();
        };
      })
      .catch((err) => {
        console.log("something went wrong");
        console.log(err.name + " " + err.message);
      });
  };

  useEffect(() => {
    streamCamVideo();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        objectFit: "cover",
        height: "100%",
        width: "100%",
        position: "relative",
        left: "0",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        verticalAlign: "center",
      }}
    >
      <video autoPlay={true} id={props.videoId} style={props.style_vid}></video>
      {/* <NameBoxClient /> */}
      {/* <NameBoxVideoX /> */}
      {/* <NameBoxVideo name={props.name} isMic={props.isMic}/> */}
    </div>
  );
}

export function MyCamera4(props) {
  const streamCamVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((camera_stream) => {
        var video = document.getElementById("videoElement4");
        video.srcObject = camera_stream;
        video.onloadedmetadata = (e) => {
          video.play();
        };
      })
      .catch((err) => {
        console.log("something went wrong");
        console.log(err.name + " " + err.message);
      });
  };

  useEffect(() => {
    streamCamVideo();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        objectFit: "cover",
        height: "100%",
        width: "100%",
        position: "relative",
        left: "0",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        verticalAlign: "center",
      }}
    >
      <video autoPlay={true} id="videoElement4" style={props.style_vid}></video>
    </div>
  );
}

export function MyCamera2(props) {
  const streamCamVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((camera_stream) => {
        var video = document.getElementById("videoElement2");
        video.srcObject = camera_stream;
        video.onloadedmetadata = (e) => {
          video.play();
        };
      })
      .catch((err) => {
        console.log("something went wrong");
        console.log(err.name + " " + err.message);
      });
  };

  useEffect(() => {
    streamCamVideo();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        objectFit: "cover",
        height: "100%",
        width: "100%",
        position: "relative",
        left: "0",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        verticalAlign: "center",
      }}
    >
      <video autoPlay={true} id="videoElement2" style={props.style_vid}></video>
      {/* <NameBoxClient /> */}
    </div>
  );
}

export function MyCamera3(props) {
  const streamCamVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((camera_stream) => {
        var video3 = document.getElementById("videoElement3");
        video3.srcObject = camera_stream;
        video3.onloadedmetadata = (e) => {
          video3.play();
        };
      })
      .catch((err) => {
        console.log("something went wrong");
        console.log(err.name + " " + err.message);
      });
  };

  useEffect(() => {
    streamCamVideo();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        objectFit: "cover",
        height: "100%",
        width: "100%",
        position: "relative",
        left: "0",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        verticalAlign: "center",
      }}
    >
      <video autoPlay={true} id="videoElement3" style={props.style_vid}></video>
      {/* <NameBoxClient /> */}
    </div>
  );
}

export function MyCamera5(props) {
  const streamCamVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((camera_stream) => {
        var video = document.getElementById("videoElement5");
        video.srcObject = camera_stream;
        video.onloadedmetadata = (e) => {
          video.play();
        };
      })
      .catch((err) => {
        console.log("something went wrong");
        console.log(err.name + " " + err.message);
      });
  };

  useEffect(() => {
    streamCamVideo();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        objectFit: "cover",
        height: "100%",
        width: "100%",
        position: "relative",
        left: "0",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        verticalAlign: "center",
      }}
    >
      <video autoPlay={true} id="videoElement5" style={props.style_vid}></video>
      {/* <NameBoxClient /> */}
    </div>
  );
}

export function MyCamera6(props) {
  const streamCamVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((camera_stream) => {
        var video3 = document.getElementById("videoElement6");
        video3.srcObject = camera_stream;
        video3.onloadedmetadata = (e) => {
          video3.play();
        };
      })
      .catch((err) => {
        console.log("something went wrong");
        console.log(err.name + " " + err.message);
      });
  };

  useEffect(() => {
    streamCamVideo();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        objectFit: "cover",
        height: "100%",
        width: "100%",
        position: "relative",
        left: "0",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        verticalAlign: "center",
      }}
    >
      <video autoPlay={true} id="videoElement6" style={props.style_vid}></video>
      {/* <NameBoxClient /> */}
    </div>
  );
}

export function MyCamera7(props) {
  const streamCamVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((camera_stream) => {
        var video3 = document.getElementById("videoElement7");
        video3.srcObject = camera_stream;
        video3.onloadedmetadata = (e) => {
          video3.play();
        };
      })
      .catch((err) => {
        console.log("something went wrong");
        console.log(err.name + " " + err.message);
      });
  };

  useEffect(() => {
    streamCamVideo();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        objectFit: "cover",
        height: "100%",
        width: "100%",
        position: "relative",
        left: "0",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        verticalAlign: "center",
      }}
    >
      <video autoPlay={true} id="videoElement7" style={props.style_vid}></video>
      {/* <NameBoxClient /> */}
    </div>
  );
}

export function MyCamera8(props) {
  const streamCamVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((camera_stream) => {
        var video3 = document.getElementById("videoElement8");
        video3.srcObject = camera_stream;
        video3.onloadedmetadata = (e) => {
          video3.play();
        };
      })
      .catch((err) => {
        console.log("something went wrong");
        console.log(err.name + " " + err.message);
      });
  };

  useEffect(() => {
    streamCamVideo();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        objectFit: "cover",
        height: "100%",
        width: "100%",
        position: "relative",
        left: "0",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        verticalAlign: "center",
      }}
    >
      <video autoPlay={true} id="videoElement8" style={props.style_vid}></video>
      {/* <NameBoxClient /> */}
    </div>
  );
}

export function MyCamera9(props) {
  const streamCamVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((camera_stream) => {
        var video3 = document.getElementById("videoElement9");
        video3.srcObject = camera_stream;
        video3.onloadedmetadata = (e) => {
          video3.play();
        };
      })
      .catch((err) => {
        console.log("something went wrong");
        console.log(err.name + " " + err.message);
      });
  };

  useEffect(() => {
    streamCamVideo();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        objectFit: "cover",
        height: "100%",
        width: "100%",
        position: "relative",
        left: "0",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        verticalAlign: "center",
      }}
    >
      <video autoPlay={true} id="videoElement9" style={props.style_vid}></video>
      {/* <NameBoxClient /> */}
    </div>
  );
}

export function MyCamera10(props) {
  const streamCamVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((camera_stream) => {
        var video3 = document.getElementById("videoElement10");
        video3.srcObject = camera_stream;
        video3.onloadedmetadata = (e) => {
          video3.play();
        };
      })
      .catch((err) => {
        console.log("something went wrong");
        console.log(err.name + " " + err.message);
      });
  };

  useEffect(() => {
    streamCamVideo();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        objectFit: "cover",
        height: "100%",
        width: "100%",
        position: "relative",
        left: "0",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        verticalAlign: "center",
      }}
    >
      <video
        autoPlay={true}
        id="videoElement10"
        style={props.style_vid}
      ></video>
      {/* <NameBoxClient /> */}
    </div>
  );
}

export function MyCamera11(props) {
  const streamCamVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((camera_stream) => {
        var video3 = document.getElementById("videoElement11");
        video3.srcObject = camera_stream;
        video3.onloadedmetadata = (e) => {
          video3.play();
        };
      })
      .catch((err) => {
        console.log("something went wrong");
        console.log(err.name + " " + err.message);
      });
  };

  useEffect(() => {
    streamCamVideo();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        objectFit: "cover",
        height: "100%",
        width: "100%",
        position: "relative",
        left: "0",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        verticalAlign: "center",
      }}
    >
      <video
        autoPlay={true}
        id="videoElement11"
        style={props.style_vid}
      ></video>
      {/* <NameBoxClient /> */}
    </div>
  );
}

export function MyCamera12(props) {
  const streamCamVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((camera_stream) => {
        var video3 = document.getElementById("videoElement12");
        video3.srcObject = camera_stream;
        video3.onloadedmetadata = (e) => {
          video3.play();
        };
      })
      .catch((err) => {
        console.log("something went wrong");
        console.log(err.name + " " + err.message);
      });
  };

  useEffect(() => {
    streamCamVideo();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        objectFit: "cover",
        height: "100%",
        width: "100%",
        position: "relative",
        left: "0",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        verticalAlign: "center",
      }}
    >
      <video
        autoPlay={true}
        id="videoElement12"
        style={props.style_vid}
      ></video>
      {/* <NameBoxClient /> */}
    </div>
  );
}

export function MyCamera13(props) {
  const streamCamVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((camera_stream) => {
        var video3 = document.getElementById("videoElement13");
        video3.srcObject = camera_stream;
        video3.onloadedmetadata = (e) => {
          video3.play();
        };
      })
      .catch((err) => {
        console.log("something went wrong");
        console.log(err.name + " " + err.message);
      });
  };

  useEffect(() => {
    streamCamVideo();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        objectFit: "cover",
        height: "100%",
        width: "100%",
        position: "relative",
        left: "0",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        verticalAlign: "center",
      }}
    >
      <video
        autoPlay={true}
        id="videoElement13"
        style={props.style_vid}
      ></video>
      {/* <NameBoxClient /> */}
    </div>
  );
}

const ListOfVideos = [
  { videoId: "videoElement1", name: "You", isMic: true },
  { videoId: "videoElement2", name: "Nani Y", isMic: false },
  { videoId: "videoElement3", name: "Preritha", isMic: true },
  { videoId: "videoElement4", name: "Pinky", isMic: false },
  { videoId: "videoElement5", name: "DIT", isMic: true },
  { videoId: "videoElement6", name: "Ivana", isMic: true },
  { videoId: "videoElement7", name: "Palo Networks", isMic: true },
  { videoId: "videoElement8", name: "Others", isMic: false },
  // { videoId: "videoElement9", name: "You", isMic: true },
  // { videoId: "videoElement10", name: "You", isMic: true },
  // { videoId: "videoElement11", name: "You", isMic: true },
  // { videoId: "videoElement12", name: "You", isMic: true },
  // { videoId: "videoElement13", name: "You", isMic: true },
];

export default ListOfVideos;
