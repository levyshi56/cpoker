import { Dispatch } from 'redux'
import { setLobbyFull, setPlayersInGame, setLastPlayed, setMyHand, selectGame, start, setGameActive, setMyTurn} from '../game/gameSlice'
import { BasicCardType, RootState } from '../utilities/types'

interface SocketMiddlewareParams {
  dispatch: Dispatch
  getState: () => RootState
}

export default function socketMiddleware(socket: any) {
  return (params: SocketMiddlewareParams) => (next: any) => (action: any) => {
    const { dispatch , getState} = params
    const { game } = getState()
    let { type, payload } = action
    const gameId = payload?.gameId ?? game.gameId
    payload = {...payload, gameId}
    switch (type) {
      // Connect to the socket when a user joins a lobby
      case 'game/join': {
        socket.connect()
        
        socket.on('users online', (playersOnline: string[]) => {
          dispatch(setPlayersInGame(playersOnline))
        })

        socket.on('game full', (lobbyFull: boolean) => {
          dispatch(setLobbyFull(lobbyFull))
        })

        socket.on('game active', (gameActive: boolean) => {
          dispatch(setGameActive(gameActive))
        }) 
        socket.emit('join', payload)
        break
      }

      case 'game/start': {
        socket.emit('start game', payload)
        break
      }

      case 'game/setGameActive':{
        if (payload){
          //notifies client when a card is played
          socket.on('card played', (cardPlayed: BasicCardType[]) => {
            dispatch(setLastPlayed(cardPlayed))
          })

          //notifies client what cards are in their hand
          socket.on(`receive card`, (card: {suit: string, value: number}) => {
            dispatch(setMyHand(card))
          })

          //notifies client when it's their turn
          socket.on('my turn', (myTurn: boolean) => {
            dispatch(setMyTurn(myTurn))
          })
        }
        break
      }
      case 'game/playCard':{
        const cardPlayed: BasicCardType[] = []
        for(let i = 0; i < game.myHand.length; i ++){
          if (game.myHand[i].inPlay){
            cardPlayed.push({
              "suit": game.myHand[i].suit, "value": game.myHand[i].value,
            })
          }
        }
        payload = {...payload, cardPlayed}
        socket.emit('play card', payload)

        break
      }
    }
    return next(action)
  }
}
