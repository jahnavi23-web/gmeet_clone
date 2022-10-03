
export function helpIntro(props) {
  console.log("Help arriving soon...");
}

export function feedbackIntro(props) {
  console.log("Thank for you feedback...");
}

export function settingsIntro(props) {
  console.log("Meeting's Settings...");
}

export function appsIntro(props) {
  console.log("These are our Apps...");
}

export function accountDetailsIntro(props) {
  console.log("Your Account details are here...");
}

export function micTurnOn_Control(props) {
  console.log("Mic is Turning On...");
  return true;
}

export function micTurnOff_Control(props) {
  console.log("Mic is Turing Off...");
  return true;
}

export function cameraTurnOn_Control(props) {
  console.log("Camera is Turing ON...");
  return true;
}

export function cameraTurnOff_Control(props) {
  console.log("Camera is Turning Off...");
  return true;
}

export function ccTurnOn_Control(props) {
  console.log("Subtitles is Turning On...");
  return true;
}

export function ccTurnOff_Control(props) {
  console.log("Subtitles is Turning Off...");
  return true;
}

export function endCall_Control(props) {
  console.log("Ending Call...");
  return true;
}
