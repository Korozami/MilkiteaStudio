from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship


class Cart_Item(db.Model):
    __tablename__ = 'cart_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    item_amount = db.Column(db.Integer, nullable=False)
    cart_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('carts.id')), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)

    cart = relationship("Cart", back_populates='cart_item')
    product = relationship("Product", back_populates='cart_item')

    def to_dict(self):
        return {
            'id': self.id,
            'item_amount': self.item_amount,
            'cart_id': self.cart_id,
            'product_id': self.product_id,
            'product': self.product.to_dict()
        }
