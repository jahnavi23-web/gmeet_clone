
export function ListOptions(props) {
  const list = props.list;

  return (
    <div className={props.class + "options-box"} id={props.id}>
      <ul className="present-options-list-box">
        {props.heading ? ListHeadingOptions({ heading: props.heading }) : null}
        {list.map((item) => {
          return <OptionItem key={item.id} item={item} />;
        })}
      </ul>
    </div>
  );

  function ListHeadingOptions(props) {
    return <div className="present-options-heading-text">{props.heading}</div>;
  }

  function OptionItem(props) {
    const handleClick = (e) => {
      props.item.handleClick();
    };

    var jsx_item = null;
    var jsx_text = null;
    if (props.item.hint) {
      jsx_text = (
        <span className="options-item-text-box">
          <span className="options-item-upper-text">{props.item.text}</span>
          <span className="options-item-lower-text">{props.item.hint}</span>
        </span>
      );
    } else {
      jsx_text = <span className="options-item-text">{props.item.text}</span>;
    }

    if (!props.item.text) {
      jsx_item = <div className="options-item-gap" key={props.item.id} />;
    } else {
      jsx_item = (
        <li className="present-options-list-item-box" key={props.item.id}>
          <button className="options-list-item-button" onClick={handleClick}>
            <div className="options-list-item-container">
              {/* <span className="present-options-list-item-nothing"></span> */}
              <span className="options-item-icon-box">
                <span className="options-item-icon-span">{props.item.svg}</span>
              </span>
              {jsx_text}
            </div>
          </button>
        </li>
      );
    }

    return jsx_item;
  }
}
