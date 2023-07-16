import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { GameArgs } from '../utilities/types'

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
    createGame: builder.mutation<string, void>({
      query: () => (
        {
          method: 'POST',
          url: `/game/create_game/`,
        }
      ),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useCreateGameMutation } = gameApi