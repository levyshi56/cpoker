from dataclasses import dataclass
import dataclasses
from enum import Enum
import json
import random

from game.types import Game_Capacity

  
class Game:
    def __init__(self):
        self.hand = {}
        self.last_played = []
        self.players = []
        self.turn = 0
        self.player_capacity = 4

    def play_card(self, player, play):
        return

    def join_game(self, player_id):
        if len(self.players) < self.player_capacity:
          self.hand[player_id] = []
          self.players.append(player_id)

    def get_hand(self, player):
        return self.hand[int(player)]
    
    def deal_card(self):
        deck = []
        suits = ["clover", "diamond", "heart", "spade"]
        for card_value in range(13):
            for suit_value in range(4):
                deck.append({"suit": suits[suit_value], "value": card_value})
        random.shuffle(deck)
        counter = 0
        while deck:
            turn = counter % len(self.players)
            dealt_card = deck.pop()
            if dealt_card["suit"] == "diamond" and dealt_card["value"] == 3:
                self.turn = counter % len(self.players)
            self.hand[self.players[turn]].append(dealt_card)
            counter += 1
        
