import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { playCard, selectGame, setPlayState, skipTurn } from './gameSlice';
import { GameArgs } from '../utilities/types';
import Card from './Card';


export function Game (){
  const { myHand, myTurn, lastPlayed } = useAppSelector(selectGame)
  const dispatch = useAppDispatch();

  return (
    <div className="Game__gameboard">
      <div className="Game_inPlay">
        {lastPlayed.map(( card, i) => (
          <Card disabled={false} suit={card.suit} value={card.value} />
        ))}
      </div>
      <div className="Game__gameHand">
        {myHand.map((card, i) => (
            <Card disabled={card.disabled} setState={() => dispatch(setPlayState(i))} inPlay={myHand[i].inPlay} suit={card.suit} value={card.value} />
        ))}
      </div>
      <div className="Game__gameAction">
        <button disabled={!myTurn} onClick={() => dispatch(playCard())}>
          Play Card
        </button>
        <button disabled={!myTurn} onClick={() => dispatch(skipTurn())}>
          Skip Turn
        </button>
      </div>
    </div>
  )
}