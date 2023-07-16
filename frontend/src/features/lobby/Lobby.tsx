import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectGame, start} from '../game/gameSlice';
import { GameArgs } from '../utilities/types';
import { Game } from '../game/Game';


export function Lobby (){
  const { gameId, lobbyFull, playersList, inGame } = useAppSelector(selectGame)
  const dispatch = useAppDispatch();
  
  const startGame = () => {
    dispatch(start(gameId))
  }
  return (
    <div>
      <h1> Game Code : {gameId} </h1>
      {!inGame && 
        <div className="homepage__lobby">
        {playersList.map((player) => (
          <li key={player}> {player} </li>
        ))}
        {playersList.length > 1 &&
          <button 
          onClick={startGame} >
            Start Game
          </button>
        }
        {lobbyFull &&
          <h2> lobby is full </h2>
        }
        </div>
      }
      {inGame &&
        <Game />
      }
    </div>
  )
}