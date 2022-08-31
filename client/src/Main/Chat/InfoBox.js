import { Timer } from "../../Utils/TimeDate";
import PeerID from "./PeerID";

export function InfoBox() {
  return (
    <div className="bottom-info-flex">
      {Time()}
      <PeerID />
    </div>
  );

  function Time() {
    return (
      <span className="info-time-flex">
        <div className="info-time-area-flex">
          <span className="info-time">
            <Timer delay={1000} />
          </span>
        </div>
        <div role="separator" className="separator "></div>
      </span>
    );
  }
}
