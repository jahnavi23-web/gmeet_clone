import MicButton from "./MicButton";
import CameraButton from "./CameraButton";
import CCButton from "./CCButton";
import EndCallButton from "./EndCallButton";
import MoreOptionsButton from "./MoreOptionsButton";
import PresentationButton from "./PresentationButton";

export function ControlsBox() {
  return (
    <div className="bottom-controls-flex">
      <div className="controls-grid">
        <MicButton />
        <CameraButton />
        <CCButton />
        <PresentationButton />
        <MoreOptionsButton />
        <EndCallButton />
      </div>
    </div>
  );
}
