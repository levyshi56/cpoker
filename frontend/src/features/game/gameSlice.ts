import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../../app/store';
import { CardType, Game, GameState, RootState } from '../utilities/types';

export interface PlayerState {
  myHand : CardType[];
  inPlay: CardType[];
  myTurn: boolean;
}

//might want to move player stuff to a difference slice
const initialPlayerState: PlayerState = {
  myHand: [],
  inPlay: [],
  myTurn: false,
}

const initialGameState: GameState = {
  myHand: [],
  gameId : "",
  playersOnline: [],
  lobbyFull: false,
  inGame : false,
  lastPlayed: [],
  playerId: "",
  myTurn: false,
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
    },
    start(state, action){
      
    },
    setLastPlayed(state, action){
      state.lastPlayed = action.payload
    },
    setMyHand(state, action){
      return {
        ...state,
        myHand: [...state.myHand, action.payload],
      };
    },
    setPlayerId(state, action){
      state.playerId = action.payload
    },
    setGameActive(state, action){
      state.inGame = action.payload
    },
    setMyTurn(state, action){
      state.myTurn = action.payload
    },
    playCard(state){
      for(let i = 0; i < state.myHand.length; i ++){
        if (state.myHand[i].inPlay){
          state.myHand[i].disabled = true
        }
      }
    },
    skipTurn(state){

    },
    setPlayState(state, action){
      state.myHand[action.payload].inPlay = !state.myHand[action.payload].inPlay
    }
  }
})


// export const selectPlayerHand = (state: RootState) => state.player.myHand;
export const selectGame = (state: RootState) => {
  return {
    gameId: state.game.gameId,
    playersList: state.game.playersOnline,
    lobbyFull: state.game.lobbyFull,
    inGame: state.game.inGame,
    playerId: state.game.playerId,
    myHand: state.game.myHand,
    myTurn: state.game.myTurn,
    lastPlayed: state.game.lastPlayed,
  };
};

export const { skipTurn, setPlayState, playCard, setMyTurn, join , setPlayersInGame, setLobbyFull, start,setGameActive, setLastPlayed, setMyHand, setPlayerId} = gameSlice.actions;
export default gameSlice.reducer;