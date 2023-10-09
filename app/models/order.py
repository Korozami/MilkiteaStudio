from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from datetime import datetime


class Order(db.Model):
    __tablename__ = 'orders'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    cart_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('carts.id')), nullable=False)
    order_number = db.Column(db.Integer, nullable=False)
    tracking_number = db.Column(db.Integer)
    shipped = db.Column(db.Boolean, nullable=False)
    date_ordered = db.Column(db.DateTime, default=datetime.utcnow)

    cart = relationship('Cart', back_populates='order')
    user = relationship('User', back_populates='order')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'cart_id': self.cart_id,
            'order_number': self.order_number,
            'tracking_number': self.tracking_number,
            'shipped': self.shipped,
            'date_ordered': self.date_ordered
        }
