import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { GameArgs } from './types'

// Define a service using a base URL and expected endpoints
export const gameApi = createApi({
  reducerPath: 'gameApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:5000',
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getPlayerHand: builder.query<string, GameArgs>({
      query: (param) => `/game/${param.gameId}/${param.playerId}/hand`,
    }),
    createGame: builder.mutation<string, string>({
      query: (player_id) => (
        {
          method: 'POST',
          url: `/game/create_game/${player_id}`,
        }
      ),
    }),
    joinGame: builder.mutation<string, GameArgs>({
      query: (gameEntry) => (
        {
          method: 'POST',
          url: `/game/${gameEntry.gameId}/${gameEntry.playerId}/join_game`,
        }
      ),
    })
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPlayerHandQuery, useCreateGameMutation, useJoinGameMutation } = gameApi