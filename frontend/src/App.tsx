import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Game } from './features/game/Game'
import { useCreateGameMutation, useJoinGameMutation } from './features/game/gameAPI';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { selectGame, join } from './features/game/gameSlice';

function App() {
  const dispatch = useAppDispatch();

  const [gameCode, setGameCode] = useState('');
  const [createGame, _isLoading] = useCreateGameMutation();
  const [joinGame, _] = useJoinGameMutation();
  const [playerId, setPlayerId] = useState('');
  const { gameId } = useAppSelector(selectGame)

  const handleGameCodeChange = (event : any) => {
    setGameCode(event.target.value);
  };

  const handlePlayerIdChange = (event : any) => {
    setPlayerId(event.target.value);
  };

  const handleCreateGame = async () => {
    createGame(playerId).unwrap().then(async (gameId: string) => {
      const payload = {gameId: gameId, playerId: playerId}
      dispatch(join(payload))
    });
  };

  const handleJoinGame = () => {
    joinGame({playerId, gameId: gameCode}).unwrap().then(async (payload: string) => {
      dispatch(join(payload))
    })
  };

  return(
    <div className="homepage">
      <h1 className="homepage__title">Chinese Poker Game</h1>
      {!gameId && 
            <div className="homepage__preGame">
            <input
                type="text"
                className="homepage__input"
                placeholder="enter player name"
                value={playerId}
                onChange={handlePlayerIdChange}
            />
            <button className="homepage__button homepage__button--create" onClick={handleCreateGame}>
              Create Game
            </button>
            <input
              type="text"
              className="homepage__input"
              placeholder="Enter game code"
              value={gameCode}
              onChange={handleGameCodeChange}
            />
            <button className="homepage__button homepage__button--join" onClick={handleJoinGame}>
              Join Game
            </button>
          </div>
      }
      {gameId &&
          <div className="homepage__inGame">
            <Game />
          </div>
      }
    </div>
  );
}

export default App;
