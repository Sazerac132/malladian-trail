class Fetcher {
  /**
   * Sends a 'create game' request to the server.
   * @returns {Promise<Object>}
   */
  static createGame(name, codeword) {
    const endpoint = '/api/create';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        codeword
      })
    };

    return fetch(endpoint, options)
      .then((res) => ((res.ok)
        ? res.json()
        : Promise.reject(res.status)));
  }

  /**
   * Sends a 'join game' request to the server.
   * @param {string | number} code The game code to join.
   * @param {string} [password] The optional password to join this game.
   * @returns {Promise<Object>}
   */
  static joinGame(code, password) {
    const endpoint = '/api/join';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code,
        codeword: password
      })
    };

    return fetch(endpoint, options)
      .then((res) => ((res.ok)
        ? res.json()
        : Promise.reject(res.status)));
  }

  /**
   * Requests info about the current game in session from the server.
   * @returns {Promise<Object>}
   */
  static currentGame() {
    const endpoint = '/api/current';
    const options = {
      method: 'GET'
    };

    return fetch(endpoint, options)
      .then((res) => ((res.ok)
        ? res.json()
        : Promise.reject(res.status)));
  }

  /**
   * Posts a request to clear the current session game data.
   * @returns {Promise<Object>}
   */
  static leaveGame() {
    const endpoint = '/api/leave';
    const options = {
      method: 'POST'
    };

    return fetch(endpoint, options)
      .then((res) => ((res.ok)
        ? res.json()
        : Promise.reject(res.status)));
  }
}

export default Fetcher;
