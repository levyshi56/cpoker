from game.game import Game
class Server:
    def __init__(self):
        self.games = {}

    def add_game(self, id):
        self.games[id] = Game()
