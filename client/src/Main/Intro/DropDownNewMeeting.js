import { Icon } from "../../res/svg/Svg";

export function DropDownNewMeeting(props) {
  const options = props.options;
  const handleClick = (e) => {
    e.preventDefault();
    options[e.target.id].onClick();
  };

  return (
    <div className="dropdown-box" id={props.id}>
      <div className="dropdown-padding">
        <ul className="dd-ul-box">
          {options.map((option) => {
            return (
              <li key={option.id}>
                <button
                  className="dd-li-button"
                  id={option.id}
                  onClick={handleClick}
                  type="button"
                >
                  <span className="dd-li-icon-flex">{option.icon}</span>
                  <span className="dd-li-text-box">{option.text}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
