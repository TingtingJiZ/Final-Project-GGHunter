from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


class Users(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    alias = db.Column(db.String(50))
    lastname = db.Column(db.String(50))
    birth_day = db.Column(db.DateTime)
    mobile_phone = db.Column(db.String(20))
    address = db.Column(db.String(100))
    country = db.Column(db.String(25))
    city = db.Column(db.String(50))
    zip_code = db.Column(db.String(10))
    imagen = db.Column(db.String(50))
    status = db.Column(db.Boolean)
    bio = db.Column(db.Text)
    rol = db.Column(db.Enum('admin', 'user', 'premium', name='role_enum'), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

    def __repr__(self):
        return f'<User {self.id} - {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "alias": self.alias,
            "lastname": self.lastname,
            "birth_day": self.birth_day,
            "mobile_phone": self.mobile_phone,
            "address": self.address,
            "country": self.country,
            "city": self.city,
            "zip_code": self.zip_code,
            "imagen": self.imagen,
            "status": self.status,
            "bio": self.bio,
            "rol": self.rol,
            "created_at": self.created_at
        }

      
class Games(db.Model):
    __tablename__ = "games"
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    release_date = db.Column(db.Date)
    developer = db.Column(db.String(100))
    publisher = db.Column(db.String(100))
    
    def __repr__(self):
        return f'<Game {self.id} - {self.title}>'
      
    def serialize(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "release_date": self.release_date,
            "developer": self.developer,
            "publisher": self.publisher
        }      
