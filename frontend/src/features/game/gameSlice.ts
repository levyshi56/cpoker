import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../../app/store';
import { Card, Game, GameState, RootState } from './types';

export interface PlayerState {
  myHand : Card[];
  inPlay: Card[];
  myTurn: boolean;
}

const initialPlayerState: PlayerState = {
  myHand: [],
  inPlay: [],
  myTurn: false,
}

const initialGameState: GameState = {
  gameId : "",
  playersOnline: [],
  lobbyFull: false,
  inGame : false
}



export const playerSlice = createSlice({
  name: 'player',
  initialState: initialPlayerState,
  reducers: {
    
  }
})

export const gameSlice = createSlice({
  name: 'game',
  initialState: initialGameState,
  reducers: {
    join(state, action){
      state.gameId = action.payload.gameId
    },
    setPlayersInGame(state, action){
      state.playersOnline = action.payload
    },
    setLobbyFull(state, action){
      state.lobbyFull = action.payload
    }
  }
})


// export const selectPlayerHand = (state: RootState) => state.player.myHand;
export const selectGame = (state: RootState) => {
  return {
    gameId: state.game.gameId,
    playersList: state.game.playersOnline,
    lobbyFull: state.game.lobbyFull,
  };
};

export const { join , setPlayersInGame, setLobbyFull} = gameSlice.actions;
export default gameSlice.reducer;