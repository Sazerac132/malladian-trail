/* eslint-disable no-console */

class Logger {
  constructor() {
    throw new Error('Logger should be treated as abstract.');
  }

  static log(...args) {
    console.log(...args);
  }

  static warn(...args) {
    console.warn(...args);
  }

  static error(...args) {
    console.error(...args);
  }
}

export default Logger;
