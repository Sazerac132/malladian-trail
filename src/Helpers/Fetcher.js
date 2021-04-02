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

  /**
   * Requests the current party information from the server.
   * @returns {Promise<Object>}
   */
  static getParty() {
    const endpoint = '/api/party';
    const options = {
      method: 'GET'
    };

    return fetch(endpoint, options)
      .then((res) => ((res.ok)
        ? res.json()
        : Promise.reject(res.status)));
  }

  /**
   * Posts a new or existing character to the API.
   * @param {Character} payload The character to save.
   * @param {number} id The id of the existing character to save if applicable.
   */
  static saveChar(payload, id) {
    let endpoint = '/api/characters';
    if (id) endpoint += `/${id}`;

    const options = {
      method: (id) ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    };

    return fetch(endpoint, options)
      .then((res) => ((res.ok)
        ? res.json()
        : Promise.reject(new Error({
          status: res.status,
          ...res.json()
        }))));
  }

  /**
   * Fetches the current inventory for party.
   * @returns {Promise<Object>}
   */
  static getInventory() {
    const endpoint = '/api/inventory';

    const options = {
      method: 'GET'
    };

    return fetch(endpoint, options)
      .then((res) => ((res.ok)
        ? res.json()
        : Promise.reject(res.status)));
  }

  /**
   * Sends a request to the server to update the number of an item in inventory.
   * @param {Object} payload Contains the item and the new quantity.
   * @returns {Promise<Object>}
   */
  static sendInventoryUpdateRequest(payload) {
    const endpoint = '/api/inventory';

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    };

    return fetch(endpoint, options)
      .then((res) => ((res.ok)
        ? res.json()
        : Promise.reject(res.status)));
  }
}

export default Fetcher;
