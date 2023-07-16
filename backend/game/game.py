from dataclasses import dataclass
import dataclasses
from enum import Enum
import json
import random

from game.types import Game_Capacity

  
class Game:
    def __init__(self):
        self.deck = {"diamond" : {}, "clover" :{}, "heart": {}, "spade": {}}
        self.last_played = []
        self.players = ['player1', 'player2']
        self.player_sid = {'player1': '1', 'player2': '1'}
        self.turn = 0
        self.player_capacity = 4
        self.suits =  ["diamond", "clover","heart", "spade"]


    def play_card(self, play):
        #check if valid in future and check if cards are disabled
        self.last_played = play
        for card in play:
            suit, value = card["suit"], card["value"]
            self.deck[suit][value]["disabled"] = True
        self.next_turn()
        return

    def join_game(self, player_id):
        if len(self.players) < self.player_capacity:
          self.players.append(player_id)

    def get_hand(self, player):
        return self.hand[int(player)]
    
    def deal_cards(self):
        deck = []
        for i in range(13):
          for y in range(4):
              deck.append(self.players[y])
        random.shuffle(deck)
        counter = 0
        for card_value in range(1,14):
            for suit_value in range(4):
                suit = self.suits[suit_value]
                self.deck[suit][card_value] = {
                    "inPlay": False, "owner": deck[counter], "disabled": False
                }
                counter += 1
        
    def next_turn(self):
        self.turn = (self.turn + 1) % len(self.players)
