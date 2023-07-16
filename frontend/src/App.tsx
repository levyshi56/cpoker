import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Game } from './features/game/Game'
import { useCreateGameMutation } from './features/game/gameAPI';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { selectGame, join, setPlayerId } from './features/game/gameSlice';
import { Lobby } from './features/lobby/Lobby';

function App() {
  const dispatch = useAppDispatch();

  const [gameCode, setGameCode] = useState('');
  const [createGame, _isLoading] = useCreateGameMutation();
  const [playerIdField, setPlayerIdField] = useState('');
  const { gameId } = useAppSelector(selectGame)

  const handleGameCodeChange = (event : any) => {
    setGameCode(event.target.value);
  };

  const handlePlayerIdChange = (event : any) => {
    setPlayerIdField(event.target.value);
  };

  const handleCreateGame = async () => {
    createGame().unwrap().then(async (gameId: string) => {
      const payload = {gameId: gameId, playerId: playerIdField}
      dispatch(join(payload))
      dispatch(setPlayerId(playerIdField))
    });
  };

  const handleJoinGame = () => {
      dispatch(join({gameId: gameCode, playerId: playerIdField}))
      dispatch(setPlayerId(playerIdField))
  };

  return(
    <div className="homepage">
      <h1 className="homepage__title">Chinese Poker Game</h1>
      {!gameId && (
        <div className="homepage__preGame">
          <div className="homepage__inputWrapper">
            <input
              type="text"
              className="homepage__input"
              placeholder="Enter player name"
              value={playerIdField}
              onChange={handlePlayerIdChange}
            />
            <button className="homepage__button homepage__button--create" onClick={handleCreateGame}>
              Create Game
            </button>
          </div>
          <div className="homepage__inputWrapper">
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
        </div>
      )}
      {gameId &&
          <div className="homepage__gamePage">
            <Lobby />
          </div>
      }
    </div>
  );
}

export default App;
