"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users, Favorites, SocialAccounts, Comments, Media, Games, GameCharacteristics, Stores, Platforms
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from datetime import datetime
from flask_jwt_extended import jwt_required
import json, random, os

api = Blueprint('api', __name__)
CORS(api)  # Allow CORS requests to this API

@api.route('/login', methods=['POST'])
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


@api.route('/signup', methods=['POST'])
def handle_singup():
    response_body = {}
    data = request.json
    print(data)
    email = data.get("email", None).lower()
    password = data.get("password", None)
    existing_user = db.session.execute(db.select(Users).where(Users.email == email)).scalar()
    if existing_user:
        return jsonify({"message": "El usuario con este correo ya existe."}), 409
    new_user = Users(email = email,
                     password = data.get("password"),
                     alias = data.get("alias"),
                     lastname = data.get("lastname"),
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


@api.route('/game_characteristics', methods=['GET', 'POST'])
def handle_all_game_characteristics():
    response_body = {}
    if request.method == 'GET':
        rows = db.session.execute(db.select(GameCharacteristics)).scalars()
        serialized_rows = [row.serialize() for row in rows]
        response_body['results'] = serialized_rows
        response_body['message'] = "GET request received for all Game Characteristics"
        return response_body, 200
    if request.method == 'POST':
        data = request.get_json()
        game_id = data.get('game_id', None)
        platform_id = data.get('platform_id', None)
        size_mb = data.get('size_mb', None)
        minimun = data.get('minimun', None)
        recomended = data.get('recomended', None)
        if not game_id or not platform_id:
            response_body['message'] = 'Missing game_id or platform_id'
            response_body['results'] = {}
            return response_body, 400
        row = GameCharacteristics(
            game_id=game_id,
            platform_id=platform_id,
            size_mb=size_mb,
            minimun=minimun,
            recomended=recomended,
        )
        db.session.add(row)
        db.session.commit()
        response_body['message'] = "POST request received and Game Characteristic created"
        response_body['results'] = row.serialize()
        return response_body, 201


@api.route('/game_characteristics/<int:characteristic_id>', methods=['GET', 'PUT', 'DELETE'])
def handle_game_characteristic(characteristic_id):
    response_body = {}
    if request.method == 'GET':
        row = db.session.execute(db.select(GameCharacteristics).where(GameCharacteristics.id == characteristic_id)).scalar()
        if not row:
            response_body['message'] = f'Game Characteristic {characteristic_id} does not exist'
            response_body['results'] = {}
            return response_body, 404
        response_body['message'] = f'GET request received for Game Characteristic {characteristic_id}'
        response_body['results'] = row.serialize()
        return response_body, 200
    if request.method == 'PUT':
        data = request.get_json()
        game_id = data.get('game_id', None)
        platform_id = data.get('platform_id', None)
        size_mb = data.get('size_mb', None)
        minimun = data.get('minimun', None)
        recomended = data.get('recomended', None)
        if not game_id or not platform_id:
            response_body['message'] = 'Missing game_id or platform_id'
            response_body['results'] = {}
            return response_body, 400
        characteristic = db.session.execute(db.select(GameCharacteristics).where(GameCharacteristics.id == characteristic_id)).scalar()
        if not characteristic:
            response_body['message'] = f'Game Characteristic {characteristic_id} does not exist'
            response_body['results'] = {}
            return response_body, 404
        characteristic = GameCharacteristics(
            game_id = game_id,
            platform_id = platform_id,
            size_mb = size_mb,
            minimun = minimun,
            recomended = recomended
        )
        """ characteristic.game_id = game_id
        characteristic.platform_id = platform_id
        characteristic.size_mb = size_mb
        characteristic.minimun = minimun
        characteristic.recomended = recomended
        Esto funciona pero es más antiguo"""

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
        results2 = [row.serialize_data_games() for row in rows]
        response_body['results'] = results2
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
        game_exist = db.session.execute(db.select(Games).where(Games.title == title)).scalar()
        if game_exist:
            response_body['message'] = 'Game already exists'
            response_body['results'] = {}
            return response_body, 409
        new_game = Games(
            title=data.get('title'),
            comments=data.get('comments', []),
            game_genders=data.get('game_genders', []),
            game_characteristics=data.get('game_characteristics',[]),
            release_date=data.get('release_date'),
            publisher=data.get('publisher'),
            favourites_games=data.get('favourites',[]),
            is_active=data.get('is_active'),
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


@api.route("/comments", methods=["GET", "POST"])
@jwt_required()
def handle_comments():
    print("*************")
    response_body = {}
    current_user = get_jwt_identity()
    print(current_user)
    user = db.session.execute(db.select(Users).where(Users.id == current_user["user_id"])).scalar()
    print(user)
    if not user:
        response_body["results"] = {}
        response_body["message"] = "User not found"
        return jsonify(response_body), 404
    if request.method == "POST":
        data = request.json
        comment_text = data.get("body")
        game_id = data.get("game_id")
        print(comment_text, game_id)
        if not comment_text:
            response_body["message"] = "Missing comment"
            return jsonify(response_body), 400
        print("insertando")
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


@api.route("/comments/<int:comment_id>", methods=["GET", "PUT", "DELETE"])
@jwt_required()
def handle_comment(comment_id):
    response_body = {}
    current_user = get_jwt_identity()
    if request.method == "GET":
        comment = db.session.execute(db.select(Comments).where(Comments.id == comment_id, Comments.user_id == current_user["user_id"])).scalar()
        if not comment:
            response_body["message"] = "Comment ID not found"
            response_body["results"] = {}
            return response_body, 404
        response_body["message"] = "Get commmet"
        response_body["results"] = comment.serialize()
        return response_body, 200
    if request.method == "DELETE":
        delete_comment = db.session.execute(db.select(Comments).where(Comments.id == comment_id)).scalar()
        if not delete_comment:
            response_body["message"] = "Comment to delete not found"
            response_body["results"] = {}
            return response_body, 404
        db.session.delete(delete_comment)
        db.session.commit()
        response_body["message"] = f"Comment deleted"
        return jsonify(response_body), 201
    if request.method == "PUT":
        data = request.get_json()
        game_id = data.get("game_id", None)
        body = data.get("body", None)
        if not game_id or not body:
            response_body["message"] = "Missing game ID or body"
            response_body["results"] = {}
            return response_body, 400
        comment_to_update = db.session.execute(db.select(Comments).where(Comments.id == comment_id, Comments.user_id == current_user["user_id"])).scalar()
        if not comment_to_update:
            response_body["message"] = "Comment not updated"
            response_body["results"] = {}
            return response_body, 404
        comment_to_update.game_id = game_id
        comment_to_update.body = body
        db.session.commit()
        response_body["message"] = "Comment updated"
        response_body["results"] = comment_to_update.serialize()
        return response_body, 200


@api.route("/games/<int:game_id>/comments", methods=["GET"])
def handele_games_comments(game_id):
    print(game_id)
    response_body = {}
    comments = db.session.execute(
        db.select(Comments, Users).join(Users, Comments.user_id == Users.id).where(Comments.game_id == game_id)
    ).all()
    results = [{
        "game_id": row.Comments.game_id,
        "body": row.Comments.body,
        "user_alias": row.Users.alias,
        "created_at": row.Comments.created_at
    } for row in comments]
    print(results)
    response_body = {'results': results, 'message': "Los comentarios"}
    return response_body, 200

""" @api.route('/comments/<int:comment_id>', methods=['DELETE'])
def delete_comment(comment_id):
    # Buscar el comentario por ID
    comment = Comments.query.get(comment_id)

    # Si el comentario no existe, devolver un error
    if not comment:
        return jsonify({'error': 'Comment not found'}), 404

    try:
        # Eliminar el comentario
        db.session.delete(comment)
        db.session.commit()

        return jsonify({'message': 'Comment deleted successfully'}), 200
    except Exception as e:
        # Manejar errores al intentar eliminar el comentario
        db.session.rollback()
        return jsonify({'error': str(e)}), 500 """


@api.route("/social_accounts", methods=["GET", "POST"])
@jwt_required()
def handle_social_accounts():
    response_body = {}
    current_user = get_jwt_identity()
    user = db.session.execute(db.select(Users).where(Users.id == current_user["user_id"])).scalar()
    if not user:
        response_body["results"] = {}
        response_body["message"] = "User not found"
        return response_body, 404
    if request.method == "GET":
        accounts = db.session.execute(db.select(SocialAccounts).where(SocialAccounts.user_id == current_user["user_id"])).scalars()
        results = [{"id": row.id, "social": row.social_id, "provider": row.provider, "access": row.access_token} for row in accounts]
        response_body["results"] = results
        response_body["message"] = f"Social account for user {current_user} retrieved successfully"
        return response_body, 200
    if request.method == "POST":
        data = request.json
        providers = data.get("provider")
        socials_id = data.get("social_id")
        access_tokens = data.get("access_token")
        if not providers and socials_id:
            response_body["message"] = "Missing provider"
            return response_body, 400
        new_account = SocialAccounts(user_id=current_user["user_id"], social_id=socials_id, provider=providers, access_token=access_tokens)
        db.session.add(new_account)
        db.session.commit()
        response_body["message"] = "Successfully posted"
        return response_body, 200


@api.route("/social_accounts/<int:social_account_id>", methods=["GET", "PUT", "DELETE"])
@jwt_required()
def handle_social_account(social_account_id):
    response_body = {}
    current_user = get_jwt_identity()
    if request.method == "GET":
        account = db.session.execute(db.select(SocialAccounts).where(SocialAccounts.id == social_account_id, SocialAccounts.user_id == current_user["user_id"])).scalar()
        if not account:
            response_body["message"] = "Account not found"
            response_body["results"] = {}
            return response_body, 404
        response_body["message"] = "Get account"
        response_body["results"] = account.serialize()
        return response_body, 200
    if request.method == "DELETE":
        delete_account = db.session.execute(db.select(SocialAccounts).where(SocialAccounts.id == social_account_id, SocialAccounts.user_id == current_user["user_id"])).scalar()
        if not delete_account:
            response_body["message"] = "Account to delete not found"
            response_body["results"] = {}
            return response_body, 404
        db.session.delete(delete_account)
        db.session.commit()
        response_body["message"] = "Account deleted"
        return response_body, 200
    if request.method == "PUT":
        data = request.get_json()
        provider = data.get("provider", None)
        social_id = data.get("social_id", None)
        access_token = data.get("access_token", None)
        if not provider or not social_id or not access_token:
            response_body["message"] = "Missing provider, social ID or access_token"
            response_body["results"] = {}
            return response_body, 404
        account_to_update = db.session.execute(db.select(SocialAccounts).where(SocialAccounts.id == social_account_id, SocialAccounts.user_id == current_user["user_id"])).scalar()
        if not account_to_update:
            response_body["message"] = "Account not updated"
            response_body["results"] = {}
            return response_body, 404
        account_to_update.provider = provider
        account_to_update.social_id = social_id
        account_to_update.access_token = access_token
        db.session.commit()
        response_body["message"] = "Account updated"
        response_body["results"] = account_to_update.serialize()
        return response_body, 200


@api.route("/stores", methods=["GET", "POST"])
def handle_stores():
    response_body = {}
    rows = db.session.execute(db.select(Stores)).scalars()
    results = [row.serialize() for row in rows]

    if request.method == "GET":
        response_body["results"] = results
        response_body["message"] = "GET stores"
        return response_body, 200

    if request.method == "POST":
        data = request.json
        store_url = data.get("url")

        if not store_url:
            response_body["message"] = "Missing store url"
            return response_body, 400

        new_store = Stores(url=store_url)
        db.session.add(new_store)
        db.session.commit()
        response_body["message"] = "POST stores"
        return response_body, 200


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
        return response_body, 201

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


@api.route("/load-json-user", methods=["GET"])
def load_data_from_api_user():
    response_body = {
        'results': [],
        'message': "Usuarios añadidos exitosamente"
    }
    base_path = os.path.dirname(os.path.abspath(__file__))
    json_path = os.path.join(base_path, 'json', 'user.json')

    with open(json_path, 'r', encoding='utf-8') as json_file:
        data = json.load(json_file)
        print(data)
        
        for row in data:
            email = row['email']
            password = row['password']
            is_active = row['is_active'].lower() == 'true'
            rol = row['rol']
            alias = row['alias']
            
            # Check if the email already exists in the database
            existing_user = Users.query.filter_by(email=email).first()

            if existing_user:
                response_body['results'].append({'email': email,'message': f"Usuario {email} ya existe"})
            else:
                # If the email doesn't exist, create a new user
                user = Users(
                    email=email,
                    password=password,
                    is_active=is_active,
                    rol=rol,
                    alias=alias)
                db.session.add(user)
                db.session.commit()
                response_body['results'].append({
                    'email': email,
                    'message': f"Usuario {email} añadido"})
    return response_body, 200



@api.route("/load-json-games", methods=["GET"])
def load_data_from_api_games():
    response_body = {
        'results': [],
        'message': "Juegos añadidos exitosamente"}
    base_path = os.path.dirname(os.path.abspath(__file__))
    json_path = os.path.join(base_path, 'json', 'games.json')
    with open(json_path) as json_file:
        data = json.load(json_file)
        games_to_add = []
        for row in data:
            is_active = row['is_active']
            publisher = row["publisher"]
            title = row["title"]
            description = row['description']
            game_id = row['id']
            developer = row['developer']
            game_genders = row['game_genders']
            existing_game = Games.query.filter_by(id=game_id).first() or Games.query.filter_by(title=title).first()
            if existing_game:
                response_body['results'].append({
                    'data': {
                        "id": game_id,
                        "is_active": is_active,
                        "publisher": publisher,
                        "title": title,
                        "developer": developer,
                        "description": description
                    },
                    'message': f"Juego {title} ya existe"})
            else:
                game = Games(
                    id=game_id,
                    is_active=is_active,
                    publisher=publisher,
                    title=title,
                    developer=developer,
                    description=description)
                games_to_add.append(game)
                response_body['results'].append({
                    'data': {
                        "id": game_id,
                        "is_active": is_active,
                        "publisher": publisher,
                        "title": title,
                        "developer": developer,
                        "description": description},
                    'message': f"Juego {title} añadido"})
        if games_to_add:
            db.session.add_all(games_to_add)
            db.session.commit()
    return response_body, 201


@api.route("/load-json-store", methods=["GET"])
def load_data_from_api_store():
    response_body = {
        'results': [],
        'message': "Datos a insertar"
    }
    base_path = os.path.dirname(os.path.abspath(__file__))
    json_path = os.path.join(base_path, 'json', 'stores.json')
    with open(json_path) as json_file:
        data = json.load(json_file)
        for block in data:
            #print(f" El block es {block}")
            for row in block:
                #print(f" a row esl {row}")

                size_mb = row['size_mb']
                minimun = row['minimun']
                recomended = row['recomended']
                game_id = row['game_id']
                platform_id = row['platform_id']
                url = row['url']
                home_page = row['home_page']
                price = row['price']

                games = Games.query.get(game_id)
                
                if games:
                    store = Stores.query.filter_by(url=url, home_page=home_page,price=price).first()
                    if not store:
                        store = Stores(url=url, home_page=home_page, price=price)
                        db.session.add(store)
                        db.session.commit()
                        response_body['results'].append({
                        'datos': {
                            "url": url,
                            "home_page":home_page,
                            "price":price
                        },'message': f"Se ha insertado una nueva store para el juego {game_id}"})
                    else:
                        response_body['results'].append({
                        'precio': {
                            "url": url,
                            "home_page":home_page,
                            "price":price
                        },'message': f"Juego {game_id} no ha cambiado de precio"})
                    exist_characteristics = GameCharacteristics.query.filter_by(platform_id=platform_id,game_id=game_id).first()
                    if not exist_characteristics:
                        game_characteristics = GameCharacteristics(
                            size_mb=size_mb,
                            minimun=minimun,
                            recomended=recomended,
                            game_id=game_id,
                            platform_id=platform_id,
                            stores_id=store.id 
                        )
                        
                        db.session.add(game_characteristics)
                        db.session.commit()
                        response_body['results'].append({
                        'datos': {
                            "size_mb": size_mb,
                            "minimun":minimun,
                            "recomended":recomended,
                            "game_id":game_id,
                            "platform_id":platform_id,
                        },'message': f"Se ha insertado nuevas caracteristicas para el juego {game_id}"})
                    else:
                        response_body['results'].append({
                        'datos': {
                            "platform_id": platform_id,
                            "game_id":game_id
                        },'message': f"Ya existen estas caracteristicas del juego {game_id}"})
                else:
                    response_body['results'].append({
                    'datos': {
                        "id": game_id,
                    },'message': f"Juego {game_id} no existe"})
    return response_body,200


@api.route("/load-json-platforms", methods=["GET"])
def load_data_from_api_platforms():
    response_body = {
        'results': [],
        'message': "Usuarios añadidos exitosamente"
    }
    base_path = os.path.dirname(os.path.abspath(__file__))
    json_path = os.path.join(base_path, 'json', 'platform.json')
    with open(json_path) as json_file:
        data = json.load(json_file)
        
        for row in data:
            id = row['id']
            name = row['name']
            print(f"El id {id} el nombre {name}")
            existing_store = Platforms.query.get(id)
            if not existing_store:
                platform = Platforms(
                    id=id,
                    name=name
                )
                db.session.add(platform)
            else:
                response_body['results'].append({
                    'result':f"Ya existe la plataforma {name}"
                })
        db.session.commit()
    return response_body,201


@api.route("/load-json-image", methods=["GET"])
def load_data_from_api_image():
    response_body = {
        'results': [],
        'message': "Usuarios añadidos exitosamente"
    }
    base_path = os.path.dirname(os.path.abspath(__file__))
    json_path = os.path.join(base_path, 'json', 'imagen.json')
    with open(json_path) as json_file:
        data = json.load(json_file)
        for block in data:
            #print(f" El block es {block}")
            for row in block:
                #print(f" a row esl {row}")
                url = row['url']
                type_media = row['type_media']
                caption = row['caption']
                game_id = row['game_id']
                games = Games.query.filter_by(id=game_id).first()
                if games:
                    exist_media = Media.query.filter_by(url=url,game_id=game_id).first()
                    if not exist_media:
                        media = Media(
                            url=url,
                            type_media=type_media,
                            caption=caption,
                            game_id=games.id 
                        )               
                        db.session.add(media)
                        db.session.commit()
                        response_body['results'].append({
                            "datos": {
                                "url":url,
                                "type_media":type_media,
                                "caption":caption,
                                "game_id":game_id
                            },
                            'message': f"Insertada la imagen de {game_id}"
                        })
                    else:
                        response_body['results'].append({
                            "datos": {
                                "url":url,
                            },
                            'message': f"Existe la imagen para el juego {game_id}"
                        })
                else:
                        response_body['results'].append({
                            'message': f"No existe el juego {game_id}"
                        })
    return response_body,200


@api.route("/load-api-store", methods=["POST"])
def load_data_from_apiReal_store():
    data = request.get_json()
    response_body = {
        'results': [],
        'message': "Usuarios añadidos exitosamente"
    }

    print(data)
    if data is None:
        return jsonify({"message": "No data provided"}), 400
    
    response_body['results'].append({
        "datos":data,
        'message': f"Estos son los datos"
    })
    for block in data:
        game_id = block['id']
        url = "https://store.steampowered.com/app/"+block["steamAppID"]
        url_media = block["thumb"]
        storeID = block["storeID"]
        home_page = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/2048px-Steam_icon_logo.svg.png"
        price = block["precio"]
        caption = "Imagen Juego"

        games = Games.query.get(game_id)
        try:
            if games:
                store = Stores.query.filter_by(url=url, home_page=home_page).first()
                if not store:
                    store = Stores(url=url, home_page=home_page, price=price)
                    db.session.add(store)
                    db.session.commit()
                exist_characteristics = GameCharacteristics.query.filter_by(platform_id=storeID,game_id=game_id).first()
                if not exist_characteristics:
                    game_characteristics = GameCharacteristics(
                        game_id=game_id,
                        platform_id=1,
                        stores_id=store.id 
                    )
                    db.session.add(game_characteristics)
                    db.session.commit()
                
                exist_media = Media.query.filter_by(url=url_media,game_id=games.id).first()
                if not exist_media:
                    media = Media(
                            url=url_media,
                            type_media="imagen",
                            caption=caption,
                            game_id=games.id 
                    )
                    db.session.add(media)
                    db.session.commit()
            else:
                print(f"No existe el juego con id {game_id}")
                data = {
                    "message": f"El juego con id {game_id} no existe"
                }
        except Exception as e:
            print(f"Hay un problema de conexión")
    response_body['results'].append({
        "datos": data,
        'message': "Resultados de la operación"
    })

    return response_body, 200

