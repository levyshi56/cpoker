export interface Game {
  hand : Card[];
  last_played: Card[];
  turn: number;
}

export interface GameState {
  gameId : string;
  playersOnline: string[];
  lobbyFull: boolean;
  inGame: boolean;
}


export interface Card {
  suit : string;
  value : number;
}

export interface GameArgs{
  gameId: string;
  playerId: string;
}

export interface RootState{
  game: GameState
}