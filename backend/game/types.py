from enum import Enum


class Game_Capacity(Enum):
  game_full = "game is full"
  game_can_start = "ready to start game"
  game_needs_players = "game needs more players"
