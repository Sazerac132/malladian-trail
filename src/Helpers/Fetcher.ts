import {
  Character,
  CharIndex,
  Game,
  Id,
  Inventory,
  Item,
  LogEntry,
  Party
} from '../types';

export interface GameMetadata {
  game: Game;
  characters: Character[];
}

export interface JoinGameResponse {
  code: number;
  message?: string;
}

export interface LogUpdatePayload {
  charId: Id;
  action: string;
}

class Fetcher {
  /**
   * Sends a 'create game' request to the server.
   * @param {string} name Name of new game
   * @param {string} codeword Secret pass code for game (not handled securely)
   */
  static async createGame(
    name: string,
    codeword?: string
  ): Promise<{ code: number }> {
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

    const res = await fetch(endpoint, options);
    if (res.ok) return res.json();
    throw new Error(res.status.toString());
  }

  /**
   * Sends a 'join game' request to the server.
   * @param {string | number} code The game code to join.
   * @param {string} [password] The optional password to join this game.
   */
  static async joinGame(
    code: string | number,
    password?: string
  ): Promise<JoinGameResponse> {
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

    const res = await fetch(endpoint, options);
    if (res.ok) return res.json();
    throw new Error(res.status.toString());
  }

  /**
   * Requests info about the current game in session from the server.
   */
  static async currentGame(): Promise<GameMetadata> {
    const endpoint = '/api/current';
    const options = {
      method: 'GET'
    };

    const res = await fetch(endpoint, options);
    if (res.ok) return res.json();
    throw new Error(res.status.toString());
  }

  /**
   * Posts a request to clear the current session game data.
   */
  static async leaveGame(): Promise<{ message: string }> {
    const endpoint = '/api/leave';
    const options = {
      method: 'POST'
    };

    const res = await fetch(endpoint, options);
    if (res.ok) return res.json();
    throw new Error(res.status.toString());
  }

  /**
   * Requests the current party information from the server.
   */
  static async getParty(): Promise<{ party: Party }> {
    const endpoint = '/api/party';
    const options = {
      method: 'GET'
    };

    const res = await fetch(endpoint, options);
    if (res.ok) return res.json();
    throw new Error(res.status.toString());
  }

  /**
   * Posts a new or existing character to the API.
   * @param {Character} payload The character to save.
   * @param {CharIndex} index Local index of char to update.
   * @param {number} [id] The id of the existing character to save if applicable.
   */
  static async saveChar(
    payload: Character,
    index: CharIndex,
    id?: Id
  ): Promise<{ message: string; id: number }> {
    let endpoint = '/api/characters';
    if (id) endpoint += `/${id}`;

    const options = {
      method: id ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...payload, index })
    };

    const res = await fetch(endpoint, options);
    if (res.ok) return res.json();
    throw new Error(res.status.toString());
  }

  /**
   * Fetches the current inventory for party.
   */
  static async getInventory(): Promise<{ inventory: Inventory }> {
    const endpoint = '/api/inventory';

    const options = {
      method: 'GET'
    };

    const res = await fetch(endpoint, options);
    if (res.ok) return res.json();
    throw new Error(res.status.toString());
  }

  /**
   * Sends a request to the server to update the number of an item in inventory.
   * @param {Object} payload Contains the item and the new quantity.
   */
  static async sendInventoryUpdateRequest(
    payload: Item
  ): Promise<{ message: string }> {
    const endpoint = '/api/inventory';

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    };

    const res = await fetch(endpoint, options);
    if (res.ok) return res.json();
    throw new Error(res.status.toString());
  }

  /**
   * Requests the entire game log from the server.
   */
  static async getLog(): Promise<{ log: LogEntry[] }> {
    const endpoint = '/api/log';

    const options = {
      method: 'GET'
    };

    const res = await fetch(endpoint, options);
    if (res.ok) return res.json();
    throw new Error(res.status.toString());
  }

  /**
   * Adds a single journal entry to this game.
   * @param {Object} payload The item to add to the database.
   */
  static async postLogItem(
    payload: LogUpdatePayload
  ): Promise<{ id: number; message: string }> {
    const endpoint = '/api/log';

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    };

    const res = await fetch(endpoint, options);
    if (res.ok) return res.json();
    throw new Error(res.status.toString());
  }

  /**
   * Removes an item from the log (GMs only)
   * @param {number} id The ID of the log entry to be deleted.
   */
  static async removeLogItem(id: number): Promise<{ message: string }> {
    const endpoint = `/api/log/${id}`;

    const options = {
      method: 'DELETE'
    };

    const res = await fetch(endpoint, options);
    if (res.ok) return res.json();
    throw new Error(res.status.toString());
  }
}

export default Fetcher;
