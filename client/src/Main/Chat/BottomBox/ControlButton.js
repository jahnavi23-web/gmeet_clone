export function ControlButton(props) {
  const handleClick = (e) => {
    e.preventDefault();
    if (props.handleClick) {
      if (props.handleClick(e)) {
        return;
      }
    }
  };

  return (
    <div className={props.display + "controls-mic"} id={props.id}>
      <div className="mic-box">
        <div className="mic-area">
          <span>
            <button
              className={props.class + " mic-button-flex"}
              onClick={handleClick}
            >
              <div className="mic-button-area"></div>
              <div className="mic-button-icon">
                <div className="">
                  <div className=""></div>
                  <span className="mic-open-icon-span" aria-hidden="true">
                    {props.icon}
                  </span>
                </div>
              </div>
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}
