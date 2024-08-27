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
from datetime import datetime

api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {}
    response_body['message'] = "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    return response_body, 200


@api.route('/signup', methods=['POST'])
def handle_singup():
    response_body = {}
    data = request.json
    email = data.get("email", None).lower()
    password = data.get("password", None)
    alias = data.get("alias", None)
    lastname = data.get("lastname", None)
    birth_day = data.get("birth_day", None)
    existing_user = db.session.execute(db.select(Users).where(Users.email == email)).scalar()
    
    if existing_user:
        return jsonify({"message": "El usuario con este correo ya existe."}), 409
    
    new_user = Users(email = email,
                    password = data.get("password"),
                    is_active = True,
                    rol = 'user',
                    alias = alias,
                    lastname = lastname,
                    birth_day = birth_day)
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


@api.route('/profile', methods=['PUT', 'DELETE'])
@jwt_required()
def handle_profile():
    response_body = {}
    current_user = get_jwt_identity()
    existing_user = db.session.execute(db.select(Users).where(Users.id == current_user['user_id'])).scalar()
    
    if not existing_user:
        response_body['results']= {}
        response_body['message']= "User not found"
        return jsonify(response_body), 404
    
    user_id = user.id
    
    if request.method == "PUT":
        data = request.json
        user = Users(alias = data.get("alias"),
                    lastname = data.get("lastname"),
                    birth_day = data.get("birth_day"),
                    mobile_phone = data.get("mobile_phone"),
                    address = data.get("address"),
                    country = data.get("country"),
                    city = data.get("city"),
                    zip_code = data.get("zip_code"),
                    image = data.get("image"),
                    bio = data.get("bio"))
        db.session.add(user)
        db.session.commit()
        response_body = {'results': {}, 'message': "User modified"}

    if request.method == "DELETE":
        user.is_active = False
        db.session.commit()

        response_body['results'] = {}
        response_body['message'] = "User deactivated successfully"
        return jsonify(response_body), 200


@api.route('/favourites', methods=['GET', 'POST', 'DELETE'])
@jwt_required()
def handle_favourites():
    current_user = get_jwt_identity()
    user = db.session.execute(db.select(Users).where(Users.id == current_user['user_id'])).scalar()

    if not user:
        response_body = {'results': {}, 'message': "User not found"}
        return jsonify(response_body), 404

    if request.method == 'GET':
        # Obtener los juegos favoritos del usuario
        favourites = Favorites.query.filter_by(user_id=user.id).all()
        response_body = {
            'results': [favorite.serialize() for favorite in favourites],
            'message': "User favourites retrieved successfully"
        }
        return jsonify(response_body), 200

    if request.method == 'POST':
        data = request.get_json()
        game_id = data.get('game_id')

        existing_favorite = db.session.execute(db.select(Users).where(user_id=user.id, game_id=game_id)).scalar()
    
        if existing_favorite:
            response_body = {'results': {}, 'message': "Game already in favourites"}
            return jsonify(response_body), 400

        new_favorite = Favorites(user_id=user.id, 
                                game_id=game_id)
        db.session.add(new_favorite)
        db.session.commit()

        response_body = {
            'results': new_favorite.serialize(),
            'message': "Game added to favourites successfully"
        }
        return jsonify(response_body), 201

    if request.method == 'DELETE':
        data = request.get_json()
        game_id = data.get('game_id')

        favorite = Favorites.query.filter_by(user_id=user.id, game_id=game_id).first()
        if not favorite:
            response_body = {'results': {}, 'message': "Game not found in favourites"}
            return jsonify(response_body), 404

        db.session.delete(favorite)
        db.session.commit()

        response_body = {'results': {}, 'message': "Game removed from favourites successfully"}
        return jsonify(response_body), 200


@api.route('/media/<int:game_id>', methods=['GET', 'POST'])
def handle_media(game_id):

    if request.method == "GET":
        list_media = db.session.execute(db.select(Media)).scalars()
        rows = [row.serialize() for row in list_media]
        print(rows)
        response_body['message'] = f"List of the game {game_id}"
        response_body['result'] = rows
        return jsonify(response_body), 200

    if request.method == "POST":
        data = request.json
        type_media = data.get["type_media"]

        if type_media == None:
            type_media = "imagen"
        
        media = Media(game_id = game_id,
                      url = data.get["url"],
                      type_media = type_media,
                      caption = data.get["caption"],
                      uploaded_at = data.get["uploadaded_at"])
        db.session.add(media)
        db.session.commit()
        response_body["message"] = f"Insertado la media de {media}, del juego {game_id}"
        return response_body, 201
