"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity

api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {}
    response_body['message'] = "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    return response_body, 200

@api.route('/game_characteristics', methods=['GET', 'POST'])
def handle_all_game_characteristics():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(GameCharacteristics)).scalars()
        results = [row.serialize() for row in rows]
        response_body['results'] = results
        response_body['message'] = "GET received"
        return response_body, 200

    if request.method == 'POST':
        data = request.json
        game_id = data.get('game_id', None)
        platform_id = data.get('platform_id', None)
        filename = data.get('filename', None)
        filetype = data.get('filetype', '')
        size = data.get('size', '')
        minimun = data.get('minimun', '')
        recomended = data.get('recomended', '')
        if not game_id or not platform_id or not filename:
            response_body['message'] = 'Missing data'
            response_body['results'] = {}
            return response_body, 400
        row = GameCharacteristics(
            game_id=game_id,
            platform_id=platform_id,
            filename=filename,
            filetype=filetype,
            size=size,
            minimun=minimun,
            recomended=recomended,
        )
        db.session.add(row)
        db.session.commit()
        response_body['message'] = "POST received"
        response_body['results'] = row.serialize()
        return response_body, 201


@api.route('/game_characteristics/<int:characteristic_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_game_characteristic(characteristic_id):
    response_body = {}
    if request.method == 'GET':
        row = db.session.execute(db.select(GameCharacteristics).where(GameCharacteristics.id == characteristic_id)).scalar()
        if not row:
            response_body['results'] = {}
            response_body['message'] = f'No existe la característica del juego {characteristic_id}'
            return response_body, 404
        response_body['results'] = row.serialize()
        response_body['message'] = f'GET request received for Game Characteristic {characteristic_id}'
        return response_body, 200

    if request.method == 'PUT':
        data = request.json
        game_id = data.get('game_id', None)
        platform_id = data.get('platform_id', None)
        filename = data.get('filename', None)
        if not game_id or not platform_id or not filename:
            response_body['message'] = 'Missing data'
            response_body['results'] = {}
            return response_body, 400
        characteristic = db.session.execute(db.select(GameCharacteristics).where(GameCharacteristics.id == characteristic_id)).scalar()
        if not characteristic:
            response_body['message'] = f'Game Characteristic {characteristic_id} does not exist'
            response_body['results'] = {}
            return response_body, 404
        characteristic.game_id = game_id
        characteristic.platform_id = platform_id
        characteristic.filename = filename
        characteristic.filetype = data.get('filetype', characteristic.filetype)
        characteristic.size = data.get('size', characteristic.size)
        characteristic.minimun = data.get('minimun', characteristic.minimun)
        characteristic.recomended = data.get('recomended', characteristic.recomended)
        db.session.commit()
        response_body['message'] = "Game Characteristic updated successfully"
        response_body['results'] = characteristic.serialize()
        return response_body, 200

    if request.method == 'DELETE':
        characteristic = db.session.execute(db.select(GameCharacteristics).where(GameCharacteristics.id == characteristic_id)).scalar()
        if not characteristic:
            response_body['message'] = f'Game Characteristic {characteristic_id} does not exist'
            response_body['results'] = {}
            return response_body, 404
        db.session.delete(characteristic)
        db.session.commit()
        response_body['message'] = f'Game Characteristic {characteristic_id} deleted successfully'
        return response_body, 200
