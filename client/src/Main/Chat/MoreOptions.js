import { Icon } from "../../res/svg/Svg";
import { OPEN_OPTIONS_MORE } from "../../redux/button/buttonTypes";
import { ListOptions } from "./ListOptions";


export function MoreOptions(props) {
  const id = OPEN_OPTIONS_MORE;
  const heading = "";

  const hideOptions = () => {
    props.show(false);
  };

  const position_class = " more-options-box ";

  var i = 0;
  const list = [
    {
      svg: Icon.Whiteboard,
      text: "Whiteboard",
      hint: "Open a Jam",
      id: i++,
      handleClick: (e) => {
        console.log("Opening a Jam");
        hideOptions();
      },
    },
    { svg: Icon.Dashboard_Layout, text: "Change layout", hint: null, id: i++ },
    {
      svg: Icon.Fullscreen,
      text: "Full screen",
      hint: null,
      id: i++,
      handleClick: (e) => {
        console.log("Full screen mode");
        hideOptions();
      },
    },
    {
      svg: Icon.Dropdown,
      text: "Open picture-in-picture",
      hint: null,
      id: i++,
      handleClick: (e) => {
        console.log("Opening picture-in-picture mode");
        hideOptions();
      },
    },
    {
      svg: Icon.Auto_Awesome,
      text: "Apply visual effects",
      hint: null,
      id: i++,
      handleClick: (e) => {
        console.log("Applying visual effects");
        hideOptions();
      },
    },
    {
      svg: Icon.CC_On,
      text: "Turn on captions",
      hint: null,
      id: i++,
      handleClick: (e) => {
        console.log("Turning captions on");
        hideOptions();
      },
    },
    { svg: null, text: "", hint: null, id: i++ },
    {
      svg: Icon.Feedback,
      text: "Report a problem",
      hint: null,
      id: i++,
      handleClick: (e) => {
        console.log("Reporting a problem");
        hideOptions();
      },
    },
    {
      svg: Icon.Report,
      text: "Report abuse",
      hint: null,
      id: i++,
      handleClick: (e) => {
        console.log("Reporting abuse");
        hideOptions();
      },
    },
    {
      svg: Icon.Troubleshoot,
      text: "Troubleshooting & help",
      hint: null,
      id: i++,
      handleClick: (e) => {
        console.log("Redirecting to help page");
        hideOptions();
      },
    },
    {
      svg: Icon.Settings,
      text: "Settings",
      hint: null,
      id: i++,
      handleClick: (e) => {
        console.log("Opening Settings page");
        hideOptions();
      },
    },
  ];

  return (
    <ListOptions list={list} heading={heading} class={position_class} id={id} />
  );
}
