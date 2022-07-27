import { useEffect } from "react";

export function MyCamera() {
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
    <video autoPlay={true} id="videoElement" className="my-camera"></video>
  );
}
