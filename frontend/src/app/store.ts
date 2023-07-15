import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import  gameReducer from '../features/game/gameSlice';
import { gameApi } from '../features/game/gameAPI';
import SocketClient from '../socket/socket';
import socketMiddleware from '../socket/socketMiddleWare';
import { RootState } from '../features/game/types';

const socket = new SocketClient()

export const store = configureStore({
  reducer: {
    game: gameReducer,
    [gameApi.reducerPath]: gameApi.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(gameApi.middleware, socketMiddleware(socket))
  }
});


export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
