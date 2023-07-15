from flask import Flask, render_template, request, jsonify
from game.types import Game_Capacity
from game.game import Game
from server.server import Server
import secrets
from flask_cors import CORS
from flask_socketio import SocketIO, emit

app = Flask('app')
server = Server()
socketio = SocketIO(app, cors_allowed_origins="http://localhost:3000")

CORS(app)

@app.route('/')
def hello_world():
    print(request.headers)
    return render_template(
        'index.html')

@app.route('/game/create_game/<player_id>', methods=['POST'])
def create_game(player_id):
    uid = secrets.token_hex(8)
    server.add_game(uid)
    server.games[uid].join_game(player_id)
    response = jsonify( f'{uid}')
    response.headers['Content-Type'] = 'application/json'
    response.status_code = 200
    print("200")
    return response

@app.route('/game/<game_id>/<player_id>/join_game')
def join_game(game_id, player_id):
    game = server[game_id]
    if game:
        join_game = game.join_game(player_id)
        if join_game == Game_Capacity.game_full or Game_Capacity.game_can_start:
            return 200, "game can start"
        else:
            return 200, "game can't start"
    else:
        return 404, "No game to join"

@app.route('/game/<game_id>/play_card', methods=['POST'])
def play_card():
    input_json = request.get_json(force=True)
    return

@app.route('/game/<game_id>/<player_id>/hand', methods = ['GET'])
def get_hand(game_id, player_id):
    game = server.games[game_id]
    hand = game.get_hand(player_id)
    response_object = {"body": hand}
    response = jsonify(response_object)
    response.headers['Content-Type'] = 'application/json'
    response.status_code = 200
    return response

@app.route('/server/list_games')
def list_games():
    games = list(server.games.keys())
    response = jsonify({"body" : games})
    response.headers['Content-Type'] = 'application/json'
    response.status_code = 200
    return response

@socketio.on('users')
def handle_connect(body):
    game_id, player_id = body["game_id"], body["player_id"]
    game = server[game_id]
    if game and game.players < game.player_capacity:
        game.join_game(player_id)
        socketio.emit('users online', game.players)
    else:
        return socketio.emit('game full', True)

if __name__ == "__main__":
    socketio.run(app)
