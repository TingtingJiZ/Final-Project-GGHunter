"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users, Favorites, SocialAccounts, Comments, Media, Games, GameCharacteristics, Platforms, Stores, Genders, GameGenders
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
      
      
@api.route('/signup', methods=['POST'])
def handle_singup():
    response_body = {}
    data = request.json
    email = data.get("email", None).lower()
    password = data.get("password", None)
    existing_user = db.session.execute(db.select(Users).where(Users.email == email)).scalar()
    
    if existing_user:
        return jsonify({"message": "El usuario con este correo ya existe."}), 409
    
    new_user = Users(email = email,
        password = data.get("password"),
        is_active = True,
        rol = 'user')
    db.session.add(new_user)
    db.session.commit()
    user = db.session.execute(db.select(Users).where(Users.email == email)).scalar()
    access_token = create_access_token(identity={'email': user.email,
                                                'user_id': user.id,
                                                'rol': user.rol})
    response_body['results'] = user.serialize()
    response_body['message'] = 'User registrado y logeado'
    response_body['access_token'] = access_token
    return response_body, 201


@api.route('/login', methods=['GET'])
def handle_users():
    response_body = {}
    data = request.json
    email = data.get("email", None).lower()
    password = data.get("password", None)
    user = db.session.execute(db.select(Users).where(Users.email == email, Users.password == password, Users.is_active == True)).scalar()
    
    if not user:
        response_body["message"] =f"El usuario {email} es desconocido para el sistema"
        return response_body, 404
    
    if not user.is_active:
        response_body["message"] =f"El usuario {email} no esta activo en la página web"
        return response_body, 404
    
    access_token = create_access_token(identity={'email':email, 'user_id':user.id, 'is_rol':user.rol})
    response_body['results'] = user.serialize()
    response_body['message'] = 'User logged'
    response_body['message'] = access_token
    return response_body, 201
