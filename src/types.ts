export type Id = number | null;
export type Name = string | null;
export type Codeword = string | null;
export type CharIndex = 0 | 1;

export type Game = {
  id: Id;
  name: Name;
  isGm: boolean;
};

export type Section = 'char' | 'map' | 'party' | 'log' | 'master';
export type MapSection = 'world' | 'current';

export type Character = {
  id?: Id;
  name: Name;
  desc: string;
  pet: PET;
  petName: string;
  traits: string;
  other: string;
  active?: boolean;
};

export enum PET {
  'Bear' = 'Bear',
  'Falcon' = 'Falcon',
  'Nightingale' = 'Nightingale',
  'Wolf' = 'Wolf',
  'Raven' = 'Raven'
}

export type Party = Pick<
  Character,
  'id' | 'name' | 'desc' | 'pet' | 'petName'
>[];

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
