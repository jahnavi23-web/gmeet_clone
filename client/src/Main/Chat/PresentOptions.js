import { Svg } from "../../res/svg/Svg";
import { OPEN_OPTIONS_PRESENTATION } from "../../redux/button/buttonTypes";
import { ListOptions } from "./ListOptions";


export function PresentOptions(props) {
  const id = OPEN_OPTIONS_PRESENTATION;
  const heading = "Present";

  const hideOptions = () => {
    props.show(false);
  };

  const position_class = " present-options-box ";

  var i = 0;
  const list = [
    {
      svg: Svg.Laptop,
      text: "Your entire screen",
      hint: null,
      id: i++,
      handleClick: (e) => {
        console.log("Present Entire Screen");
        hideOptions();
      },
    },
    {
      svg: Svg.Window,
      text: "A window",
      hint: null,
      id: i++,
      handleClick: (e) => {
        console.log("Present a window");
        hideOptions();
      },
    },
    {
      svg: Svg.Tab,
      text: "A tab",
      hint: "Best for video and animation",
      id: i++,
      handleClick: (e) => {
        console.log("Present a Tab");
        hideOptions();
      },
    },
  ];

  return (
    <ListOptions list={list} heading={heading} class={position_class} id={id} />
  );
}
