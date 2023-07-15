import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectGame } from './gameSlice';
import { useGetPlayerHandQuery } from './gameAPI';
import { GameArgs } from './types';


export function Game (){
  const { gameId, lobbyFull, playersList } = useAppSelector(selectGame)
  const dispatch = useAppDispatch();

  return (
    <div>
      <h1> {gameId} </h1>
      {playersList.map((player) => (
          <li key={player}> {player} </li>
        ))}

    </div>
  )
}