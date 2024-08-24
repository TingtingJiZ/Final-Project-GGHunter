"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users, Favorites, SocialAccounts, Comments, Media, Games, GameCharacteristics, Platforms, Stores, Genders, GameGenders
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

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
    existing_user = db.session.execute(db.select(Users).where(Users.email == email)).scalar()
    if existing_user:
        return jsonify({"message": "El usuario con este correo ya existe."}), 409
    new_user = Users(
        email = email,
        password = data.get("password"),
        is_active = True,
        rol = 'user'
    )
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


@api.route("/comments", methods=["GET", "POST", "PUT", "DELETE"])
@jwt_required()
def handle_comments():
    response_body = {}
    current_user = get_jwt_identity()
    user = db.session.execute(db.select(Users).where(Users.id == current_user["user_id"])).scalar()
    if not user:
        response_body["results"] = {}
        response_body["message"] = "User not found"
        return jsonify(response_body), 404
    if request.method == "POST":
        data = request.json
        comment_text = data.get("comment")
        game_id = data.get("game_id")
        if not comment_text:
            response_body["message"] = "Missing comment"
            return jsonify(response_body), 400
        new_comment = Comments(user_id=current_user["user_id"], body=comment_text, game_id=game_id)
        db.session.add(new_comment)
        db.session.commit()
        response_body["message"] = "comment added successfully"
        return jsonify(response_body), 201

    if request.method == "GET":
        comments = db.session.execute(db.select(Comments).where(Comments.user_id == current_user["user_id"])).scalars()
        results = [{"id": row.id, "comment": row.body} for row in comments]
        response_body["results"] = results
        response_body["message"] = f'Comments for user {current_user} retrieved successfully'
        return jsonify(response_body), 200
    
    if request.method == "DELETE":
        data = request.json
        comment_user = data.get("comment_text")
        delete_comment = db.session.execute(db.select(Comments).where(Comments.user_id == user_id, Comments.comment_text == comment_user)).scalar()
        if not delete_comment:
            response_body["message"] = f"Delete comment not found"
            return jsonify(response_body), 404
        db.session.delete(delete_comment)
        de.session.commit()
        response_body["message"] = f"Comment deletede"
        return jsonify(response_body), 201

