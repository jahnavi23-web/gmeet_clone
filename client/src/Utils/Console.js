class CONSOLE {
  constructor() {
    this.level = this.LOG;
  }
  static  LOG = 1;
  static  INFO = 2;
  static  WARN = 3;
  static  ERROR = 4;
  static  NONE = 0;

  log = (text) => {
    if (this.level === this.LOG) {
      console.log(text);
    }
  };
  warn = (text) => {
    if (this.level === this.WARN) {
      console.warn(text);
    }
  };
  error = (text) => {
    if (this.level === this.ERROR) {
      console.error(text);
    }
  };
  info = (text) => {
    if (this.level === this.INFO) {
      console.info(text);
    }
  };
}

const Console = new CONSOLE();
console.level = CONSOLE.LOG;

export default Console;
