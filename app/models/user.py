from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.orm import relationship


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    middle_name = db.Column(db.String(40))
    last_name = db.Column(db.String(40), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    admin = db.Column(db.Boolean, default=False, nullable=False)

    #relationships
    stores = relationship('Store', back_populates='user', cascade='all, delete-orphan')
    cart = relationship('Cart', back_populates='user', cascade='all, delete-orphan')
    payment = relationship('Payment', back_populates='user', cascade='all, delete-orphan')
    address = relationship('Address', back_populates='user', cascade='all, delete-orphan')
    order = relationship('Order', back_populates='user', cascade='all, delete-orphan')



    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'middle_name': self.middle_name,
            'last_name': self.last_name,
            'username': self.username,
            'email': self.email
        }
