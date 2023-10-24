from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship

class Cart(db.Model):
    __tablename__ = 'carts'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    user = relationship("User", back_populates='cart')
    cart_item = relationship("Cart_Item", back_populates='cart', cascade='all, delete-orphan')
    order = relationship("Order", back_populates='cart', cascade='all, delete-orphan')

    def to_dict(self):
        cart_data = []
        for cart_item in self.cart_item:
            cart_data.append(cart_item.to_dict())
        return {
            'id': self.id,
            'user_id': self.user_id,
            'cart_item': cart_data
        }
