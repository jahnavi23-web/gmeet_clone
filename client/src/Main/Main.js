import { Chat } from "./Chat";
import { Intro } from "./Intro";

export function Main() {
  let x = 2;
  let jsx = null;

  if (x === 1) {
    jsx = <Intro />;
  } else {
    jsx = <Chat />;
  }

  return <div className="App">{jsx}</div>;
}
