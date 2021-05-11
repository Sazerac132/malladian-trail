import { Action, ThunkAction } from '@reduxjs/toolkit';

export type Id = number | null;
export type Name = string | null;
export type Codeword = string | null;
export type CharIndex = 0 | 1;

export type Game = {
  id: Id;
  name: Name;
  isGm: boolean;
  codeword?: string;
};

export type Section = 'char' | 'map' | 'party' | 'log' | 'master';
export type MapSection = 'world' | 'current';

export type Character = {
  id?: Id;
  icon: number | null;
  name: Name;
  desc: string;
  pet: PET;
  petName: string;
  traits?: string;
  other?: string;
  retired?: boolean;
};

export type Characters = [Character?, Character?];

export enum PET {
  'Bear' = 0,
  'Falcon' = 1,
  'Nightingale' = 2,
  'Wolf' = 3,
  'Raven' = 4
}

export type Party = Character[];

export type Item = {
  item: string;
  quantity: number;
};

export type Inventory = {
  currency: number;
  time: number;
  items: Item[];
};

export type LogEntry = {
  id: Id;
  action: string;
} & (
  | {
      char: null;
      charId: null;
    }
  | {
      char: string;
      charId: number;
    }
);

export interface CreateGameCredentials {
  name: string;
  codeword?: string;
}

export interface JoinGameCredentials {
  gameCode: string | number;
  codeword?: string;
}

export type Thunk = ThunkAction<void, SystemStore, unknown, Action<string>>;

export interface SystemStore {
  game: GameStore;
  characters: CharacterStore;
  journal: JournalStore;
  inventory: InventoryStore;
  party: PartyStore;
  navigation: NavigationStore;
}

export interface CharacterStore {
  characters: Characters;
  error: Error | null;
  loading: [boolean, boolean];
}

export interface GameStore {
  data: Partial<Game>;
  isInGame: boolean | null;
  message: GameMessages | null;
  loading: boolean;
}

export enum GameMessages {
  CreateFailed = 'Error encountered when trying to create game',
  JoinFailed = 'Incorrect game code or codeword.',
  LeaveSuccess = 'Successfully left the game.'
}

export interface JournalStore {
  data: LogEntry[];
  loading: boolean;
  error: Error | null;
}

export interface InventoryStore {
  data: Inventory;
  loading: boolean;
  error: Error | null;
}

export interface PartyStore {
  lineup: Party;
  inactive: Party;
  loading: boolean;
  error: Error | null;
}

export interface NavigationStore {
  section: Section;
  mapSection: MapSection;
}
