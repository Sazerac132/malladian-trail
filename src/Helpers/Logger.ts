/* eslint-disable no-console */

class Logger {
  constructor() {
    throw new Error('Logger should be treated as abstract.');
  }

  static log(...args: any[]) {
    console.log(...args);
  }

  static warn(...args: any[]) {
    console.warn(...args);
  }

  static error(...args: any[]) {
    console.error(...args);
  }
}

export default Logger;
