export function SettingsButton(props) {
  const handleClick = (e) => {
    props.item.handleClick();
  };

  return (
    <div className="settings-chat" id={props.item.id}>
      <div className="mic-box">
        <div className="mic-area">
          <span>
            <button
              className={props.item.class + "bg-clear-mic-button-flex"}
              onClick={handleClick}
            >
              <div className="mic-button-area"></div>
              <div className="mic-button-icon">
                <div className="">
                  <div className=""></div>
                  <span className="mic-open-icon-span">{props.item.icon}</span>
                </div>
              </div>
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}
