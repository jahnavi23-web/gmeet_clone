export class UiDropdown {
  init() {
    this.dropdown_id = null;
    this.clickCount = 0;
    this.clickThresshold = 0;

    // return this;
  }
  setGlobalClick = (dropdown_id, onClickOutside, clickThresshold = 1) => {
    console.log("Set Global Click");
    this.dropdown_id = dropdown_id;
    this.onClickOutside = onClickOutside;
    this.clickCount = 0;
    this.clickThresshold = clickThresshold;
    console.log(dropdown_id);

    document.addEventListener("click", this.handleGlobalClick);
  };
  removeGlobalClick = (handleGlobalClick) => {
    // console.log("Removing global listener");
    document.removeEventListener("click", this.handleGlobalClick);
  };
  isClickInsideElement = (event, element) => {
    var pos = {
      x: event.targetTouches ? event.targetTouches[0].pageX : event.pageX,
      y: event.targetTouches ? event.targetTouches[0].pageY : event.pageY,
    };
    var rect = element.getBoundingClientRect();
    return (
      pos.x < rect.right &&
      pos.x > rect.left &&
      pos.y < rect.bottom &&
      pos.y > rect.top
    );
  };
  handleGlobalClick = (e) => {
    this.clickCount++;
    if (this.clickCount < this.clickThresshold) return;
    console.log("Handling Global Click", "clicks ", this.clickCount);
    var isInside = false;
    var dropdown = document.getElementById(this.dropdown_id);
    if (!dropdown) {
      isInside = false;
    } else {
      // var isInsideMe = dropdown.contains(e.currentTarget);
      isInside = this.isClickInsideElement(e, dropdown);
    }

    if (dropdown !== e.target && !isInside) {
      this.onClickOutside();
      this.removeGlobalClick(this.handleGlobalClick);
      console.log("Outside");
      return;
    }
    console.log("Inside");
  };
  onClickOutside = () => {};
  // dropdown_id = null;
  // clickCount = 0;
  // clickThresshold = 0;
}

// const handleGlobalClick = (e) => {
//   console.log("Handle Global Click");
//   UiDropdown.dropdown_id = dropdown_id;
//   UiDropdown.onClickOutside = onClickOutside;

//   var dropdown = document.getElementById(dropdown_id);
//   // var isInsideMe = dropdown.contains(e.currentTarget);
//   var isInside = UiDropdown.isClickInsideElement(e, dropdown);

//   if (dropdown !== e.target && !isInside) {
//     onClickOutside();
//     UiDropdown.removeGlobalClick(UiDropdown.handleGlobalClick);
//   }
// };
