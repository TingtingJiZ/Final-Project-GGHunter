"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.models import db, Users, Favorites, SocialAccounts, Comments, Media, Games, GameCharacteristics, Platforms, Stores, Genders, GameGenders
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from datetime import datetime
from flask_jwt_extended import jwt_required

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

      
@api.route("/social_accounts", methods=["GET", "POST", "PUT", "DELETE"])
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
    if request.method == "DELETE":
        data = request.json
        account_id = data.get("aprovider")
        social_account_delete = db.session.execute(db.select(SocialAccounts).where(SocialAccounts.user_id == current_user["user_id"], SocialAccounts.id == provider)).scalar()
        if not social_account_delete:
            response_body["message"] = "account not found"
            return response_body, 404
        db.session.delete(social_account_delete)
        db.session.commit()
        response_body["message"] = "Deleted"
        return response_body, 201

    if request.method == "PUT":
        data = request.json
        social_id = data.get("social_id")
        if not social_id:
            response_body["message"] = "Missing ID"
            return response_body, 404
        social_account = db.session.execute(db.select(SocialAccounts).where(SocialAccounts.id == social_id, SocialAccounts.user_id == current_user["user_id"])).scalar()
        if not social_account:
            response_body["message"] = "social account not found"
            return response_body, 404
        db.session.commit()
        response_body["message"] = "social account updated"
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

