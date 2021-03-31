/* eslint-disable no-console */

class Logger {
  constructor() {
    throw new Error('Logger should be treated as an abstract class.');
  }

  static log(...args) {
    const isoDate = new Date().toISOString();
    console.log.apply(null, [`[${isoDate}]`, ...args]);
  }

  static error(...args) {
    Logger.log(...args);
  }
}

module.exports = Logger;
