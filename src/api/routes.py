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

@api.route("/comments", methods=["GET", "POST", "PUT", "DELETE"])
# @jwt_required()
def handle_comments():
    response_body = {}
    # current_user = get_jwt_identity()
    user = db.session.execute(db.select(Users).where(Users.id == current_user["user_id"])).scalar()
    if not user:
        response_body["results"] = {}
        response_body["message"] = "User not found"
        return response_body, 404
    if request.method == "POST":
        data = request.json
        comment = data.get("comment")
        if not comment:
            response_body["message"] = "Missing comment"
            return response_body, 400
        text = Comments(comment=comment, user_id=current_user["user_id"])
        db.session.add(text)
        db.session.commit()
        response_body["message"] = "comment added successfully"
        return response_body, 201
    if resquest.method == "GET":
        text = db.session.execute(db.select(Comments).where(Comments.user_id == current_user["user_id"])).scalars()
        results = [{"id": row.id, "comment": row.comment} for row in text]
        response_body["results"] = results
        response_body["message"] = f'Comments for user {current_user[email]} retrieved successfully'
