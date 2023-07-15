import { Dispatch } from 'redux'
import { setLobbyFull, setPlayersInGame} from '../features/game/gameSlice'
import { RootState } from '../features/game/types'

interface SocketMiddlewareParams {
  dispatch: Dispatch
  getState: () => RootState
}

export default function socketMiddleware(socket: any) {
  return (params: SocketMiddlewareParams) => (next: any) => (action: any) => {
    const { dispatch } = params
    const { type, payload } = action

    switch (type) {
      // Connect to the socket when a user logs in
      case 'game/join': {
        socket.connect()
        
        socket.on('users online', (onlineUsers: string[]) => {
          dispatch(setPlayersInGame(onlineUsers))
        })

        socket.on('game full', (lobbyFull: boolean) => {
          dispatch(setLobbyFull(lobbyFull))
        })

        socket.emit('join', payload)
      }
    }
    return next(action)
  }
}
