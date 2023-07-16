export interface Game {
  hand : CardType[];
  last_played: CardType[];
  turn: number;
}

export interface GameState {
  myHand: CardType[]
  gameId : string;
  playersOnline: string[];
  lobbyFull: boolean;
  inGame: boolean;
  lastPlayed: BasicCardType[];
  playerId: string;
  myTurn: boolean;
}


export interface CardType {
  suit : string;
  value : number;
  inPlay: boolean;
  disabled: boolean;
}

export interface BasicCardType{
  suit: string;
  value: number
}

export interface GameArgs{
  gameId: string;
  playerId: string;
}

export interface RootState{
  game: GameState
}