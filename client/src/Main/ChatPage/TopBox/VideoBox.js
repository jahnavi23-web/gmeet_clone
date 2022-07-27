import { MyCamera } from "../../../Utils/MyCamera";


export function VideoBox() {
  return (
    <div className="video-box">
      <div className="video-area">
        <div className="video-container">
          <MyCamera />
        </div>
      </div>
    </div>
  );
}
