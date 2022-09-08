class Logger {
  constructor() {
    if (Logger._instance) {
      return Logger._instance;
    }
    Logger._instance = this;
    this.verbosity = 3;
    this.defaultLogLevel = 4;
  }
  /* Log levels (depends on caller specifying the correct level)
    1 - none
    2 - error
    3 - warning
    4 - info
    5 - debug
    6 - debug high verbosity + stack trace on each message
  */
  log(message, level) {
    if (typeof level === "undefined") {
      level = this.defaultLogLevel;
    }
    if (this.verbosity >= level) {
      if (level === 2) {
        console.log("ERROR:" + message);
      } else if (level === 3) {
        console.log("WARNING:" + message);
      } else if (level === 4) {
        console.log("INFO:" + message);
      } else if (level === 5) {
        console.log("DEBUG:" + message);
      } else if (level === 6) {
        console.log("DEBUG (VERBOSE):" + message);
        console.trace();
      } else {
        throw "notImplemented";
      }
    }
  }
}

module.exports = Logger;
