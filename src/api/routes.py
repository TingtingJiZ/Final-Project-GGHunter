"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users, Favorites, SocialAccounts, Comments, Media, Games, GameCharacteristics, Platforms, Stores, Genders, GameGenders


api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {}
    response_body['message'] = "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    return response_body, 200


@api.route('/games', methods=['GET', 'POST'])
def handle_all_games():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(Games)).scalars()
        results = [row.serialize() for row in rows]
        response_body['results'] = results
        response_body['message'] = "GET received"
        return response_body, 200

    if request.method == 'POST':
        data = request.json
        title = data.get('title', None)
        if not title: 
            response_body['message'] = 'Does not exist'
            response_body['results'] = {}
            return response_body, 400
        if game_exist:
            game_exist = db.session.execute(db.select(Games).where(Games.title == title)).scalar() # No sé si esto va aquí o en la linea 37.
            response_body['message'] = 'Game already exists'
            response_body['results'] = {}
            return response_body, 409
        new_game = Games(
            # Los true y none, no creo que esten bien...
            title=data.get('title', True),
            comments=data.get('comments', True),
            game_genders=data.get('game_genders', True),
            game_characteristics=data.get('game_characteristics', True),
            release_date=data.get('release_date', True),
            publisher=data.get('publisher', True),
            favourites_games=data.get('favourites', True),
            is_active=data.get('is_active', True),
            description=data.get('description', None),
            developer=data.get('developer', None),
        )
        db.session.add(new_game)
        db.session.commit()
        response_body['message'] = "Game created successfully"
        response_body['results'] = new_game.serialize()
        return response_body, 201
# en general no sé si esto esta bien...


@api.route('/games/<int:game_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_game(game_id):
    response_body = {}
    if request.method == 'GET':
        game = db.session.execute(db.select(Games).where(Games.id == game_id)).scalar()
        if not game:
            response_body['message'] = f'Game with id {game_id} not found'
            response_body['results'] = {}
            return response_body, 404
        response_body['results'] = game.serialize()
        response_body['message'] = f'Game {game_id} retrieved successfully'
        return response_body, 200

    if request.method == 'PUT':
        data = request.json
        game = db.session.execute(db.select(Games).where(Games.id == game_id)).scalar()
        if not game:
            response_body['message'] = f'Game with id {game_id} not found'
            response_body['results'] = {}
            return response_body, 404
        title = data.get('title', None)

        if title:
            game_exist = db.session.execute(db.select(Games).where(Games.title == title, Games.id != game_id)).scalar()
            if game_exist:
                response_body['message'] = 'Game with this title already exists'
                response_body['results'] = {}
                return response_body, 409
        game.title = title if title else game.title
        game.is_active = data.get('is_active', game.is_active)
        game.description = data.get('description', game.description)
        game.release_date = data.get('release_date', game.release_date)
        game.developer = data.get('developer', game.developer)
        game.publisher = data.get('publisher', game.publisher)
        db.session.commit()
        response_body['message'] = f'Game {game_id} updated successfully'
        response_body['results'] = game.serialize()
        return response_body, 200

    if request.method == 'DELETE':
        game = db.session.execute(db.select(Games).where(Games.id == game_id)).scalar()
        if not game:
            response_body['message'] = f'Game with id {game_id} not found'
            response_body['results'] = {}
            return response_body, 404
        db.session.delete(game)
        db.session.commit()
        response_body['message'] = f'Game {game_id} deleted successfully'
        return response_body, 200
