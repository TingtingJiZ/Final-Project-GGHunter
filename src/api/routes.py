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
    user = db.session.execute(db.select(Users).where(Users.id == current_user['user_id'])).scalar()
    
    if not user:
        response_body['results']= {}
        response_body['message']= "User not found"
        return jsonify(response_body), 404
    
    user_id = user.id
    
    if request.method == "PUT":
        #editar campos de un usuario
        pass

    if request.method == "DELETE":
        #hacer que el usuario este en false
        pass


@api.route('/favourites', methods=['GET', 'POST', 'DELETE'])
@jwt_required()
def handle_favourites():
    #relacion entre user_id y game_id
    pass


@api.route('/media', methods=['GET', 'POST', 'PUT', 'DELETE'])
@jwt_required()
def handle_favourites():
    #relacion game_id para añadir la media de las imagenes
    pass