import { Chat } from "./Main/Chat";
import { Intro } from "./Main/Intro";
import { Routes, Route } from "react-router-dom";

export function Main() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
      <script
        defer
        src="https://unpkg.com/peerjs@1.3.2/dist/peerjs.min.js"
      ></script>
    </div>
  );
}
