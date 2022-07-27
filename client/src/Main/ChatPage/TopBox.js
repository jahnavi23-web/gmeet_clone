import { NameBox } from "./TopBox/NameBox";
import { VideoBox } from "./TopBox/VideoBox";
import { InfoIconBox } from "./TopBox/InfoIconBox";

export function TopBox() {
  return (
    <div className="chat-top-flex">
      <div className="top-box">
        <VideoBox />
        <NameBox />
        <InfoIconBox />
      </div>
    </div>
  );
}
