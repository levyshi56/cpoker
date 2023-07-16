from flask import Flask, render_template, request, jsonify
from game.types import Game_Capacity
from game.game import Game
from server.server import Server
import secrets
from flask_cors import CORS
from flask_socketio import SocketIO, emit, join_room
import time

app = Flask('app')
server = Server()
socketio = SocketIO(app, cors_allowed_origins="http://localhost:3000")

CORS(app)

@app.route('/')
def hello_world():
    print(request.headers)
    return render_template(
        'index.html')

@app.route('/game/create_game/', methods=['POST'])
def create_game():
    uid = secrets.token_hex(8)
    server.add_game(uid)
    response = jsonify( f'{uid}')
    response.headers['Content-Type'] = 'application/json'
    response.status_code = 200
    return response

@app.route('/game/<game_id>/play_card', methods=['POST'])
def play_card():
    input_json = request.get_json(force=True)
    return

@app.route('/server/list_games')
def list_games():
    games = list(server.games.keys())
    response = jsonify({"body" : games})
    response.headers['Content-Type'] = 'application/json'
    response.status_code = 200
    return response

@socketio.on('join')
def handle_connect(body):
    game_id, player_id = body["gameId"], body["playerId"]
    game = server.games[game_id]
    if game and len(game.players) < game.player_capacity:
        game.join_game(player_id)
        game.player_sid[player_id] = request.sid
        join_room(game_id)
        emit('users online', game.players, to=game_id)
    else:
        return emit('game full', True)

@socketio.on('start game')
def start_game(payload):
    gameId = payload["gameId"]
    game = server.games[gameId]
    game.deal_cards()
    emit('game active', True ,to=gameId)
    for value in range(1,14):
        for suit in game.suits:
            owner = game.deck[suit][value]["owner"]
            time.sleep(.1)
            if suit == "diamond" and value == 3:
            
              emit('my turn', True, to=game.player_sid[owner])
            emit('receive card', {"suit": suit, "value": value}, to=game.player_sid[owner])

@socketio.on('play card')
def play_card(payload):
    game = server.games[payload["gameId"]]
    cardPlayed = payload["cardPlayed"]
    game.play_card(cardPlayed)
    emit('card played', game.last_played, broadcast=True, to=payload["gameId"])
    player_turn = game.players[game.turn]
    emit('my turn', True, to=game.player_sid[player_turn])
    emit('my turn', False, to=request.sid)
        
@socketio.on('skip turn')
def skip_turn(payload):
    game = server.games[payload["gameId"]]
    game.next_turn()
    player_turn = game.players[game.turn]
    emit('my turn', True, to=game.player_sid[player_turn])
    emit('my turn', False, to=request.sid)


if __name__ == "__main__":
    socketio.run(app)
